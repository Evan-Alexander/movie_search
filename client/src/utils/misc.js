export const handleMovieOptions = (option) => {
  let revisedOption = option.replace("_", " ");
  return revisedOption.replace(
    /\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const handleDate = (text) => {
  let altered = text.split("-")
  return altered[0];
}

export const handleRevenue = (cash) => {
  return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}