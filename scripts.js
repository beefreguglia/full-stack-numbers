const form = document.querySelector("form");
const numbers = document.getElementById("numbers");
const from = document.getElementById("from");
const to = document.getElementById("to");
const repeat = document.getElementById("repeat");

numbers.oninput = () => {
  let value = numbers.value.replace(/\D/g, "");
  numbers.value = value;
}

from.oninput = () => {
  let value = from.value.replace(/\D/g, "");
  from.value = value;
}

to.oninput = () => {
  let value = to.value.replace(/\D/g, "");
  to.value = value;
}

form.onsubmit = (event) => {
  event.preventDefault();
  const numbersValue = Number(numbers.value);
  const fromValue = Number(from.value);
  const toValue = Number(to.value);
  const repeatIsChecked = repeat.checked;
  const sortedNumbers = [];

  if (isNaN(numbersValue) || isNaN(fromValue) || isNaN(toValue) || numbersValue === 0 || fromValue === 0 || toValue === 0 || fromValue > toValue) {
    alert("Entrada inválida. Verifique os valores e tente novamente.");
    return;
  }

  handleSortNumbers(numbersValue, fromValue, toValue, sortedNumbers, repeatIsChecked);

  console.log(sortedNumbers);
}

function handleSortNumbers(numbers, from, to, sortedNumbers, repeatIsChecked) {
  while (sortedNumbers.length < numbers) {
    let numero = getRandomInt(from, to);
    if (repeatIsChecked || !sortedNumbers.includes(numero)) {
      sortedNumbers.push(numero);
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number(Math.floor(Math.random() * (max - min) + min));
}