const pick = (obj, keys) => {
  const result = {};

  keys.forEach((key) => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });

  return result;
};

export default pick;