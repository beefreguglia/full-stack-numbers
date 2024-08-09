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
  const repeatIsChecked = !repeat.checked;
  const sortedNumbers = [];

  if (isNaN(numbersValue) || isNaN(fromValue) || isNaN(toValue) || numbersValue === 0 || fromValue === 0 || toValue === 0 || fromValue > toValue) {
    alert("Entrada inválida. Verifique os valores e tente novamente.");
    return;
  }

  handleSortNumbers(numbersValue, fromValue, toValue, sortedNumbers, repeatIsChecked);

  form.innerHTML = "";
  form.classList.add("center");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = "Resultado do sorteio";
  const showNumbers = document.createElement("div");
  showNumbers.classList.add("show-numbers");
  const delayIncrement = .5;
  
  for(let i = 0; i < sortedNumbers.length; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.animationDelay = `${i * delayIncrement}s`;
    const square = document.createElement("span");
    square.classList.add("square");
    square.style.animationDelay = `${i * delayIncrement}s`;
    const number = document.createElement("p");
    number.classList.add("number");
    number.style.animationDelay = `${i * delayIncrement}s`;
    number.textContent = sortedNumbers[i];
    item.append(square, number)
    showNumbers.append(item);
  }

  fieldset.append(legend, showNumbers);
  form.append(fieldset);

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