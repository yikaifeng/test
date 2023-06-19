//******************************************************************************
//Common - библиотека общих функций
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
		
	//Если нет значения - пустая строка
	if (icon_field == undefined) {
		icon_field = "";
	}

	//Пробуем привести к строке
	icon_field = String(icon_field);	
	text_field = String(text_field);

	//Параметры по умолчанию: ставить пробел
	var bSp = true;
	if (space != undefined) { bSp = space; }

	//Шаблон поиска иконки: первая группа символов не из пробелов
	var regexp = /\S+/;

	//Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
	var icon = icon_field.match(regexp);

	//Если иконки нет - толко текст
	if (icon == null) {
		return text_field.trim();
	} else {
		if (bSp) {
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
	
