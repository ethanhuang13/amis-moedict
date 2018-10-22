let currentId = null;

export function getCurrentId() {
  return currentId;
}

export function setCurrentId(id) {
  return currentId = id;
}

export const replace = function(...args) {
  return ''.replace.call(...args);
}
