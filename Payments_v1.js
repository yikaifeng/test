//**********************************************************
//**********************************************************
"use strict";

//**********************************************************

//======================================================
//Константы
//======================================================

//Иконки типа
const ICO_PLUS = "➕";
const ICO_MINUS = "➖";
const ICO_TRANSACTION = "💱";

//Иконки прихода
const ICO_SALARY = "💵";
const ICO_ADD_INCOME = "💸";

//Иконки расхода
const ICO_FOOD = "🍜";
const ICO_SERVICE = "🏠";
const ICO_TRANSPORT = "🚌";
const ICO_REST = "🧘🏼‍♀️";
const ICO_THINGS = "📦";
const ICO_HEALTH = "🏥";

//Общие иконки прихода и расхода
const ICO_CORRECTION = "🧮";
const ICO_OTHER = "🏷️";

//Имена полей и значения
const DATE = "Дата";
const TYPE = "Тип";
	const _INCOME = ICO_PLUS + " приход";
	const _OUTCOME = ICO_MINUS + " расход";
	const _TRANSACTION = ICO_TRANSACTION + " перевод";
const ACCOUNT = "Счёт";
const DESTINATION = "Перевелено на";	

const INCOME_CATEGORY = "Категория " + ICO_PLUS;
	const _SALARY = ICO_SALARY + " зарплата";
	const _ADD_INCOME = ICO_ADD_INCOME + " доп.доход";
const INCOME = "Приход";

const OUTCOME_CATEGORY = "Категория " + ICO_MINUS;
	const FOOD = ICO_FOOD + " питание";
	const _SERVICE = ICO_SERVICE + " соц.услуги";
	const _TRANSPORT = ICO_TRANSPORT + " транспорт";
	const _REST = ICO_REST + " досуг";
	const _THINGS = ICO_THINGS + " вещи";
	const _HEALTH = ICO_HEALTH + " здоровье";
const OUTCOME = "Расход";

	const _CORRECTION = ICO_CORRECTION + " коррект.";
	const _OTHER = ICO_OTHER + " прочее";

const TRANSACTION = "Сумма перевода";
const NAME = "Название";
	
//======================================================
//Переменные
//======================================================

	
//======================================================
//Закрытые методы
//======================================================
	
//------------------------------------------------------
//Функция для получения иконки
//------------------------------------------------------
function getIcon(strSource) {
		
	//проверка, не пустая ли строка источника
	if (strSource == undefined) {
		return "";
	} else {
		var separator = " ";
		strSource = String(strSource);
		return strSource.split(separator,1)[0];
	}
}
	
//------------------------------------------------------
//Функция для получения названия без иконки
//------------------------------------------------------
function getName(strSource) {
	
	//проверка, не пустая ли строка источника
	if (strSource == undefined) {
		return "";
	} else {
		var separator = " ";
		strSource = String(strSource);
		var strIcon = strSource.split(separator,1)[0];
		var strName = strSource.slice(strIcon.length);
		return strName = strName.trim();
	}
}

//------------------------------------------------------
//Функция для форматирования суммы
//------------------------------------------------------
function formatMoney(n) {

	var sign = "";

	if (n < 0) {
		sign = "-";
		n = Math.abs(n);
		n = n.toFixed(2);
	}

	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	n = n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	n = sign + n;
	
	return n;
	
}	

//------------------------------------------------------
//Функция для вывода названия
//------------------------------------------------------
function getPaymentName() {
	
	//текущий платеж
	var payment = entry();
	
	//ссылки на поля
	var FName = payment.field(NAME);
	var FType = String(payment.field(TYPE));
	var ico;
	
	switch (FType) {
		case _TRANSACTION:
			ico = ICO_TRANSACTION;
			break;
		case _INCOME:
			ico = getIcon(payment.field(INCOME_CATEGORY));
			break;
		case _OUTCOME:
			ico = getIcon(payment.field(OUTCOME_CATEGORY));
			break;
		default: 
			ico = "*";
			break;
	}
	
	return ico + " " + FName;
	
}

//------------------------------------------------------
//Функция для вывода суммы
//------------------------------------------------------
function getSum() {
	
	//текущий платеж
	var payment = entry();
	
	//ссылки на поля
	var FType = String(payment.field(TYPE));
	var res = "";
	var rub = "р."
	
	switch (FType) {
		case _TRANSACTION:
			res = ICO_TRANSACTION + formatMoney(payment.field(TRANSACTION)) + rub;
			break;
		case _INCOME:
			res = ICO_PLUS + formatMoney(payment.field(INCOME)) + rub;
			break;
		case _OUTCOME:
			res = ICO_MINUS + formatMoney(payment.field(OUTCOME)) + rub;
			break;
		default: 
			res = null;
			break;
	}
	
	return res;
	
}
