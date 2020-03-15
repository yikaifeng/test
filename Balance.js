//**********************************************************
"use strict";
//**********************************************************

//======================================================
//Константы
//======================================================

//Иконки

	
//Имена библиотек
const LIB_PAYMENTS = "Платежи2";	
	
//Имена полей и значения библиотеки Счета
const ACCOUNT_NAME = "Название";
const BALANCE = "Баланс2";

//Имена полей и значения библиотеки Платежи2
const ACCOUNT = "Счёт";
const TYPE = "Тип";
	const _INCOME = ICO_PLUS + " приход";
	const _OUTCOME = ICO_MINUS + " расход";
	const _TRANSACTION = ICO_TRANSACTION + " перевод";

const INCOME = "Приход";
const OUTCOME = "Расход";
const TRANSACTION = "Сумма перевода";	
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
//Функция для обновление баланса
//------------------------------------------------------
	
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
function refresh() {

	var libAccounts = lib();
	var accounts = libAccounts.entries();
	
	log("\nREFRESH()\n" + lib.title + " " + accounts.length + " записей");
	
	//Выполняем, если есть счета
	if (accounts.length >0) {
		
		//перебор счетов
		for (j = 0; j<accounts.length; j++) {
			
			log("\nACCOUNT[" + j + "] " + account.field(ACCOUNT_NAME));
			
			var income = 0;
			var outcome = 0;
			var account = accounts[j];
			var libPayments = libByName(LIB_PAYMENTS);
			var payments = libPayments.linksTo(account);
			
			log("\n  THERA ARE PAYMENTS: " + payments.length);
			
			//если есть платежи по текущему счёту
			if (payments.length >0) {
				
				//перебор платежей
				for (var i =0; i < payments.length; i++){
					
					var FType = payments[i].field(TYPE);
					
					switch (FType) {
						case _TRANSACTION:
							//получаем счёт из поля "счёт" текущего платежа
							log("\nTRANSACTION: " + payments[i].field(NAME));
							
							var account1 = payments[i].field(ACCOUNT)[0];
							
							if(account[i].id == account1.id) {
								income = payments[i].field(INCOME) + income;
							} else {
								outcome = payments[i].field(OUTCOME) + outcome;
							}
							
							break;
						case _INCOME:
							income = payments[i].field(INCOME) + income;
							break;
						case _OUTCOME:
							outcome = payments[i].field(OUTCOME) + outcome;
							break;
						default: 
							break;
					}
				} 
				
				account.set("Баланс2",income - outcome);
				
			} 
		} 
	} 

	message ("Баланс2 обновлён");

}
