export const dateFormat = async (dateString: string) => {
  // Remove the dashes (-) from the date string
  const formattedDate = dateString.replace(/-/g, "");

  // Return the formatted date (YYYYMMDD)
  return formattedDate;
};
