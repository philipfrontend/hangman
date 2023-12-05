function myFunction(id, next) {
  let text = document.getElementById(id).value;
  console.log(text);
  moveToNextField(this, next);
}
