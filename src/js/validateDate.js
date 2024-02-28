class ValidateDate {
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
  checkForLeapYear() {
    return (
      (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
    );
  }
  getDaysInMonth() {
    const daysInMonth = {
      1: 31,
      2: this.checkForLeapYear() ? 29 : 28,
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
    return daysInMonth[this.month];
  }
  isValidDay() {
    return (
      !isNaN(this.day) &&
      this.day > 0 &&
      this.month < 13 &&
      this.day <= this.getDaysInMonth()
    );
  }
  isValidMonth() {
    return this.month > 0 && this.month < 13 && !isNaN(this.month);
  }

  isValidYear() {
    return !isNaN(this.year) && this.year <= new Date().getFullYear();
  }
}

export default ValidateDate;
