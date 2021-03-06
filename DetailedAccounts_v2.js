//**********************************************************
//**********************************************************
"use strict";

//**********************************************************

//======================================================
//Константы
//======================================================

//Иконки
const ICO_CARD = "💳";
const ICO_PROBLEM = "⁉️";
	
//Имена полей и значения
const ACCOUNT_TYPE = "Тип счёта";
	//const _PERIOD = ICO_PERIOD + " повтор.";
const BALANCE = "БАЛАНС";
const ACCOUNT_END = "Срок счёта";
const ACCOUNT_NAME = "Название";
const CARD_EXISTS = "Наличие карты";
const CARD_END = "Срок карты";
	
//======================================================
//Переменные
//======================================================
	
//Сообщения
//var msgCorrected = ICO_WARNING + " Исправлено:";
//var msgPeriodOff = ICO_WARNING + " Периодичность не включена";
	
//======================================================
//Методы
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
//Функция для вычисления остатка дней
//------------------------------------------------------
function daysLeft(incomeDate) {
	
	//Прочее
	var dteToday = new Date();
	
	//Разница в днях с сейчас
	var dteDiff = (incomeDate - dteToday)/(1000*3600*24);
		
	//Округляем до целых
	dteDiff = dteDiff.toFixed(0);
	if (dteDiff == 0) {dteDiff = Math.abs(dteDiff);}
	
	return dteDiff;
		
}
	
//------------------------------------------------------
//Функция для вывода названия
//------------------------------------------------------
function getAccountName() {
	
	//текущий счёт
	var account = entry();
	var res = "";
	
	//короткие ссылки на поля
	var FType = account.field(ACCOUNT_TYPE);
	var FName = account.field(ACCOUNT_NAME);
	var FCardExists = account.field(CARD_EXISTS);
	
	if (FCardExists) {
		res += " | " + ICO_CARD;
	}
	
	return getIcon(FType) + " " + FName + res;
}

//------------------------------------------------------
//Функция для вывода остатка дней по сроку счета
//------------------------------------------------------
function getAccountDaysLeft() {
	
	//текущий счёт
	var account = entry();
	var res = " дн.";
	
	//короткие ссылки на поля
	var FType = account.field(ACCOUNT_TYPE);
	var FAccountEnd = account.field(ACCOUNT_END);
	
	//если дата пустая
	if (FAccountEnd == undefined) {
		return null;
		exit();
	}
	
	var days = daysLeft(FAccountEnd);
		
	return res = getIcon(FType) + days + res;
}

//------------------------------------------------------
//Функция для вывода остатка дней по сроку карты
//------------------------------------------------------
function getCardDaysLeft() {
	
	//текущий счёт
	var account = entry();
	var res = " дн.";
	
	//короткие ссылки на поля
	var FType = account.field(ACCOUNT_TYPE);
	var FCardEnd = account.field(CARD_END);
	
	//если дата пустая
	if (FCardEnd == undefined) {
		return null;
		exit();
	}
	
	var days = daysLeft(FCardEnd);
		
	return res = ICO_CARD + days + res;
}

//------------------------------------------------------
//Функция для вывода статуса
//------------------------------------------------------
function getAccountStatus() {
	
	//текущий счёт
	var account = entry();
	var res = " дн.";
	
	//короткие ссылки на поля
	var FAccountEnd = account.field(ACCOUNT_END);
	var FCardEnd = account.field(CARD_END);
	
	var last1, last2;
	
	//если дата не пустая
	if (FAccountEnd != undefined) {
		last1 = daysLeft(FAccountEnd);
	}
	if (FCardEnd != undefined) {
		last2 = daysLeft(FCardEnd);
	}
	
	if (last1 == undefined && last2 == undefined) {
		return null;
	} else {
		if (last1 <= 30 || last2 <= 30) {
			return ICO_PROBLEM;
		} else {
			return null;
		}
	}
	
}
