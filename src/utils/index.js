/** object to String
 * @param object
 */
export const toStr = (obj) => JSON.stringify(obj);

/** from string to Array
 * @param str {string}
 * @returns {object}
 */
export const toArray = (str) => JSON.parse(str);

export const el = ($el) => document.querySelector($el);
export const els = ($els) => document.querySelectorAll($els);

/** create random id
 * @return {string}
 */
export const getRandomID = () => {
  let randomNumber = Math.ceil(Math.random() * 1e7);

  return randomNumber + Date.now();
};

/**
 * @param {HTMLElement} element
 */
export const tempElement = (element) => {
  let el = document.createElement('div');
  el.innerHTML = element;

  return el.firstElementChild;
};

// storage
export const useStorage = (storageName) => {
  const getItem = (key) => localStorage.getItem(key);
  const setItem = (key, value) => localStorage.setItem(key, value);

  const getValue = () => {
    let item = getItem(storageName);

    // check if item exists in the local storage
    return item ? toArray(item) : [];
  };

  const setValue = (projects) => {
    setItem(storageName, toStr(projects));
  };

  return [getValue, setValue];
};
