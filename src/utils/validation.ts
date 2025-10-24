export const isValidAmount = (value: string): boolean => {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(value.trim());
};

export const isValidSearch = (query: string): boolean => {
  return query.trim().length > 0;
};
