const getFileDir = require('./getFileDir')
const fs = require('fs')
const path = require('path')

function uploadFile(userId, type, files={}) {
  const filePaths = []
  const fileDir = getFileDir(userId, type)

  for (let key in files) {
    const file = files[key]
    const filePath = path.join(fileDir, file.name)
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)
  }

  return filePaths
}

module.exports = uploadFile