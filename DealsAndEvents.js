//**********************************************************
//Глобальные переменные
//**********************************************************

//Текущая запись и библиотека
var curLib = lib();
var deals = curLib.entries();
var curDeal = entry();

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

//**********************************************************
//Private functions
//**********************************************************
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
	log("\nВЫПОЛНЕНИ ФУНКЦИИ checkDeal()\nИМЯ ЗАПИСИ: " + curDeal.title);
	//Локальные переменные
	var curDeal = entry();
	//Поля
	var fldType = curDeal.field (cType);
	var fldStatus = curDeal.field (cStatus);
	var fldStartDate = curDeal.field (cStartDate);
	var fldStartTime = curDeal.field (cStartTime);
	var fldEndDate = curDeal.field (cEndDate);
	var fldEndTime = curDeal.field (cEndTime);
	var fldCount = curDeal.field (cCount);
	var fldAuto = curDeal.field (cAuto);
	var fldInterval = curDeal.field (cInterval);
	//прочее
	var cResult = "⚠️ Исправлено:";
	var bEndDate = false;
	var bStartTime = false;
	var bEndTime = false;
	var dteEndDate = fldEndDate;
	var dteStartTime = fldStartTime;
	var strResult = cResult;

	//Проверка соответствия типа и статуса
	if (fldType==cPeriod && fldStatus==cDone) {
		curDeal.set(cStatus, cPlan);
		strResult = strResult + "\n*" + cStatus;
	}
	//Проверка времени и дат на существование
	if (fldEndDate == undefined) {bEndDate = false;} else {bEndDate = true;}
	if (fldStartTime == undefined) {bStartTime = false;} else {bStartTime = true;}
	if (fldEndTime == undefined) {bEndTime = false;} else {bEndTime = true;}

	//Проверка даты окончания
	if (fldEndDate) {
		if (fldEndDate<fldStartDate) {
			curDeal.set(cEndDate, fldStartDate);
			dteEndDate = fldStartDate;
			strResult = strResult + "\n*" + cEndDate;
		}
	} else {
		if (bEndTime) {
			curDeal.set(cEndDate, fldStartDate);
			dteEndDate = fldStartDate;
			strResult = strResult + "\n*" + cEndDate;
		}
	}

	//Проверка времени начала
	if (!bStartTime) {
		if(bEndTime) {
			curDeal.set(cStartTime, fldEndTime);
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
			curDeal.set(cEndTime, dteStartTime);
			strResult = strResult + "\n*" + cEndTime;
		}
	}

	//Проверка вычисления переодичности и смены дат
	if (fldType!=cPeriod && fldCount==1) {
		curDeal.set(cCount, 0);
		strResult = strResult + "\n*" + cCount;
	}
	if (fldType!=cPeriod && fldAuto==1) {
		curDeal.set(cAuto, 0);
		strResult = strResult + "\n*" + cAuto;
	}

	//Проверка интервала
	if (fldInterval!=undefined && fldInterval<0) {
		curDeal.set(cInterval, Math.abs(fldInterval));
		strResult = strResult + "\n*" + cInterval;
	}

	curDeal.recalc();

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
	//Локальные переменные
	var curDeal = entry();
	
	//Показывать ли сообщение о смене даты
	var bShowMessage = true;
	//Направление сдвига
	var direction = 0;
	
	log("\n*bForward= " + bForward);
	if (bForward != false) {direction = 1;} else {direction = -1;}
	
	if (deal == undefined) {
		deal = curDeal;
		log("\n*deal(cur): " + deal);
	} else {
		log("\n*deal(snd): " + deal.title);
		bShowMessage = false;
	}
	
	var fldStartDate = deal.field(cStartDate);
	var fldEndDate = deal.field(cEndDate);
	var fldInterval = deal.field(cInterval);
	
	//Выход, если не включен счёт переодичности
	if (!deal.field(cCount)) {
		message("⚠️ Периодичность не включена");
		exit();
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
	var loop = 100;
	var today = new Date();
	today = today.setHours(0,0,0,0);
	
	//Перебираем значения
	for (var i = 0; i < deals.length; i++) {
		
		//Текущее в цикле дело
		var deal = deals[i];
		
		//Если оно переодическое и нужно считать
		if (deal.field(cAuto) == 1 && deal.field(cType)==cPeriod) {
			//Считаем по дате начала по умолчанию
			var strDate = cStartDate;
			//Если есть дата конца, то по ней
			if (deal.field(cEndDate) != undefined) {
				strDate = cEndDate;
			}
			//Ищем просроченное дело			
			if (deal.field(strDate) < today) {
				//Если событие дело
				log("\nНАЙДЕНА ЗАПИСЬ ДЛЯ ПЕРЕНОСА: " + deal.title);
				count = count + 1;
				
				while (deal.field(strDate) < today && loop !=0){
					log("\nWHILE\n*поле: " + deal.field(strDate));

					shiftDate(true, deal);
					loop = loop - 1;
				}
			}
		}		
	}
	
	message("✔️ Перенесены даты: " + count + " (запись)");
	
}

//----------------------------------------------------------
//Функция автоматического сдвига даты
//----------------------------------------------------------
function daysLeft() {
	
	//Локальные переменные
	var curDeal = entry();
	//Поля
	var fldStartDate = curDeal.field (cStartDate);
	
	var res = " дн.";
	var dteToday = new Date();
	var dteDiff = (fldStartDate - dteToday)/(1000*3600*24);
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
	//Локальные переменные
	var curDeal = entry();
	//Поля
	var fldCategory = curDeal.field (cCategory);
	var fldName = curDeal.field (cName);
	return getIcon(fldCategory, fldName);
}

//----------------------------------------------------------
//Функция для вывода типа
//----------------------------------------------------------
function getDealType() {
	//Локальные переменные
	var curDeal = entry();
	//Поля
	var fldType = curDeal.field (cType);
	return getIcon(fldType);
}

//----------------------------------------------------------
//Функция для вывода статуса
//----------------------------------------------------------
function getDealStatus() {
	//Локальные переменные
	var curDeal = entry();
	//Поля
	var fldStatus = curDeal.field (cStatus);
	var ico = getIcon(fldStatus);
	if (ico=="⏳") {
		return "";
	} else {
		return ico;
	}
}
