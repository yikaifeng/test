//==============================================================================
//Common - библиотека общих функций
//
//sep(number=0, symbol="\t")
//pref(text_="", symbol="- ")
//suf(text_="", symbol="")
//lcut(text_="")
//rcut(text_="")
//ltext(text_="")
//rtext(text_="")
//lfill(rtext_="", width=0)
//fill(ltext_="", rtext_="", width=0, suf_="")
//fillc(ltext_="", rtext_="", width=0)
//fillarr(larr, rarr, widtharr, suf_="")
//fillcarr(larr, rarr, widtharr)
//insert_aftern(text_="", add_="", after=0)
//insert_aftert(text_="", add_="", after="")
//money(sum=0, unit="", show=false)
//day_start(date_= new Date())
//day_end(date_= new Date())
//days_left(date_, reference= new Date(), round=0)
//shift_date(date_, interval=0, unit="d", forward=true)
//filter_entries(field_name="", values=[], entries=lib().entries())
//sort_entries(field_name="", entries=lib().entries())
//count_entries(field_name="", entries=lib().entries())
//==============================================================================
"use strict";

//==============================================================================
//Классы
//==============================================================================

//------------------------------------------------------------------------------
//Для возврата результата из функции count_entries
//Args:
//	names (Array): массив имён
//	values (Array): массив значений
//	widths (Array): массив ширин
//
//	width(Integer=0): устанавливает одну ширину для всено массива ширин
//	correct(name="", rel=0): изменяет для какого-то названия относительное 
//		значение шириины
//------------------------------------------------------------------------------	
var Statistics = function(names, values, widths) {	
  
	this.n = names;
	this.v = values;
	this.w = widths;
	
	this.width = function(width_) {
		
		//Значения по умолчанию и преобразование типов
		width_ = parseInt(width_ || 0);
		width_ = (isNaN(width_)) ? 0 : width_;
		
		var w_ = [];
		
		for (var k = 0; k < this.n.length; k++) {
			w_.push(width_);
		}  
		
		this.w = w_;
		
		return;
	}
	
	this.correct = function(name, rel) {
		
		//Значения по умолчанию и преобразование типов
		name = String(name || "");
		rel = parseInt(rel || 0);
		rel = (isNaN(rel)) ? 0 : rel;
		
		var ind = this.n.indexOf(name);
		if (ind!=-1) {
			this.w[ind] += rel;
			return;
			
		}
	}

}


//==============================================================================
//Работа с текстом
//==============================================================================

//------------------------------------------------------------------------------
//Возвращает строку из заданных символов заданной длины
//Args:
//	number (integer, default=0): количество символов
//	symbol (string, default="\t"): символ заполнения
//Return:
//	(string)
//------------------------------------------------------------------------------	
function sep(number, symbol) {	
  
	//Значения по умолчанию и преобразование типов
	symbol = String(symbol || "\t");
	number = parseInt(number || 0);
	
	//Вернуть пустую строку, если число не целое или меньше 0
	if (!Number.isInteger(number) || number < 0) {
		return "";
	}
	
	//Результат
	return symbol.repeat(number);

}

//------------------------------------------------------------------------------
//Возвращает строку co вставленными префиксами в начале каждой строки
//Args:
//	text_ (string, default=""): строка
//	symbol (string, default="- "): символ префикса
//Return:
//	(string)
//------------------------------------------------------------------------------	
function pref(text_, symbol) {

	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	symbol = String(symbol || "- ");
	
	//Шаблон
	var re = /^/gm;
    
	//Результат
	return text_.replace(re, symbol);

}

//------------------------------------------------------------------------------
//Возвращает строку со вставленными суффиксами в конце каждой строки
//Args:
//	text_ (string, default=""): строка
//	symbol (string, default="- "): символ префикса
//Return:
//	(string)
//------------------------------------------------------------------------------	
function suf(text_, symbol) {

	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	symbol = String(symbol || "");
	
	//Шаблон
	var re = /$/gm;
    
	//Результат
	return text_.replace(re, symbol);

}

//------------------------------------------------------------------------------
//Возвращает строку из первой группа символов слева, отделенную пробелом. 
//	Если  нет пробелов, то всю строку
//Args:
//	text_ (string): строка
//Return:
//	(string)
//------------------------------------------------------------------------------
function lcut(text_) {
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	
	//Шаблон
	var re = /^\s*?(\S+?)\s+?.*$/;
    
	//Результат
	return text_.replace(re, "$1");
					
}

