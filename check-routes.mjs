import http from 'http';

const routes = [
  '/', '/how-it-works', '/download', '/pricing', '/installation', '/about', '/404',
  '/legal', '/legal/privacy-policy', '/legal/terms-of-service', '/legal/eula',
  '/legal/acceptable-use', '/legal/cookies', '/legal/subscriptions', '/legal/refunds',
  '/legal/data-protection', '/legal/security', '/legal/disclaimer', '/legal/complaints',
  '/support', '/nonexistent-page-xyz',
];

let failures = 0;
let i = 0;

function next() {
  if (i >= routes.length) {
    console.log(`\nDONE: ${routes.length - failures}/${routes.length} routes OK`);
    process.exit(failures ? 1 : 0);
  }
  const path = routes[i++];
  http.get('http://localhost:4321' + path, { timeout: 8000 }, (res) => {
    const ok = res.statusCode === 200 || res.statusCode === 404;
    console.log(`${res.statusCode} ${path} ${ok ? 'OK' : 'FAIL'}`);
    if (!ok) failures++;
    res.resume();
    res.on('end', next);
  }).on('error', (e) => {
    console.log(`ERR ${path} ${e.message}`);
    failures++;
    next();
  }).on('timeout', () => {
    console.log(`TIMEOUT ${path}`);
    failures++;
    next();
  });
}

next();
