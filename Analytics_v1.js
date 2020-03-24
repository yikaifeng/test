//**********************************************************
"use strict";
//**********************************************************
//n - number
//	dte - date
//s - string 
//b - boolean 
//o - object
//	arr - array
//l - library
//f - field
//======================================================
//Константы (имена)
//======================================================

//Библиотека аналитика
const LANALYTICS = "Аналитика";

//Поля
const LANALYTICS_FLD {
	PERIOD: "Период",
	STARTDATE: "Дата начала",
	REPORT: "Отчёт",
	INCOME: "Вывод прихода",
	OUTCOME: "Вывод расхода",
	BALANCE: "Вывод баланса",
};

//Библиотека платежи
const LPAYMENTS = "Платежи2";

//Иконки
const LPAYMENTS_ICO = {
	//в полях
	PLUS: "➕",
	MINUS: "➖",
	TRANSACTION: "💱",
	//в значениях
	//Иконки прихода
	SALARY: "💵",
	ADD_INCOME: "💸",
	//Иконки расхода
	FOOD: "🍜",
	SERVICE: "🏠",
	TRANSPORT: "🚌",
	REST: "🧘🏼‍♀️",
	THINGS: "📦",
	HEALTH: "🏥",
	//Общие иконки прихода и расхода
	CORRECTION: "🧮",
	OTHER: "🏷️",
};
Object.freeze(ICON);
	
//Поля
const LPAYMENTS_FLD = {
	DATE: "Дата",
	TYPE: "Тип",
	ACCOUNT: "Счёт",
	DESTINATION: "Перевелено на",
	INC_CATEGORY: "Категория " + LPAYMENTS_ICO.PLUS,
	INCOME: "Приход",
	OUT_CATEGORY: "Категория " + LPAYMENTS_ICO.MINUS,
	OUTCOME: "Расход",
	TRANSACTION: "Сумма перевода",
	NAME: "Название",
};
Object.freeze(FLD);

//Значения полей
const LPAYMENTS_VAL = {
		
	INCOME: LPAYMENTS_ICO.PLUS + " приход",
	OUTCOME: LPAYMENTS_ICO.MINUS + " расход",
	TRANSACTION: LPAYMENTS_ICO.TRANSACTION + " перевод",
		
	SALARY: LPAYMENTS_ICO.SALARY + " зарплата",
	ADD_INCOME: LPAYMENTS_ICO.ADD_INCOME + " доп.доход",

	FOOD: LPAYMENTS_ICO.FOOD + " питание",
	SERVICE: LPAYMENTS_ICO.SERVICE + " соц.услуги",
	TRANSPORT: LPAYMENTS_ICO.TRANSPORT + " транспорт",
	REST: LPAYMENTS_ICO.REST + " досуг",
	THINGS: LPAYMENTS_ICO.THINGS + " вещи",
	HEALTH: LPAYMENTS_ICO.HEALTH + " здоровье",

	CORRECTION: LPAYMENTS_ICO.CORRECTION + " коррект.",
	OTHER: LPAYMENTS_ICO.OTHER + " прочее",		
};
Object.freeze(VAL);


//======================================================
//Объект для работы с частыми функциями
//======================================================
const Edit = {};
	
	//Получит иконку в строке
	Edit.getIcon = function(sSource) {
		if (typeof(sSource) != string) {
			return null;
		} else {
			var separator = " ";
			sSource = String(sSource);
			return sSource.split(separator,1)[0];
		}
	}
	
	//Получить строку без иконки
	Edit.getName = function(sSource) {	
		if (typeof(sSource) != string) {
			return null;
		} else {
			var separator = " ";
			strSource = String(strSource);
			var strIcon = strSource.split(separator,1)[0];
			var strName = strSource.slice(strIcon.length);
			return strName = strName.trim();
		}
	}
	
	//Получить деньги
	Edit.getMoney = function (nSum, sCurrency) {
		if (typeof(nSum) != number) {
			return null;
			exit();
		} else {
			var sign = "";
			nSum = nSum.toFixed(2);
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
			if (typeof(sCurrency) == string && sCurrency != undefined) {
				return nSum + " " + sCurrency;
			} else {
				return nSum;
			}		
		}	
	}
	
	//Название месяца на русском по его номеру
	Edit.getMonthName = function (nMonthNumber) {
		
		switch (nMonthNumber) {
			case 1:
				return "январь";
				break;
			case 2:
				return "февраль";
				break;
			case 3:
				return "март";
				break;
			case 4:
				return "апрель";
				break;
			case 5:
				return "май";
				break;
			case 6:
				return "июнь";
				break;
			case 7:
				return "июль";
				break;
			case 8:
				return "август";
				break;
			case 9:
				return "сентябрь";
				break;
			case 10:
				return "октябрь";
				break;
			case 11:
				return "ноябрь";
				break;
			case 12:
				return "декабрь";
				break;
			default:
				return "";
				break;
		}
	}
	
Object.freeze(Edit);

//======================================================
//Переменные
//======================================================
	
//======================================================
//Функции
//======================================================

