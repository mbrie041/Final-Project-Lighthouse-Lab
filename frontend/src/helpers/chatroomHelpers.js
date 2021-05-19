const chatUserKeyInStorage = 'lighthouse-laboratory-user';

export function generateRandomColor() {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

export function getChatUserFromStorage() {

  window.localStorage.removeItem(chatUserKeyInStorage, null);
  const user = window.localStorage.getItem(chatUserKeyInStorage);
  if (user) {
    // console.log(`Existing user found in storage: ${user}`);
    return JSON.parse(user);
  } else {
    // console.log('No user found from storage.');
    return user;
  }
};

export function saveChatUserToStorage(user) {
  window.localStorage.setItem(chatUserKeyInStorage, JSON.stringify(user));
};
