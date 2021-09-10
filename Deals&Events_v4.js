//********************************************************************************************************************
//Deals&Events - скрипт для иблиотеке "Дела и события"
//********************************************************************************************************************
"use strict";

//********************************************************************************************************************
//********************************************************************************************************************

//======================================================
//Константы
//======================================================

//Имена полей и значения
const TYPE = "Тип";
	const _ONCE = "разовое";
	const _PERIOD = "повтор.";
const STATUS = "Статус";
	const _PLAN = "план";
	const _DONE = "завершено";
const CATEGORY = "Категория";
const START_DATE = "Дата начала";
const START_TIME = "Время начала";
const END_DATE = "Дата окончания";
const END_TIME = "Время окончания";
const NAME = "Название";
const COST = "Стоимость";
const WARRANTY = "Гарантия до";
const COUNT = "Вычислять периодичность";
const UNIT = "Ед.измерения";
const INTERVAL = "Интервал";
const WARRANTY_DAYS = "Вывод гарантии";

//======================================================
//Переменные
//======================================================

//********************************************************************************************************************
//********************************************************************************************************************

//======================================================
//Закрытые фунции
//======================================================
	
//--------------------------------------------------
//Получить иконку из начала строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pGetIcon(sSource) {
	
	//Выход, если нет значения
	if (sSource == undefined) {
		return "";
	}

	//Пробуем привести к строке
	sSource = String(sSource);

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var sIcon = sSource.match(regexp);

	//Если иконки нет - пустая строка
	if (sIcon == null) {
		return "";
	} else {
		return sIcon[0];
	}
					
}
	
//--------------------------------------------------
//Установить иконку из строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pSetIconFrom(sSource, sText, bSpace) {
		
	//Если нет значения - пустая строка
	if (sSource == undefined) {
		sSource = "";
	}

	//Пробуем привести к строке
	sSource = String(sSource);	
	sText = String(sText);

	//Параметры по умолчанию: ставить пробел
	var bSp = true;
	if (bSpace != undefined) { bSp = bSpace; }

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var sIcon = sSource.match(regexp);

	//Если иконки нет - толко текст
	if (sIcon == null) {
		return sText.trim();
	} else {
		if (bSp) {
			  return sIcon[0] + " " + sText.trim();
		} else {
			  return sIcon[0] + sText.trim();
		}
	}

}
	
//--------------------------------------------------
//Получить строку без иконки в начале строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pGetText(sSource) {	
    
	//Выход, если нет значения
	if (sSource == undefined) {
		return "";
	}
	
	//Пробуем привести к строке
	sSource = String(sSource);

	//Заменяем пустой строкой первую группу символов
	var regexp = /\s*\S+\s*/;
	var sText = sSource.replace(regexp, "");
	sText = sText.trim();

	return sText;

}
	
//--------------------------------------------------
//Получить деньги в удобном формате
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pGetMoney(nSum, sCurrency) {
		
	//Выход, если нет значения
	if (nSum == undefined || nSum == "") {
		return "";
	}
		
	//Пробуем привести к числу
	nSum = Number(nSum);

	//Если числа нет - вернуть пустую строку
	if (isNaN(nSum)) {
		return "";
	}

	//Округляем до двух знаков
	nSum = nSum.toFixed(2);

	//Определяем знак	
	var sign = "";
	if (nSum < 0) {
		sign = "-";
		nSum = Math.abs(nSum);
		nSum = nSum.toFixed(2);
	}

	//Форматируем	
	nSum += "";
	nSum = new Array(4 - nSum.length % 3).join("U") + nSum;
	nSum = nSum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	nSum = sign + nSum;
	nSum = nSum.trim();
		
	//Добавляем единицы измерения
	if (sCurrency != undefined) {
		return nSum + " " + String(sCurrency);
	} else {
		return nSum;
	}		
			
}
	
//--------------------------------------------------
//Начало дня 0 часов 0 минут 0 секунд 000 миллисекунд
//01.09.2021 проверена
//Независимая
//--------------------------------------------------  
function pDayStart(dDate) {

	if (dDate == undefined || dDate == "")	{
		return "";
	} else {
		try {
			var dte = new Date(dDate);
			if (isNaN(dte)) {
				return "";
			}
			return new Date(dte.setHours(0, 0, 0, 0));
		}
		catch (e) {
			return "";
		}
	}

}
	
