import "./style.css";
import errors from "./errors";

const day = document.querySelector("#input-day");
const month = document.querySelector("#input-month");
const year = document.querySelector("#input-year");
const form = document.querySelector("#age-form");
const inputs = document.querySelectorAll("input[type='text']");

const resultDay = document.querySelector(".result-day");
const resultMonth = document.querySelector(".result-month");
const resultYear = document.querySelector(".result-year");

form.addEventListener("submit", (event) => {
  const yearValue = Number(year.value.trim());
  const monthValue = Number(month.value.trim());
  const dayValue = Number(day.value.trim());
  event.preventDefault();
  if (checkForRequiredFields([...inputs])) {
    if (isValidDate(dayValue, monthValue, yearValue)) {
      if (compareToCurrentDate(yearValue, monthValue, dayValue)) {
        inputs.forEach((input) => {
          removeError(input);
        });
        calculateAge(yearValue, monthValue, dayValue);
      }
    }
  }
});

function setErrorForm(input, errorText) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector("small");
  parent.classList.add("error");
  errorItem.textContent = errorText;
}

function isValidMonth(monthValue) {
  return monthValue > 0 && monthValue < 13 && !isNaN(monthValue);
}

function isValidYear(yearValue) {
  return !isNaN(yearValue) && yearValue <= new Date().getFullYear();
}
function isValidDay(dayValue, daysInMonth) {
  return !isNaN(dayValue) && dayValue > 0 && dayValue <= daysInMonth;
}
function getDaysInMonth(isLeapYear) {
  return {
    1: 31,
    2: isLeapYear ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
}
function isValidDate(dayValue, monthValue, yearValue) {
  let hasError = false;

  const isLeapYear = yearValue % 4 === 0;
  const daysInMonth = getDaysInMonth(isLeapYear);

  if (!isValidDay(dayValue, daysInMonth[monthValue])) {
    setErrorForm(day, errors["valid_day"]);
    hasError = true;
  }

  if (!isValidMonth(monthValue)) {
    setErrorForm(month, errors["valid_month"]);
    hasError = true;
  }
  if (!isValidYear(yearValue)) {
    setErrorForm(year, errors["valid_year"]);
    hasError = true;
  }

  if (hasError) return false;
  else {
    resetResult();
    return true;
  }
}
function removeError(input) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector("small");
  parent.classList.remove("error");
  errorItem.textContent = "";
}
function checkForRequiredFields(inputs) {
  let hasError = false;
  [...inputs].forEach((input) => {
    if (input.value.trim() === "") {
      setErrorForm(input, errors["required"]);
      hasError = true;
    } else {
      removeError(input);
    }
  });
  if (hasError) return false;
  else {
    resetResult();
    return true;
  }
}
function compareToCurrentDate(yearValue, monthValue, dayValue) {
  const currentDate = new Date();
  const givenDate = new Date(yearValue, monthValue - 1, dayValue);
  if (givenDate > currentDate) {
    setErrorForm(day, errors["past_day"]);
    return false;
  }
  resetResult();
  return true;
}
function calculateAge(yearValue, monthValue, dayValue) {
  const isLeapYear = yearValue % 4 === 0;
  const daysInMonth = getDaysInMonth(isLeapYear);
  const currentDate = new Date();
  const givenDate = new Date(yearValue, monthValue - 1, dayValue);
  const diff = currentDate - givenDate;
  const monthDiff = new Date().getMonth() - (monthValue - 1);
  const daysDiff = currentDate.getDate() - dayValue;

  const months = monthDiff < 0 ? 12 - Math.abs(monthDiff) : monthDiff;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days =
    daysDiff < 0
      ? daysInMonth[monthValue] - (currentDate.getDay() - dayValue)
      : daysDiff;

  resultDay.innerText = days;
  resultMonth.innerText = months;
  resultYear.innerText = years;
}

function resetResult() {
  [resultDay, resultMonth, resultYear].forEach((item) => {
    item.innerText = "--";
  });
}
