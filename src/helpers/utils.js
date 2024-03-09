export const convertMinutesIntoHourInString = (_minutes) => {
  let minutes = _minutes;
  let hours = Math.floor(minutes / 60);

  // 👇️ if seconds are greater than 30, round minutes up (optional)

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${hours} hours and ${minutes} minutes`;
}

export const graphColorsTwo = [
  "#5470c6", "#91cc75", "#FF7701", "#E24800", "#CC2200", "#860102", "#0000DB", "#0040FF", "#0080FF", "#00C0FF", "#00FFFF", "#00FFB4", "#02C39A", "#93E2D5", "#34DDDD", "#7AF5F5", "#78D5E3", "#89E894", "#BED661", "#A70100", "#FE0000", "#FF5455", "#FE7A7C", "#FFBBB9", "#BB0001", "#7B0001", "#400102", "#2C83C6", "#39A8F0", "#62BEEF", "#A6D4EC", "#E1A793", "#DD6D55", "#E24C33", "#C33726"
]

export function formatNumberTwoDigits(number) {
  return number.toString().padStart(2, '0');
}

export const colors = {
  primary: "#E88131",
  primaryDark: "#e86531",
  primaryLight: "#e89f31",
  secondary: "#e8dc31",
  dark: "#000000",
  lightDark: "#484964",
  white: "#FFFFFF",
  highlight: "#F8F7FA",
  silver: "#E4E4E4",
  success: "#57E777",
  danger: "#F00",

}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

