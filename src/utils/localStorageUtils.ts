const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export default loadFromLocalStorage;
