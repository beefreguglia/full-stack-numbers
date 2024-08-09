const form = document.querySelector("form");
const numbers = document.getElementById("numbers");
const from = document.getElementById("from");
const to = document.getElementById("to");
const repeat = document.getElementById("repeat");
const main = document.querySelector("main");
const newForm = document.createElement("form");  

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
  
  form.remove();
  main.append(newForm);
  
  newForm.classList.add("center");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = "Resultado do sorteio";
  const showNumbers = document.createElement("div");
  showNumbers.classList.add("show-numbers");
  const delayIncrement = 2;
  
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

  const repeatButtonBackground = document.createElement("div");
  const repeatButton = document.createElement("button");
  const playIcon = document.createElement("img");
  playIcon.src = "./assets/icons/play.svg";
  repeatButtonBackground.classList.add("btn");
  repeatButton.textContent = 'Sortear novamente';
  repeatButton.type = "button";
  repeatButton.onclick = handleResetForm;
  repeatButton.append(playIcon);
  repeatButtonBackground.append(repeatButton);

  fieldset.append(legend, showNumbers, repeatButtonBackground);
  newForm.append(fieldset);
}

function handleSortNumbers(numbers, from, to, sortedNumbers, repeatIsChecked) {
  while (sortedNumbers.length < numbers) {
    let number = getRandomInt(from, to);
    if (repeatIsChecked || !sortedNumbers.includes(number)) {
      sortedNumbers.push(number);
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number(Math.floor(Math.random() * (max - min) + min));
}

function clearInputs() {
  numbers.value = "";
  from.value = "";
  to.value = "";
  repeat.checked = false;
}

function handleResetForm() {
  clearInputs();
  newForm.remove();
  newForm.innerHTML = "";
  main.append(form);
}


