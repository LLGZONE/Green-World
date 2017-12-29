function today() {
  const now = new Date(Date.now())

  return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
}

module.exports = today