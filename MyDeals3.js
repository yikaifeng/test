//**********************************************************
//Глобальные переменные
//**********************************************************

//Текущая запись и библиотека
var curLib = lib();
var deals = curLib.entries();
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
var cName = "Название";
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


//**********************************************************
//Функция для коррекци неправильного заполнения полей
//**********************************************************
function checkDealsEntry() {
	log("\nВЫПОЛНЕНИ ФУНКЦИИ checkDealsEntry()");
	log("\nИМЯ ЗАПИСИ: " + curEntry.title);
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
}

//**********************************************************
//Функция переноса даты вперед или назад
//**********************************************************
function shiftDate (bForward, oEntry) {
	var bShowMessage = true;
	//Лог
	log("\nВЫПОЛНЕНИ ФУНКЦИИ shiftDate(bForward, oEntry)");
	log("\n*bForward= " + bForward);
	if (oEntry == undefined || oEntry == null) {
		log("\n*oEntry= " + oEntry);
	} else {
		log("\noEntry= " + oEntry.title);
		bShowMessage = false;
	}

	//Локальные переменные
	var direction = 0;
	
	if (!oEntry.field(cCount)) {
		message("⚠️ Периодичность не включена");
		exit();
	}
	
	if (bForward != false) {direction = 1;} else {direction = -1;}
	if (oEntry == undefined || oEntry == null) {
		oEntry = curEntry;
		log("\n*oEntry= " + oEntry.title);
	}
	
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

	if (bShowMessage) {message("✔️ Дата изменена");}

	//Лог
	log("\nСДВИГ НА:" + direction*fldInterval + " " + fldUnit);
	
}

//**********************************************************
//Функция автоматического сдвига даты
//**********************************************************
//Вспомогательная функция
function isExpired(oEntry) {
	
	//log("\nВЫПОЛНЕНИ ФУНКЦИИ isExpired(oEntry)");
	//log("\n*oEntry: " + oEntry.title);
	var strDate = cStartDate;
	
	if (oEntry.field(cEndDate) != undefined) {
		strDate = cEndDate;
	}
	
	var dte = new Date();
	//log("\nSTR: " + oEntry.field(cStartDate) + "\nEND: " + oEntry.field(cEndDate) + "\nTDY: " + dte);
	
	if (oEntry.field(cAuto) == 1 && 
		oEntry.field(cType)==cPeriod &&
		oEntry.field(strDate).getFullYear() <= dte.getFullYear() &&
		oEntry.field(strDate).getMonth() <= dte.getMonth() &&
		oEntry.field(strDate).getDay() < dte.getDay()) {
			return true;
		} else {
			return false;
		}
}

function shiftAuto () {
	//Лог
	log("\nВЫПОЛНЕНИ ФУНКЦИИ shiftAuto()");
	log("\nБИБЛИОТЕКА: " + curLib.title + "\n*(" + deals.length + " записей)");
	
	for (var i = 0; i < deals.length; i++) {
		var curRecord = deals[i];
		if (isExpired(curRecord)) {
				log("\nНАЙДЕНА ЗАПИСЬ ДЛЯ ПЕРЕНОСА: " + curRecord.field(cName));
				while (isExpired(curRecord)){
					shiftDate(true, curRecord);
				}
		}
	}
}
