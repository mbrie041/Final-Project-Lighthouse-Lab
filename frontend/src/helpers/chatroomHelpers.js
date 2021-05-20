const chatUserKeyInStorage = 'lighthouse-laboratory-user';

export function generateRandomColor() {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

export function getChatUserFromStorage() {

  window.localStorage.removeItem(chatUserKeyInStorage, null);
  const user = window.localStorage.getItem(chatUserKeyInStorage);
  if (user) {
    return JSON.parse(user);
  } else {
    return user;
  }
};

export function saveChatUserToStorage(user) {
  window.localStorage.setItem(chatUserKeyInStorage, JSON.stringify(user));
};
