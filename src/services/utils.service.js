
export const utilService = {
    makeId,
    getNiceRandomColor
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
  
  function getNiceRandomColor() {
    let red = "#E2445C";
    let orange = "#FDAB3D";
    let green = "#00C875";
    let blue = "#0073ea";
    let pink = "#FAA1F1";
    let darkblue = "#292f4c";
  
    let niceColors = [darkblue, pink, blue, green, orange, red];
    let drawnNum = _getRandomIntInclusive(0, niceColors.length - 1);
    let randColor = niceColors[drawnNum];
    return randColor;
  }
  function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  
  