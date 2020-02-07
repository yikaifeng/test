//==============================
//Пуст ли массив
function isEmpty(arrEntries) {
	if (arrEntries.length == 0) {
		return true;
	} else {
		return false;
	}
}
//==============================
//Функция для получения иконки
function getIcon(strSource, strAddString) {
	
	//проверка, не пустая ли строка источника
	if (strSource == undefined) {
		return "";
	}
	
	var separator = " ";
	strIcon = String(strIcon);
	var strIcon = strSource.split(separator,1)[0];
	if (strAddString == undefined) {
		return strIcon;
	} else {
		strAddString = String(strAddString);
		return strIcon + " " + strAddString;
	}
}
//==============================
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
//==============================
//Вывод остатка времени
function DaysLeft (dteTarget) {
	dteToday = new Date();
	return (dteTarget - dteToday)/(1000*3600*24);
}
