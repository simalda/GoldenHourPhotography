import * as config from "../JS/config";

export function convertDateToDateArrayDDMMYYYY(date) {
  let shortDate;
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();

  shortDate = [dd, mm, yyyy];
  return shortDate;
}

export function convertDateToDateStringDDMMYYYY(date) {
  let shortDate;
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();

  shortDate = dd + "." + mm + "." + yyyy;
  return shortDate;
}

export function createDate(year, month, day) {
  return new Date(year, month, day);
}
export function hebrewDate(date) {
  var dateText;
  var days = new Array();
  days[days.length] = "יום ראשון";
  days[days.length] = "יום שני";
  days[days.length] = "יום שלישי";
  days[days.length] = "יום רביעי";
  days[days.length] = "יום חמישי";
  days[days.length] = "יום שישי";
  days[days.length] = "יום שבת";

  var months = new Array();
  months[months.length] = "ינואר";
  months[months.length] = "פברואר";
  months[months.length] = "מרץ";
  months[months.length] = "אפריל";
  months[months.length] = "מאי";
  months[months.length] = "יוני";
  months[months.length] = "יולי";
  months[months.length] = "אוגוסט";
  months[months.length] = "ספטמבר";
  months[months.length] = "אוקטובר";
  months[months.length] = "נובמבר";
  months[months.length] = "דצמבר";

  const day = days[date.getDay()];
  dateText = day + ", " + date.getDate() + " ל" + months[date.getMonth()];
  return { weekDay: day, dateString: dateText };
}

export function getHebrewDayOfWeek(date) {
  return config.hebrewDayOfWeek[date.getDay()];
}

export function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  return date.getDay();
}

export function addDay(date, numOfDays) {
  let newDate = new Date();
  newDate.setDate(date.getDate() + numOfDays);
  return newDate;
}

export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function getWeekBorders(date) {
  return { startDate: countStartDate(date), endDate: countEndDate(date) };
}

export function countStartDate(date) {
  let newDate = new Date();
  let startDate = new Date(newDate.setDate(date.getDate() - date.getDay()));
  return new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDay()
  );
}
export function countEndDate(date) {
  let newDate = new Date();
  return new Date(newDate.setDate(date.getDate() + 6 - date.getDay()));
}

export function addDaysToDate(date, days) {
  const copyDate = new Date(Number(date));
  return new Date(copyDate.setDate(date.getDate() + days));
}

export function numberOfDaysInMounth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getAllDatesBydayOfWeek(year, month, dayOfWeek) {
  let dateList = [];
  let date0 = new Date();
  let date1 = new Date();
  let date = new Date(year, month, 1);
  let dateWithCorrectDayOfWeek = new Date(
    date0.setDate(date.getDate() - date.getDay() + dayOfWeek)
  );
  // const dateWithCorrectDayOfWeek_Day = dateWithCorrectDayOfWeek.getDay();
  let i = 0;
  if (dateWithCorrectDayOfWeek < date) {
    i = 1;
  }
  let newDate = new Date();
  while (newDate < new Date(year, month + 1, 1)) {
    newDate = new Date(
      date1.setDate(date.getDate() - date.getDay() + dayOfWeek + 7 * i)
    );
    dateList.push(newDate);
    i++;
  }
  return dateList;
}
