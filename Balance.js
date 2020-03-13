var curLib = lib();
var accounts = curLib.entries();

//accounts == 0?
if (accounts.length >0) {
	
	//перебор accounts, j
	for (j = 0; j<accounts.length; j++) {
		
		//Цикл j, переменные
		var balancePlus = 0;
		var balanceMinus = 0;
		var curAccount = accounts[j];
		var payments = libByName("Платежи2").linksTo(curAccount);
		
		//payments == 0?
		if (payments.length >0) {
			
			//перебор payments, i
			for (i =0; i < payments.length; i++){
				balanceMinus = payments[i].field ("Расход") + balanceMinus;
				balancePlus = payments[i].field ("Приход") + balancePlus;
			} //перебор payments, i
			
			curAccount.set("Баланс2",balancePlus - balanceMinus);
			
		} //payments == 0?
	} //перебор accounts, j
} //accounts == 0?

message ("Баланс2 обновлён");
