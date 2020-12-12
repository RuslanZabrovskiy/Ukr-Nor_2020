"use strict"

let comment_start = document.getElementById("comment_start");
let comment = document.getElementById("comment");
let number = document.getElementById("number");
let game_block = document.getElementById("game_block");
let start_block = document.getElementById("start_block");
let info_block = document.getElementById("info_block");
let answer = 0; // Переменная в которую запишется загаданное число
let attempts = 0; // Счетчик попыток

/* Это автофокус поля ввода */
function autofocus() {
	document.getElementById("number").focus();
}

/* Это отображение окна настроек */
function settings() {
	if (info_block.style.display === "none") {
		info_block.style.display = "block";
	} else if (info_block.style.display === "block") {
		info_block.style.display = "none";
	}
}

/* Главное окно, начало игры */
function new_gameStart() {
	answer = Math.ceil(Math.random() * 100); // Получение случайного числа
	game_block.style.display = "block";
	start_block.style.display = "none";
	number.value = ""; // Очистка поля ввода
	attempts = 0; // Обнуление счетчика попыток
	autofocus(); // Автофокус
	comment.innerHTML = ("Введи положительное целое <br> число от 1 до 100!");
}

/* Игровое окно */
function checkStart() {
	attempts++; // Счетчик попыток
	autofocus(); // Автофокус
	let playerAnswer = +document.getElementById("number").value;
	if (playerAnswer > 100 || playerAnswer <= 0 || isNaN(playerAnswer) || !Number.isInteger(playerAnswer)) { // Проверка на: больше 100, отриц.число, не число
		comment.innerHTML = ("Введи положительное число <br> от 1 до 100!");
		number.value = ""; // Очистка поля ввода
	} else if (playerAnswer === answer) {
		comment_start.innerHTML = ("Отлично, победа с " + attempts + "-й попытки!!!<br>Сыграем еще?");
		game_block.style.display = "none";
		start_block.style.display = "block";
	} else if (playerAnswer > answer) {
		comment.innerHTML = ("Число " + playerAnswer + " больше загаданного!<br>Введи число поменьше!");
		number.value = ""; // Очистка поля ввода
	} else if (playerAnswer < answer) {
		comment.innerHTML = ("Число " + playerAnswer + " меньше загаданного!<br>Введи число побольше!");
		number.value = ""; // Очистка поля ввода
	}
}


document.getElementById("new_game").addEventListener("click", function () { // Начало игры мышкой
	new_gameStart();
});

document.getElementById("check").addEventListener("click", function () { // Игра мышкой
	checkStart();
});

document.getElementById("info").addEventListener("click", function () { // Окно настроек
	settings();
});

document.addEventListener("keydown", function (event) {
	if (event.code === "Enter" && game_block.style.display === "block") { // Игра клавиатурой
		checkStart();
	} else if (event.code === "Enter" && game_block.style.display === "none") { // Начало игры клавиатурой
		new_gameStart();
	} else if (event.code === "ControlRight") { // Информационное окно клавиатурой
		settings();
	}
});








