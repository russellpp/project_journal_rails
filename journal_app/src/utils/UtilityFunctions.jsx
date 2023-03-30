import { categoryColors } from "./Constants";

const convertToHours = (datetimeString) => {
  const datetime = new Date(datetimeString);
  const hours = datetime.getHours().toString().padStart(2, "0");
  const minutes = datetime.getMinutes().toString().padStart(2, "0");
  const time = hours + ":" + minutes;
  return time;
};

const formatDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  return `${dayOfWeek} ${month}/${dayOfMonth}`;
};

const convertToDate = (datetimeString) => {
  const datetime = new Date(datetimeString);
  const formattedDate = formatDate(datetime);
  return formattedDate;
};

const formatTimeLeft = (datetimeString) => {
  const now = new Date();
  const date = new Date(datetimeString);
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return "now";
  } else if (diff < 60 * 1000) {
    const secondsLeft = Math.floor(diff / 1000);
    return `${secondsLeft} second${secondsLeft === 1 ? "" : "s"} left`;
  } else if (diff < 60 * 60 * 1000) {
    const minutesLeft = Math.floor(diff / (60 * 1000));
    return `${minutesLeft} minute${minutesLeft === 1 ? "" : "s"} left`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    const hoursLeft = Math.floor(diff / (60 * 60 * 1000));
    return `${hoursLeft} hour${hoursLeft === 1 ? "" : "s"} left`;
  } else if (diff < 30 * 24 * 60 * 60 * 1000) {
    const daysLeft = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
  } else {
    return "more than a month left";
  }
};

const getColorById = (id) => {
  if (id <= 20) {
    return categoryColors[id - 1];
  } else {
    const index = (id - 1) % 20;
    return categoryColors[index];
  }
};

const formatDateToYY = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export {
  convertToHours,
  convertToDate,
  formatTimeLeft,
  getColorById,
  formatDateToYY,
};
