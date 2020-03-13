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
	
	switch (FType) {
		case _TRANSACTION:
			res = ICO_TRANSACTION + payment.field(TRANSACTION);
			break;
		case _INCOME:
			res = ICO_PLUS + payment.field(INCOME);
			break;
		case _OUTCOME:
			res = ICO_MINUS + payment.field(OUTCOME);
			break;
		default: 
			res = null;
			break;
	}
	
	return res;
	
}

//=========================================
//Имена библиотек
var nameLibPayments = "Платежи";
//Имена полей в библиотеке Анализ расходов
var nameStartDate = "Дата начала";
var nameReport = "Отчёт";
//Имена полей в библиотеке Платежи
var nameIncome = "Приход";
var nameOutcome = "Расход";
var nameDate = "Дата";
var nameCat = "Категория";
//Названия категорий
var catSalary = "💵 зарплата";
var catAdditional = "💸 доп. доход";
var catFood = "🍜 питание";
var catSocial = "🏘️ соц. услуги";
var catRest = "🧘🏼‍♀️ досуг";
var catThings = "📦 вещи";
var catHealth = "🏥 здоровье";
var catTransaction = "💱 перевод";
var catCorrection = "🧮 корректировка";
var catEmpty = "🏷️ прочее";

//Библиотеки и записи
var libAnalytics = lib();
var reports = libAnalytics.entries();
var report = entry();
var libPayments = libByName(nameLibPayments);
var payments = libPayments.entries();

//Новая запись
var dteStartDate = report.field(nameStartDate);

//=========================================
//Пуст ли массив
function isEmpty(arrEntries) {
if (arrEntries.length == 0) {
 return true;} else {
 return false;
}//if
}//function isEmpty

//-----------------------------------------
function formatMoney(n) {

var sign = "";

if (n<0) {
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
//-----------------------------------------
//Баланс за период
function totalBalance(dteDate) {

//Переменные
var balancePlus = 0;
var balanceMinus = 0;

for (i=0; i<payments.length; i++) {

var dte = payments[i].field(nameDate);

if(dte.getFullYear()==dteDate.getFullYear() && dte.getMonth()==dteDate.getMonth() && payments[i].field(nameCat) != catTransaction){
balancePlus = balancePlus + payments[i].field(nameIncome);
balanceMinus = balanceMinus + payments[i].field(nameOutcome);
}//if
}//for

balanceTotal = balancePlus-balanceMinus;
balanceTotal = balanceTotal.toFixed(2);
balancePlus = balancePlus.toFixed(2);
balanceMinus = balanceMinus.toFixed(2);

var result = Array(balanceTotal, balancePlus, balanceMinus);

return result;

}//function totalbalance

//-----------------------------------------
//Баланс за период
function catBalance(dteDate, cat) {

//Переменные
var balancePlus = 0;
var balanceMinus = 0;

for (i=0; i<payments.length; i++) {

var dte = payments[i].field(nameDate);

if(dte.getFullYear()==dteDate.getFullYear() && dte.getMonth()==dteDate.getMonth() && payments[i].field(nameCat) == cat){
balancePlus = balancePlus + payments[i].field(nameIncome);
balanceMinus = balanceMinus + payments[i].field(nameOutcome);
}//if
}//for

balanceTotal = balancePlus-balanceMinus;
balanceTotal = formatMoney(balanceTotal.toFixed(2));
balancePlus = formatMoney(balancePlus.toFixed(2));
balanceMinus = formatMoney(balanceMinus.toFixed(2));

var result = Array(balanceTotal, balancePlus, balanceMinus);

return result;

}//function catBalance
//=========================================
if (!isEmpty(payments)) {

var total = totalBalance(dteStartDate);
var totalSalary = catBalance(dteStartDate, catSalary);
var totalAdditional = catBalance(dteStartDate,catAdditional);
var totalFood = catBalance(dteStartDate, catFood);
var totalSocial = catBalance(dteStartDate, catSocial);
var totalRest = catBalance(dteStartDate, catRest);
var totalThings = catBalance(dteStartDate, catThings);
var totalHealth = catBalance(dteStartDate, catHealth);
var totalCorrection = catBalance(dteStartDate, catCorrection);
var totalEmpty = catBalance(dteStartDate, catEmpty);

report.set(nameReport, "Баланс: " + total[0] + "\nПриход: " + total[1] + "\nРасход: " + total[2] + "\n\nЗарплата: " + totalSalary[1] + "\nДоп. доход: " + totalAdditional[1] + "\nКорректировка: " + totalCorrection[1] + "\n\nПитание: " + totalFood[2] + "\nСоц. услуги: " + totalSocial[2] + "\nДосуг: " + totalRest[2] + "\nВещи: " + totalThings[2] + "\nЗдоровье: " + totalHealth[2] + "\nКорректировка: " + totalCorrection[2] + "\nПрочее: " + totalEmpty[2]);

report.set("Вывод баланса", "💲" + formatMoney(total[0]));
report.set("Вывод прихода", "➕" + formatMoney(total[1]));
report.set("Вывод расхода", "➖" + formatMoney(total[2]));
report.set("Баланс", total[0]);
report.set("Приход", total[1]);
report.set("Расход", total[2]);
}//if если не пуста библиотека платежей

