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
	


	$("#"+eid).html("R$ "+mnstr);
}

function update_summary (day, mon, year) {
	$.post("summary_data.php",
		{base_day: day, base_mon: mon, base_year: year, time_int: 1},
		function (data) {
			var parsed = JSON.parse(data);
			var status = parsed["status"];
			if (status == "OK"){
				$(".username").html(parsed["user"]);
				var	health = String(parsed["health"]);
				var bills  = String(parsed["bills"]);
				var food   = String(parsed["food"]);
				var fun    = String(parsed["fun"]);
				while (health.length < 3) health = '0' + health;
				print_money("health_sum", health);
				print_money("bills_sum", bills);
				print_money("food_sum", food);
				print_money("fun_sum", fun);
			} else {
				$("#alert").html(
					"Não foi possível acessar os dados. Desculpe pelo incômodo. Tente novamente mais tarde.");
			}
		}
	);
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

	//update_summary(day, mon, year);
});