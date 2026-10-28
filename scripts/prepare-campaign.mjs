import sharp from "sharp";
// Rebuild browser-ready derivatives from the retained, generated campaign source.
const source = "design/campaign-original.png";
await sharp(source)
  .resize({ width: 1400 })
  .webp({ quality: 83 })
  .toFile("public/images/campaign.webp");
await sharp(source)
  .resize({ width: 1536 })
  .webp({ quality: 80 })
  .toFile("public/images/campaign-wide.webp");
const crops = {
  urli: { left: 550, top: 400, width: 740, height: 500 },
  vase: { left: 1210, top: 250, width: 326, height: 500 },
  textile: { left: 1000, top: 570, width: 536, height: 454 },
  diya: { left: 280, top: 480, width: 440, height: 400 },
};
for (const [name, crop] of Object.entries(crops)) {
  await sharp(source)
    .extract(crop)
    .resize(name === "vase" ? 500 : 620, name === "vase" ? 625 : 775, {
      fit: "cover",
    })
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
}
