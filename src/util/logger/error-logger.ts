export default function errorLogger(error: Error) {
  console.log("Sorry, something goes wrong :(");
  console.error(error);
}
