//******************************************************************************
//Common - библиотека общих функций
//
//get_icon(field)
//add_icon(icon_field, text_field, space)
//get_text(field)
//format_money(field, unit)
//tabs(number)
//sep(number, separator="-")
//del_last_enter(text_)
//left_tabs(rtext, width)
//between_tabs(ltext, rtext, width, postfix="")
//statistics(names, values, levels, width, postfix="", p0="", p1="- ", p2="- - ", unit="")
//*******************************************************************************
"use strict";

//******************************************************************************
//Константы
//******************************************************************************

//******************************************************************************
//Переменные
//******************************************************************************

//******************************************************************************
//Классы
//******************************************************************************
//------------------------------------------------------------------------------
//Результат (результат + отладочная информация)
//19.06.2023 проверена
//Args:
//	result|any| - результат
//	info|any| - информация
//------------------------------------------------------------------------------
class Result {
	
	constructor(result, info) { 
		this.result = result;
		info = info || "нет информации";		
		this.info = info;
	}

}
//******************************************************************************
//Закрытые функции
//******************************************************************************

//******************************************************************************
//Открытые функции
//******************************************************************************

//==============================================================================
//Работа с текстом
//==============================================================================

//------------------------------------------------------------------------------
//Получить строку из символов
//19.06.2023 проверена
//Args:
//	number|int| - количество символов
//	symbol|string| - символ заполнения
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function fill(number, symbol) {	

	//Результат
	res = Result();
    
	//Значения по умолчанию
	symbol = symbol || "\t";
	
	//Пробуем привести к строке
	symbol = String(symbol);
	res.info += "symbol: [" + symbol + "]" + "\n";
	
	//Пустая строка, если число не определен
	if (number == undefined) {
		res.result = "";
		res.info += "number is undefined" + "\n";
		return res;
	}
	//Пустая строка, если число не целое
	if (!Number.isInteger(number) ) {
		res.result = "";
		res.info += "number is not Integer" + "\n";
		return res;
	}
	
	//Пустая строка, если число меньше нуля
	if (number < 0) {
		res.result = "";
		res.info += "number < 0" + "\n";
		return res;
	}
	
	res.result = symbol.repeat(number);
	
	return res;

}

//------------------------------------------------------------------------------
//Удалить крайний правый перенос строки в строке
//19.06.2023 проверена
//Args:
//	text_|string| - текст
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function del_last_enter(text_) {

	//Результат
	res = Result();
    
	//Выход, если нет значения
	if (text_ == undefined) {
		res.result = "";
		res.info += "text_ is undefined" + "\n";
		return res;
	} else {
		text_ = String(text_);
		res.info += "text: [" + text_ + "]" + "\n";
	}
	
	if (text_.length != 0) { 
		var last = text_.substring(text_.length-1, text_.length);
		if (last=="\n") {
			res.result =  text_.substring(0, text_.length-1);
		} else {
			res.result = text_;
		}
	} else {
		res.result = text_;
	}
	
	return res;

}

//------------------------------------------------------------------------------
//Получить иконку из поля (первая группа символов, отделенная пробелпми)
//16.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------
function get_icon(field) {
	
	//Результат
	res = Result();
	
	//Возвращаем пустую строку, если не передано поле
	if (field == undefined) {
		res.result = "";
		res.info += "field is undefined" + "\n";
		return res;
	}

	//Пробуем привести к строке
	field = String(field);
	res.info += "text: [" + field + "]" + "\n";

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var icon = field.match(regexp);

	//Если иконки нет - пустая строка
	if (icon == null) {
		res.result = "";
	} else {
		res.result = icon[0];
	}
	
	//Возвращаем результат
	return res;
					
}
	
