function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  let response = {}

  if (matches.length !== 3) {
    return new Error('Invalid input string')
  }

  response.type = matches[1]
  response.data = new Buffer(matches[2], 'base64')

  return response
}

function base64ToImageFile(dataString, fileDir) {
  const imgBuffer = decodeBase64Image(dataString)
  const crypto = require('crypto')
  const seed = crypto.randomBytes(20)
  const uniqueSHAStr = crypto
    .createHash('sha1')
    .update(seed)
    .digest('hex')
  const imageType = imgBuffer.type.match(/\/(.*?)$/)[1]

  const imagePath = `${fileDir}${uniqueSHAStr}.${imageType}`

  require('fs').writeFile(imagePath, imgBuffer.data, () => {
    console.log('img into filedir :', fileDir)
  })

  return imagePath
}

module.exports = base64ToImageFile