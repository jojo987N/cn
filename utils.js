export function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
     var secondPart = (Math.random() * 46656) | 0;
     firstPart = ("000" + firstPart.toString(36)).slice(-3);
     secondPart = ("000" + secondPart.toString(36)).slice(-3);
     return firstPart + secondPart;
}

export function ramdomize(data) {
    for (i = data.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = data[i]
        data[i] = data[j]
        data[j] = k
    }
}

export function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "j";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "min";
    }
    return Math.floor(seconds) + "sec";
  }