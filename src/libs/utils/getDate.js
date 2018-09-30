function getDate(timestamp) {
  const d = new Date(timestamp * 1000);

  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

module.exports = getDate;