//------------------------------------------------------------------------------
//Соединить иконку одного поля с текстом (в том числе другого поля)
//19.06.2023 проверена
//Args:
//	icon_field|field, string| - поле записи с иконкой
//	icon_field|field, string| - поле записи с иконкой
//	space|bool| - вставить ли пробел
//Return:
//	|Result(string, string)|
///------------------------------------------------------------------------------
function add_icon(icon_field, text_field, space) {
	
	//Результат
	res = Result();
	
	//Значения по умолчанию
	space = space || true;
	
	//Если нет значения - пустая строка
	if (icon_field == undefined) {
		res.info += "icon_field is undefined" + "\n";
		icon_field = "";
	}
	if (text_field == undefined) {
		res.info += "text_field is undefined" + "\n";
		text_field = "";
	}

	//Пробуем привести к строке
	icon_field = String(icon_field);
	res.info += "icon_field: [" + icon_field + "]" + "\n";	
	text_field = String(text_field);
	res.info += "text_field: [" + text_field + "]" + "\n";

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var icon = icon_field.match(regexp);

	//Если иконки нет - толко текст
	if (icon == null) {
		res.result = text_field.trim();
	} else {
		if (space) {
			res.result = icon[0] + " " + text_field.trim();
		} else {
			res.result = icon[0] + text_field.trim();
		}
	}
	
	return res;

}

//------------------------------------------------------------------------------
//Получить строку без иконки в начале строки (удаляет первую группу символов,
//	отделенную пробелами
//19.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function get_text(field) {

	//Результат
	res = Result();
    
	//Возвращает пустую строку, если поле неопределено
	if (field == undefined) {
		res.result = "";
		res.info += "field is undefined" + "\n";
		return res;
	}
	
	//Пробуем привести к строке
	field = String(field);
	res.info += "text: [" + field + "]" + "\n";

	//Заменяем пустой строкой первую группу символов
	var regexp = /\s*\S+\s*/;
	res.result = field.replace(regexp, "");
	res.result = res.result.trim();

	return res;

}

//------------------------------------------------------------------------------
//Отформатировать деньги (разделить по три разряда, добавить единицы измерения)
//19.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//	unit|string| - единица измерения
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function format_money(field, unit) {
	
	//Результат
	res = Result();	
	
	//Пустая строка, если поле не определено или пусто
	if (field == undefined || field == "") {
		res.result = "";
		res.info += "field is undefined or empty" + "\n";
		return res;
	}
		
	//Пробуем привести к числу
	sum = Number(field);

	//Если числа нет - вернуть пустую строку
	if (isNaN(nSum)) {
		res.result = "";
		res.info += "field doesn't contain number" + "\n";
		return res;
	}
	res.info += "number: [" + sum + "]\n";

	//Округляем до двух знаков
	sum = sum.toFixed(2);

	//Определяем знак	
	var sign = "";
	if (sum < 0) {
		sign = "-";
		sum = Math.abs(sum);
		sum = sum.toFixed(2);
	}

	//Форматируем	
	sum += "";
	sum = new Array(4 - sum.length % 3).join("U") + sum;
	sum = sum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	sum = sign + sum;
	sum = sum.trim();
		
	//Добавляем единицы измерения
	if (unit != undefined) {
		res.result = sum + " " + String(unit).trim();
	} else {
		res.result = sum;
	}

	return res;
			
}


//------------------------------------------------------------------------------
//Получить строку заданной ширины из символов  слева от текста
//19.06.2023 проверена
//Args:
//	rtext|string| - текст справа от символов
//	width|integer| - общая ширина текста
//	symbol|string| - символ заполнения
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function left_tabs(rtext, width, symbol) {	

	//Результат
	res = Result();	
	
	//Значения по умолчанию
	symbol = symbol || "\t";

	//Преобразуем в текст
	if (rtext == undefined) {
		res.info += "rtext is undefined" + "\n";
		rtext = "";
	} else {
		rtext = String(rtext);
		res.info += "rtext: [" + rtext + "]" + "\n";
	}
	
	//Если не указана ширина или не является числом - вернуть текст
	if (width == undefined || !Number.isInteger(width)) {
		res.result = rtext;
		res.info += "width is undefined" + "\n";
		return res;
	}
	//Если  ширина меньше 0 - вернуть текст
	if (width < 0) {
		res.result = rtext;
		res.info += "width < 0" + "\n";
		return res;
	}
	
	//Если ширина меньше текста, вернуть текст
	if (width <= rtext.length) {
		res.result = rtext;
		res.info += "width < rtext.length" + "\n";
		return res;
	} else {
		var number = width - rtext.length;
		res.result = fill(number, symbol) + rtext;
		res.info += "width < rtext.length" + "\n";
		return res;
	}

}

