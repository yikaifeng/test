//**********************************************************
"use strict";
//**********************************************************
//n - number
//	d - date
//s - string 
//b - boolean 
//o - object
//	arr - array
//l - library
//f - field

//======================================================
//Объект с частыми функциями
//v3
//======================================================
const Edit = {};
	
	//--------------------------------------------------
	//Писать ли лог
	Edit.logging = false;
	
	//--------------------------------------------------
	//Формирование сообщения
	Edit.createLogMsg = function (sSrc, sMsg, bError) {
		
		//Параметры по умолчанию
		bError = typeof(bError) !== undefined ? bError : false;
		
		var ICO_INFO = "ℹ️";
		var ICO_ERROR = "⚠️";
		
		if (bError) {
			return ("\n==========\n" + ICO_ERROR + "ERROR\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		} else {
			return ("\n==========\n" + ICO_INFO + "INFO\n  [src]: " + sSrc + "\n  [msg]: " + sMsg);
		}	
	};
	//--------------------------------------------------
	//Изменение статуса записи в лог
	Edit.setLogging = function (sStatus) {
		
		var sSrc = "Edit.setLogging(sStatus)";
		
		//Проверяем, передано ли логическое значение
		if (typeof(sStatus) != "boolean") {
			var sMessage = Edit.createLogMsg(sSrc, "sStatus[" + sStatus + "] не является логическим значением", true);
			throw new Error(sMessage);
		}
		if (sStatus) {Edit.logging = true;} else {Edit.logging = false;}
	};
	
	//--------------------------------------------------

	
	//--------------------------------------------------
	//Получить иконку из начала строки
	Edit.getIcon = function (sSource) {
		
		var sSrc = "Edit.getIcon(sSource)";
		
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "]: отсутствует пробел в строке", true);
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		
		//Проверяем, не пустая ли строка в результате
		if (sIcon.length == 0) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "]: иконка в строке отсутствует", true);
			throw new Error(sMessage);
		}
		
		return sIcon;
		
	};
	
	//--------------------------------------------------
	//Получить иконку из начала строки
	Edit.setIconFrom = function (sSource, sText, bSpace) {
		
		var sSrc = "Edit.setIcon(sSource, sText, bSpace)";
		
		//Параметры по умолчанию
		bSpace = typeof(bSpace) !== undefined ? bSpace : false;
		
		//Проверяем, не пустая ли иконка
		var sIcon = Edit.getIcon(sSource);
		if (sIcon.length == 0) {
			var sMessage = Edit.createLogMsg(sSrc, "sIcon[" + sIcon + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка в результате
		if (bSpace) {
			return sIcon + " " + sText.trim();
		} else {
			return sIcon + sText.trim();
		}	
	};
	
	//--------------------------------------------------
	//Получить строку без иконки в начале строки
	Edit.getText = function (sSource) {	
	
		var sSrc = "Edit.getText(sSource)";
	
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "] - пустая строка", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "]: отсутствует пробел в строке", true);
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		var sName = sSource.slice(sIcon.length).trim();
		
		//Проверяем, не пустая ли строка в результате
		if (sName.length == 0) {
			var sMessage = Edit.createLogMsg(sSrc, "sSource[" + sSource + "]: отсутствует название в строке", true);
			throw new Error(sMessage);
		}
		
		return sName;

	};
	
	//--------------------------------------------------
	//Получить деньги
	Edit.getMoney = function (nSum, sCurrency) {
		
		var sSrc = "Edit.getMoney(nSum, sCurrency)";
		
		//Проверяем, передана ли число
		if (typeof(nSum) != "number") {
			var sMessage = Edit.createLogMsg(sSrc, "nSum[" + nSum + "] не является числом", true);
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли строка в sCurrency
		if (typeof(sCurrency) != "string" && sCurrency != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "sCurrency[" + sCurrency + "] не является строкой", true);
			throw new Error(sMessage);
		}
		
		nSum = nSum.toFixed(2);
		
		var sign = "";
		if (nSum < 0) {
			sign = "-";
			nSum = Math.abs(nSum);
			nSum = nSum.toFixed(2);
		}
		
		nSum += "";
		nSum = new Array(4 - nSum.length % 3).join("U") + nSum;
		nSum = nSum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
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
	Edit.getMonthName = function (nMonthNumber) {
		
		var sSrc = "Edit.getMonthName(nMonthNumber)";
		
		//Проверяем, передана ли число
		if (typeof(nMonthNumber) != "number") {
			var sMessage = Edit.createLogMsg(sSrc, "nMonthNumber[" + nMonthNumber + "] не является числом", true);
			throw new Error(sMessage);
		}
		
		var arrMonthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var arrMonthsNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
		
		
		//Проверяем, передана ли число от 1 до 12
		if (arrMonthsNumbers.indexOf(nMonthNumber) == -1) {
			var sMessage = Edit.createLogMsg(sSrc, "nMonthNumber[" + nMonthNumber + "] не является номером месяца", true);
			throw new Error(sMessage);
		}		
		
		return arrMonthsNames[nMonthNumber-1];		
		
	};

	//--------------------------------------------------
	//Сдвиг даты на определенный интервал
	Edit.shiftDate = function (dDate, nInterval, sUnit, bForward) {
		
		var sSrc = "Edit.shiftDate(dDate, nInterval, sUnit, bForward)";
		
		//Проверяем, передана ли дата в виде числа
		if (typeof(dDate) != "object") {
			var sMessage = Edit.createLogMsg(sSrc, "dDate[" + dDate + "] не является объектом", true);
			throw new Error(sMessage);
		}

		//Проверяем, переданан ли интервал в виде числа
		if (typeof(nInterval) != "number") {
			var sMessage = Edit.createLogMsg(sSrc, "nInterval[" + nInterval + "] не является числом", true);			
			throw new Error(sMessage);
		}

		//Проверяем, переданан интервал больше ли нуля
		if (nInterval < 0) {
			var sMessage = Edit.createLogMsg(sSrc, "nInterval[" + nInterval + "] < 0", true);	
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы сдвига являются ли строкой
		if (typeof(sUnit) != "string") {
			var sMessage = Edit.createLogMsg(sSrc, "sUnit[" + sUnit + "] не является строкой", true);	
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы корректны ли
		var arrUnits = ["d", "w", "m", "y"];
		if (arrUnits.indexOf(sUnit) == -1) {
			var sMessage = Edit.createLogMsg(sSrc, "sUnit[" + sUnit + "] не является d/w/m/y", true);	
			throw new Error(sMessage);
		}	
		
		//Проверяем, направление логическая ли величина
		if (typeof(bForward) != "boolean" && bForward != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "bForward[" + bForward + "] не логическое значение", true);	
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
						var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nсдвиг месяца прерван по превышению 10 циклов";
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
	Edit.daysLeft = function (dTarget, dReference, nRound) {
	
		var sSrc = "Edit.daysLeft(dTarget, dReference, nRound)";
	
		//Проверяем, передана ли дата в виде числа
		if (typeof(dTarget) != "object") {
			var sMessage = Edit.createLogMsg(sSrc, "dTarget[" + dTarget + "] не является объектом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли дата dReference в виде числа
		if (typeof(dReference)!= "object" && dReference != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "dReference[" + dReference + "] не является объектом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли количество знаков округления nRound в виде числа
		if (typeof(nRound) != "number" && nRound != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "nRound[" + nRound + "] не является числом", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound больше ли 0
		if (nRound < 0) {
			var sMessage = Edit.createLogMsg(sSrc, "nRound[" + nRound + "]  < 0", true);	
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound целое ли
		if (nRound != undefined) {
			if (nRound != nRound.toFixed(0)) {
				var sMessage = Edit.createLogMsg(sSrc, "nRound[" + nRound + "]  не целое", true);	
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
	Edit.dayStart = function (dDate) {
		
		var sSrc = "Edit.dayStart(dDate)";
		
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "dDate[" + dDate + "]  не является объектом", true);
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(0, 0, 0, 0));
	};
	
	//--------------------------------------------------
	//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
	Edit.dayEnd = function (dDate) {
		
		var sSrc = "Edit.dayEnd(dDate)";
		
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = Edit.createLogMsg(sSrc, "dDate[" + dDate + "]  не является объектом", true);
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(23, 59, 59, 999));
	};
	
	//--------------------------------------------------
	//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
	Edit.CreateEvent = function (sTitle, sDescription, dBeginTime, dEndTime) {
		var i = intent("android.intent.action.INSERT");
		i.data("content://com.android.calendar/events");
		i.extra("title", sTitle);
		i.extra("description", sDescription);
		i.extraLong("beginTime", dBeginTime);
		i.extraLong("endTime", dEndTime);
		i.send();
	};
