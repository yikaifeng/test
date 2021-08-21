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
const AUTO = "Автоматически менять дату";
const INTERVAL = "Интервал";
	
//======================================================
//Переменные
//======================================================
	
//Сообщения
var msgCorrected = ICO_WARNING + " Исправлено:";
var msgPeriodOff = ICO_WARNING + " Периодичность не включена";
	
//======================================================
//Закрытые методы
//======================================================
	
//------------------------------------------------------
//Функция для коррекци неправильного заполнения полей
//------------------------------------------------------
function checkTask(incomeTask) {
	
	sSrc = "checkTask(incomeTask)";
	log(Edit.createLogMsg(sSrc, "старт функции"));
		
	//Обрабатываемое дело
	var task;
		
	//Если есть входящий объект, то используем его
	if (incomeTask == undefined) {
		task = entry();
		log(Edit.createLogMsg(sSrc, "текущая задача: " + task.title));
	} else {
		task = incomeTask;
		log(Edit.createLogMsg(sSrc, "входящая задача: " + task.title));
	}
		
	//Короткие ссылки на поля
	var FType = task.field (TYPE);
	var FStatus = task.field (STATUS);
	var FStartDate = task.field (START_DATE);
	var FStartTime = task.field (START_TIME);
	var FEndDate = task.field (END_DATE);
	var FEndTime = task.field (END_TIME);
	var FCount = task.field (COUNT);
	var FAuto = task.field (AUTO);
	var FInterval = task.field (INTERVAL);
		
	//прочее
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var strResult = msgCorrected;

	//Проверка соответствия типа и статуса
	if (FType==_PERIOD && FStatus==_DONE) {
		task.set(STATUS, _ACTIVE);
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
	
	sSrc = "shiftDate(bForward, incomeTask)";
	log(Edit.createLogMsg(sSrc, "старт функции"));
	
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;

	//Обрабатываемое дело
	var task;
		
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;
		
	//Если есть входящий объект, то используем его
	if (incomeTask == undefined) {
		task = entry();
		log(Edit.createLogMsg(sSrc, "текущая задача: " + task.title));
	} else {
		task = incomeTask;
		bShowMessage = false;
		log(Edit.createLogMsg(sSrc, "входящая задача: " + task.title));
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
		
	task.set(START_DATE, Edit.shiftDate(FStartDate, FInterval, FUnit, bForward));
	if (FEndDate != undefined) {
		task.set(END_DATE, Edit.shiftDate(FEndDate, FInterval, FUnit, bForward));
	}

	var direction;
	if (bForward != false) {direction = 1;} else {direction = -1;}
	
	if (bShowMessage) {
		message(ICO_SUCSEED + " Перенесено на " + direction*FInterval + " (" + FUnit + ")");
	}

	//Лог
	log(Edit.createLogMsg(sSrc, "сдвиг: " + direction*FInterval + " (" + FUnit + ")"));
		
	}

//----------------------------------------------------------
//Функция показывающая остаток дней
//----------------------------------------------------------
function daysLeft() {
	
	//Обрабатываемое дело
	var task = entry();
	
	//Короткие ссылки на поля
	var FStartDate = task.field (START_DATE);
	var FStatus = task.field (STATUS);
	
	//Прочее
	var res = " дн.";	
	var dteDiff = Edit.daysLeft(FStartDate)；
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
	return Edit.getIcon(FType);
}
	
//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getSum() {
	//Обрабатываемое дело
	var task = entry();
	//Поля
	var FSum = task.field (SUM);
	return Edit.getMoney = function (FSum, "р.");
}
