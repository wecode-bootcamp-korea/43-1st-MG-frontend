export const calculatePercentage = (count, price) => {
  let calculatedPrice = 0;
  if (typeof count === 'string') Number(count);
  const discountStandard = [50, 30, 10, 5];
  const discountPercent = [0.87, 0.9, 0.92, 0.95];
  const StandardIndex = discountStandard.indexOf(
    discountStandard.filter(number => count >= number)[0]
  );
  if (StandardIndex === -1) {
    calculatedPrice = price;
  } else {
    calculatedPrice =
      Math.floor((price * discountPercent[StandardIndex]) / 10) * 10;
  }

  return calculatedPrice;
};
