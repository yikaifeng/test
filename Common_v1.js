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
//Закрытые функции
//******************************************************************************

//******************************************************************************
//Открытые функции
//******************************************************************************

//==============================================================================
//Работа с текстом
//==============================================================================

//------------------------------------------------------------------------------
//Получить иконку из поля (первая группа символов, отделенная пробелпми)
//13.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//Return:
//	|string|
//------------------------------------------------------------------------------
function get_icon(field) {
	
	//Пустая строка, если поле пусто
	if (field == undefined) {
		return "";
	}

	//Пробуем привести к строке
	field = String(field);

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var icon = field.match(regexp);

	//Если иконки нет - пустая строка
	if (icon == null) {
		return "";
	} else {
		return icon[0];
	}
					
}
	
//------------------------------------------------------------------------------
//Соединить иконку одного поля с текстом (в том числе другого поля)
//13.06.2023 проверена
//Args:
//	icon_field|field, string| - поле записи с иконкой
//	icon_field|field, string| - поле записи с иконкой
//	space|bool| - вставить ли пробел
//Return:
//	|string|
///------------------------------------------------------------------------------
function add_icon(icon_field, text_field, space) {
	
	space = space || true;
	
	//Если нет значения - пустая строка
	if (icon_field == undefined) {
		icon_field = "";
	}

	//Пробуем привести к строке
	icon_field = String(icon_field);	
	text_field = String(text_field);

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var icon = icon_field.match(regexp);

	//Если иконки нет - толко текст
	if (icon == null) {
		return text_field.trim();
	} else {
		if (space) {
			  return icon[0] + " " + text_field.trim();
		} else {
			  return icon[0] + text_field.trim();
		}
	}

}

//------------------------------------------------------------------------------
//Получить строку без иконки в начале строки (удаляет первую группу символов,
//	отделенную пробелами
//13.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//Return:
//	|string|
//------------------------------------------------------------------------------	
function get_text(field) {	
    
	//Выход, если нет значения
	if (field == undefined) {
		return "";
	}
	
	//Пробуем привести к строке
	field = String(field);

	//Заменяем пустой строкой первую группу символов
	var regexp = /\s*\S+\s*/;
	var result = field.replace(regexp, "");
	result = result.trim();

	return result;

}

//------------------------------------------------------------------------------
//Отформатировать деньги (разделить по три разряда, добавить единицы измерения)
//13.06.2023 проверена
//Args:
//	field|field, string| - поле записи
//	unit|string| - единица измерения
//Return:
//	|string|
//------------------------------------------------------------------------------	
function format_money(field, unit) {
		
	//Выход, если нет значения
	if (field == undefined || field == "") {
		return "";
	}
		
	//Пробуем привести к числу
	nSum = Number(field);

	//Если числа нет - вернуть пустую строку
	if (isNaN(nSum)) {
		return "";
	}

	//Округляем до двух знаков
	nSum = nSum.toFixed(2);

	//Определяем знак	
	var sign = "";
	if (nSum < 0) {
		sign = "-";
		nSum = Math.abs(nSum);
		nSum = nSum.toFixed(2);
	}

	//Форматируем	
	nSum += "";
	nSum = new Array(4 - nSum.length % 3).join("U") + nSum;
	nSum = nSum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	nSum = sign + nSum;
	nSum = nSum.trim();
		
	//Добавляем единицы измерения
	if (unit != undefined) {
		return nSum + " " + String(unit);
	} else {
		return nSum;
	}		
			
}

//------------------------------------------------------------------------------
//Получить строку из символов табуляции
//19.06.2023 проверена
//Args:
//	number|int| - количество символов
//Return:
//	|string|
//------------------------------------------------------------------------------	
function tabs(number) {	
    
	//Выход, если нет значения
	if (number == undefined) {
		return "";
	}
	if (!Number.isInteger(number)) {
		return "";
	}
	if (number < 0) {
		return "";
	}
	
	return "\t".repeat(number);

}

//------------------------------------------------------------------------------
//Получить строку из символов
//19.06.2023 проверена
//Args:
//	number|int| - количество символов
//Return:
//	|string|
//------------------------------------------------------------------------------	
function sep(number, separator) {	
    
	separator = separator || "-";
	
	//Выход, если нет значения
	if (number == undefined) {
		return "";
	}
	if (!Number.isInteger(number)) {
		return "";
	}
	if (number < 0) {
		return "";
	}
	
	return separator.repeat(number);

}

