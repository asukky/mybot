const { AttachmentBuilder } = require('discord.js');

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function rarityColor(rarity) {
  return { common: '#9ca3af', rare: '#38bdf8', epic: '#a78bfa', legendary: '#f59e0b', mythic: '#ef4444', godlike: '#22c55e' }[rarity] || '#fff';
}

function buildProfileAttachment(fields, player) {
  const xpBar = Math.min(100, ((player.xp % 5000) / 5000) * 100);
  const qiBar = Math.min(100, ((player.qi % 5000) / 5000) * 100);

  const svg = `<svg width="1100" height="640" viewBox="0 0 1100 640" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1023"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient></defs>
<rect width="1100" height="640" fill="url(#bg)"/>
<rect x="26" y="26" width="1048" height="588" rx="18" fill="#0f172a" stroke="#334155"/>
<text x="56" y="82" fill="#e2e8f0" font-size="40" font-family="Verdana" font-weight="700">${esc(fields.name)}</text>
<text x="56" y="118" fill="#94a3b8" font-size="21" font-family="Verdana">Route: ${esc(fields.route.toUpperCase())}</text>
<text x="56" y="178" fill="#f8fafc" font-size="26" font-family="Verdana" font-weight="600">Realm</text>
<text x="56" y="212" fill="#cbd5e1" font-size="22" font-family="Verdana">${esc(fields.realm)}</text>
<text x="56" y="272" fill="#f8fafc" font-size="26" font-family="Verdana" font-weight="600">Progression</text>
<text x="56" y="306" fill="#cbd5e1" font-size="22" font-family="Verdana">${esc(fields.progression)}</text>
<text x="56" y="366" fill="#f8fafc" font-size="26" font-family="Verdana" font-weight="600">Combat Stats</text>
<text x="56" y="400" fill="#cbd5e1" font-size="22" font-family="Verdana">${esc(fields.stats)}</text>
<text x="56" y="434" fill="#cbd5e1" font-size="22" font-family="Verdana">Kills: ${esc(fields.kills)}</text>
<rect x="56" y="470" width="500" height="18" rx="9" fill="#1f2937"/><rect x="56" y="470" width="${(500 * xpBar) / 100}" height="18" rx="9" fill="#38bdf8"/>
<rect x="56" y="510" width="500" height="18" rx="9" fill="#1f2937"/><rect x="56" y="510" width="${(500 * qiBar) / 100}" height="18" rx="9" fill="#22c55e"/>
<rect x="610" y="80" width="430" height="500" rx="14" fill="#0b1220" stroke="#334155"/>
<text x="640" y="128" fill="#f8fafc" font-size="30" font-family="Verdana" font-weight="700">Innate Traits</text>
<text x="640" y="186" fill="${rarityColor(player.race.rarity)}" font-size="24" font-family="Verdana">Race</text>
<text x="640" y="218" fill="#e2e8f0" font-size="20" font-family="Verdana">${esc(player.race.name)} (${esc(player.race.rarity)})</text>
<text x="640" y="286" fill="${rarityColor(player.root.rarity)}" font-size="24" font-family="Verdana">Spiritual Root</text>
<text x="640" y="318" fill="#e2e8f0" font-size="20" font-family="Verdana">${esc(player.root.name)} (${esc(player.root.rarity)})</text>
<text x="640" y="386" fill="${rarityColor(player.talent.rarity)}" font-size="24" font-family="Verdana">Cultivation Talent</text>
<text x="640" y="418" fill="#e2e8f0" font-size="20" font-family="Verdana">${esc(player.talent.name)} (${esc(player.talent.rarity)})</text>
</svg>`;

  return new AttachmentBuilder(Buffer.from(svg), { name: `profile-${player.userId}.svg` });
}

module.exports = { buildProfileAttachment };
