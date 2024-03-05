const fs = require('node:fs/promises')

console.log('Leyendo archivo...')

fs.readFile('./archivo.txt', 'utf-8')
  .then((txt) => {
    console.log(txt)
  })

console.log('Haciendo otras cosas mientra se lee el archivo...')

// Obtener información de un archivo
// const stats = fs.statSync('./archivo.txt')
// console.log(
//     stats.isFile(),
//     stats.isDirectory(),
//     stats.isSymbolicLink(),
//     stats.size,
// );
