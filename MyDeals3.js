//**********************************************************
//Глобальные переменные
//**********************************************************

//Текущая запись и библиотека
var curLib = lib();
var curEntry = entry();

//Имена полей и значения
var cType = "Тип";
	var cPeriod = "🗓️ повтор.";
var cStatus = "Статус";
	var cPlan = "⏳ в плане";
	var cDone = "✔️ завершено";
var cStartDate = "Дата начала";
var cStartTime = "Время начала";
var cEndDate = "Дата окончания";
var cEndTime = "Время окончания";
var cCount = "Вычислять периодичность";
var cUnit = "Ед.измерения";
	var cDay = "день";
	var cWeek = "неделя";
	var cMonth = "месяц";
	var cYear = "год";
var cAuto = "Автоматически менять дату";
var cInterval = "Интервал";

//Значения полей
var fldType = curEntry.field (cType);
var fldStatus = curEntry.field (cStatus);
var fldStartDate = curEntry.field (cStartDate);
var fldStartTime = curEntry.field (cStartTime);
var fldEndDate = curEntry.field (cEndDate);
var fldEndTime = curEntry.field (cEndTime);
var fldCount = curEntry.field (cCount);
var fldUnit = curEntry.field (cUnit);
var fldAuto = curEntry.field (cAuto);
var fldInterval = curEntry.field (cInterval);

//Лог
var logMessage = "\nИСПОЛНЯЕМЫЙ СКРИПТ: MyDeals3.js";

//**********************************************************
//Функция для коррекци неправильного заполнения полей
//**********************************************************
function checkDealsEntry() {
	logMessage += "\nВЫПОЛНЕНИ ФУНКЦИИ checkDealsEntry()";
	logMessage += "\nИМЯ ЗАПИСИ: " + curEntry.title;
	//Локальные переменные
	var cResult = "⚠️ Исправлено:";
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var dteEndDate = fldEndDate;
	var dteStartTime = fldStartTime;
	var strResult = cResult;

	//Проверка соответствия типа и статуса
	if (fldType==cPeriod && fldStatus==cDone) {
		curEntry.set(cStatus, cPlan);
		strResult = strResult + "\n*" + cStatus;
	}
	//Проверка времени и дат на существование
	if (fldEndDate == undefined) {bEndDate = false;} else {bEndDate = true;}
	if (fldStartTime == undefined) {bStartTime = false;} else {bStartTime = true;}
	if (fldEndTime == undefined) {bEndTime = false;} else {bEndTime = true;}

	//Проверка даты окончания
	if (fldEndDate) {
		if (fldEndDate<fldStartDate) {
			curEntry.set(cEndDate, fldStartDate);
			dteEndDate = fldStartDate;
			strResult = strResult + "\n*" + cEndDate;
		}
	} else {
		if (bEndTime) {
			curEntry.set(cEndDate, fldStartDate);
			dteEndDate = fldStartDate;
			strResult = strResult + "\n*" + cEndDate;
		}
	}

	//Проверка времени начала
	if (!bStartTime) {
		if(bEndTime) {
			curEntry.set(cStartTime, fldEndTime);
			dteStartTime = fldEndTime;
			strResult = strResult + "\n*" + cStartTime;
		}
	}

	//Проверка времени окончания
	if (bEndTime) {
		if (dteEndDate.getFullYear()==fldStartDate.getFullYear() && 
		dteEndDate.getMonth()==fldStartDate.getMonth() && 
		dteEndDate.getDate()==fldStartDate.getDate() &&
		fldEndTime < dteStartTime) {
			curEntry.set(cEndTime, dteStartTime);
			strResult = strResult + "\n*" + cEndTime;
		}
	}

	//Проверка вычисления переодичности и смены дат
	if (fldType!=cPeriod && fldCount==1) {
		curEntry.set(cCount, 0);
		strResult = strResult + "\n*" + cCount;
	}
	if (fldType!=cPeriod && fldAuto==1) {
		curEntry.set(cAuto, 0);
		strResult = strResult + "\n*" + cAuto;
	}

	//Проверка интервала
	if (fldInterval!=undefined && fldInterval<0) {
		curEntry.set(cInterval, Math.abs(fldInterval));
		strResult = strResult + "\n*" + cInterval;
	}

	curEntry.recalc();

	if (strResult!=cResult) {
		message(strResult);	
	}
	
	log(logMessage);
	
}

