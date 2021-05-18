// export function chatroomHelpers() {

//   const chatUserKeyInStorage = 'lighthouse-laboratory-user';

//   const generateRandomColor = () => {
//     var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//     return randomColor;
//   }

//   const getChatUserFromStorage = () => {

//     window.localStorage.removeItem('lighthouse-laboratory-user', null);
//     const user = window.localStorage.getItem('lighthouse-laboratory-user');
//     if (user) {
//       console.log(`Existing user found in storage: ${user}`);
//       return JSON.parse(user);
//     } else {
//       console.log('No user found from storage.');
//       return user;
//     }
//   }

//   const saveChatUserToStorage = (user) => {
//     window.localStorage.setItem('lighthouse-laboratory-user', JSON.stringify(user));
//   };

//   return {
//     generateRandomColor,
//     getChatUserFromStorage,
//     saveChatUserToStorage
//   }
// };