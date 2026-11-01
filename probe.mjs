import http from 'http';

const opts = { hostname: 'localhost', port: 4321, path: '/how-it-works', method: 'GET', timeout: 8000 };
const req = http.request(opts, (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', JSON.stringify(res.headers));
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('BODY_LENGTH:', d.length);
    console.log('---BODY---');
    console.log(d);
    console.log('---END---');
  });
});
req.on('error', e => console.log('ERR', e.message));
req.on('timeout', () => { console.log('TIMEOUT'); req.destroy(); });
req.end();
