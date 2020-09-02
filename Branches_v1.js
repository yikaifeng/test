//**********************************************************
//Таблица подразделений
//v1
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
//Константы
//======================================================
//Иконки
const ICO_TASKS = "📮";
const ICO_REQUESTS = "📑";
//Имена библиотек
const LIB_TASKS = "Задачи";
const LIB_REQUESTS = "Заявки";
//Имена полей и значения
const TYPE = "Тип";
const SHORT_NAME = "Краткое название";
const TASKS_NUMBER = "Вывод задач";
const REQUESTS_NUMBER = "Вывод заявок";
const STATUS = "Статус";
	const _DONE = "завершено";
	const _SIGNED = "подписана";
	const _CANCELED = "отменена";

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
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nsSource не является строкой";
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nsSource - пустая строка";
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nsSource: отсутствует пробел в строке";
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		
		//Проверяем, не пустая ли строка в результате
		if (sIcon.length == 0) {
			var sMessage = "\nОшибка Edit.getIcon(sSource):\nsSource: иконка в строке отсутствует";
			throw new Error(sMessage);
		}
		
		return sIcon;
		
	};
	
	//--------------------------------------------------
	//Получить строку без иконки в начале строки
	Edit.getText = function (sSource) {	
	
		//Проверяем, передана ли строка
		if (typeof(sSource) != "string") {
			var sMessage = "\nОшибка Edit.getText(sSource):\nsSource не является строкой";
			throw new Error(sMessage);
		}
		
		//Проверяем, не пустая ли строка
		if (sSource.length == 0) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nsSource - пустая строка";
			throw new Error(sMessage);
		}
		
		//Проверяем, есть ли хотя бы 1 пробел
		if (sSource.indexOf(" ") == -1) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nsSource: отсутствует пробел в строке";
			throw new Error(sMessage);
		}
		
		var separator = " ";
		var sIcon = sSource.split(separator,1)[0];
		var sName = sSource.slice(sIcon.length).trim();
		
		//Проверяем, не пустая ли строка в результате
		if (sName.length == 0) {
			var sMessage = "\nОшибка Edit.getText(sSource):\nsSource: название в строке отсутствует";
			throw new Error(sMessage);
		}
		
		return sName;

	};
	
	//--------------------------------------------------
	//Получить деньги
	Edit.getMoney = function (nSum, sCurrency) {
		
		//Проверяем, передана ли число
		if (typeof(nSum) != "number") {
			var sMessage = "\nОшибка Edit.getMoney(nSum, sCurrency):\nnSum не является числом";
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли строка в sCurrency
		if (typeof(sCurrency) != "string" && sCurrency != undefined) {
			var sMessage = "\nОшибка Edit.getMoney(nSum, sCurrency):\nsCurrency не является строкой";
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
	Edit.getMonthName = function (nMonthNumber) {
		
		//Проверяем, передана ли число
		if (typeof(nMonthNumber) != "number") {
			var sMessage = "\nОшибка Edit.getMonthName(nMonthNumber):\nnMonthNumber не является числом";
			throw new Error(sMessage);
		}
		
		var arrMonthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var arrMonthsNames = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
		
		
		//Проверяем, передана ли число от 1 до 12
		if (arrMonthsNumbers.indexOf(nMonthNumber) == -1) {
			var sMessage = "\nОшибка Edit.getMonthName(nMonthNumber):\nnMonthNumber не является номером месяца";
			throw new Error(sMessage);
		}		
		
		return arrMonthsNames[nMonthNumber-1];		
		
	};

	//--------------------------------------------------
	//Сдвиг даты на определенный интервал
	Edit.shiftDate = function (dDate, nInterval, sUnit, bForward) {
		
		//Проверяем, передана ли дата в виде числа
		if (typeof(dDate) != "object") {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\ndDate не является числом объектом";
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
		if (arrUnits.indexOf(sUnit) == -1) {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nsUnit не является d/w/m/y";
			throw new Error(sMessage);
		}	
		
		//Проверяем, направление логическая ли величина
		if (typeof(bForward) != "boolean" && bForward != undefined) {
			var sMessage = "\nОшибка Edit.shiftDate(dDate, nInterval, sUnit, bForward):\nbForward не логическая величина";
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
	
		//Проверяем, передана ли дата в виде числа
		if (typeof(dTarget) != "object") {
			var sMessage = "\nОшибка Edit.daysLeft(dTarget, dReference, nRound):\ndTarget не является числом объектом";
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли дата dReference в виде числа
		if (typeof(dReference)!= "object" && dReference != undefined) {
			var sMessage = "\nОшибка Edit.daysLeft(dTarget, dReference, nRound):\ndReference не является объектом";
			throw new Error(sMessage);
		}
		
		//Проверяем, передана ли количество знаков округления nRound в виде числа
		if (typeof(nRound) != "number" && nRound != undefined) {
			var sMessage = "\nОшибка Edit.daysLeft(dTarget, dReference, nRound):\nnRound не является числом";
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound больше ли 0
		if (nRound < 0) {
			var sMessage = "\nОшибка Edit.daysLeft(dTarget, dReference, nRound):\nnRound < 0";
			throw new Error(sMessage);
		}
		
		//Проверяем, nRound целое ли
		if (nRound != undefined) {
			if (nRound != nRound.toFixed(0)) {
				var sMessage = "\nОшибка Edit.daysLeft(dTarget, dReference, nRound):\nnRound не целое";
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
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = "\nОшибка Edit.dayStart(dDate):\ndDate не является объектом";
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(0, 0, 0, 0));
	}
	
	//--------------------------------------------------
	//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
	Edit.dayEnd = function (dDate) {
		//Проверяем, передана ли дата dDate в виде числа
		if (typeof(dDate)!= "object" && dDate != undefined) {
			var sMessage = "\nОшибка Edit.dayEnd(dDate):\ndDate не является объектом";
			throw new Error(sMessage);
		}
		if (dDate == undefined) {dDate = new Date();}
		return new Date(dDate.setHours(23, 59, 59, 999));
	}
	
	//--------------------------------------------------
	//Условия для функции sumFields
	Edit.conditions = {};
	Edit.countConditions = 0;
	
	Edit.deleteConditions = function () {
		Edit.conditions = {};
		Edit.countConditions = 0;
	};
	
	Edit.addCondition = function () {
		
		//проверяем количество аргументов
		if (!(arguments.length == 2 || arguments.length == 3)) {
			var sMessage = "\nОшибка Edit.addCondition(...):\nчисло аргументов отлично от 2 и 3";
			throw new Error(sMessage);
		}
		
		//проверяем является ли первый аргумент строкой
		if (typeof(arguments[0]) != "string") {
			var sMessage = "\nОшибка Edit.addCondition(...):\nпервый аргумент не является строкой";
			throw new Error(sMessage);
		}
		
		//проверяем является ли первый аргумент пустой строкой
		if (arguments[0].length == 0) {
			var sMessage = "\nОшибка Edit.addCondition(...):\nпервый аргумент - пустая строка";
			throw new Error(sMessage);
		}
		
		//Распределяем аргументы 
		Edit.conditions["c" + (Edit.countConditions + 1)] = arguments[0];

		if (arguments.length == 2) {
			Edit.conditions["n" + (Edit.countConditions + 1)] = arguments[1];
		} else {
			//проверяем является ли второй аргумент числом
			if (!(typeof(arguments[1]) == "number" || typeof(arguments[1]) == "object")) {
				var sMessage = "\nОшибка Edit.addCondition(...):\nнижний предел не является числом или объектом";
				throw new Error(sMessage);
			}
			//проверяем является ли третий аргумент числом
			if (!(typeof(arguments[2]) == "number" || typeof(arguments[2]) == "object")) {
				var sMessage = "\nОшибка Edit.addCondition(...):\nверхний предел не является числом или объектом";
				throw new Error(sMessage);
			}
			Edit.conditions["l" + (Edit.countConditions + 1)] = arguments[1];
			Edit.conditions["h" + (Edit.countConditions + 1)] = arguments[2];
		}
		
		Edit.countConditions += 1;
		
	};
	
	//--------------------------------------------------
	//Сумма по полям с условием
	Edit.sumFields = function (arrEntries, sFieldName) {
		
		//Проверяем, передана ли массив записей
		if (typeof(arrEntries) != "object") {
			var sMessage = "\nОшибка Edit.sumFields(arrEntries, sFieldName, sCondFieldName, sCondition):\narrEntries не является объектом";
			throw new Error(sMessage);
		}
		
		//Проверяем, является ли sFieldName строкой
		if (typeof(sFieldName) != "string") {
			var sMessage = "\nОшибка Edit.sumFields(arrEntries, sFieldName, sCondFieldName, sCondition):\nsFieldName не является строкой";
			throw new Error(sMessage);
		}
		
		//Проверяем, является ли sFieldName пустой
		if (sFieldName.length == 0) {
			var sMessage = "\nОшибка Edit.sumFields(arrEntries, sFieldName, sCondFieldName, sCondition):\nsFieldName: пустая строка";
			throw new Error(sMessage);
		}
		

		
		var sum = 0;
		
		if (Edit.countConditions == 0) {
			//Если нет условия по полю
			for (var i = 0; i < arrEntries.length; i++) {
				var oEntry = arrEntries[i];
				sum += oEntry.field(sFieldName);
			}
			
		} else {
			//перебор массива записей
			for (var j = 0; j < arrEntries.length; j++) {
				
				//по умолчанию суммировать
				var bCount = true;
				var oEntry = arrEntries[j];
				
				//проверяем условия
				var k = 1;
				
				while (k <= Edit.countConditions && bCount == true) {
					//Имя поля с наложенным условием
					var sCondFieldName = Edit.conditions["c"+ k];
					var value = oEntry.field(sCondFieldName);
					//Определяемся с типом условий
					if ("n"+ k in Edit.conditions) {
						var normal = Edit.conditions["n"+ k];
						//проверка условия
						if (value != normal) {
							bCount = false;
						}
					} else {
						var low = Edit.conditions["l"+ k];
						var high = Edit.conditions["h"+ k];
						//проверка условия
						if (value < low || value > high) {
							bCount = false;
						}
					}
					
					k += 1;
					
				}
				
				if (bCount) {
					sum += oEntry.field(sFieldName);
				}
				
			}
		}
		
		return sum;
		
	};
	
//======================================================
//Специальные функции
//======================================================
//------------------------------------------------------
//Функция для вывода названия подразделения с иконкой типа
//------------------------------------------------------
function getBranchName() {
	return Edit.getIcon(field(TYPE))+ " " + field(SHORT_NAME);
}
//------------------------------------------------------
//Функция для подсчёта невыполненных дел
//------------------------------------------------------
function setNumberOfTasks() {
	//Обрабатываемое подразделение и библиотека
	var lBranches = lib();
	var arrBranches = lBranches.entries();
	var lTasks = libByName(LIB_TASKS);
	log("\ngetNumberOfTasks: " + lBranches.name + " " + arrBranches.length);
	log("\n  " + lTasks.name);
	//Цикл по подразделениям
	for (var j=0; j<arrBranches.length; j++) {
		var branch = arrBranches[j];
		log("\n  подразделение: " + branch.name);
		var arrAllTasks = lTasks.linksTo(branch);
		log("\n  всего ссылок: " + arrAllTasks.length);
		//Считаем незавершенные
		var result = 0;
		for (var i=0; i<arrAllTasks.length; i++) {
			if (Edit.getText(arrAllTasks[i].field(STATUS)) == _DONE) {
				result = result + 1;
			}
		}
		log("\n  активных ссылок: " + result);
		branch.set(TASKS_NUMBER, result);
	}

}
//------------------------------------------------------
//Функция для подсчёта неподписанных заявок
//------------------------------------------------------
function setNumberOfRequests() {
	//Обрабатываемое подразделение и библиотека
	var lBranches = lib();
	var arrBranches = lBranches.entries();
	var lRequests = libByName(LIB_REQUESTS);
	log("\ngetNumberOfTasks: " + lBranches.name + " " + arrBranches.length);
	log("\n  " + lRequests.name);
	//Цикл по подразделениям
	for (var j=0; j<arrBranches.length; j++) {
		var branch = arrBranches[j];
		log("\n  подразделение: " + branch.name);
		var arrAllRequests = lRequests.linksTo(branch);
		log("\n  всего ссылок: " + lRequests.length);
		//Считаем незавершенные
		var result = 0;
		for (var i=0; i<arrAllRequests.length; i++) {
			if ((Edit.getText(arrAllRequests[i].field(STATUS)) != _SIGNED)||(Edit.getText(arrAllRequests[i].field(STATUS)) != _CANCELED)) {
				result = result + 1;
			}
		}
		log("\n  активных ссылок: " + result);
		branch.set(REQUESTS_NUMBER, result);
	}

}