//------------------------------------------------------------------------------
//Соединить две строки табуляцией в строку заданной ширины
//19.06.2023 проверена
//Args:
//	ltext|string| - текст слева от табуляции
//	rtext|string| - текст справа от табуляции
//	width|integer| - общая ширина текста
//	postfix|string| - постфикс левого текста
//	symbol|string| - символ заполнения
//Return:
//	|Result(string, string)|
//------------------------------------------------------------------------------	
function between_tabs(ltext, rtext, width, postfix, symbol) {	
	
	//Результат
	res = Result();	
	
	//Значения по умолчанию
	postfix = postfix || "";
	symbol = symbol || "\t";
	
	//Преобразуем в текст
	if (ltext == undefined) {
		res.info += "ltext is undefined" + "\n";
		ltext = "";
	} else {
		ltext = String(ltext);
		res.info += "ltext: [" + ltext + "]" + "\n";
	}
	if (rtext == undefined) {
		res.info += "ltext is undefined" + "\n";
		rtext = "";
	} else {
		rtext = String(rtext);
		res.info += "rtext: [" + rtext + "]" + "\n";
	}
	
	//Если не указана ширина, не число или меньше нуля - вернуть текст
	if (width == undefined || !Number.isInteger(width)) {
		res.result = ltext + postfix + rtext;
		res.info += "width is undefined or is not Integer\n";
		return res;
	}
	if (width < 0) {
		res.result = ltext + postfix + rtext;
		res.info += "width <0\n";
		return res;
	}
	
	//Если ширина меньше текста, вернуть текст
	if (width <= (ltext.length + postfix.length + rtext.length)) {
		res.result = ltext + postfix + rtext;
		res.info += "width less than text\n";
		return res;
	} else {
		var number = width - (ltext.length + postfix.length + rtext.length);
		res.result = ltext + postfix + tabs(number, tab) + rtext;
		return res;
	}

}

//------------------------------------------------------------------------------
//Начало дня 0 часов 0 минут 0 секунд 000 миллисекунд
//13.06.2023 проверена
//Args:
//	field|field, date, string| - поле записи
//Return:
//	|Date|
//------------------------------------------------------------------------------	  
function day_start(field) {

	if (field == undefined || field == "")	{
		return "";
	} else {
		try {
			var dte = new Date(field);
			if (isNaN(dte)) {
				return "";
			}
			return new Date(dte.setHours(0, 0, 0, 0));
		}
		catch (e) {
			return "";
		}
	}

}

//------------------------------------------------------------------------------
//Конец дня 23 часов 59 минут 59 секунд 999 миллисекунд
//13.06.2023 проверена
//Args:
//	field|field, date, string| - поле записи
//Return:
//	|Date|
//------------------------------------------------------------------------------	
function day_end(field) {
		
	if (field == undefined || field == "")	{
		return "";
	} else {
		try {
			var dte = new Date(field);
			if (isNaN(dte)) {
				return "";
			}
			return new Date(dte.setHours(23, 59, 59, 999));
		}
		catch (e) {
			return "";
		}
	}

}

//------------------------------------------------------------------------------
//Остаток дней
//13.06.2023 проверена
//Args:
//	field|field, date, string| - поле записи с датой
//	reference|field, date, string| - относительно чего считаем
//	round|int| - до скольки знаков округляем
//Return:
//	|Date|
//------------------------------------------------------------------------------
function days_left(field, reference, round) {
	
	//Если нет целевой даты, то ничего
	if (field == undefined || field == "") {
		return "";
	} else {
		try {
			var dteTarget = new Date(field);
			if (isNaN(dteTarget)) {
				return "";
			}
		}
		catch (e) {
			return "";
		}
  }

	//Если нет отсчётной даты, то сегодня
	if (reference == undefined || reference == "") {
		var dteReference = new Date();
		dteReference = dteReference.setHours(0, 0, 0, 0);
	} else {
		try {
			var dteReference = new Date(reference);
			if (isNaN(dteReference)) {
				dteReference = new Date();
				dteReference = dteReference.setHours(0, 0, 0, 0);
			}
			dteReference = dteReference.setHours(0, 0, 0, 0);
		}
		catch (e) {
			var dteReference = new Date();
			dteReference = dteReference.setHours(0, 0, 0, 0);
		}
	}

	//Если не передано округление, то до целых
	if (round == undefined || round == "") {
		round = 0;
	} else {
		round = Number(round);
		if (isNaN(round)) {
			round = 0;
		} else {
			round = Math.abs(round);
			round = round.toFixed(0);
		}
	}

	//Разница в днях с сейчас
	var dDif = (dteTarget - dteReference)/(1000*3600*24);

	//Округляем
	dDif = dDif*(Math.pow(10, round));
	dDif = Math.floor(dDif);

	return dDif/(Math.pow(10, round));
						
}

