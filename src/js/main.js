import "../css/style.css";
import errors from "./errors";
import ValidateDate from "./validateDate";

const day = document.querySelector("#input-day");
const month = document.querySelector("#input-month");
const year = document.querySelector("#input-year");
const form = document.querySelector("#age-form");
const inputs = document.querySelectorAll("input[type='text']");

const resultDay = document.querySelector(".result-day");
const resultMonth = document.querySelector(".result-month");
const resultYear = document.querySelector(".result-year");

function setErrorForm(input, errorText) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector("small");
  parent.classList.add("error");
  errorItem.innerHTML = errorText;
}

function removeError(input) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector("small");
  parent.classList.remove("error");
  errorItem.innerHTML = "";
}

function resetOutput() {
  [resultDay, resultMonth, resultYear].forEach((item) => {
    item.innerHTML = "--";
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dayValue = Number(day.value.trim());
  const monthValue = Number(month.value.trim());
  const yearValue = Number(year.value.trim());
  resetOutput();
  if (checkForRequiredFields([...inputs])) {
    if (isValidDate(dayValue, monthValue, yearValue)) {
      calculateAge(yearValue, monthValue, dayValue);
    }
  }
});

function isValidDate(dayValue, monthValue, yearValue) {
  let validDate = false;
  const validateDate = new ValidateDate(dayValue, monthValue, yearValue);
  const currentDate = new Date();
  const givenDate = new Date(yearValue, monthValue - 1, dayValue);
  if (!validateDate.isValidYear()) {
    setErrorForm(year, errors["invalid_year"]);
  } else if (!validateDate.isValidMonth()) {
    setErrorForm(month, errors["invalid_month"]);
  } else if (!validateDate.isValidDay()) {
    setErrorForm(day, errors["invalid_day"]);
  } else if (
    givenDate > currentDate &&
    givenDate.getMonth() > currentDate.getMonth()
  ) {
    setErrorForm(month, errors["past_month"]);
  } else if (
    givenDate > currentDate &&
    givenDate.getMonth() === currentDate.getMonth() &&
    givenDate.getDay() > currentDate.getDay()
  ) {
    setErrorForm(day, errors["past_day"]);
  } else {
    validDate = true;
  }
  return validDate;
}

function checkForRequiredFields(inputs) {
  let hasValue = true;
  [...inputs].forEach((input) => {
    if (input.value.trim() === "") {
      setErrorForm(input, errors["required"]);
      hasValue = false;
    } else {
      removeError(input);
    }
  });

  return hasValue;
}

function calculateAge(yearValue, monthValue, dayValue) {
  const validateDate = new ValidateDate(yearValue, monthValue, dayValue);
  const daysInMonth = validateDate.getDaysInMonth();
  const diff = new Date() - new Date(yearValue, monthValue - 1, dayValue);
  const monthDiff = new Date().getMonth() - (monthValue - 1);
  const daysDiff = new Date().getDate() - dayValue;

  const months = monthDiff < 0 ? 12 - Math.abs(monthDiff) : monthDiff;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days =
    daysDiff < 0
      ? daysInMonth[monthValue] - (new Date().getDay() - dayValue)
      : daysDiff;

  resultDay.innerText = days;
  resultMonth.innerText = months;
  resultYear.innerText = years;
}
