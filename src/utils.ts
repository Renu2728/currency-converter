export const isValidAmount = (value: string): boolean => {
 return /^\d+(\.\d{1,2})?$/.test(value.trim());
};
export const isValidSearch = (query: string): boolean => {
 return query.trim().length > 0;
};