//------------------------------------------------------------------------------
//Возвращает строку из первой группа символов справа, отделенную пробелом. 
//	Если  нет пробелов, то всю строку
//Args:
//	text_ (string): строка
//Return:
//	(string)
//------------------------------------------------------------------------------
function rcut(text_) {
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	
	//Шаблон
	var re = /^.*\s+?(\S+?)$/;
    
	//Результат
	return text_.replace(re, "$1");
					
}

//------------------------------------------------------------------------------
//Возвращает строку без последней группы символов, отделенной пробелом. Если  нет
//	пробелов, то всю строку
//Args:
//	text_ (string): строка
//Return:
//	(string)
//------------------------------------------------------------------------------
function ltext(text_) {
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	
	//Шаблон
	var re = /^(.*)\s+?\S+?$/;
    
	//Результат
	return text_.replace(re, "$1");
					
}

//------------------------------------------------------------------------------
//Возвращает строку без первой группы символов, отделенной пробелом. Если  нет
//	пробелов, то всю строку
//Args:
//	text_ (string): строка
//Return:
//	(string)
//------------------------------------------------------------------------------
function rtext(text_) {
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	
	//Шаблон
	var re = /^\s*?\S+?\s+?(.*)$/;
    
	//Результат
	return text_.replace(re, "$1");
					
}	

//------------------------------------------------------------------------------
//Возвращает строку, слева от которой добавлены \t так, чтобы общая длина строки
//	была равна заданной. Если заданная длина меньше длины текста, то возвращает
//	исходный текст. Функция иммитирует выравнивание по правому краю.
//Args:
//	rtext_ (string, default="") - текст, помещаемый справа от \t
//	width (integer, default=0) - общая ширина текста
//Return:
//	(string)
//------------------------------------------------------------------------------	
function lfill(rtext_, width) {	

	//Значения по умолчанию и преобразование типов
	rtext_ = String(rtext_ || "").trim();
	width = parseInt(width || 0);
	width = (isNaN(width)) ? 0 : width;
	width = (width<0) ? 0 : width;
	
	//Если ширина меньше текста, вернуть текст
	if (width <= rtext_.length) {
		return rtext_;
	//Иначе сделать иммитацию выравнивания по правому краю
	} else {
		return sep(width - rtext_.length) + rtext_;
	}

}

//------------------------------------------------------------------------------
//Возвращает строку, соединяющую две другие строки табуляцией так, чтобы общая
//	длина равнялась заданной. Повле левого текста добавляется указанный суффикс.
//Args:
//	ltext_ (string, default=""): текст слева от табуляции
//	rtext_ (string, default=""): текст справа от табуляции
//	width (integer, default=0) - общая ширина текста
//	suf_ (string): суффикс левого текста
//Return:
//	(string)
//------------------------------------------------------------------------------	
function fill(ltext_, rtext_, width, suf_) {	
	
	//Значения по умолчанию и преобразование типов
	ltext_ = String(ltext_ || "").trim();
	rtext_ = String(rtext_ || "").trim();
	width = parseInt(width || 0);
	width = (isNaN(width)) ? 0 : width;
	width = (width<0) ? 0 : width;
	suf_ = suf_ || "";
	
	//Если ширина меньше текста, вернуть текст
	if (width<=(ltext_.length + suf_.length + rtext_.length)) {
		return ltext_ + suf_ + rtext_;
	//Иначе сделать иммитацию выравнивания по правому краю
	} else {
		var number = width - (ltext_.length + suf_.length + rtext_.length);
		return ltext_ + suf_ + sep(number) + rtext_;
	}

}

//------------------------------------------------------------------------------
//Возвращает строку, соединяющую две другие строки табуляцией так, чтобы общая
//	длина равнялась заданной. Повле левого текста добавляется суффикс ":".
//Args:
//	ltext_ (string, default=""): текст слева от табуляции
//	rtext_ (string, default=""): текст справа от табуляции
//	width (integer, default=0) - общая ширина текста
//Return:
//	(string)
//------------------------------------------------------------------------------	
function fillc(ltext_, rtext_, width) {	
	
	return fill(ltext_, rtext_, width, ":");

}

