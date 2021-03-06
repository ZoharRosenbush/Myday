
export const utilService = {
  makeId,
  getNiceRandomColor,
  createDeepCopy,
  timeSince,
  getUserAcronyms
}


function createDeepCopy(board) {
  const boardCopy = JSON.parse(JSON.stringify(board))
  return boardCopy
}


function makeId(length = 4) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getUserAcronyms(user) {
  const fullName = user.fullname.split(' ')
  return `${fullName[0].substring(0, 1)}${fullName[1].substring(0, 1)}`.toUpperCase()
}

function getNiceRandomColor() {
  const red = "#E2445C";
  const orange = "#FDAB3D";
  const green = "#00C875";
  const blue = "#0073ea";
  const pink = "#FAA1F1";
  const darkblue = "#292f4c";
  const purple = '#8A39E1';
  const magenta = '#FA4EAB'
  const lightBlue = '#9AD0EC'
  const markerPurple ='#5800FF'
  const yellow = '#FFC900'
  const navyBlue = '#2F3A8F'
  const lightGreen = '#B4FE98'
  const lightPink = '#F6A9A9'

  const niceColors = [darkblue, pink, blue, green, orange, red,purple,magenta,lightBlue,markerPurple,yellow,navyBlue,lightGreen,lightPink];
  const drawnNum = _getRandomIntInclusive(0, niceColors.length - 1);
  const randColor = niceColors[drawnNum];
  return randColor;
}

function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min";
  }
  if (interval === 0) {
    return "now";
  }
  return Math.floor(seconds) + " sec";
}