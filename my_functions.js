//***********************************
//Функции времени и дат
//***********************************
//Вывод остатка времени
function timeLeft (dteTarget, strUnit, nRoundDigits) {
	
	dteToday = new Date();
	dteDiff = dteTarget - dteToday;
	
	switch strUnit {
		case udefined: dteDiff = dteDiff/(1000*3600*24); //дни
			break;
		case "ms": break; //миллисекунды
		case "sec": dteDiff = dteDiff/(1000); //секунды
			break;
		case "min": dteDiff = dteDiff/(1000*60); //минуты
			break;
		case "h": dteDiff = dteDiff/(1000*3600); //часы
			break;
		case "d": dteDiff = dteDiff/(1000*3600*24); //дни
			break;	
		case "w": dteDiff = dteDiff/(1000*3600*24*7); //недели
			break;		
		case "m": dteDiff = dteDiff/(1000*3600*24*30); //месяцы
			break;
		case "y": dteDiff = dteDiff/(1000*3600*24*365); //годы
			break;
		case default: dteDiff = dteDiff/(1000*3600*24); //дни
			break;			
	}
	
	switch nRoundDigits {
		case udefined: dteDiff = dteDiff.toFixed(0);
			break;
		case 2: dteDiff = dteDiff.toFixed(2);
			break; 
		case 1: dteDiff = dteDiff.toFixed(1);
			break;
		case default: dteDiff = dteDiff.toFixed(0);
			break;			
	}
	

	return dteDiff;

}
//Вывод остатка дней
function daysLeft (dteTarget) {	
	dteToday = new Date();
	dteDiff = (dteTarget - dteToday)/(1000*3600*24);
	return dteDiff.toFixed(0);
}
//***********************************

//***********************************
//Функции форматирования
//***********************************
//Функция для получения иконки
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
//Функция для получения названия без иконки
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
//Форматирование отображения денег
function formatMoney(fltSum) {

	var sign = "";
	var n = fltSum;

	if (n<0) {
		sign = "-";
		n = Math.abs(n);
		n = n.toFixed(2);
	}

	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	n = n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	n = sign + n;
	return n;
}
//***********************************

//***********************************
//Функции библиотек
//***********************************
//Пуст ли массив
function isEmpty(arrEntries) {
	if (arrEntries.length == 0) {
		return true;
	} else {
		return false;
	}
}
//***********************************
