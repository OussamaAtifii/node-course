const os = require('node:os')

console.log(os.platform())
console.log(os.release())
console.log(os.totalmem() / 1024 / 1024 / 1024)
console.log(os.freemem() / 1024 / 1024 / 1024)
console.log(os.arch())
console.log(os.cpus().length)
