const fs = require('fs')
const path = require('path')

function mkdirRSync(fileDir) {
  if (fs.existsSync(fileDir)) {
    return true
  } else {
    if (mkdirRSync(path.dirname(fileDir))) {
      fs.mkdirSync(fileDir)
      return true
    }
  }
}

module.exports = mkdirRSync