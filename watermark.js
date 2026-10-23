const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, 'img-original');
const OUTPUT = path.join(__dirname, 'public', 'img');
const TEXT = '© Mirella Short Freitas';

async function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });

  const files = fs.readdirSync(INPUT);

  for (const file of files) {
    if (!/\.jpe?g$/i.test(file)) continue;

    // Apply the EXIF rotation from the phone and cap the width at 1600px
    const resized = await sharp(path.join(INPUT, file))
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .toBuffer({ resolveWithObject: true });

    const w = resized.info.width;
    const h = resized.info.height;
    const small = Math.round(Math.min(w, h) * 0.05);
    const big = Math.round(Math.min(w, h) * 0.12);
    const margin = Math.round(small * 0.8);

    const svg =
      '<svg width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="50%" y="50%" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" ' +
      'font-size="' + big + '" fill="#ffffff" fill-opacity="0.18" ' +
      'transform="rotate(-30 ' + (w / 2) + ' ' + (h / 2) + ')">' + TEXT + '</text>' +
      '<text x="' + (w - margin) + '" y="' + (h - margin) + '" text-anchor="end" ' +
      'font-family="Arial, sans-serif" font-weight="bold" font-size="' + small + '" ' +
      'fill="#ffffff" fill-opacity="0.75" stroke="#000000" stroke-opacity="0.4" ' +
      'stroke-width="' + (small * 0.04) + '">' + TEXT + '</text>' +
      '</svg>';

    await sharp(resized.data)
      .composite([{ input: Buffer.from(svg) }])
      .jpeg({ quality: 82 })
      .toFile(path.join(OUTPUT, file));

    console.log('Done:', file);
  }
}

main().catch(function (err) {
  console.error('Error:', err.message);
});