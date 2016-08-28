function update_calendar(mon, year){
	for(var i = 0; i < 34; i++)
		$("#d"+String(i+1)).html("");
	var date = new Date();
	date.setFullYear(year, mon, 1);
	var initday = date.getDay();
	var days_in_months = 
		[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio",
		"Junho", "Julho", "Agosto", "Setembro", "Outubro",
		"Novembro", "Dezembro"];
	$("#calmonth").html(months[mon]+
		"<br><span style=\"font-size:18px\">"+
		String(year)
		+"</span>");
	if (mon%4 == 0) days_in_months[1] = 29;
	for(var i = 0; i < days_in_months[mon]; i++)
		$("#d"+String(i + initday)).html(String(i + 1));
}

function select_calendar(day, mon, year){
	var date = new Date();
	date.setFullYear(year, mon, 1);
	var initday = date.getDay();

	update_calendar(mon,year);

	if($("#d"+String(day - 1 + initday)).html() != ''){
		day = parseInt($("#d"+String(day - 1 + initday)).html());
		$("#d"+String(day - 1 + initday)).
			html("<span class=\"active\">"+$("#d"+String(day - 1 + initday)).html()+"</span>");
	}
}

function print_money (eid, money) {
	var mnstr = "";
	mnstr = String(money);
	$("#"+eid).html("R$ "+mnstr);
}

function update_summary (day, mon, year) {
	var user = localStorage.getItem("session");
	$(".username").html(user);
	var udb = JSON.parse(localStorage.getItem("users"));

	var history = udb[user]["transactions"];
	var health = 0;
	var bills  = 0;
	var food   = 0;
	var fun    = 0;

	var now = Date();

	for (var t in history["health"]) {
		var name  = t["name"];
		var value = t["value"];
		var desc  = t["desc"];
		var date  = t["date"];

		if (now.getMonth() == date.getMonth() &&
			now.getFullYear() == date.getFullYear() && value < 0) health += value;
	}
	for (var t in history["bills"]) {
		var name  = t["name"];
		var value = t["value"];
		var desc  = t["desc"];
		var date  = t["date"];
		if (now.getMonth() == date.getMonth() &&
			now.getFullYear() == date.getFullYear() && value < 0) bills += value;
	}
	for (var t in history["food"]) {
		var name  = t["name"];
		var value = t["value"];
		var desc  = t["desc"];
		var date  = t["date"];
		if (now.getMonth() == date.getMonth() &&
			now.getFullYear() == date.getFullYear() && value < 0) food += value;
	}
	for (var t in history["fun"]) {
		var name  = t["name"];
		var value = t["value"];
		var desc  = t["desc"];
		var date  = t["date"];
		if (now.getMonth() == date.getMonth() &&
			now.getFullYear() == date.getFullYear() && value < 0) fun += value;
	}
	var gast = 0;
	var gain = 0;
	for (var t in history){
		for (var t in history[t]) {
			var name  = t["name"];
			var value = t["value"];
			var desc  = t["desc"];
			var date  = t["date"];
			if (now.getDate() == date.getDate() &&
				now.getMonth() == date.getMonth() &&
				now.getFullYear() == date.getFullYear() && value < 0) gain += value;
		}
		for (var t in history[t]) {
			var name  = t["name"];
			var value = t["value"];
			var desc  = t["desc"];
			var date  = t["date"];
			if (now.getDate() == date.getDate() &&
				now.getMonth() == date.getMonth() &&
				now.getFullYear() == date.getFullYear() && value > 0) gain += value;
		}

	}
	
	$("#gasto").html("R$ "+String(gast));

	$("#ganho").html("R$ "+String(gain));

	$("#last_table")

	print_money("health_sum", health);
	print_money("bills_sum", bills);
	print_money("food_sum", food);
	print_money("fun_sum", fun);
}

$(document).ready( function () {
	var now = new Date();
	var day  = now.getDate();
	var mon  = now.getMonth();
	var year = now.getFullYear();
	select_calendar(day, mon, year);
	$("#nmon").click( function (){
		if (mon == 11){
			mon = 0;
			year++;
		} else {
			mon++;
		}
		update_calendar(mon,year);
	});
	$("#pmon").click( function (){
		if (mon == 0){
			mon = 11;
			year--;
		} else {
			mon--;
		}
		update_calendar(mon,year);
	});
	$("#calendar li").click( function (){
		if ($(this).html() != ''){
			select_calendar(parseInt($(this).html()), mon, year);
		}
	});

	$("#add+").click( function (){

	});

	update_summary(day, mon, year);
});