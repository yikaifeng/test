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

//Прочее
var bEndDate = false;
var bStartTime = false;
var bEndTime = false;
var dteEndDate = fldEndDate;
var dteStartTime = fldStartTime;
var strResult = "Исправлено:";

//Проверка соответствия типа и статуса
if (fldType==cPeriod && fldStatus==cDone) {
	curEntry.set(cStatus, cPlan);
	strResult = strResult + "\n*статус";
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
		strResult = strResult + "\n*дата окончания";
	}
} else {
	if (bEndTime) {
		curEntry.set(cEndDate, fldStartDate);
		dteEndDate = fldStartDate;
		strResult = strResult + "\n*дата окончания";
	}
}

//Проверка времени начала
if (!bStartTime) {
	if(bEndTime) {
		curEntry.set(cStartTime, fldEndTime);
		dteStartTime = fldEndTime;
		strResult = strResult + "\n*время начала";
	}
}

//Проверка времени окончания
if (bEndTime) {
	if (dteEndDate.getFullYear()==fldStartDate.getFullYear() && 
	dteEndDate.getMonth()==fldStartDate.getMonth() && 
	dteEndDate.getDate()==fldStartDate.getDate() &&
	fldEndTime < dteStartTime) {
		curEntry.set(cEndTime, dteStartTime);
		strResult = strResult + "\n*время окончания";
	}
}

curEntry.recalc();

if (strResult!="Исправлено:") {
	message(strResult);	
}

}
