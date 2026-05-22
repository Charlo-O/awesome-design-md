#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, "data");
const assetsDir = join(dataDir, "assets");

const sourceAssetRoots = {
  "nano-banana.json": ["nano-banana-pro", "nano-banana-2"],
  "chatgpt.json": ["chatgpt"],
  "grok.json": ["grok"],
  "seedance-2.0.json": ["seedance-2.0"],
};

function assetPath(rootName, dirName, fileName) {
  return `/assets/${rootName}/${dirName}/${fileName}`;
}

function findAssetDir(item, roots) {
  for (const rootName of roots) {
    const candidates = [
      `${item.id}-${item.slug}`,
      `${String(item.id).padStart(5, "0")}-${item.slug}`,
    ];

    for (const dirName of candidates) {
      const fullPath = join(assetsDir, rootName, dirName);
      if (existsSync(fullPath)) {
        return { rootName, dirName, fullPath };
      }
    }
  }

  return null;
}

function fileNames(fullPath) {
  return new Set(readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name));
}

function repairItem(item, roots) {
  if (item.image && Array.isArray(item.media) && item.media.length > 0) {
    return { item, repaired: false };
  }

  const match = findAssetDir(item, roots);
  if (!match) {
    return { item, repaired: false };
  }

  const files = fileNames(match.fullPath);
  const imageFiles = [...files]
    .filter((name) => /^image-\d+\.(jpe?g|png|webp|avif)$/i.test(name))
    .sort();
  const videoFiles = [...files]
    .filter((name) => /^video-\d+\.(mp4|webm|mov)$/i.test(name))
    .sort();
  const coverFile = ["cover.jpg", "cover.jpeg", "cover.png", "cover.webp", "thumbnail.jpg", "thumbnail.jpeg", "thumbnail.png", "thumbnail.webp"]
    .find((name) => files.has(name));
  const thumbnailFile = ["thumbnail.jpg", "thumbnail.jpeg", "thumbnail.png", "thumbnail.webp"]
    .find((name) => files.has(name));

  const media = [];
  if (coverFile) {
    media.push({
      type: "image",
      kind: "cover",
      path: assetPath(match.rootName, match.dirName, coverFile),
      index: 0,
    });
  }
  if (thumbnailFile && thumbnailFile !== coverFile) {
    media.push({
      type: "image",
      kind: "thumbnail",
      path: assetPath(match.rootName, match.dirName, thumbnailFile),
      index: 0,
    });
  }
  imageFiles.forEach((name, index) => {
    media.push({
      type: "image",
      kind: "image",
      path: assetPath(match.rootName, match.dirName, name),
      index: index + 1,
    });
  });
  videoFiles.forEach((name, index) => {
    media.push({
      type: "video",
      kind: "video",
      path: assetPath(match.rootName, match.dirName, name),
      index: index + 1,
    });
  });

  const image =
    (coverFile && assetPath(match.rootName, match.dirName, coverFile)) ||
    (imageFiles[0] && assetPath(match.rootName, match.dirName, imageFiles[0])) ||
    "";
  const video =
    videoFiles[0] && assetPath(match.rootName, match.dirName, videoFiles[0]);

  return {
    item: {
      ...item,
      image: item.image || image,
      video: item.video || video || "",
      mediaType: item.mediaType || (video ? "video" : "image"),
      media: Array.isArray(item.media) && item.media.length > 0 ? item.media : media,
    },
    repaired: Boolean(image || video || media.length),
  };
}

for (const [fileName, roots] of Object.entries(sourceAssetRoots)) {
  const filePath = join(dataDir, fileName);
  if (!existsSync(filePath)) {
    continue;
  }

  const payload = JSON.parse(readFileSync(filePath, "utf8"));
  let repairedCount = 0;
  const cases = (payload.cases || []).map((item) => {
    const result = repairItem(item, roots);
    if (result.repaired) {
      repairedCount += 1;
    }
    return result.item;
  });

  writeFileSync(filePath, `${JSON.stringify({ ...payload, cases })}\n`, "utf8");
  console.log(`${fileName}: repaired ${repairedCount} cases`);
}
