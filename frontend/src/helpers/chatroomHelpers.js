export default function chatroomHelpers() {


  const generateRandomColor = () => {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  return {
    generateRandomColor
  }
};