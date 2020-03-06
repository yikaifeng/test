//**********************************************************
//**********************************************************
"use strict";

//**********************************************************

//======================================================
//Константы
//======================================================

//Иконки
const ICO_WARNING = "⚠️";
const ICO_SUCSEED = "✔️";
const ICO_PERIOD = "🗓️";
const ICO_PLAN = "⏳";
const ICO_DONE = "✔️";
const ICO_URGENT = "🔥";
const ICO_SOON = "⏱️";
	
//Имена полей и значения
const TYPE = "Тип";
	const _PERIOD = ICO_PERIOD + " повтор.";
const STATUS = "Статус";
	const _PLAN = ICO_PLAN + " в плане";
	const _DONE = ICO_DONE + " завершено";
const CATEGORY = "Категория";
const START_DATE = "Дата начала";
const START_TIME = "Время начала";
const END_DATE = "Дата окончания";
const END_TIME = "Время окончания";
const NAME = "Название";
const COUNT = "Вычислять периодичность";
const UNIT = "Ед.измерения";
	const _DAY = "день";
	const _WEEK = "неделя";
	const _MONTH = "месяц";
	const _YEAR = "год";
const AUTO = "Автоматически менять дату";
const INTERVAL = "Интервал";
	
//======================================================
//Переменные
//======================================================
	
//Сообщения
var msgCorrected = ICO_WARNING + " Исправлено:";
var msgPeriodOff = ICO_WARNING + " Периодичность не включена";
	
//Текущая библиотека и её записи
var libDeals = lib();
var deals = libDeals.entries();
	
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
//Функция для коррекци неправильного заполнения полей
//------------------------------------------------------
function checkDeal(incomeDeal) {
		
	log("\n-> checkDeal(incomeDeal)");
		
	//Обрабатываемое дело
	var deal;
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
		deal = entry();
		log("\n  *deal(cur): " + deal.title);
	} else {
		deal = incomeDeal;
		log("\n  *deal(inc): " + deal.title);
	}
		
	//Короткие ссылки на поля
	var FType = deal.field (TYPE);
	var FStatus = deal.field (STATUS);
	var FStartDate = deal.field (START_DATE);
	var FStartTime = deal.field (START_TIME);
	var FEndDate = deal.field (END_DATE);
	var FEndTime = deal.field (END_TIME);
	var FCount = deal.field (COUNT);
	var FAuto = deal.field (AUTO);
	var FInterval = deal.field (INTERVAL);
		
	//прочее
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var strResult = msgCorrected;

	//Проверка соответствия типа и статуса
	if (FType==_PERIOD && FStatus==_DONE) {
		deal.set(STATUS, _PLAN);
		strResult = strResult + "\n*" + STATUS;
	}
		
	//Проверка времени и дат на существование
	if (FEndDate == undefined) {bEndDate = false;} else {bEndDate = true;}
	if (FStartTime == undefined) {bStartTime = false;} else {bStartTime = true;}
	if (FEndTime == undefined) {bEndTime = false;} else {bEndTime = true;}

	//Проверка даты окончания
	if (bEndDate) {
		if (FEndDate<FStartDate) {
			deal.set(END_DATE, FStartDate);
			FEndDate = deal.field (END_DATE);
			strResult = strResult + "\n*" + END_DATE;
		}
	} else {
		if (bEndTime) {
			deal.set(END_DATE, FStartDate);
			FEndDate = deal.field (END_DATE);
			strResult = strResult + "\n*" + END_DATE;
		}
	}

	//Проверка времени начала
	if (!bStartTime) {
		if(bEndTime) {
			deal.set(START_TIME, FEndTime);
			FStartTime = deal.field (START_TIME);
			strResult = strResult + "\n*" + START_TIME;
		}
	}

	//Проверка времени окончания
	if (bEndTime) {
		if (FEndDate.getFullYear()==FStartDate.getFullYear() && 
		FEndDate.getMonth()==FStartDate.getMonth() && 
		FEndDate.getDate()==FStartDate.getDate() &&
		FEndTime < FStartTime) {
			deal.set(END_TIME, dteStartTime);
			strResult = strResult + "\n*" + END_TIME;
		}
	}

	//Проверка вычисления переодичности и смены дат
	if (FType!=_PERIOD && FCount==1) {
		deal.set(COUNT, 0);
		strResult = strResult + "\n*" + COUNT;
	}
	if (FType!=_PERIOD && FAuto==1) {
		deal.set(AUTO, 0);
		strResult = strResult + "\n*" + AUTO;
	}

	//Проверка интервала
	if (FInterval!=undefined && FInterval<0) {
		deal.set(INTERVAL, Math.abs(FInterval));
		strResult = strResult + "\n*" + INTERVAL;
	}

	deal.recalc();

	if (strResult!=msgCorrected) {
		message(strResult);	
	}
}

