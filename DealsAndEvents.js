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
var cCategory = "Категория";
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
var fldCategory = curEntry.field(cCategory);
var fldStartDate = curEntry.field (cStartDate);
var fldStartTime = curEntry.field (cStartTime);
var fldEndDate = curEntry.field (cEndDate);
var fldEndTime = curEntry.field (cEndTime);
var fldName = curEntry.field (cName);
var fldCount = curEntry.field (cCount);
var fldUnit = curEntry.field (cUnit);
var fldAuto = curEntry.field (cAuto);
var fldInterval = curEntry.field (cInterval);

//**********************************************************
//Private functions
//**********************************************************
//----------------------------------------------------------
//Вспомогательная функция для shiftAuto
//----------------------------------------------------------
function isExpired(deal1) {
	
	log("\nВЫПОЛНЕНИ ФУНКЦИИ isExpired(deal1)");
	//log("\n*deal1: " + deal1.title);
	var strDate = cStartDate;
	
	if (deal1.field(cEndDate) != undefined) {
		strDate = cEndDate;
	}
	
	var dte = new Date();
	//log("**DATE: " + deal1.field(strDate) + "\n**TDY: " + dte);
	//log("\nSTR: " + deal1.field(cStartDate) + "\nEND: " + deal1.field(cEndDate) + "\nTDY: " + dte);
	if (deal1.field(cAuto) == 1) {log("\n+авто");}
	if (deal1.field(cType)==cPeriod) {log("\n+тип");}
	if (deal1.field(strDate).getFullYear() <= dte.getFullYear()) {log("\n+год");}
	if (deal1.field(strDate).getMonth() <= dte.getMonth()) {log("\n+месяц");}
	if (deal1.field(strDate).getDay() < dte.getDay()) {log("\n+день");}	
	
	if (deal1.field(cAuto) == 1 && 
		deal1.field(cType)==cPeriod &&
		deal1.field(strDate).getFullYear() <= dte.getFullYear() &&
		deal1.field(strDate).getMonth() <= dte.getMonth() &&
		deal1.field(strDate).getDay() < dte.getDay()) {
			return true;
		} else {
			return false;
		}
}
//----------------------------------------------------------
//Функция для получения иконки
//----------------------------------------------------------
function getIcon(strSource, strAddString) {
	
	//проверка, не пустая ли строка источника
	if (strSource == undefined) {
		return "";
	}
	
	var separator = " ";
	strSource = String(strSource);
	var strIcon = strSource.split(separator,1)[0];
	if (strAddString == undefined) {
		return strIcon;
	} else {
		strAddString = String(strAddString);
		return strIcon + " " + strAddString;
	}
}
//----------------------------------------------------------
//Функция для получения названия без иконки
//----------------------------------------------------------
function getName(strSource) {
	
	//проверка, не пустая ли строка источника
	if (strSource == undefined) {
		return "";
	}
	
	var separator = " ";
	strSource = String(strSource);
	var strIcon = strSource.split(separator,1)[0];
	var strName = strSource.slice(strIcon.length);
	return strName = strName.trim();
}
//**********************************************************
//Public functions
//**********************************************************
//----------------------------------------------------------
//Функция для коррекци неправильного заполнения полей
//----------------------------------------------------------
function checkDeal() {
	log("\nВЫПОЛНЕНИ ФУНКЦИИ checkDeal()\nИМЯ ЗАПИСИ: " + curEntry.title);
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

//----------------------------------------------------------
//Функция переноса даты вперед или назад
//----------------------------------------------------------
function shiftDate(bForward, deal) {
		
	//Лог
	log("\nВЫПОЛНЕНИ ФУНКЦИИ shiftDate(bForward, deal)");
	
	//Выход, если не включен счёт переодичности
	if (!deal.field(cCount)) {
		message("⚠️ Периодичность не включена");
		exit();
	}
	
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;
	//Направление сдвига
	var direction = 0;
	
	log("\n*bForward= " + bForward);
	if (bForward != false) {direction = 1;} else {direction = -1;}
	
	if (deal == undefined) {
		deal = curEntry;
		log("\n*deal(cur): " + deal);
	} else {
		log("\n*deal(snd): " + deal.title);
		bShowMessage = false;
		fldStartDate = deal.field(cStartDate);
		fldEndDate = deal.field(cEndDate);
		fldInterval = deal.field(cInterval);
	}
	
	switch (deal.field(cUnit)) {

		case cDay:
			fldStartDate.setDate(fldStartDate.getDate() + direction*fldInterval);
			deal.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setDate(fldEndDate.getDate() + direction*fldInterval);
				deal.set(cEndDate, fldEndDate);
			}
			break;

		case cWeek:
			fldStartDate.setDate(fldStartDate.getDate() + direction*fldInterval*7);
			deal.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setDate(fldEndDate.getDate() + direction*fldInterval*7);
				deal.set(cEndDate, fldEndDate);
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

			deal.set(cStartDate, fldStartDate);

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

				deal.set(cEndDate, fldEndDate);
			}
			break;

		case cYear:
			fldStartDate.setFullYear(fldStartDate.getFullYear() + direction*fldInterval);
			deal.set(cStartDate, fldStartDate);
			if (fldEndDate != undefined) {
				fldEndDate.setFullYear(fldEndDate.getFullYear() + direction*fldInterval);
				deal.set(cEndDate, fldEndDate);
			}
			break;
		
		default: break;
		
		}
	
	if (bShowMessage) {message("✔️ Дата изменена");}

	//Лог
	log("\nСДВИГ НА:" + direction*deal.field(cInterval) + " " + deal.field(cUnit));
	
}

//----------------------------------------------------------
//Функция автоматического сдвига даты
//----------------------------------------------------------
function shiftAuto() {
	//Лог
	log("\nВЫПОЛНЕНИ ФУНКЦИИ shiftAuto()");
	log("\nБИБЛИОТЕКА: " + curLib.title + "\n*(" + deals.length + " записей)");
	
	var count = 0;
	
	for (var i = 0; i < deals.length; i++) {
		var deal = deals[i];
		if (isExpired(deal)) {
				log("\nНАЙДЕНА ЗАПИСЬ ДЛЯ ПЕРЕНОСА: " + deal.title);
				count = count + 1;
				while (isExpired(deal)){
					log("DATE1: " + deal.field(cStartDate) + "\nDATE2: " + deal.field(cEndDate));
					shiftDate(true, deal);
				}
		}
	}
	
	message("✔️ Перенесены даты: " + count + " (запись)");
	
}

//----------------------------------------------------------
//Функция автоматического сдвига даты
//----------------------------------------------------------
function daysLeft() {
	var res = " дн.";
	var dteToday = new Date();
	var dteDiff = (dteTarget - dteToday)/(1000*3600*24);
	dteDiff = dteDiff.toFixed(0);
	
	if (dteDiff<=3 && fldStatus!=cDone) {
		res = "🔥" + dteDiff + res;
	} else if (dteDiff>3 && dteDiff<8 && fldStatus!=cDone) {
		res = "⏱️" + dteDiff + res;
	} else {
		res = dteDiff + res;
	}
	
	return res;
	
}

//----------------------------------------------------------
//Функция для вывода названия
//----------------------------------------------------------
function getDealName() {
	return getIcon(fldCategory, fldName);
}

//----------------------------------------------------------
//Функция для вывода типа
//----------------------------------------------------------
function getDealType() {
	return getIcon(fldType);
}

//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getDealStatus() {
	var ico = getIcon(fldStatus);
	if (ico=="⏳") {
		return "";
	} else {
		return ico;
	}
}
