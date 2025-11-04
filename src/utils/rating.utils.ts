export const getRatingClass = (rating: number, prefix: string = "rating") => {
  if (rating >= 7) return `${prefix}--green`;
  if (rating >= 6) return `${prefix}--yellow`;
  return `${prefix}--red`;
};
