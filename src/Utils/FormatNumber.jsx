export function formatNumber(number) {
  if (number === undefined) {
    return ''; // Return an empty string if the number is undefined
  }
  if (number >= 1000 && number < 1000000) {
    return Math.round(number / 1000) + "K";
  } else if (number >= 1000000 && number < 1000000000) {
    return Math.round(number / 1000000) + "M";
  } else if (number >= 1000000000) {
    return Math.round(number / 1000000000) + "B";
  }

  return number.toString();
}
