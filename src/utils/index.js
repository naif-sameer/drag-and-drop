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
