//********************************************************************************************************************
//DealsAndEvents - скрипт для иблиотеке "Дела и события"
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
	const _DEAL = "дело";
  const _PAYMENT = "платёж";
  const _PURCHASE = "покупка";
  const _LEISURE = "досуг";
  const _HOLIDAY = "праздник";
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

//======================================================
//Переменные
//======================================================

//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Закрытые фунции
//======================================================
	//--------------------------------------------------
	//Создать сообщение
  //30.08.2021 проверена
  //Самостоятельная
  //--------------------------------------------------
	function pCreateMsg(sSrc, sMsg, bError) {

		//Параметры по умолчанию
    var bErr = false;
    if (bError != undefined) { bErr = bError; }
			
		if (bErr) {
			return ("\n============\n" + "⚠️" + " ERROR\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		} else {
			return ("\n============\n" + "ℹ️" + " INFO\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		}	
	};		
	
	//--------------------------------------------------
	//Получить иконку из начала строки
  //30.08.2021 проверена
  //Зависит от pCreateMsg
  //--------------------------------------------------
	function pGetIcon(sSource) {
		
    //Название функции
		var sSrc = "pGetIcon(sSource)";
		
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "]: отсутствует пробел в строке", true);
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		
		//Проверяем, не пустая ли строка в результате
		if (sIcon.length == 0) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "]: иконка в строке отсутствует", true);
			throw new Error(sMessage);
		}
		
		return sIcon;
		
	};
	
	//--------------------------------------------------
	//Установить иконку из строки
  //30.08.2021 проверена
  //Зависит от pGetIcon
  //--------------------------------------------------
	function pSetIconFrom(sSource, sText, bSpace) {
		
		//Название функции
    var sSrc = "pSetIconFrom(sSource, sText, bSpace)";
		
		//Параметры по умолчанию
    var bSp = true;
    if (bSpace != undefined) { bSp = bSpace; }

    var sIcon = pGetIcon(sSource);

		//Возвращаем результат
		if (bSp) {
			return sIcon + " " + sText.trim();
		} else {
			return sIcon + sText.trim();
		}	
	};
	
	//--------------------------------------------------
	//Получить строку без иконки в начале строки
  //30.08.2021 проверена
  //Зависит от pCreateMsg
  //--------------------------------------------------
	function pGetText(sSource) {	
    
    //Название функции
		var sSrc = "pGetText(sSource)";
	
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "]: отсутствует пробел в строке", true);
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		var sName = sSource.slice(sIcon.length).trim();
		
		//Проверяем, не пустая ли строка в результате
		if (sName.length == 0) {
			var sMessage = pCreateMsg(sSrc, "sSource[" + sSource + "]: отсутствует название в строке", true);
			throw new Error(sMessage);
		}
		
		return sName;

	};
	
	//--------------------------------------------------
	//Получить деньги в удобном формате
  //30.08.2021 проверена
  //Зависит от pCreateMsg
  //--------------------------------------------------
	function pGetMoney(nSum, sCurrency) {
		
		//Название функции
    var sSrc = "pGetMoney(nSum, sCurrency)";
		
		//Проверяем, передана ли число
		if (typeof(nSum) != "number") {
			var sMessage = pCreateMsg(sSrc, "nSum[" + nSum + "] не является числом", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли строка в sCurrency
		if (typeof(sCurrency) != "string" && sCurrency != undefined) {
			var sMessage = pCreateMsg(sSrc, "sCurrency[" + sCurrency + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		nSum = nSum.toFixed(2);
		
		var sign = "";
		if (nSum < 0) {
			sign = "-";
			nSum = Math.abs(nSum);
			nSum = nSum.toFixed(2);
		}
		
		nSum += "";
		nSum = new Array(4 - nSum.length % 3).join("U") + nSum;
		nSum = nSum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
		nSum = sign + nSum;
		nSum = nSum.trim();
		
		if (sCurrency != undefined) {
			return nSum + " " + sCurrency;
		} else {
			return nSum;
		}		
			
	};
	
	//--------------------------------------------------
	//Начало дня 0 часов 0 минут 0 секунд 000 миллисекунд
  //30.08.2021 проверена
  //Зависит от pCreateMsg
	//--------------------------------------------------  
	function pDayStart(dDate) {
		
		//Название функции
    var sSrc = "pDayStart(dDate)";
		
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = pCreateMsg(sSrc, "dDate[" + dDate + "]  не является объектом", true);
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(0, 0, 0, 0));
	};
	
	//--------------------------------------------------
	//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
  //30.08.2021 проверена
  //Зависит от pCreateMsg
	//--------------------------------------------------
	function pDayEnd(dDate) {
		
		//Название функции
    var sSrc = "pDayEnd(dDate)";
		
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = pCreateMsg(sSrc, "dDate[" + dDate + "]  не является объектом", true);
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(23, 59, 59, 999));
	};

	//--------------------------------------------------
	//Остаток дней
  //30.08.2021 проверена
  //Зависит от pCreateMsg
  //--------------------------------------------------
	function pDaysLeft(dTarget, dReference, nRound) {
	
    //Название функции
		var sSrc = "pDaysLeft(dTarget, dReference, nRound)";
	
		//Проверяем, передана ли дата в виде числа
		if (typeof(dTarget) != "object") {
			var sMessage = pCreateMsg(sSrc, "dTarget[" + dTarget + "] не является объектом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли дата dReference в виде числа
		if (typeof(dReference)!= "object" && dReference != undefined) {
			var sMessage = pCreateMsg(sSrc, "dReference[" + dReference + "] не является объектом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли количество знаков округления nRound в виде числа
		if (typeof(nRound) != "number" && nRound != undefined) {
			var sMessage = pCreateMsg(sSrc, "nRound[" + nRound + "] не является числом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound больше ли 0
		if (nRound < 0) {
			var sMessage = pCreateMsg(sSrc, "nRound[" + nRound + "]  < 0", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound целое ли
		if (nRound != undefined) {
			if (nRound != nRound.toFixed(0)) {
				var sMessage = pCreateMsg(sSrc, "nRound[" + nRound + "]  не целое", true);	
				throw new Error(sMessage);
			}
		}
			
		//Если не задана конечная дата, то сегодня
		if (dReference == undefined) {dReference = new Date();}
		if (nRound == undefined) {nRound = 0;}
			
		//Разница в днях с сейчас
		var dDif = (dTarget - dReference)/(1000*3600*24);
				
		//Округляем
		return dDif.toFixed(nRound);
						
	};

	//--------------------------------------------------
	//Сдвиг даты на определенный интервал
  //30.08.2021 проверена
  //Зависит от pCreateMsg
  //--------------------------------------------------
	function pShiftDate(dDate, nInterval, sUnit, bForward) {
		
    //Название функции
		var sSrc = "pShiftDate(dDate, nInterval, sUnit, bForward)";
		
		//Проверяем, передана ли дата
		if (typeof(dDate) != "object") {
			var sMessage = pCreateMsg(sSrc, "dDate[" + dDate + "] не является объектом", true);
			throw new Error(sMessage);
		}

		//Проверяем, переданан ли интервал в виде числа
		if (typeof(nInterval) != "number") {
			var sMessage = pCreateMsg(sSrc, "nInterval[" + nInterval + "] не является числом", true);			
			throw new Error(sMessage);
		}

		//Проверяем, переданан интервал больше ли нуля
		if (nInterval < 0) {
			var sMessage = pCreateMsg(sSrc, "nInterval[" + nInterval + "] < 0", true);	
			throw new Error(sMessage);
		}		

    //Проверяем, целый ли интервал 
		if (nInterval != undefined) {
			if (nInterval != nInterval.toFixed(0)) {
				var sMessage = pCreateMsg(sSrc, "nInterval[" + nInterval + "]  не целое", true);	
				throw new Error(sMessage);
			}
		}
		
		//Проверяем, переданан единицы сдвига являются ли строкой
		if (typeof(sUnit) != "string") {
			var sMessage = pCreateMsg(sSrc, "sUnit[" + sUnit + "] не является строкой", true);	
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы корректны ли
    var arrDay = ["d", "day", "days", "д", "д.", "дн", "дн.", "день", "дни", "дня", "дней"];
    var arrWeek = ["w", "week", "weeks", "н", "н.", "нед", "нед.", "неделя", "недели", "неделей"];
    var arrMonth = ["m", "month", "months", "м", "м.", "мес", "мес.", "месяц", "месяцы", "месяца", "месяцев"];
    var arrYear = ["y", "year", "years", "г", "г.", "л", "л.", "год", "лет", "года", "годы"];

		var arrUnits = [].concat(arrDay, arrWeek, arrMonth, arrYear);
		
    if (arrUnits.indexOf(sUnit) == -1) {
			var sMessage = pCreateMsg(sSrc, "sUnit[" + sUnit + "] не является допустимым названием интервала", true);	
			throw new Error(sMessage);
		}	
		
		//Проверяем, направление логическая ли величина
		if (typeof(bForward) != "boolean" && bForward != undefined) {
			var sMessage = pCreateMsg(sSrc, "bForward[" + bForward + "] не логическое значение", true);	
			throw new Error(sMessage);
		}	
		
    //выбираем направление сдвига
		var sign;
		if (bForward == true || bForward == undefined) {sign = 1;} else {sign = -1;}

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
        var sMessage = pCreateMsg(sSrc, "сдвиг месяца прерван по превышению 10 циклов", true);
				throw new Error(sMessage);
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
        var sMessage = pCreateMsg(sSrc, "сдвиг месяца прерван по превышению 10 циклов", true);
				throw new Error(sMessage);
			}
      
		}
    	
    return dDate;

	};
	
//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Открытые функции
//======================================================
//------------------------------------------------------
//Функция для коррекци неправильного заполнения полей
//30.08.2021 проверена
//Зависит от pCreateMsg, pGetText
//------------------------------------------------------
function checkDeal(incomeDeal) {
	
  //название функции
	var sSrc = "checkDeal(incomeDeal)";
	log(pCreateMsg(sSrc, "старт функции"));

  //Иконки
  const ICO_PLAN = "⏳";
		
	//Обрабатываемое дело
	var deal;
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
		deal = entry();
		log(pCreateMsg(sSrc, "текущая задача: " + deal.title));
	} else {
		deal = incomeDeal;
		log(pCreateMsg(sSrc, "входящая задача: " + deal.title));
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
  var msgCorrected = "⚠️ исправлено:"; 	

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
//30.08.2021 проверена
//Зависит от pCreateMsg, pShiftDate
//----------------------------------------------------------
function shiftDate(bForward, incomeDeal) {
	
	//название функции
  var sSrc = "shiftDate(bForward, incomeDeal)";
	log(pCreateMsg(sSrc, "старт функции"));
	
	//Обрабатываемое дело
	var deal;

	//Сообщения
  var msgPeriodOff = "⚠️ периодичность не включена";  
		
	//Если есть входящий объект, то используем его
	if (incomeDeal == undefined) {
		deal = entry();
		log(pCreateMsg(sSrc, "текущая задача: " + deal.title));
	} else {
		deal = incomeDeal;
		log(pCreateMsg(sSrc, "входящая задача: " + deal.title));
	}
	
	//Выход, если не включен счёт переодичности
	if (!deal.field(COUNT)) {
		message(msgPeriodOff);
		exit();
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
	
	message("ℹ️ перенесено на " + direction*FInterval + " (" + FUnit + ")");

	//Лог
	log(pCreateMsg(sSrc, "сдвиг: " + direction*FInterval + " (" + FUnit + ")"));
		
}

//----------------------------------------------------------
//Функция переноса даты несколько дней вперёд
//30.08.2021 проверена
//Зависит от pCreateMsg, pShiftDate
//----------------------------------------------------------
function addDays(nDays) {
	
	//название функции
  var sSrc = "addDays(nDays)";
	log(pCreateMsg(sSrc, "старт функции"));
	
	//Обрабатываемое дело
	var deal = entry();


	
	//Короткие ссылки на поля
	var FStartDate = deal.field(START_DATE);
	var FEndDate = deal.field(END_DATE);

	//Проверяем, передана ли число
	if (typeof(nDays) != "number") {
		var sMessage = pCreateMsg(sSrc, "nDays[" + nDays + "] не является числом", true);
		throw new Error(sMessage);
	}

  nDays = Math.abs(nDays);
  nDays = nDays.toFixed(0);

	deal.set(START_DATE, pShiftDate(FStartDate, Number(nDays), "d", true));
	if (FEndDate != undefined) {
		deal.set(END_DATE, pShiftDate(FEndDate, Number(nDays), "d", true));
	}

	message("ℹ️ перенесено на " + nDays + " (день)");

	//Лог
	log(pCreateMsg(sSrc, "сдвиг: " + nDays + " (день)"));
		
}

//----------------------------------------------------------
//Функция показывающая остаток дней
//31.08.2021 проверена
//Зависит от pDayEnd, pGetText, pDaysLeft
//----------------------------------------------------------
function getDaysLeft() {

	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = pDayEnd(deal.field (START_DATE));
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
      dteMonth = dteMonth.toFixed(0);
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
      dteYear = dteYear.toFixed(0);
			var dteMonth = (dteDiff%365)/30;
      dteMonth = dteMonth.toFixed(0);
      if (dteMonth != 0) {
        res = dteYear + " г." + Math.abs(dteMonth) + " мес.";
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
//31.08.2021 проверена
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
//31.08.2021 проверена
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
//31.08.2021 проверена
//Зависит от pGetMoney
//----------------------------------------------------------
function getDealCost() {
	//Обрабатываемое дело
	var deal = entry();
	//Поля
	var FCost = deal.field (COST);
  if (FCost != undefined) {
    return pGetMoney(FCost, "руб.");
  } else {
    return "";
  }
}

//----------------------------------------------------------
//Функция для вывода типа
//31.08.2021 проверена
//Зависит от pDaysLeft, pDayEnd
//----------------------------------------------------------
function getDealWarranty() {

	//Обрабатываемое дело
	var deal = entry();
  const ICO_WARRANTY = "🛡️";
	//Поля
	var FWarranty = deal.field (WARRANTY);
	var FCategory = deal.field(CATEGORY);

	if (FWarranty != undefined) {
    FWarranty = pDayEnd(deal.field (WARRANTY));
		var dteDiff = pDaysLeft(FWarranty);
    if (dteDiff >=0) {return ICO_WARRANTY + " " + dteDiff + " дн.";} else {return "";}
	} else {
		return "";
	}	
}

//----------------------------------------------------------
//Функция показывающая цвет
//31.08.2021 проверена
//Зависит от pDayEnd, pGetText, pDaysLeft
//----------------------------------------------------------
function getDealColor() {

	//Обрабатываемое дело
	var deal = entry();
	
	//Короткие ссылки на поля
	var FStartDate = pDayEnd(deal.field (START_DATE));
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
  }
}
