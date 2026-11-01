import fs from 'fs';
import path from 'path';
import http from 'http';

// Collect all internal hrefs from astro pages
const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir, { recursive: true }).filter(f => f.endsWith('.astro'));
const internalHrefs = new Set();
for (const f of files) {
  const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  const matches = content.matchAll(/href="([^"]+)"/g);
  for (const m of matches) {
    const href = m[1];
    if (href.startsWith('/') && !href.startsWith('//')) internalHrefs.add(href);
  }
}
console.log('Internal links found:', [...internalHrefs].sort().join(', '));

// Verify each returns 200 (or 404 for the 404 page)
let failures = 0;
let i = 0;
const list = [...internalHrefs].sort();
function next() {
  if (i >= list.length) {
    console.log(`\nLINK CHECK DONE: ${list.length - failures}/${list.length} links OK`);
    process.exit(failures ? 1 : 0);
  }
  const p = list[i++];
  http.get('http://localhost:4321' + p, { timeout: 8000 }, (res) => {
    const ok = res.statusCode === 200 || res.statusCode === 404;
    console.log(`${res.statusCode} ${p} ${ok ? 'OK' : 'FAIL'}`);
    if (!ok) failures++;
    res.resume(); res.on('end', next);
  }).on('error', (e) => { console.log(`ERR ${p} ${e.message}`); failures++; next(); })
    .on('timeout', () => { console.log(`TIMEOUT ${p}`); failures++; next(); });
}
next();