//------------------------------------------------------------------------------
//Возвращает строку, соединяющую два массива табуляцией так, чтобы общая
//	длина кажой строки равнялась заданной. Повле левого текста добавляется 
//	указанный суффикс.
//Args:
//	larr (Array): массив левых строк
//	rarr (Array): массив правых строк
//	widtharr (Array): массив длин
//	suf_ (string): суффикс левого текста
//Return:
//	(string)
//------------------------------------------------------------------------------	
function fillarr(larr, rarr, widtharr, suf_) {	
	
	//Если длины массивов не совпадают, то вернуть пустую строку
	if (larr.length != rarr.length || larr.length != widtharr.length) { return ""; }
	
	var res = "";
	
	for (var n = 0; n < larr.length; n++) {
        res += fill(larr[n], rarr[n], widtharr[n], suf_) + "\n";
    }  
	
	return res.trim();

}

//------------------------------------------------------------------------------
//Возвращает строку, соединяющую два массива табуляцией так, чтобы общая
//	длина кажой строки равнялась заданной. Повле левого текста добавляется 
//	суффикс ":".
//Args:
//	larr (Array): массив левых строк
//	rarr (Array): массив правых строк
//	widtharr (Array): массив длин
//Return:
//	(string)
//------------------------------------------------------------------------------	
function fillcarr(larr, rarr, widtharr) {	
	
	//Если длины массивов не совпадают, то вернуть пустую строку
	if (larr.length != rarr.length || larr.length != widtharr.length) { return ""; }
	
	var res = "";
	
	for (var n = 0; n < larr.length; n++) {
        res += fillc(larr[n], rarr[n], widtharr[n]) + "\n";
    }  
	
	return res.trim();

}

//------------------------------------------------------------------------------
//Вставляет строку после заданного номера строки.
//Args:
//	text_ (string, default=""): основной текст, разбитый на строки
//	add_ (string, default=""): вставляемый текст
//	after (integer, default=0): строка вставки
//Return:
//	(string)
//------------------------------------------------------------------------------	
function insert_aftern(text_, add_, after) {	
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	add_ = String(add_ || "").trim();
	after = parseInt(after || 0);
	after = (isNaN(after) || after<0) ? 0 : after;
	
	//Вставка
	var res = text_.split("\n");
	res.splice(after, 0, add_);
	
	return res.join("\n");

}

//------------------------------------------------------------------------------
//Вставляет строку после заданной подстроки
//Args:
//	text_ (string, default=""): основной текст, разбитый на строки
//	add_ (string, default=""): вставляемый текст
//	after (string, default=""): строка вставки
//Return:
//	(string)
//------------------------------------------------------------------------------	
function insert_aftert(text_, add_, after) {	
	
	//Значения по умолчанию и преобразование типов
	text_ = String(text_ || "").trim();
	add_ = String(add_ || "").trim();
	after = String(after || "").trim();
	
	//Вставка
	var number = 0;
	var res = text_.split("\n");
	for (var n = 0; n < res.length; n++) {
		number = n;
        if (res[n].indexOf(after)!=-1) { break; }
    }  
	res.splice(number, 0, add_);
	
	return res.join("\n");

}

//==============================================================================
//Работа с числами
//==============================================================================

//------------------------------------------------------------------------------
//Возвращает строку с отформатированным видом суммы (разделение каждых 3 
//	разрядров пробелами, добавление единиц измерения. Если передано не число,
//  то возвращает исходную строку. Если sum undefined, то в зависимости от show
//	возвращает либо 0, либо пустую строку
//19.06.2023 проверена
//Args:
//	sum (string|integer|float, default=0): число (сумма денег)
//	unit (string, default=""): единица измерения
//	show (boolean, default=false): показывать ли 0, если sum undefined
//Return:
//	(string)
//------------------------------------------------------------------------------	
function money(sum, unit, show) {
	
	//Значения по умолчанию
	show = show || false;
	
	//Если сумма не передана и не надо отображать 0, то пустая строка
	if (sum==undefined && !show) { return ""; }
	
	//Значения по умолчанию и преобразование типов
	var sum_ = parseFloat(sum || 0);
	unit = String(unit || "");

	//Если передано не число, вернуть исходную строку
	if (isNaN(sum_)) { return sum; }

	//Определяем знак
	sum = sum_;
	var sign = (sum>=0) ? "" : "-";
	sum = String(Math.abs(sum).toFixed(2));

	//Форматируем (по три разряда)	
	sum = new Array(4 - sum.length % 3).join("U") + sum;
	sum = sum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
	sum = (sign + sum).trim() + unit;
		
	//Результат
	return sum;
			
}

//==============================================================================
//Работа с датами
//==============================================================================

