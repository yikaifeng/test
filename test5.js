"use strict";

const LIB_1 = "Тест1";
const LIB_2 = "Тест2";

const NAME = "Название";
const RESULT = "Результат";
var res = "Результат:";

function test3() {
	
	var en = entry();
	var lib = libByName("Тест2");
	var links = lib.linksTo(en);
	
	for (var i =0; i < links.length; i++){
		res = res + "\n" + links[i].field(NAME);
	}
	
	en.set(RESULT, res);
}
