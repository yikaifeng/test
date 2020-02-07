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
