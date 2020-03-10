//**********************************************************
//**********************************************************
"use strict";

//**********************************************************

//======================================================
//Константы
//======================================================

//Иконки
const ICO_CARD = "⏱️";
	
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
	var Ftype = account.field(ACCOUNT_TYPE);
	var FName = account.field(ACCOUNT_NAME);
	var FCardExists = account.field(CARD_EXISTS);
	
	if (FCardExists) {
		res += "|" + ICO_CARD;
	}
	
	return getIcon(Ftype) + FName + res;
}
