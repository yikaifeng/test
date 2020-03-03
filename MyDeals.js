//**********************************************************
//Функция для коррекци неправильного заполнения полей
//**********************************************************
function checkDealsEntry() {
		
	//Текущая запись
	var curEntry = entry();

	//Имена полей
	var cType = "Тип";
	var cStatus = "Статус";
	var cStartDate = "Дата начала";
	var cStartTime = "Время начала";
	var cEndDate = "Дата окончания";
	var cEndTime = "Время окончания";
	var cCount = "Вычислять периодичность";
	var cAuto = "Автоматически менять дату";
	var cInterval = "Интервал";
	//Имена значений полей
	var cPeriod = "🗓️ повтор.";
	var cPlan = "⏳ в плане";
	var cDone = "✔️ завершено";

	//Поля
	var fldType = curEntry.field (cType);
	var fldStatus = curEntry.field (cStatus);
	var fldStartDate = curEntry.field (cStartDate);
	var fldStartTime = curEntry.field (cStartTime);
	var fldEndDate = curEntry.field (cEndDate);
	var fldEndTime = curEntry.field (cEndTime);
	var fldCount = curEntry.field (cCount);
	var fldAuto = curEntry.field (cAuto);
	var fldInterval = curEntry.field (cInterval);

	//Прочее
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var dteEndDate = fldEndDate;
	var dteStartTime = fldStartTime;
	var cResult = "⚠️ Исправлено:";
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
