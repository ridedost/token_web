//this func is use for exact index purpose
// export const IndexFunction = (value) => {
//   if (value > 10) {
//     return value;
//   } else {
//     return "0" + value;
//   }
// };
export const IndexFunction = (value) => {
  return value < 10 ? "" + value : value.toString();
};
