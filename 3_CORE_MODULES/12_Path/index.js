const path = require('path');

const customPath= 'relatorios/marcelo/relatorio1.pdf';

console.log('dirname: ', path.dirname(customPath));
console.log('basename: ', path.basename(customPath));
console.log('extname: ', path.extname(customPath));
console.log('resolve: ', path.resolve(customPath));

const midFolder = 'marcelo';
const filename = 'relatorioooo5.pdf';
const finalPath = path.join('relatorios',midFolder,filename);
console.log(finalPath);