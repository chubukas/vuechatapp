export const validateInputs = (datas) => {
  let empty = [];
  for (const key in datas) {
    if (datas[key] === "") {
      empty.push(key);
    }
  }
  return empty;
};