//--------------------------------------------------
//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
//07.09.2021 проверена
//Независимая
//--------------------------------------------------
function pDayEnd(dDate) {
		
	if (dDate == undefined || dDate == "")	{
		return "";
	} else {
		try {
			var dte = new Date(dDate);
			if (isNaN(dte)) {
				return "";
			}
			return new Date(dte.setHours(23, 59, 59, 999));
		}
		catch (e) {
			return "";
		}
	}

}

//--------------------------------------------------
//Остаток дней
//07.09.2021 проверена
//Независимая
//--------------------------------------------------
function pDaysLeft(dTarget, dReference, nRound) {
	
	//Если нет целевой даты, то ничего
	if (dTarget == undefined || dTarget == "") {
		return "";
	} else {
		try {
			var dteTarget = new Date(dTarget);
			if (isNaN(dteTarget)) {
				return "";
			}
		}
		catch (e) {
			return "";
		}
  }

	//Если нет отсчётной даты, то сегодня
	if (dReference == undefined || dReference == "") {
		var dteReference = new Date();
		dteReference = dteReference.setHours(0, 0, 0, 0);
	} else {
		try {
			var dteReference = new Date(dReference);
			if (isNaN(dteReference)) {
				dteReference = new Date();
				dteReference = dteReference.setHours(0, 0, 0, 0);
			}
			dteReference = dteReference.setHours(0, 0, 0, 0);
		}
		catch (e) {
			var dteReference = new Date();
			dteReference = dteReference.setHours(0, 0, 0, 0);
		}
	}

	//Если не передано округление, то до целых
	if (nRound == undefined || nRound == "") {
		var round = 0;
	} else {
		var round = Number(nRound);
		if (isNaN(round)) {
			round = 0;
		} else {
			round = Math.abs(round);
			round = round.toFixed(0);
		}
	}

	//Разница в днях с сейчас
	var dDif = (dteTarget - dteReference)/(1000*3600*24);

	//Округляем
	dDif = dDif*(Math.pow(10, round));
	dDif = Math.floor(dDif);

	return dDif/(Math.pow(10, round));
						
}

