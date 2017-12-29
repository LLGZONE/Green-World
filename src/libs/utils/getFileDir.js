const today = require('../../libs/utils/today')
const fs = require('fs')

function getFileDir(userId, type) {
  const fileName = `/home/users/${type}/${today()}/`

  if (fs.existsSync(fileName)) {
    return fileName
  }

  fs.mkdirSync(fileName)
  return fileName
}

module.exports = getFileDir