const submitButton = document.querySelector(".submit-button");
const inputDay = document.querySelector("#input-day");
const inputMonth = document.querySelector("#input-month");
const inputYear = document.querySelector("#input-year");
const daysDisplay = document.querySelector("#days");
const monthsDisplay = document.querySelector("#months");
const yearsDisplay = document.querySelector("#years");
const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");
const inputDayContainer = document.querySelector(".input-day-container");
const inputMonthContainer = document.querySelector(".input-month-container");
const inputYearContainer = document.querySelector(".input-year-container");

const monthLookup = {
  "01": 31,
  "02": 28,
  "03": 31,
  "04": 30,
  "05": 31,
  "06": 30,
  "07": 31,
  "08": 31,
  "09": 30,
  10: 31,
  11: 30,
  12: 31,
};

const submitHandler = () => {
  resetErrors();
  switch (true) {
    case validatePopulated():
      break;
    case validateRange():
      break;
    case validateDayInMonth():
      break;
    default:
      displayAge();
  }
};

const getCurrentDate = () => {
  let now = new Date();
  let currentDate = [now.getDate(), now.getMonth(), now.getFullYear()];
  return currentDate;
};

const getDateOfBirth = () => {
  let birthDay = inputDay.value;
  let birthMonth = inputMonth.value;
  let birthYear = inputYear.value;
  let dateOfBirth = [birthDay, birthMonth, birthYear];
  return dateOfBirth;
};

const calculateAge = () => {
  let [currentDay, currentMonth, currentYear] = getCurrentDate();
  let [birthDay, birthMonth, birthYear] = getDateOfBirth();

  if (birthDay > currentDay) {
    currentDay += monthLookup[birthMonth];
    currentMonth -= 1;
  }

  if (birthMonth > currentMonth) {
    currentYear -= 1;
    currentMonth += 12;
  }

  let days = currentDay - birthDay;
  let months = currentMonth - birthMonth;
  let years = currentYear - birthYear;

  return [days, months, years];
};

const displayAge = () => {
  let [days, months, years] = calculateAge();
  daysDisplay.innerHTML = days;
  monthsDisplay.innerHTML = months;
  yearsDisplay.innerHTML = years;
};

const validatePopulated = () => {
  let invalid = false;
  if (!inputDay.value) {
    inputDayContainer.className = "form-input input-day-container invalid";
    dayError.innerHTML = "This field is required";
    dayError.style.visibility = "visible";
    invalid = true;
  }
  if (!inputMonth.value) {
    inputMonthContainer.className = "form-input input-month-container invalid";
    monthError.innerHTML = "This field is required";
    monthError.style.visibility = "visible";
    invalid = true;
  }
  if (!inputYear.value) {
    inputYearContainer.className = "form-input input-year-container invalid";
    yearError.innerHTML = "This field is required";
    yearError.style.visibility = "visible";
    invalid = true;
  }
  return invalid;
};

const validateRange = () => {
  let invalid = false;
  const currentDate = getCurrentDate();
  if (inputDay.value < 1 || inputDay.value > 31) {
    inputDayContainer.className = "form-input input-day-container invalid";
    dayError.innerHTML = "Must be a valid day";
    dayError.style.visibility = "visible";
    invalid = true;
  }
  if (inputMonth.value < 1 || inputMonth.value > 12) {
    inputMonthContainer.className = "form-input input-month-container invalid";
    monthError.innerHTML = "Must be a valid month";
    monthError.style.visibility = "visible";
    invalid = true;
  }
  if (inputYear.value > currentDate[2]) {
    inputYearContainer.className = "form-input input-year-container invalid";
    yearError.innerHTML = "Must be in the past";
    yearError.style.visibility = "visible";
    invalid = true;
  }
  return invalid;
};

const validateDayInMonth = () => {
  let invalid = false;
  if (inputDay.value > monthLookup[inputMonth.value]) {
    inputDayContainer.className = "form-input input-day-container invalid";
    dayError.innerHTML = "Must be a valid date";
    dayError.style.visibility = "visible";
    invalid = true;
  }
  return invalid;
};

const resetErrors = () => {
  inputDayContainer.className = "form-input input-day-container";
  inputMonthContainer.className = "form-input input-month-container";
  inputYearContainer.className = "form-input input-year-container";
  dayError.innerHTML = "";
  dayError.style.visibility = "hidden";
  monthError.innerHTML = "";
  dayError.style.visibility = "hidden";
  yearError.innerHTML = "";
  dayError.style.visibility = "hidden";
};

submitButton.addEventListener("click", submitHandler);