//------------------------------------------------------
//Функция для счёта прихода и расхода
//------------------------------------------------------
function countPayments(arrPayments, dte) {
	
	//переменные
	var total = {};
		total.income = 0;
		total.outcome = 0;
		total.balance = 0;
	var incCategory = {};
		incCategory.salary = 0;
		incCategory.add_income = 0;
		incCategory.correction = 0;
		incCategory.other = 0;
	var outCategory = {};
		outCategory.food = 0;
		outCategory.health = 0;
		outCategory.service = 0;
		outCategory.transport = 0;
		outCategory.rest = 0;
		outCategory.things = 0;
		outCategory.correction = 0;
		outCategory.other = 0;
	
	var currentYear = dte.getFullYear();
	var currentMonth = dte.getMonth();
	
	//перебираем платежи
	for (i=0; i<arrPayments.length; i++) {
		
		var payment = arrPayments[i];
		var paymentYear = payment.field(LPAYMENTS_FLD.DATE).getFullYear();
		var paymentMonth = payment.field(LPAYMENTS_FLD.DATE).getMonth();
		var paymentType = payment.field(LPAYMENTS_FLD.TYPE);
		var paymentCategory, sum;
		if (paymentType == LPAYMENTS_VAL.INCOME) {
			paymentCategory = payment.field(LPAYMENTS_FLD.INC_CATEGORY);
			sum = payment.field(LPAYMENTS_FLD.INCOME);
		}
		if (paymentType == LPAYMENTS_VAL.OUTCOME) {
			paymentCategory = payment.field(LPAYMENTS_FLD.OUT_CATEGORY);
			sum = payment.field(LPAYMENTS_FLD.OUTCOME);
		}
		
		//проверяем на дату
		if (paymentYear == currentYear && paymentMonth == currentMonth) {
			
			//обрабатываем такой платёж
			if (paymentType == LPAYMENTS_VAL.INCOME) {
				total.income = total.income + sum;
				switch (paymentCategory) {
					case LPAYMENTS_VAL.SALARY:
						incCategory.salary = incCategory.salary + sum;
						break;
					case LPAYMENTS_VAL.ADD_INCOME:
						incCategory.add_income = incCategory.add_income + sum;
						break;
					case LPAYMENTS_VAL.CORRECTION:
						incCategory.correction = incCategory.correction + sum;
						break;
					case LPAYMENTS_VAL.OTHER:
						incCategory.other = incCategory.other + sum;
						break;
				}
			} else if (paymentType == LPAYMENTS_VAL.OUTCOME) {
				total.outcome = total.outcome + sum;
				switch (paymentCategory) {
					case LPAYMENTS_VAL.FOOD:
						outCategory.food = outCategory.food + sum;
						break;
					case LPAYMENTS_VAL.HEALTH:
						outCategory.health = outCategory.health + sum;
						break;
					case LPAYMENTS_VAL.SERVICE:
						outCategory.service = outCategory.service + sum;
						break;
					case LPAYMENTS_VAL.TRANSPORT:
						outCategory.transport = outCategory.transport + sum;
						break;
					case LPAYMENTS_VAL.REST:
						outCategory.rest = outCategory.rest + sum;
						break;
					case LPAYMENTS_VAL.THINGS:
						outCategory.things = outCategory.things + sum;
						break;
					case LPAYMENTS_VAL.CORRECTION:
						outCategory.correction = outCategory.correction + sum;
						break;
					case LPAYMENTS_VAL.OTHER:
						outCategory.other = outCategory.other + sum;
						break;
				}
			}
		}
		
		total.balance = total.income - total.outcome;
	}
	
	return {
		ttl: total,
		inc: incCategory,
		out: outCategory,
	};
	
}
//------------------------------------------------------
//Функция для проверки полей при сохранении
//------------------------------------------------------
function check() {
	
	//текущий отчёт
	var report = entry();
	
	var currentDate = report.field(LANALYTICS_FLD.STARTDATE);
	currentDate = currentDate.setDate(1);
	report.set(LANALYTICS_FLD.STARTDATE, currentDate);
	
};

//------------------------------------------------------
//Функция для вывода периода
//------------------------------------------------------
function getPeriod() {
	
	//текущий отчёт
	var report = entry();
	
	var currentDate = report.field(LANALYTICS_FLD.STARTDATE);
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth();
	currentMonth = Edit.getMonthName(currentMonth);
	
	return currentMonth + " " + currentYear;
	
};

//------------------------------------------------------
//Функция для вывода периода
//------------------------------------------------------
function getReport() {
	
	//текущий отчёт
	var report = entry();
	
	var currentDate = report.field(LANALYTICS_FLD.STARTDATE);
	
	//библиотека платежей
	var lPayments = libByName(LPAYMENTS);
	var payments = lPayments.entries();
	
	//результат
	var res = countPayments(payments, currentDate);
	report.set(LANALYTICS_FLD.BALANCE, res.ttl.balance);
	report.set(LANALYTICS_FLD.INCOME, res.ttl.income);
	report.set(LANALYTICS_FLD.OUTCOME, res.ttl.outcome);
	
};
