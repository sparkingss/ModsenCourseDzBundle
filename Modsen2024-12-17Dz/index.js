/*
1 уровень:
Задача 1:
Условие:

На странице есть блок с id box (например, <div>) с красным фоном и текстом внутри. Напишите JavaScript-код, который скрывает этот элемент при нажатии на кнопку "Скрыть коробку".
Шаги:
На странице создайте блок с id box, который будет отображаться (например, квадрат размером 200x200 пикселей).
Добавьте кнопку с текстом "Скрыть коробку".
При нажатии на кнопку элемент box должен исчезать (не отображаться на странице).
Используйте JavaScript для изменения стиля элемента, чтобы скрыть его (например, display: none).
Ожидаемый результат: После нажатия на кнопку элемент box исчезает с экрана.

*/

const hideBoxButton = document.getElementById('hideBoxButton');
const box = document.getElementById('box');

function handleHideBoxButtonClick() {
    box.style.display = 'none';
}

hideBoxButton.addEventListener('click', handleHideBoxButtonClick);


/*
Задача 2:
Условие:
У вас есть контейнер с id container, и кнопка с текстом "Добавить параграф". Напишите JavaScript-код, который добавляет новый параграф с текстом "Новый параграф" в контейнер при каждом нажатии на кнопку.
Шаги:
На странице создайте пустой контейнер с id container.
Добавьте кнопку с текстом "Добавить параграф".
Напишите JavaScript-функцию, которая будет создавать новый элемент <p> с текстом "Новый параграф" и добавлять его в контейнер.
Для создания нового элемента используйте document.createElement() и добавьте его в контейнер с помощью appendChild().
Ожидаемый результат: При каждом нажатии на кнопку в контейнер будет добавляться новый параграф с текстом "Новый параграф".
*/

const container = document.getElementById('container');
const addParagraphButton = document.getElementById('addParagraphButton');

function handleAddParagraphButtonClick() {
    const paragraph = document.createElement('p');
    paragraph.innerText = 'Новый параграф';
    container.appendChild(paragraph);
}

addParagraphButton.addEventListener('click', handleAddParagraphButtonClick);


/*
2 уровень:
Задача 1:
Условие:
Напишите скрипт, который при отправке формы будет выводить введённый текст в консоль и предотвращать стандартное поведение отправки формы.
Требования:
Создайте форму с одним полем ввода и кнопкой отправки.
При нажатии на кнопку, введённый текст должен выводиться в консоль.
Пример HTML:
<form id="myForm">
    <input type="text" id="textInput" placeholder="Введите текст" />
    <button type="submit">Отправить</button>
</form>
*/

const myForm = document.getElementById('myForm');
const textInput = document.getElementById('textInput');

function handleFormSubmit(event) {
    event.preventDefault();
    console.log(textInput.value);
    textInput.value = '';
}

myForm.addEventListener('submit', handleFormSubmit);

/*
Задача 2:
Условие:
Напишите скрипт, который будет отслеживать количество кликов на кнопку и показывать это количество в div-элементе.
Требования:
Есть кнопка, при клике на неё будет увеличиваться счётчик.
Счётчик должен отображаться в div.
Пример HTML:
<button id="clickButton">Нажми меня</button>
<div id="counter">Количество кликов: 0</div>
*/

const clickButton = document.getElementById('clickButton');
const counter = document.getElementById('counter');

function handleClickButtonClick() {
    let count = 0;
    return () => {
        count++;
        counter.innerText = `Количество кликов: ${count}`;
    }
}

const counterClickListener = handleClickButtonClick();

clickButton.addEventListener('click', counterClickListener);