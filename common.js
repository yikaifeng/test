//**********************************************************
"use strict";
//**********************************************************
//n - number
//	d - date
//s - string 
//b - boolean 
//o - object
//	arr - array
//l - library
//f - field

//======================================================
//Объект с частыми функциями
//v1
//======================================================
const Edit = {};
	
	//Получит иконку из начала строки
	Edit.getIcon = function(sSource) {
		if (typeof(sSource) != string) {
			return null;
		} else {
			var separator = " ";
			sSource.toString();
			return sSource.split(separator,1)[0];
		}
	}
	
	//Получить строку без иконки в начале строки
	Edit.getText = function (sSource) {	
		if (typeof(sSource) != string) {
			return null;
		} else {
			var separator = " ";
			sSource.toString();
			var strIcon = strSource.split(separator,1)[0];
			var strName = strSource.slice(strIcon.length);
			return strName.trim();
		}
	}
	
	//Получить деньги
	Edit.getMoney = function (nSum, sCurrency) {
		if (typeof(nSum) != number) {
			return null;
		} else {
			var sign = "";
			nSum = nSum.toFixed(2);
			if (nSum < 0) {
				sign = "-";
				nSum = Math.abs(nSum);
				nSum = nSum.toFixed(2);
			}
			nSum += "";
			nSum = new Array(4 - nSum.length % 3).join("U") + nSum;
			nSum = nSum.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
			nSum = sign + nSum;
			nSum = nSum.trim();
			if (typeof(sCurrency) == string && sCurrency != undefined) {
				return nSum + " " + sCurrency;
			} else {
				return nSum;
			}		
		}	
	}
	
	//Название месяца на русском по его номеру
	Edit.getMonthName = function (nMonthNumber) {
		
		if (typeof(nMonthNumber) != number) {
			return null;
		} else {
			switch (nMonthNumber) {
				case 1:
					return "январь";
					break;
				case 2:
					return "февраль";
					break;
				case 3:
					return "март";
					break;
				case 4:
					return "апрель";
					break;
				case 5:
					return "май";
					break;
				case 6:
					return "июнь";
					break;
				case 7:
					return "июль";
					break;
				case 8:
					return "август";
					break;
				case 9:
					return "сентябрь";
					break;
				case 10:
					return "октябрь";
					break;
				case 11:
					return "ноябрь";
					break;
				case 12:
					return "декабрь";
					break;
				default:
					return null;
					break;
			}
		}
		
		
	}
	
	//Сдвиг даты на определенный интервал
	Edit.shiftDate = function (dDate, nInterval, sUnit, bForward) {
		
		if (typeof(dDate) != number || 
			typeof(nInterval) != number || nInterval < 0 ||
			typeof(sUnit) != string || sUnit != "d" || sUnit != "w" || sUnit != "m" || sUnit != "y") {
				
				return null;
				
			} else {
				var sign = 1;
				if (!bForward) {sign = -1;}
				
				switch (sUnit) {
					
					case "d":
						dDate.setDate(dDate.getDate() + sign*nInterval);
						return dDate;
						break;
						
					case "w":
						dDate.setDate(dDate.getDate() + sign*nInterval*7);
						return dDate;
						break;
						
					case "m":
						//сохраняем дату и устанавливаем 1 число месяца
						var nOriginalDate = dDate.getDate();
						dDate.setDate(1);
							
						//Прибавляем нужное число месяцев
						dDate.setMonth(dDate.getMonth() + sign*nInterval);
						var nNewMonth = dDate.getMonth();
						
						//Восстанавливаем дату без перескока месяца
						dDate.setDate(nOriginalDate);
							
						var loop = 10;
						while (nNewMonth != dDate.getMonth() && loop>0) {
							dDate.setDate(dDate.getDate()-1);
							loop = loop - 1;
						}
						return dDate;
						break;
						
					case "y":
						dDate.setFullYear(dDate.getFullYear() + sign*nInterval);
						return dDate;
						break;
						
					default :
						return null;
						break;
				}
				
			}
			
	}
	
	//Остаток дней
	Edit.daysLeft = function (dDate, dTarget, nRound) {
	
		if (typeof(dDate) != number) {
			
			return null;
			
		} else {
			
			//Если не задана конечная дата, то сегодня
			if (dTarget == undefined || typeof(dTarget) != number) {
				dTarget = new Date();
			}
			if (nRound == undefined || nRound < 0 || typeof(nRound) != number) {
				nRound = 0;
			}
			
			//Разница в днях с сейчас
			var dDif = (dDate - dTarget)/(1000*3600*24);
				
			//Округляем
			return dDif.toFixed(nRound);
						
		}
		
	}
	
Object.freeze(Edit);
