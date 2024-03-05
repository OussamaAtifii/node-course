const path = require('node:path')

// Barra separadora dependiendo del sistema operativo
// console.log(path.sep);

// Unir rutas
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Obtener el nombre del archivo
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

// Obtener el nombre del archivo sin la extensión
const filename = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

// Obtener extension
const ext = path.extname('/tmp/midu-secret-files/password.pdf')
console.log(ext)
