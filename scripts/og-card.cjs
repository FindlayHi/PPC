// Regenerate social card: node scripts/og-card.cjs src/img/bailey-alexander-cYeCxtKpTTQ-unsplash.jpg /tmp/og.png
// then convert to src/social/og-card.jpg. Needs Bricolage Grotesque + Inter installed locally (librsvg uses system fonts).
const sharp = require('sharp'); const fs=require('fs');
const [,, photo, out] = process.argv;
(async () => {
  // photo cropped to 520x440 jpeg
  const img = await sharp(photo).resize(520, 440, {fit:'cover'}).jpeg({quality:85}).toBuffer();
  const b64 = img.toString('base64');
  // blob paths (centered in 600x520 box at x=640,y=55)
  const outer = "M300,8 C430,0 560,40 590,170 C618,300 560,450 430,500 C300,548 150,520 70,430 C-5,345 -10,200 60,110 C120,35 200,12 300,8 Z";
  const inner = "M300,48 C410,42 520,80 545,185 C568,290 520,410 415,450 C310,490 180,470 112,395 C48,325 44,210 100,140 C150,80 215,52 300,48 Z";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
  <rect width="1200" height="630" fill="#F5F6F1"/>
  <path d="M-60,520 C40,470 150,520 190,600 C210,650 150,700 40,690 C-60,680 -120,580 -60,520 Z" fill="#EEF3D9"/>
  <g transform="translate(600,55)">
    <path d="${outer}" fill="#F2C46B"/>
    <clipPath id="c"><path d="${inner}"/></clipPath>
    <image x="25" y="40" width="520" height="440" clip-path="url(#c)" xlink:href="data:image/jpeg;base64,${b64}" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <g transform="translate(72,78)">
    <circle cx="22" cy="22" r="22" fill="#1F4A3A"/>
    <text x="22" y="31" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="25" fill="#B7D433">P</text>
    <text x="58" y="31" font-family="Bricolage Grotesque" font-weight="700" font-size="25" fill="#1F4A3A">Port Credit Cleaning</text>
  </g>
  <g font-family="Bricolage Grotesque" font-weight="800" font-size="70" letter-spacing="-2">
    <text x="68" y="232" fill="#7A9A1E">Professional</text>
    <text x="68" y="304" fill="#7A9A1E">house cleaning</text>
    <text x="68" y="376" fill="#1F4A3A">in Port Credit.</text>
  </g>
  <text x="70" y="432" font-family="Inter" font-size="23" fill="#4B5A50">House &amp; condo cleaning · South Mississauga</text>
  <g transform="translate(70,478)">
    <rect width="290" height="54" rx="27" fill="#B7D433"/>
    <text x="145" y="35" text-anchor="middle" font-family="Inter" font-weight="600" font-size="22" fill="#1F4A3A">portcreditcleaning.ca</text>
  </g>
</svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(out);
  console.log(fs.statSync(out).size);
})();
