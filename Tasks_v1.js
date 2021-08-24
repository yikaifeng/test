//********************************************************************************************************************
//Tasks - скрипт для иблиотеке "Задачи"
//********************************************************************************************************************
"use strict";

//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Константы
//======================================================

//Иконки
const ICO_ERROR = "⚠️";
const ICO_INFO = "ℹ️";	
const ICO_SUCSEED = "✅";
const ICO_URGENT = "🔥";
const ICO_SOON = "⏱️";
const ICO_ACTIVE = "💥";
	
//Имена полей и значения
const TYPE = "Тип";
	const _PERIOD = "повтор.";
const STATUS = "Статус";
	const _ACTIVE = "активно";
	const _WAITING = "ожидание";
	const _DONE = "завершено";
const SUM = "Сумма";
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
const INTERVAL = "Интервал";

//======================================================
//Переменные
//======================================================

//Сообщения
var msgCorrected = ICO_ERROR + " Исправлено:";
var msgPeriodOff = ICO_ERROR + " Периодичность не включена";

//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Закрытые фунции
//======================================================
	//--------------------------------------------------
	//Создать сообщение
	function pCreateMsg(sSrc, sMsg, bError) {
			
		//Параметры по умолчанию
		bError = typeof(bError) !== undefined ? bError : false;
			
		if (bError) {
			return ("\n==========\n" + ICO_ERROR + "ERROR\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		} else {
			return ("\n==========\n" + ICO_INFO + "INFO\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		}	
	};		
	
	//--------------------------------------------------
	//Получить иконку из начала строки
	function pGetIcon(sSource) {
		
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
	function pSetIconFrom(sSource, sText, bSpace) {
		
		var sSrc = "pSetIconFrom(sSource, sText, bSpace)";
		
		//Параметры по умолчанию
		bSpace = typeof(bSpace) !== undefined ? bSpace : false;
		
		//Проверяем, не пустая ли иконка
		var sIcon = pGetIcon(sSource);
		if (sIcon.length == 0) {
			var sMessage = pCreateMsg(sSrc, "sIcon[" + sIcon + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Возвращаем результат
		if (bSpace) {
			return sIcon + " " + sText.trim();
		} else {
			return sIcon + sText.trim();
		}	
	};
	
	//--------------------------------------------------
	//Получить строку без иконки в начале строки
	function pGetText(sSource) {	
	
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
	//Получить деньги
	function pGetMoney(nSum, sCurrency) {
		
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
	//Название месяца на русском по его номеру
	function pGetMonthName(nMonthNumber) {
		
		var sSrc = "pGetMonthName(nMonthNumber)";
		
		//Проверяем, передана ли число
		if (typeof(nMonthNumber) != "number") {
			var sMessage = pCreateMsg(sSrc, "nMonthNumber[" + nMonthNumber + "] не является числом", true);
			throw new Error(sMessage);
		}
		
		var arrMonthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var arrMonthsNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
		
		
		//Проверяем, передана ли число от 1 до 12
		if (arrMonthsNumbers.indexOf(nMonthNumber) == -1) {
			var sMessage = pCreateMsg(sSrc, "nMonthNumber[" + nMonthNumber + "] не является номером месяца", true);
			throw new Error(sMessage);
		}		
		
		return arrMonthsNames[nMonthNumber-1];		
		
	};

	//--------------------------------------------------
	//Сдвиг даты на определенный интервал
	function pShiftDate(dDate, nInterval, sUnit, bForward) {
		
		var sSrc = "pShiftDate(dDate, nInterval, sUnit, bForward)";
		
		//Проверяем, передана ли дата в виде числа
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
		
		//Проверяем, переданан единицы сдвига являются ли строкой
		if (typeof(sUnit) != "string") {
			var sMessage = pCreateMsg(sSrc, "sUnit[" + sUnit + "] не является строкой", true);	
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы корректны ли
		var arrUnits = ["d", "w", "m", "y"];
		if (arrUnits.indexOf(sUnit) == -1) {
			var sMessage = pCreateMsg(sSrc, "sUnit[" + sUnit + "] не является d/w/m/y", true);	
			throw new Error(sMessage);
		}	
		
		//Проверяем, направление логическая ли величина
		if (typeof(bForward) != "boolean" && bForward != undefined) {
			var sMessage = pCreateMsg(sSrc, "bForward[" + bForward + "] не логическое значение", true);	
			throw new Error(sMessage);
		}	
		
		var sign;
		if (bForward == true || bForward == undefined) {sign = 1;} else {sign = -1;}
				
			switch (sUnit) {
				
				case "d":
					dDate.setDate(dDate.getDate() + sign*nInterval);
					return dDate;
					break;
					
				case "w":
					dDate.setDate(dDate.getDate() + sign*nInterval*7);
					return dDate;
					break;
					
				case "m":
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
						var sMessage = "\nОшибка pShiftDate(dDate, nInterval, sUnit, bForward):\nсдвиг месяца прерван по превышению 10 циклов";
						throw new Error(sMessage);
					}
					return dDate;
					break;
					
				case "y":
					dDate.setFullYear(dDate.getFullYear() + sign*nInterval);
					return dDate;
					break;
			
			}
		
	};
	
	//--------------------------------------------------
	//Остаток дней
	function pDaysLeft(dTarget, dReference, nRound) {
	
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
	//Начало дня 0 часов 0 минут 0 секунд 000 миллисекунд
	function pDayStart(dDate) {
		
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
	function pDayEnd(dDate) {
		
		var sSrc = "pDayEnd(dDate)";
		
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = pCreateMsg(sSrc, "dDate[" + dDate + "]  не является объектом", true);
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(23, 59, 59, 999));
	};
	
	
//********************************************************************************************************************
//********************************************************************************************************************
//======================================================
//Открытые функции
//======================================================
	
//------------------------------------------------------
//Функция для коррекци неправильного заполнения полей
//------------------------------------------------------
function checkTask(incomeTask) {
	
	var sSrc = "checkTask(incomeTask)";
	log(pCreateMsg(sSrc, "старт функции"));
		
	//Обрабатываемое дело
	var task;
		
	//Если есть входящий объект, то используем его
	if (incomeTask == undefined) {
		task = entry();
		log(pCreateMsg(sSrc, "текущая задача: " + task.title));
	} else {
		task = incomeTask;
		log(pCreateMsg(sSrc, "входящая задача: " + task.title));
	}
		
	//Короткие ссылки на поля
	var FType = pGetText(task.field (TYPE));
	var FStatus = pGetText(task.field (STATUS));
	var FStartDate = task.field (START_DATE);
	var FStartTime = task.field (START_TIME);
	var FEndDate = task.field (END_DATE);
	var FEndTime = task.field (END_TIME);
	var FCount = task.field (COUNT);
	var FInterval = task.field (INTERVAL);
		
	//прочее
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var strResult = msgCorrected;

	//Проверка соответствия типа и статуса
	if (FType==_PERIOD && FStatus==_DONE) {
		task.set(STATUS, ICO_ACTIVE + " " + _ACTIVE);
		strResult = strResult + "\n*" + STATUS;
	}
		
	//Проверка времени и дат на существование
	if (FEndDate == undefined) {bEndDate = false;} else {bEndDate = true;}
	if (FStartTime == undefined) {bStartTime = false;} else {bStartTime = true;}
	if (FEndTime == undefined) {bEndTime = false;} else {bEndTime = true;}

	//Проверка даты окончания
	if (bEndDate) {
		if (FEndDate<FStartDate) {
			task.set(END_DATE, FStartDate);
			FEndDate = task.field (END_DATE);
			strResult = strResult + "\n*" + END_DATE;
		}
	} else {
		if (bEndTime) {
			task.set(END_DATE, FStartDate);
			FEndDate = task.field (END_DATE);
			strResult = strResult + "\n*" + END_DATE;
		}
	}

	//Проверка времени начала
	if (!bStartTime) {
		if(bEndTime) {
			task.set(START_TIME, FEndTime);
			FStartTime = task.field (START_TIME);
			strResult = strResult + "\n*" + START_TIME;
		}
	}

	//Проверка времени окончания
	if (bEndTime) {
		if (FEndDate.getFullYear()==FStartDate.getFullYear() && 
		FEndDate.getMonth()==FStartDate.getMonth() && 
		FEndDate.getDate()==FStartDate.getDate() &&
		FEndTime < FStartTime) {
			task.set(END_TIME, FStartTime);
			strResult = strResult + "\n*" + END_TIME;
		}
	}

	//Проверка вычисления переодичности и смены дат
	if (FType!=_PERIOD && FCount==1) {
		task.set(COUNT, 0);
		strResult = strResult + "\n*" + COUNT;
	}


	//Проверка интервала
	if (FInterval!=undefined && FInterval<0) {
		task.set(INTERVAL, Math.abs(FInterval));
		strResult = strResult + "\n*" + INTERVAL;
	}

	task.recalc();

	if (strResult!=msgCorrected) {
		message(strResult);	
	}
}

//----------------------------------------------------------
//Функция переноса даты вперед или назад
//----------------------------------------------------------
function shiftDate(bForward, incomeTask) {
	
	var sSrc = "shiftDate(bForward, incomeTask)";
	log(pCreateMsg(sSrc, "старт функции"));
	
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;

	//Обрабатываемое дело
	var task;
		
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;
		
	//Если есть входящий объект, то используем его
	if (incomeTask == undefined) {
		task = entry();
		log(pCreateMsg(sSrc, "текущая задача: " + task.title));
	} else {
		task = incomeTask;
		bShowMessage = false;
		log(pCreateMsg(sSrc, "входящая задача: " + task.title));
	}
	
	//Выход, если не включен счёт переодичности
	if (!task.field(COUNT)) {
		message(msgPeriodOff);
		exit();
	}
		
	//Короткие ссылки на поля
	var FStartDate = task.field(START_DATE);
	var FEndDate = task.field(END_DATE);
	var FUnit = task.field(UNIT);
	var FInterval = task.field(INTERVAL);
	var unit;
	
	//Обрабатываем перенос
	switch (FUnit) {

		case "день":
			unit = "d";
			break;

		case "неделя":
			unit = "w";
			break;

		case "месяц":
			unit = "m";
			break;

		case "год":
			unit = "y";
			break;
			
		default: break;
			
		}
		
	task.set(START_DATE, pShiftDate(FStartDate, FInterval, unit, bForward));
	if (FEndDate != undefined) {
		task.set(END_DATE, pShiftDate(FEndDate, FInterval, unit, bForward));
	}

	var direction;
	if (bForward != false) {direction = 1;} else {direction = -1;}
	
	if (bShowMessage) {
		message(ICO_SUCSEED + " Перенесено на " + direction*FInterval + " (" + FUnit + ")");
	}

	//Лог
	log(pCreateMsg(sSrc, "сдвиг: " + direction*FInterval + " (" + FUnit + ")"));
		
	}

//----------------------------------------------------------
//Функция показывающая остаток дней
//----------------------------------------------------------
function getDaysLeft() {
	
	//Обрабатываемое дело
	var task = entry();
	
	//Короткие ссылки на поля
	var FStartDate = task.field (START_DATE);
	var FStatus = pGetText(task.field (STATUS));
	
	//Прочее
	var res = " дн.";	
	var dteDiff = pDaysLeft(FStartDate);
	if (dteDiff == 0) {dteDiff = Math.abs(dteDiff);}
	
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
//Функция для вывода типа
//----------------------------------------------------------
function getTaskType() {
	//Обрабатываемое дело
	var task = entry();
	//Поля
	var FType = task.field (TYPE);
	return pGetIcon(FType);
}
	
//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getTaskSum() {
	//Обрабатываемое дело
	var task = entry();
	//Поля
	var FSum = task.field (SUM);
	
	if (FSum != undefined) {
		return pGetMoney(FSum, "р.");
	} else {
		return FSum;
	}
	
}

//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getDivision() {
	//Обрабатываемое дело
	var task = entry();
	//Поля
	var FDivision = task.field ("Подразделение");
	
	if (FDivision.length > 1) {
		return "i " + FDivision.length;
	} else {
		return FDivision;
	}
	
}
