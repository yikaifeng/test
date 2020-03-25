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
//v1
//======================================================
const Edit = {};
	
	//--------------------------------------------------
	//Получить иконку из начала строки
	Edit.getIcon = function (sSource) {
		
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nпереданное значение не является строкой";
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nпустая строка";
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nотсутствует пробел в строке";
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		
		//Проверяем, не пустая ли строка в результате
		if (sIcon.length == 0) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nиконка в строке отсутствует";
			throw new Error(sMessage);
		}
		
		return sIcon;
		
	}
	
	//--------------------------------------------------
	//Получить строку без иконки в начале строки
	Edit.getText = function (sSource) {	
	
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = "\nОшибка Edit.getText(sSource):\nпереданное значение не является строкой";
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nпустая строка";
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nотсутствует пробел в строке";
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		var sName = sSource.slice(sIcon.length);
		sName.trim()
		
		//Проверяем, не пустая ли строка в результате
		if (sName.length == 0) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nназвание в строке отсутствует";
			throw new Error(sMessage);
		}
		
		return sName;

	}
	
	//--------------------------------------------------
	//Получить деньги
	Edit.getMoney = function (nSum, sCurrency) {
		
		//Проверяем, передана ли число
		if (typeof(nSum) != "number") {
			var sMessage = "\nОшибка Edit.getMoney(nSum, sCurrency):\nnSum не является числом";
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
		
		if (sCurrency != undefined && typeof(sCurrency) == "string") {
			return nSum + " " + sCurrency;
		} else {
			return nSum;
		}		
			
	}
	
	//--------------------------------------------------
	//Название месяца на русском по его номеру
	Edit.getMonthName = function (nMonthNumber) {
		
		//Проверяем, передана ли число
		if (typeof(nMonthNumber) != "number") {
			var sMessage = "\nОшибка Edit.getMonthName(nMonthNumber):\nnMonthNumber не является числом";
			throw new Error(sMessage);
		}
		
		var arrMonthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var arrMonthsNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
		
		
		//Проверяем, передана ли число от 1 до 12
		if (!arrMonthsNumbers.includes(nMonthNumber)) {
			var sMessage = "\nОшибка Edit.getMonthName(nMonthNumber):\nnMonthNumber не является номером месяца";
			throw new Error(sMessage);
		}		
		
		return arrMonthsNames[nMonthNumber-1];		
		
	}

	//--------------------------------------------------
	//Сдвиг даты на определенный интервал
	Edit.shiftDate = function (dDate, nInterval, sUnit, bForward) {
		
		//Проверяем, передана ли дата в виде числа
		if (typeof(dDate) != "number") {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\ndDate не является числом";
			throw new Error(sMessage);
		}

		//Проверяем, переданан ли интервал в виде числа
		if (typeof(nInterval) != "number") {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nnInterval не является числом";
			throw new Error(sMessage);
		}

		//Проверяем, переданан интервал больше ли нуля
		if (nInterval < 0) {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nnInterval < 0";
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы сдвига являются ли строкой
		if (typeof(sUnit) != "string") {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nsUnit не является строкой";
			throw new Error(sMessage);
		}		
		
		//Проверяем, переданан единицы корректны ли
		var arrUnits = ["d", "w", "m", "y"];
		if (!arrUnits.includes(sUnit)) {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nsUnit не является d/w/m/y";
			throw new Error(sMessage);
		}	
		
		//Проверяем, направление логическая ли величина
		if (typeof(bForward) != "boolean" && bForward != undefined) {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nbForward не логическая величина";
			throw new Error(sMessage);
		}	
		
		var sign = 1;
		if (!bForward) {sign = -1;}
				
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
		
	}
	
	//--------------------------------------------------
	//Остаток дней
	Edit.daysLeft = function (dDate, dTarget, nRound) {
	
		//Проверяем, передана ли дата в виде числа
		if (typeof(dDate) != "number") {
			var sMessage = "\nОшибка Edit.daysLeft(dDate, dTarget, nRound):\ndDate не является числом";
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли дата dTarget в виде числа
		if (typeof(dTarget) != "number" && dTarget != undefined) {
			var sMessage = "\nОшибка Edit.daysLeft(dDate, dTarget, nRound):\ndTarget не является числом";
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли количество знаков округления nRound в виде числа
		if (typeof(nRound) != "number" && nRound != undefined) {
			var sMessage = "\nОшибка Edit.daysLeft(dDate, dTarget, nRound):\nnRound не является числом";
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound больше ли 0
		if (nRound < 0) {
			var sMessage = "\nОшибка Edit.daysLeft(dDate, dTarget, nRound):\nnRound < 0";
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound целое ли
		var test = nRound;
		test.toFixed(0);
		if (nRound != test) {
			var sMessage = "\nОшибка Edit.daysLeft(dDate, dTarget, nRound):\nnRound не целое";
			throw new Error(sMessage);
		}
	
		//Если не задана конечная дата, то сегодня
		if (dTarget == undefined) {dTarget = new Date();}
		if (nRound == undefined) {nRound = 0;}
			
		//Разница в днях с сейчас
		var dDif = (dDate - dTarget)/(1000*3600*24);
				
		//Округляем
		return dDif.toFixed(nRound);
						
	}
	
Object.freeze(Edit);
