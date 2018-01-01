const getFileDir = require('./getFileDir')
const fs = require('fs')
const path = require('path')

function uploadFile(userId, type, files={}) {
  const filePaths = []
  const fileDir = getFileDir(userId, type)

  for (let key in files) {
    const file = files[key]
    const type = file.type.match(/\/(.*?)$/)[1]
    const crypto = require('crypto')
    const seed = file.size.toString()
    console.log(seed)
    const uniqueSHAStr = crypto
      .createHash('sha1')
      .update(seed)
      .digest('hex')
    const filePath = path.join(fileDir, `${uniqueSHAStr}.${type}`)

    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer)
    filePaths.push(filePath)
  }

  return filePaths
}

module.exports = uploadFile