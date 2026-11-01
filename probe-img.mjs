import http from 'http';
for (const p of ['/images/j-cloud-logo.png', '/favicon.svg', '/robots.txt', '/', '/how-it-works', '/download', '/pricing', '/legal/privacy-policy', '/nonexistent']) {
  http.get('http://localhost:4321' + p, (res) => {
    console.log(`${res.statusCode} ${p} ${res.headers['content-type']||'?'}`);
    res.resume();
  }).on('error', e => console.log('ERR', p, e.message));
}