//------------------------------------------------------------------------------
//Возвращает дату, равную началу дня 0 часов 0 минут 0 секунд 000 миллисекунд
//Args:
//	date_ (Date, default=new Date()): дата
//Return:
//	(Date|string)
//------------------------------------------------------------------------------	  
function day_start(date_) {

	//Если undefined или пустая строка - вернуть пустую строку
	if (date_ == undefined || date_ == "")	{
		return "";
	//Иначе пробуем вернуть дату
	} else {
		//Значения по умолчанию и преобразование типов
		date_ = date_ || new Date();
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
//Возвращает дату, равную концу дня 23 часов 59 минут 59 секунд 999 миллисекунд
//Args:
//	date_ (Date, default=new Date()): дата
//Return:
//	(Date|string)
//------------------------------------------------------------------------------	
function day_end(date_) {
		
	//Если undefined или пустая строка - вернуть пустую строку
	if (date_ == undefined || date_ == "")	{
		return "";
	//Иначе пробуем вернуть дату
	} else {
		//Значения по умолчанию и преобразование типов
		date_ = date_ || new Date();
		try {
			var dte = new Date(date_);
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
//Возвращает число оставшихся дней до какой-то даты округленное с заданной
//	точностью
//Args:
//	date_ (Date): дата
//	reference (Date, default=new Date()): относительно чего считаем
//	round (Integer, default=0): до скольки знаков округляем
//Return:
//	|Date|String|
//------------------------------------------------------------------------------
function days_left(date_, reference, round) {
	
	//Если undefined или пустая строка - вернуть пустую строку
	if (date_ == undefined || date_ == "")	{
		return "";
	//Иначе пробуем привести к дате
	} else {
		try {
			var dte = new Date(date_);
			if (isNaN(dte)) {
				return "";
			}
		}
		catch (e) {
			return "";
		}
	}

	//Если нет отсчётной даты или есть ошибки преобразования в дату, то сегодня
	if (reference == undefined || reference == "") {
		var reference = new Date();
	} else {
		try {
			var reference = new Date(reference);
			if (isNaN(reference)) {
				reference = new Date();
			}
		}
		catch (e) {
			var reference = new Date();
		}
	}
	reference = reference.setHours(0, 0, 0, 0);
	
	//Значения по умолчанию
	round = round || 0;
	round = parseInt(round);
	round = (isNaN(round) || round<0) ? 0 : round;

	//Разница в днях с сейчас
	var dif = (dte - reference)/(1000*3600*24);

	//Округляем
	dif = dif*(Math.pow(10, round));
	dif = Math.floor(dif);

	//Результат
	return dif/(Math.pow(10, round));
						
}

//------------------------------------------------------------------------------
//Возвращает дату, сдвинутую вперед или назад на заданное число дней, недель,
//	месяцев или лет. При сдвиге месяцев и лет следит за тем, чтобы не было 
//  перескока месяца из-за последних дат (31 января превратится в 28 февраля
//	при сдвиге на месяц)
//Args:
//	date_ (Date): дата
//	interval (Integer, default=0): количество единиц сдвига
//	unit (String): единицы свига: d, w, m, y или д, н, м, г
//	forward (Boolean): сдвинуть ли вперед
//Return:
//	(Date|undefined)
//------------------------------------------------------------------------------
function shift_date(date_, interval, unit, forward) {
		
	//Если дата не передана или не преобразуется, то завершить функцию
	if (date_ == undefined || date_ == "") {
		return;
	} else {
		var dte = new Date(date_);
		if (isNaN(dte)) { return; }
	}

	//Значения по умолчанию
	interval = interval || 0;
	interval = parseInt(interval);
	interval = (isNaN(interval) || interval<0) ? 0 : interval;
	unit = unit || "d";
	forward = forward || true;
	forward = Boolean(forward)
		
	//Проверяем, переданан единицы корректны ли
	var arr_day = ["d", "day", "days", "д", "д.", "дн", "дн.", "день", "дни", "дня", "дней"];
	var arr_week = ["w", "week", "weeks", "н", "н.", "нед", "нед.", "неделя", "недели", "неделей"];
	var arr_month = ["m", "month", "months", "м", "м.", "мес", "мес.", "месяц", "месяцы", "месяца", "месяцев"];
	var arr_year = ["y", "year", "years", "г", "г.", "л", "л.", "год", "лет", "года", "годы"];
	var arr_units = [].concat(arr_day, arr_week, arr_month, arr_year);

	//Если нет такой единицы сдвига, то конец функции
	if (arr_units.indexOf(unit) == -1) { return; }
		
	//Выбираем направление сдвига
	var sign = (forward) ? 1 : -1;;

	//Осуществляем сдвиг

	//Дни
	if (arr_day.indexOf(unit) != -1) {
		dte.setDate(dte.getDate() + sign*interval);
	}

	//Недели
	if (arr_week.indexOf(unit) != -1) {
		dte.setDate(dte.getDate() + sign*interval*7);
	}

	//Месяцы
	if (arr_month.indexOf(unit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var original = dte.getDate();
		dte.setDate(1);
						
		//Прибавляем нужное число месяцев
		dte.setMonth(dte.getMonth() + sign*interval);
		var new_month = dte.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dte.setDate(original);
						
		var loop = 10;
		while (new_month != dte.getMonth() && loop>=0) {
			dte.setDate(dte.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
	}

	//Годы
	if (arr_year.indexOf(unit) != -1) {
    //сохраняем дату и устанавливаем 1 число месяца
		var original = dte.getDate();
		dte.setDate(1);
						
		//Прибавляем нужное число лет
		dte.setFullYear(dte.getFullYear() + sign*interval);
		var new_month = dte.getMonth();
					
		//Восстанавливаем дату без перескока месяца
		dte.setDate(original);
						
		var loop = 10;
		while (new_month != dte.getMonth() && loop>=0) {
			dte.setDate(dte.getDate()-1);
			loop = loop - 1;
		}
		//Если прерывание по количеству циклов
		if (loop <= 0) {
			throw new Error("сдвиг месяца прерван по превышению 10 циклов");
		}
      
	}
    	
	return dte;

}

//==============================================================================
//Работа с датами
//==============================================================================

//------------------------------------------------------------------------------
//Возвращает массив записей библиотеке, поле которого содержит хотя бы одно
//	значение из допустимых
//Args:
//	field_name (string, default=""): название поля
//	values (array, default=[]): массив допустимых значений поля
//	entries (Array, default=lib().entries()): массив записей
//Return:
//	(Array)
//------------------------------------------------------------------------------	
function filter_entries(field_name, values, entries) {
	
	//Значения по умолчанию и преобразование типов
	field_name = String(field_name || "").trim();
	values = values || [];
	entries = entries || lib().entries();
	
	//Если не передано имя поля и допустимые значения, то вернуть пустой массив
	if (field_name=="" || values.length==0)	{
		return [];
	}
	
	var result = []
	
	//Перебор записей
	for (var n = 0; n < entries.length; n++) {
		//Если поле - массив
		if (typeof entries[n].field(field_name) === 'object') {
			var field_values = entries[n].field(field_name);
			for (var k=0; k<field_values.length; k++) {
				if (values.indexOf(field_values[k]) != -1) {
					result.push(entries[n]);
					continue;
				}
			}
		//Если не массив
		} else {
			if (values.indexOf(entries[n].field(field_name)) != -1) {
				result.push(entries[n]);
				continue;
			}
		}
    }  
		
	return result;

}

//------------------------------------------------------------------------------
//Возвращает остортированный массив записей по заданному полю
//Args:
//	field_name (string, default=""): название поля
//	entries (Array, default=lib().entries()): массив записей
//Return:
//	(Array)
//------------------------------------------------------------------------------	
function sort_entries(field_name, entries) {
	
	//Значения по умолчанию и преобразование типов
	field_name = String(field_name || "").trim();
	entries = entries || lib().entries();
	
	//Если не передано имя поля и допустимые значения, то вернуть пустой массив
	if (field_name=="")	{
		return [];
	}
		
	return entries.sort(function(a, b) {
			if (a.field(field_name)>b.field(field_name)) { return 1; }
			if (a.field(field_name)==b.field(field_name)) { return 0; }
			if (a.field(field_name)<b.field(field_name)) { return -1; }
		});

}

//------------------------------------------------------------------------------
//Возвращает экземпляр Statistics
//Args:
//	field_name (string, default=""): название поля
//	entries (Array, default=lib().entries()): массив записей
//Return:
//	(Statistics)
//------------------------------------------------------------------------------	
function count_entries(field_name, entries) {
	
	//Значения по умолчанию и преобразование типов
	field_name = String(field_name || "").trim();
	entries = entries || lib().entries();
	
	var names = [], count = [];
	var ind;
	
	//Перебор записей
	for (var n = 0; n < entries.length; n++) {
		ind = names.indexOf(entries[n].field(field_name));
        if (ind == -1) {
			names.push(entries[n].field(field_name));
			count.push(1);
		} else {
			count[ind] += 1;
		}
    }  
	
	return new Statistics(names, count);
}
