"use strict";

const LIB1 = "Тест1"；
const LIB2 = "Тест2"；

const NAME = "Название"；
const RESULT = "Результат";
var res = "Результат:";

function test3() {
	
	var en = entry();
	var lib = libByName(LIB2);
	var links = lib.linksTo(en);
	
	for (i =0; i < links.length; i++){
		res = res + "\n" + links[i].field("NAME");
	}
	
	en.set(RESULT, res);
}