//**********************************************************
//Функция переноса даты вперед или назад
//**********************************************************
function shiftDate (bForward, oEntry) {
	//Лог
	logMessage += "\nВЫПОЛНЕНИ ФУНКЦИИ shiftDate(bForward, oEntry)";
	logMessage += "\n*bForward= " + bForward;
	if (oEntry == undefined || oEntry == null) {
		logMessage += "\n*oEntry= " + oEntry;
	} else {
		logMessage += "\noEntry= " + oEntry.title;
	}

	//Локальные переменные
	var direction = 0;
	
	if (!fldCount) {
		message("⚠️ Периодичность не включена");
		exit();
	}
	
	if (bForward != false) {direction = 1;} else {direction = -1;}
	if (oEntry == undefined || oEntry == null) {oEntry = curEntry;}
	
	switch (fldUnit) {

		case cDay:
			fldStartDate.setDate(fldStartDate.getDate() + direction*fldInterval);
			oEntry.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setDate(fldEndDate.getDate() + direction*fldInterval);
				oEntry.set(cEndDate, fldEndDate);
			}
			break;

		case cWeek:
			fldStartDate.setDate(fldStartDate.getDate() + direction*fldInterval*7);
			oEntry.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setDate(fldEndDate.getDate() + direction*fldInterval*7);
				oEntry.set(cEndDate, fldEndDate);
			}
			break;

		case cMonth:
			//сохраняем дату и устанавливаем 1 число месяца
			var nDate = fldStartDate.getDate();
			fldStartDate.setDate(1);
			//Прибавляем нужное число месяцев
			fldStartDate.setMonth(fldStartDate.getMonth() + direction*fldInterval);
			//Восстанавливаем дату без перескока месяца
			var nMonth = fldStartDate.getMonth();

			fldStartDate.setDate(nDate);

			while (nMonth != fldStartDate.getMonth()) {
				fldStartDate.setDate(fldStartDate.getDate()-1);
			} //while

			oEntry.set(cStartDate, fldStartDate);

			//дата окончания
			if (fldEndDate != undefined) {
				nDate = fldEndDate.getDate();
				fldEndDate.setDate(1);
				//Прибавляем нужное число месяцев
				fldEndDate.setMonth(fldEndDate.getMonth() + direction*fldInterval);
				//Восстанавливаем дату без перескока месяца
				nMonth = fldEndDate.getMonth();

				fldEndDate.setDate(nDate);

				while (nMonth != fldEndDate.getMonth()) {
				fldEndDate.setDate(fldEndDate.getDate()-1);
				} //while

				oEntry.set(cEndDate, fldEndDate);
			}
			break;

		case cYear:
			fldStartDate.setFullYear(fldStartDate.getFullYear() + direction*fldInterval);
			oEntry.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setFullYear(fldEndDate.getFullYear() + direction*fldInterval);
				oEntry.set(cEndDate, fldEndDate);
			}
			break;
		}

	message("✔️ Дата изменена");

	//Лог
	logMessage += "\nСДВИГ НА:" + direction*fldInterval + fldUnit;
	log(logMessage);
	
}

//**********************************************************
//Функция автоматического сдвига даты
//**********************************************************
function shiftAuto () {
	//Лог
	logMessage += "\nВЫПОЛНЕНИ ФУНКЦИИ shiftAuto()";
	logMessage += "\nБИБЛИОТЕКА: " + curLib.title;
	logMessage += "\n*(" + curLib.entries().length + " записей)";
	
	for (var i = 0; i < curLib.entries().length; i++) {
		logMessage += "  for(" + i + "): " + curLib.entries[i].title;
		var curRecord = curLib.entries[i];
		if (curRecord.field(cAuto) == 1 && 
			curRecord.field(cType)==cPeriod &&
			curRecord.field("cStartDate").getFullYear() <= Date().getFullYear() &&
			curRecord.field("cStartDate").getMonth() <= Date().getMonth() &&
			curRecord.field("cStartDate").getDay() <= (Date().getDay+1) &&
			curRecord.field("cEndDate").getFullYear() <= Date().getFullYear() &&
			curRecord.field("cEndDate").getMonth() <= Date().getMonth() &&
			curRecord.field("cEndDate").getDay() <= (Date().getDay+1)) {
				log("  !НАЙДЕНА ЗАПИСЬ ДЛЯ ПЕРЕНОСА");
				shiftDate(true, curRecord);
		}
	}
	
	log(logMessage);
	
}
