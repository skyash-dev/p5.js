const fs = require('fs');

const data = fs.readFileSync('.all-contributorsrc', 'utf-8');
const parsed = JSON.parse(data);
const contributors = parsed.contributors;

const size = 50;
const cols = 30;
const rows = Math.ceil((contributors.length / cols));

const width = cols * size;
const height = rows * size;

let svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="circle" clipPathUnits="objectBoundingBox">
      <circle cx="0.5" cy="0.5" r="0.5"/>
    </clipPath>
  </defs>
`;


contributors.forEach((c, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);

  const x = col * size;
  const y = row * size;

  const avatar_url = c.avatar_url.replace(/&(?!amp;)/g, "&amp;");

  svg += `
  <a href="${c.profile}" target="_blank">
    <image
    href="${avatar_url}"
    x="${x}" y="${y}"
    width="${size}"
    height="${size}"
    clip-path="url(#circle)"
    />
  </a>`;
});

svg += `</svg>`;

fs.writeFileSync('contributors.svg', svg);
