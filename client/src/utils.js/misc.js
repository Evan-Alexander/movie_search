export const movieOptions = (option) => {
  let revisedOption = option.replace("_", " ");
  return revisedOption.replace(
    /\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
