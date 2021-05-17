// export default function chatroomHelpers() {


//   const generateRandomColor = () => {
//     var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
//     return randomColor;
//   }


//   /** TODO: need to make sure the below function only called once */
//   const getUserFromStorage = () => {
//     const userKeyInStorage = 'lighthouse-laboratory-user';

//     window.localStorage.removeItem(userKeyInStorage, null);
//     const user = window.localStorage.getItem(userKeyInStorage);
//     if (user) {
//       console.log(`Existing user found in storage: ${user}`);
//       return JSON.parse(user);
//     } else {
//       console.log('No user found from storage.');
//       return user;
//     }
//   }

//   return {
//     generateRandomColor,
//     getUserFromStorage
//   }
// };