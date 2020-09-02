t) != "object") {
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
function getNumberOfTasks() {
	//Обрабатываемое подразделение и библиотека
	var branch = entry();
	var lTasks = libByName(LIB_TASKS);
	log("\ngetNumberOfTasks: " + lTasks.name);
	//Коллекция объектов, ссылающихся на данное подразделение
	var arrAllTasks = lTasks.linsTo(branch);
	log("\n  всего ссылок: " + arrAllTasks.length);
	//Считаем незавершенные
	var result = 0;
	for (var i=0; i<arrAllTasks.length; i++) {
		if (Edit.getText(arrAllTasks[i].field(STATUS)) == _DONE) {
			result = result + 1;
		}
	}
	return ICO_TASKS + result;
}
//------------------------------------------------------
//Функция для подсчёта неподписанных заявок
//------------------------------------------------------
function getNumberOfRequests() {
	//Обрабатываемое подразделение и библиотека
	var branch = entry();
	var lRequests = libByName(LIB_REQUESTS);
	log("\getNumberOfRequests: " + lRequests.name);
	//Коллекция объектов, ссылающихся на данное подразделение
	var arrAllRequests = lRequests.linsTo(branch);
	log("\n  всего ссылок: " + arrAllRequests.length);
	//Считаем незавершенные
	var result = 0;
	for (var i=0; i<arrAllRequests.length; i++) {
		if ((Edit.getText(arrAllTasks[i].field(STATUS)) != _SIGNED)||(Edit.getText(arrAllTasks[i].field(STATUS)) != _CANCELED)) {
			result = result + 1;
		}
	}
	return ICO_REQUESTS + result;
}