//--------------------------------------------------
//Сдвиг даты на определенный интервал
//07.09.2021 проверена
//Независимая
//--------------------------------------------------
function pShiftDate(dDate, nInterval, sUnit, bForward) {
		
	//Проверяем, передана ли дата
	if (dDate == undefined || dDate == "") {
    return;
	} else {
    dDate = new Date(dDate);
    if (isNaN(dDate)) { return; }
  }

	//Проверяем, переданан ли интервал в виде числа
	if (nInterval == undefined || nInterval == "") {
		return;
	} else {
		nInterval = Number(nInterval);
		if (isNaN(nInterval)) { return; }
		nInterval = Math.abs(nInterval);
		nInterval = nInterval.toFixed(0);
	}
	
	//Проверяем единицы сдвига
	if (sUnit == undefined || sUnit == "") { return; }
		
	//Проверяем, переданан единицы корректны ли
	var arrDay = ["d", "day", "days", "д", "д.", "дн", "дн.", "день", "дни", "дня", "дней"];
	var arrWeek = ["w", "week", "weeks", "н", "н.", "нед", "нед.", "неделя", "недели", "неделей"];
	var arrMonth = ["m", "month", "months", "м", "м.", "мес", "мес.", "месяц", "месяцы", "месяца", "месяцев"];
	var arrYear = ["y", "year", "years", "г", "г.", "л", "л.", "год", "лет", "года", "годы"];

	var arrUnits = [].concat(arrDay, arrWeek, arrMonth, arrYear);
		
	if (arrUnits.indexOf(sUnit) == -1) { return; }
		
	//Проверяем, направление логическая ли величина
	if (bForward == undefined) {
		bForward = true;
	}	else {
		bForward = Boolean(bForward);
	}
		
	//выбираем направление сдвига
	var sign;
	if (bForward) {sign = 1;} else {sign = -1;}

	//Осуществляем сдвиг

	//Дни
	if (arrDay.indexOf(sUnit) != -1) {
		dDate.setDate(dDate.getDate() + sign*nInterval);
	}

	//Недели
	if (arrWeek.indexOf(sUnit) != -1) {
		dDate.setDate(dDate.getDate() + sign*nInterval*7);
	}

	//Месяцы
	if (arrMonth.indexOf(sUnit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var nOriginalDate = dDate.getDate();
		dDate.setDate(1);
						
		//Прибавляем нужное число месяцев
		dDate.setMonth(dDate.getMonth() + sign*nInterval);
		var nNewMonth = dDate.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dDate.setDate(nOriginalDate);
						
		var loop = 10;
		while (nNewMonth != dDate.getMonth() && loop>=0) {
			dDate.setDate(dDate.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
	}

	//Годы
	if (arrYear.indexOf(sUnit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var nOriginalDate = dDate.getDate();
		dDate.setDate(1);
						
		//Прибавляем нужное число лет
		dDate.setFullYear(dDate.getFullYear() + sign*nInterval);
		var nNewMonth = dDate.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dDate.setDate(nOriginalDate);
						
		var loop = 10;
		while (nNewMonth != dDate.getMonth() && loop>=0) {
			dDate.setDate(dDate.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
      
	}
    	
  return dDate;

}
	
//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Открытые функции
//======================================================
//------------------------------------------------------
//Функция для коррекци неправильного заполнения полей
//07.09.2021 проверена
//Зависит от pGetText
//------------------------------------------------------
function checkDeal(incomeDeal) {
	
	//Иконки
	const ICO_PLAN = "⏳";
		
	//Обрабатываемое дело
	var deal;
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
		deal = entry();
	} else {
		deal = incomeDeal;
	}
		
	//Короткие ссылки на поля
	var FType = pGetText(deal.field (TYPE));
	var FStatus = pGetText(deal.field (STATUS));
	var FStartDate = deal.field (START_DATE);
	var FStartTime = deal.field (START_TIME);
	var FEndDate = deal.field (END_DATE);
	var FEndTime = deal.field (END_TIME);
	var FCount = deal.field (COUNT);
	var FInterval = deal.field (INTERVAL);

	//Сообщения
	var msgCorrected = "⚠️ Исправлено:"; 	

	//прочее
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var strResult = msgCorrected;

	//Проверка соответствия типа и статуса
	if (FType==_PERIOD && FStatus==_DONE) {
		deal.set(STATUS, ICO_PLAN + " " + _PLAN);
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
			deal.set(END_TIME, FStartTime);
			strResult = strResult + "\n*" + END_TIME;
		}
	}

	//Проверка вычисления переодичности и смены дат
	if (FType!=_PERIOD && FCount==1) {
		deal.set(COUNT, 0);
		strResult = strResult + "\n*" + COUNT;
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
//07.09.2021 проверена
//Зависит от pShiftDate
//----------------------------------------------------------
function shiftDate(bForward, incomeDeal) {
	
	//Обрабатываемое дело
	var deal;

	//Сообщения
	var msgPeriodOff = "⚠️ Периодичность не включена";  
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
		deal = entry();
	} else {
		deal = incomeDeal;
	}
	
	//Выход, если не включен счёт переодичности
	if (!deal.field(COUNT)) {
		message(msgPeriodOff);
		return;
	}
		
	//Короткие ссылки на поля
	var FStartDate = deal.field(START_DATE);
	var FEndDate = deal.field(END_DATE);
	var FUnit = deal.field(UNIT);
	var FInterval = deal.field(INTERVAL);
		
	deal.set(START_DATE, pShiftDate(FStartDate, FInterval, FUnit, bForward));
	if (FEndDate != undefined) {
		deal.set(END_DATE, pShiftDate(FEndDate, FInterval, FUnit, bForward));
	}

	var direction;
	if (bForward != false) {direction = 1;} else {direction = -1;}
	
	message("ℹ️ Перенесено на " + direction*FInterval + " (" + FUnit + ")");
	
}

//----------------------------------------------------------
//Функция переноса даты несколько дней вперёд
//07.09.2021 проверена
//Зависит от pShiftDate
//----------------------------------------------------------
function addDays(nDays) {
	
	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = deal.field(START_DATE);
	var FEndDate = deal.field(END_DATE);

	//Проверяем, передана ли число
	if (nDays == undefined || nDays == "") {
		return;
	} else {
		nDays = Number(nDays);
		if(isNaN(nDays)) { return; }
		nDays = Math.abs(nDays);
		nDays = nDays.toFixed(0);
	}

	deal.set(START_DATE, pShiftDate(FStartDate, Number(nDays), "d", true));
	if (FEndDate != undefined) {
		deal.set(END_DATE, pShiftDate(FEndDate, Number(nDays), "d", true));
	}

	message("ℹ️ Перенесено на " + nDays + " (день)");
		
}

//----------------------------------------------------------
//Функция показывающая остаток дней
//07.09.2021 проверена
//Зависит от pGetText, pDaysLeft
//----------------------------------------------------------
function getDaysLeft() {

	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = deal.field (START_DATE);
	var FStatus = pGetText(deal.field (STATUS));
	
	//Разница с сегодня 
	var dteDiff = pDaysLeft(FStartDate);
	if (dteDiff == 0) {dteDiff = Math.abs(dteDiff);}
	
	var res = "";
	/*Если завершено*/
	if (FStatus == _DONE) {
    /*до месяца*/
    if (dteDiff>=-30) {
			res = dteDiff + " дн.";
    /*до года*/
	} else if (dteDiff>=-365 && dteDiff<-30) {
		var dteMonth = dteDiff/30;
		dteMonth = Math.ceil(dteMonth);
		var dteDays = dteDiff%30;
		dteDays = Math.abs(dteDays);
		if (dteDays<7.5) {
			res = dteMonth + " мес.";
		} else if (dteDays>=7.5 && dteDays<15) {
			res = dteMonth + "¼ мес.";
		} else if (dteDays>=15 && dteDays<22.5) {
			res = dteMonth + "½ мес.";
		} else {
			res = dteMonth + "¾ мес.";
		}
    /*больше года*/
	} else {
		var dteYear = dteDiff/365;
		dteYear = Math.ceil(dteYear);
		var dteMonth = (dteDiff%365)/30;
		dteMonth = Math.ceil(dteMonth);
		dteMonth = Math.abs(dteMonth);
		if (dteMonth != 0) {
			res = dteYear + " г. " + dteMonth + " мес.";
		} else {
			res = dteYear + " г.";
		}
	}
	/*Если незавершено*/
	} else {
		res = dteDiff + " дн.";
	}

 	return res;
		
}
	
//----------------------------------------------------------
//Функция для вывода типа
//07.09.2021 проверена
//Зависит от pGetIcon
//----------------------------------------------------------
function getDealType() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FType = deal.field (TYPE);
	return pGetIcon(FType);
}

//----------------------------------------------------------
//Функция для вывода названия
//07.09.2021 проверена
//Зависит от pSetIconFrom
//----------------------------------------------------------
function getDealName() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FName = deal.field (NAME);
	var FCategory = deal.field (CATEGORY);
	return pSetIconFrom(FCategory, FName, true);
}

//----------------------------------------------------------
//Функция для стоимости
//07.09.2021 проверена
//Зависит от pGetMoney
//----------------------------------------------------------
function getDealCost() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FCost = deal.field (COST);

  return pGetMoney(FCost, "руб.");
}

//----------------------------------------------------------
//Функция показывающая цвет
//07.09.2021 проверена
//Зависит от pGetText, pDaysLeft
//----------------------------------------------------------
function getDealColor() {

	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = deal.field (START_DATE);
	var FStatus = pGetText(deal.field (STATUS));
	
	//Разница с сегодня 
	var dteDiff = pDaysLeft(FStartDate);
	if (dteDiff == 0) {dteDiff = Math.abs(dteDiff);}
	
	const RED = "#F44336";
	const ORANGE = "#FFAE00";
	const YELLOW = "#FFEB3B";
	const GREEN = "#8BC34A";
	const BLUE = "#2DB7F6";
	const GREY = "#9E9E9E";

	if (FStatus == _DONE) {
		return GREY;
	} else if (FStatus == _PLAN) {
		if (dteDiff<1) {
			return RED;
		} else if (dteDiff>=1 && dteDiff<=3) {
			return ORANGE;
		} else if (dteDiff>3 && dteDiff<=7) {
			return YELLOW;
		} else if (dteDiff>7 && dteDiff<=30) {
			return GREEN;
		} else {
			return BLUE;
		}
	} else {
		return GREY;
	}
}

//----------------------------------------------------------
//Функция для вывода гарантии
//10.09.2021 проверена
//Зависит от pDaysLeft
//----------------------------------------------------------
function updateWarranty() {

	//Обрабатываемое дело
	var deals = lib().entries();

	const ICO_WARRANTY = "🛡️";

	//Поля
	for (var i=0; i<deals.length; i++) {

		var deal = deals[i];
		var FWarranty = deal.field (WARRANTY);

		if (FWarranty != undefined) {

			var dteDiff = pDaysLeft(FWarranty);

			if (dteDiff >-1) {
				deal.set(WARRANTY_DAYS, ICO_WARRANTY + " " + dteDiff + " дн.");
			} else {
				deal.set(WARRANTY_DAYS, "");
			}

		} else {
			deal.set(WARRANTY_DAYS, "");
		}
	}
	
	message("ℹ️ Гарантия обновлена");	
}
