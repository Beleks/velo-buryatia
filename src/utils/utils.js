function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

function convertTimeToMs(str) {
  let ms =
    Number(str.split(":")[0]) * 60 * 60 * 1000 +
    Number(str.split(":")[1]) * 60 * 1000 +
    Number(str.split(":")[2]) * 1000;
  return ms;
}

function culcDelay(resultMs, bestTimeMs = 0) {
  if (!resultMs) {
    return;
  }
  return `+ ${convertMsToTime(resultMs - bestTimeMs)}`;
}

export { convertMsToTime, convertTimeToMs, culcDelay };