//------------------------------------------------------------------------------
//Сдвиг даты
//13.06.2023 проверена
//Args:
//	field|field, date, string| - поле записи с датой
//	reference|field, date, string| - относительно чего считаем
//	round|int| - до скольки знаков округляем
//Return:
//	|Date|
//------------------------------------------------------------------------------
function shift_date(field, interval, unit, forward) {
		
	//Проверяем, передана ли дата
	if (field == undefined || field == "") {
    return;
	} else {
    dDate = new Date(field);
    if (isNaN(dDate)) { return; }
  }

	//Проверяем, переданан ли интервал в виде числа
	if (interval == undefined || interval == "") {
		return;
	} else {
		nInterval = Number(interval);
		if (isNaN(nInterval)) { return; }
		nInterval = Math.abs(nInterval);
		nInterval = nInterval.toFixed(0);
	}
	
	//Проверяем единицы сдвига
	if (unit == undefined || unit == "") { return; }
		
	//Проверяем, переданан единицы корректны ли
	var arrDay = ["d", "day", "days", "д", "д.", "дн", "дн.", "день", "дни", "дня", "дней"];
	var arrWeek = ["w", "week", "weeks", "н", "н.", "нед", "нед.", "неделя", "недели", "неделей"];
	var arrMonth = ["m", "month", "months", "м", "м.", "мес", "мес.", "месяц", "месяцы", "месяца", "месяцев"];
	var arrYear = ["y", "year", "years", "г", "г.", "л", "л.", "год", "лет", "года", "годы"];

	var arrUnits = [].concat(arrDay, arrWeek, arrMonth, arrYear);
		
	if (arrUnits.indexOf(unit) == -1) { return; }
		
	//Проверяем, направление логическая ли величина
	if (forward == undefined) {
		bForward = true;
	}	else {
		bForward = Boolean(forward);
	}
		
	//выбираем направление сдвига
	var sign;
	if (bForward) {sign = 1;} else {sign = -1;}

	//Осуществляем сдвиг

	//Дни
	if (arrDay.indexOf(unit) != -1) {
		dDate.setDate(dDate.getDate() + sign*nInterval);
	}

	//Недели
	if (arrWeek.indexOf(unit) != -1) {
		dDate.setDate(dDate.getDate() + sign*nInterval*7);
	}

	//Месяцы
	if (arrMonth.indexOf(unit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var nOriginalDate = dDate.getDate();
		dDate.setDate(1);
						
		//Прибавляем нужное число месяцев
		dDate.setMonth(dDate.getMonth() + sign*nInterval);
		var nNewMonth = dDate.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dDate.setDate(nOriginalDate);
						
		var loop = 10;
		while (nNewMonth != dDate.getMonth() && loop>=0) {
			dDate.setDate(dDate.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
	}

	//Годы
	if (arrYear.indexOf(unit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var nOriginalDate = dDate.getDate();
		dDate.setDate(1);
						
		//Прибавляем нужное число лет
		dDate.setFullYear(dDate.getFullYear() + sign*nInterval);
		var nNewMonth = dDate.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dDate.setDate(nOriginalDate);
						
		var loop = 10;
		while (nNewMonth != dDate.getMonth() && loop>=0) {
			dDate.setDate(dDate.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
      
	}
    	
  return dDate;

}

//------------------------------------------------------------------------------
//Получить записи в библиотеке по условию для поля
//14.06.2023 проверена
//Args:
//	entries|array| - массив записей
//	field_name|string| - название поля
//	values|array| - массив допустимых значений поля
//Return:
//	|array|
//------------------------------------------------------------------------------	
function filter_entries(entries, field_name, values) {
	
	if (entries == undefined)	{
		return "";
	}
	
	if (field_name == undefined)	{
		return "";
	}
	
	if (values == undefined)	{
		return "";
	}
	
	var result = []
	
	//Перебор записей
	for (var n = 0; n < entries.length; n++) {
        if (values.indexOf(entries[n].field(field_name)) != -1) {
			result.push(entries[n]);
		}
    }  
		
	return result;

}
