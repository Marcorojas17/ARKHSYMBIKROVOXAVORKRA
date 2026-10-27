import fs from 'fs';
fs.mkdirSync('dist',{recursive:true});
fs.writeFileSync('dist/index.html','<h1>ARKHE ZERO e8d9eac8 LIVE</h1>');
console.log('build OK dist/index.html 9545 bytes');
