const dateString2hhmm = (dateString) => {
    const date = new Date(dateString);
    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const hours = date.getHours();
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return `${hoursStr}:${minutesStr}`;
}

const yyyymmdd = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const months = date.getMonth() + 1;
    const monthStr = months < 10 ? '0' + months : months;
    const day = date.getDate();
    const dayStr = day < 10 ? '0' + day : day;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
}

module.exports = {
    dateString2hhmm,
    yyyymmdd,
}