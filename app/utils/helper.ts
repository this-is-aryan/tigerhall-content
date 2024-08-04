/**
 * Creates a debounced version of a function.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
export const debounce = (func: Function, delay: number = 100): Function => {
  let timeout: NodeJS.Timeout
  return function (...args: any) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}
