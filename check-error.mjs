import http from 'http';
http.get('http://localhost:4321/how-it-works', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => console.log(d));
}).on('error', e => console.log('ERR', e.message));