//------------------------------------------------------------------------------
//Удалить крайний правый перенос строки в строке
//19.06.2023 проверена
//Args:
//	text_|string| - текст
//Return:
//	|string|
//------------------------------------------------------------------------------	
function del_last_enter(text_) {	
    
	//Выход, если нет значения
	if (text_ == undefined) {
		return "";
	} else {
		text_ = String(text_);
	}
	
	if (text_.length != 0) { 
		var last = text_.substring(text_.length-1, text_.length);
		if (last=="\n") {
			return text_.substring(0, text_.length-1);
		} else {
			return text_
		}
	} else {
		return text_
	}

}

//------------------------------------------------------------------------------
//Получить строку заданной ширины из символов табуляции слева от текста
//19.06.2023 проверена
//Args:
//	rtext|string| - текст справа от табуляции
//	width|integer| - общая ширина текста
//Return:
//	|string|
//------------------------------------------------------------------------------	
function left_tabs(rtext, width) {	

	//Преобразуем в текст
	if (rtext == undefined) {
		rtext = "";
	} else {
		rtext = String(rtext);
	}
	
	//Если не указана ширина - вернуть текст
	if (width == undefined || !Number.isInteger(width)) {
		return rtext;
	}
	if (width < 0) {
		return rtext;
	}
	
	//Если ширина меньше текста, вернуть текст
	if (width <= rtext.length) {
		return rtext;
	} else {
		var number = width - rtext.length;
		return tabs(number) + rtext;
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
//Return:
//	|string|
//------------------------------------------------------------------------------	
function between_tabs(ltext, rtext, width, postfix) {	
	
	postfix = postfix || "";
	
	//Преобразуем в текст
	if (ltext == undefined) {
		ltext = "";
	} else {
		ltext = String(ltext);
	}
	if (rtext == undefined) {
		rtext = "";
	} else {
		rtext = String(rtext);
	}
	
	//Если не указана ширина - вернуть текст
	if (width == undefined || !Number.isInteger(width)) {
		return ltext + postfix + rtext;
	}
	if (width < 0) {
		return ltext + postfix + rtext;
	}
	
	//Если ширина меньше текста, вернуть текст
	if (width <= (ltext.length + postfix.length + rtext.length)) {
		return ltext + postfix + rtext;
	} else {
		var number = width - (ltext.length + postfix.length + rtext.length);
		return ltext + postfix + tabs(number) + rtext;
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
//Return:
//	|string|
//------------------------------------------------------------------------------	
function statistics(names, values, levels, width, postfix, p0, p1, p2, unit) {	

	//Результат
	var res = ["", ""];
	
	postfix = postfix || "";
	p0 = p0 || "";
	p1 = p1 || "- ";
	p2 = p2 || "- - ";
	unit = unit || "";
	
	//Если не переданы массивы - то ничего
	if (names == undefined || values == undefined || levels == undefined) {
		res[0] = "🚫";
		res[1] = "не переданы все массивы: names, values, levels";
		return res;
	} 
	
	//Если не переданы массивы - то ничего
	if (names.length != values.length || names.length != levels.length) {
		res[0] = "🚫";
		res[1] = "длина массивов names, values, levels не одинакова";
		return res;
	} 
	
	res[1] += "Array length: " + names.length + "\n";
	len = names.length - 1;
	res[1] += "[Before for]\n";
	
	for (let i = 0; i < len; i++) {
		res[1] += "[For: " + i + "]\n";
		var ltext = "";
		if (levels[i]==0) { 
			ltext = p0 + names[i]; 
		} else if (levels[i]==1) {
			ltext = p1 + names[i];
		} else if (levels[i]==2) {
			ltext = p2 + names[i];
		} else {
			ltext = p0 + names[i];
		}
		res[1] += "ltext: " + ltext + "\n";
		res[1] += "ltext: " + values[i] + "\n";
		var rtext = values[i] + unit;
		res[0] += between_tabs(ltext, rtext, width, postfix) + "\n";
	}
	
	res[1] += "[After for]";
	
	res[0] = del_last_enter(res[0])
	
	return res;

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
	
