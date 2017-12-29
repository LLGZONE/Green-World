const today = require('../../libs/utils/today')
const fs = require('fs')
const mkdirs = require('./mkdirs')

function getFileDir(userId, type) {
  const dirName = `/home/users/${type}/${today()}/`

  if (fs.existsSync(dirName)) {
    return dirName
  }

  mkdirs(dirName)
  return dirName
}

module.exports = getFileDir