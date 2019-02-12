// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h${mins}m`;
};

// Convert a number to $ format
export const convertMoney = money => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(money);
};

//Troncat the long description
export const truncText = (text, limit) => {
  const shortened = text.indexOf(" ", limit);
  if (shortened === -1) return text;
  return text.substring(0, shortened);
};
