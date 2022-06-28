//********************************************************************************************************************
//Accounts - скрипт для иблиотеке "Учётные записи"
//********************************************************************************************************************
"use strict";

//********************************************************************************************************************
//********************************************************************************************************************

//======================================================
//Константы
//======================================================

//Имена полей и значения
const TYPE = "Тип";
  const _MAIL = "почта";
  const _ACCAUNT = "аккаунт";
  const _OTHER = "прочее";
const ADDRESS = "Адрес";
const MAIL = "Привязка";
const LOGIN = "Логин";
const NUMBER = "Телефон";
const NAME = "Наименование учётной записи";

//======================================================
//Переменные
//======================================================

//********************************************************************************************************************
//********************************************************************************************************************

//======================================================
//Закрытые фунции
//======================================================
	
//--------------------------------------------------
//Получить иконку из начала строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pGetIcon(sSource) {
	
 //Выход, если нет значения
 if (sSource == undefined) {
  return "";
 }

 //Пробуем привести к строке
 sSource = String(sSource);

 //Шаблон поиска иконки: первая группа символов не из пробелов
 var regexp = /\S+/;

 //Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
 var sIcon = sSource.match(regexp);

 //Если иконки нет - пустая строка
 if (sIcon == null) {
  return "";
 } else {
  return sIcon[0];
 }
     
}
	
//--------------------------------------------------
//Установить иконку из строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pSetIconFrom(sSource, sText, bSpace) {
  
 //Если нет значения - пустая строка
 if (sSource == undefined) {
  sSource = "";
 }

 //Пробуем привести к строке
 sSource = String(sSource); 
 sText = String(sText);

 //Параметры по умолчанию: ставить пробел
 var bSp = true;
 if (bSpace != undefined) { bSp = bSpace; }

 //Шаблон поиска иконки: первая группа символов не из пробелов
 var regexp = /\S+/;

 //Ищем первую группу символов, не являющимися пробелами. Если не найдено - null
 var sIcon = sSource.match(regexp);

 //Если иконки нет - толко текст
 if (sIcon == null) {
  return sText.trim();
 } else {
  if (bSp) {
     return sIcon[0] + " " + sText.trim();
  } else {
     return sIcon[0] + sText.trim();
  }
 }

}
	
//--------------------------------------------------
//Получить строку без иконки в начале строки
//01.09.2021 проверена
//Независимая
//--------------------------------------------------
function pGetText(sSource) { 
    
 //Выход, если нет значения
 if (sSource == undefined) {
  return "";
 }
	
 //Пробуем привести к строке
 sSource = String(sSource);

 //Заменяем пустой строкой первую группу символов
 var regexp = /\s*\S+\s*/;
 var sText = sSource.replace(regexp, "");
 sText = sText.trim();

 return sText;

}

//********************************************************************************************************************
//********************************************************************************************************************

//======================================================
//Открытые фунции
//======================================================
	
//--------------------------------------------------
//Получить иконку из начала строки
//28.06.2022 проверена
//Зависит от pGetIcon
//--------------------------------------------------
function GetIcon(sSource) {
	
 return pGetIcon(sSource);
     
}

//--------------------------------------------------
//Получить описание
//28.06.2022 проверена
//Независимая
//--------------------------------------------------
function GetDescription() {
  var FType;
  var FType = pGetText(field (TYPE))

  switch (FType) {
    case _MAIL:
      return field (ADDRESS);
      break;
    case _ACCAUNT:
      if (field(NAME) != "") {
        return field(NAME);
      } else if (field(MAIL) != "") {
        return field(MAIL);
      } else {
        return field(NUMBER);
      }
      break;
    case _OTHER:
      if (field(NAME) != "") {
        return field(NAME);
      } else if (field(MAIL) != "") {
        return field(MAIL);
      } else {
        return field(NUMBER);
      }
      break;
    default:
      return "";
  }

}
