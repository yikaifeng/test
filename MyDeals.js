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

//Сообщение
var strResult = "Исправлено:";

//Проверка соответствия типа и статуса
if (fldType==cPeriod && fldStatus==cDone) {
	curEntry.set(cStatus, cPlan);
	strResult = strResult + "\n*статус";
}

//Проверка даты окончания (есть ли время окнчания)
if (fldEndDate==undefined && fldEndTime!=undefined) {
	curEntry.set(cEndDate, fldStartDate);
	strResult = strResult + "\n*дата окончания";
}

//Проверка даты окончания (не раньше ли даты начала)
if (fldEndDate!=undefined && fldEndDate<fldStartDate) {
	curEntry.set(cEndDate, fldStartDate);
	strResult = strResult + "\n*дата окончания";
}

//Проверка времени начала (есть ли время начала при времени окончания)
if (fldEndTime!=undefined && fldStartTime==undefined) {
	curEntry.set(cStartTime, fldEndTime);
	strResult = strResult + "\n*время начала";
}

if (fldStartTime < fldEndTime) {
	log("START < END");
}
if (fldStartTime == fldEndTime) {
		log("START = END");
}
if (fldStartTime > fldEndTime) {
		log("START > END");
}

//Проверка времени окончания
if (fldEndDate==fldStartDate && fldEndDate!=undefined) {
	if (fldEndTime<fldStartTime) {
		curEntry.set(cEndTime, fldStartTime);
		strResult = strResult + "\n*время окончания";
	}
}

curEntry.recalc();

if (strResult!="Исправлено:") {
	message(strResult);	
}

}