//----------------------------------------------------------
//Функция переноса даты вперед или назад
//----------------------------------------------------------
function shiftDate(bForward, incomeDeal) {
	
	log("\n-> shiftDate(bForward, incomeDeal)");

	//Обрабатываемое дело
	var deal;
		
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
			deal = entry();
			log("\n  *deal(cur): " + deal.title);
		} else {
			deal = incomeDeal;
			bShowMessage = false;
			log("\n  *deal(inc): " + deal.title);
	}
		
	//Направление сдвига
	var direction;
	if (bForward != false) {direction = 1;} else {direction = -1;}
		
	//Короткие ссылки на поля
	var FStartDate = deal.field(START_DATE);
	var FEndDate = deal.field(END_DATE);
	var FUnit = deal.field(UNIT);
	var FInterval = deal.field(INTERVAL);
		
	//Выход, если не включен счёт переодичности
	if (!deal.field(COUNT)) {
		message(msgPeriodOff);
		exit();
	}
		
	//Обрабатываем перенос
	switch (FUnit) {

		case _DAY:
			FStartDate.setDate(FStartDate.getDate() + direction*FInterval);
			deal.set(START_DATE, FStartDate);
			if (FEndDate != undefined) {
				FEndDate.setDate(FEndDate.getDate() + direction*FInterval);
				deal.set(END_DATE, FEndDate);
			}
			break;

		case _WEEK:
			FStartDate.setDate(FStartDate.getDate() + direction*FInterval*7);
			deal.set(START_DATE, FStartDate);
			if (FEndDate != undefined) {
				FEndDate.setDate(FEndDate.getDate() + direction*FInterval*7);
				deal.set(END_DATE, FEndDate);
			}
			break;

		case _MONTH:
		
			//сохраняем дату и устанавливаем 1 число месяца
			var nDate = FStartDate.getDate();
			FStartDate.setDate(1);
				
			//Прибавляем нужное число месяцев
			FStartDate.setMonth(FStartDate.getMonth() + direction*FInterval);
				
			//Восстанавливаем дату без перескока месяца
			var nMonth = FStartDate.getMonth();

			FStartDate.setDate(nDate);
				
			var loop = 10;
			while (nMonth != FStartDate.getMonth() && loop>0) {
				FStartDate.setDate(FStartDate.getDate()-1);
				loop = loop - 1;
			}

			deal.set(START_DATE, FStartDate);

			//дата окончания
			if (FEndDate != undefined) {
				nDate = FEndDate.getDate();
				FEndDate.setDate(1);
					
				//Прибавляем нужное число месяцев
				FEndDate.setMonth(FEndDate.getMonth() + direction*FInterval);
				
				//Восстанавливаем дату без перескока месяца
				nMonth = FEndDate.getMonth();

				FEndDate.setDate(nDate);
					
				loop = 10;
				while (nMonth != FEndDate.getMonth() && loop>0) {
					FEndDate.setDate(FEndDate.getDate()-1);
					loop = loop - 1;
				}

				deal.set(END_DATE, FEndDate);
			}
			break;

		case _YEAR:
			FStartDate.setFullYear(FStartDate.getFullYear() + direction*FInterval);
			deal.set(START_DATE, FStartDate);
			if (FEndDate != undefined) {
				FEndDate.setFullYear(FEndDate.getFullYear() + direction*FInterval);
				deal.set(END_DATE, FEndDate);
			}
			break;
			
		default: break;
			
		}
		
	if (bShowMessage) {
		message(ICO_SUCSEED + "перенесено на " + direction*FInterval + " (" + FUnit + ")");
	}

	//Лог
	log("\n  " + deal.title + "\n  СДВИГ НА:" + direction*FInterval + " (" + FUnit + ")");
		
	}
	
//----------------------------------------------------------
//Функция автоматического сдвига даты
//----------------------------------------------------------
function shiftAuto() {
		
	log("\n-> shiftAuto()");
	log("\n  БИБЛИОТЕКА: " + libDeals.title + "\n  *(" + deals.length + " записей)");
		
	var count = 0;
	var loop = 100;
	//Задаем начало сегодняшнего дня
	var today = new Date();
	today = today.setHours(0,0,0,0);
		
	//Перебираем значения
	for (var i = 0; i < deals.length; i++) {
			
		//Текущее в цикле дело
		var deal = deals[i];
			
		//Если оно переодическое и нужно считать
		if (deal.field(AUTO) == 1 && deal.field(TYPE)==_PERIOD) {
				
			//Считаем по дате начала по умолчанию
			var selectedDate = START_DATE;
				
			//Если есть дата конца, то по ней
			if (deal.field(END_DATE) != undefined) {
				selectedDate = END_DATE;
			}
				
			//Ищем просроченное дело			
			if (deal.field(selectedDate) < today) {
					
				//Если событие дело
				log("\n  НАЙДЕНА ЗАПИСЬ ДЛЯ ПЕРЕНОСА: " + deal.title);
				count = count + 1;
					
				while (deal.field(selectedDate) < today && loop > 0){
					shiftDate(true, deal);
					loop = loop - 1;
				}
			}
		}		
	}
		
	message(ICO_DONE + " Перенесены даты: " + count + " (запись)");
		
	log("  ПЕРЕНЕСЕНО: " + count + " (запись)");
		
}

//----------------------------------------------------------
//Функция показывающая остаток дней
//----------------------------------------------------------
function daysLeft() {
	
	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = deal.field (START_DATE);
	
	//Прочее
	var res = "дн.";	
	var dteToday = new Date();
	
	//Разница в днях с сейчас
	var dteDiff = (FStartDate - dteToday)/(1000*3600*24);
	
	//Округляем до целых
	dteDiff = dteDiff.toFixed(0);
	
	if (dteDiff<=3 && FStatus!=_DONE) {
		res = ICO_URGENT + dteDiff + res;
	} else if (dteDiff>3 && dteDiff<=7 && FStatus!=_DONE) {
		res = ICO_SOON + dteDiff + res;
	} else {
		res = dteDiff + res;
	}
	
	return res;
		
}
	
//----------------------------------------------------------
//Функция для вывода названия
//----------------------------------------------------------
function getName() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FCategory = deal.field (CATEGORY);
	var FName = deal.field (NAME);
	return getIcon(FCategory) + " " + getName(FName);
}
	
//----------------------------------------------------------
//Функция для вывода типа
//----------------------------------------------------------
function getType() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FType = deal.field (TYPE);
	return getIcon(FType);
}
	
//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getStatus() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FStatus = deal.field (STATUS);
	var ico = getIcon(FStatus);
	if (ico==ICO_PLAN) {
		return "";
	} else {
		return ico;
	}
}
