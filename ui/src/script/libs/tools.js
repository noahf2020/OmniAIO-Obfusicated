function getTimeMS() {
  let d = new Date();
  let time = `${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}:${addZero(
    d.getMilliseconds()
  )}`;
  return time;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

module.exports = { getTimeMS, addZero };
