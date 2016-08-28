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

	var totals = {};

	var now = (new Date()).getTime();

	for (var k in udb[user]["classes"]){
		totals[udb[user]["classes"][k]] = 0;
		for (var t = 0; t < history.length; t++) {
			var name  = history[t]["name"];
			var value = history[t]["value"];
			var g = history[t]["g"];
			var clas  = history[t]["class"];
			var desc  = history[t]["desc"];
			var date  = new Date(parseInt(history[t]["date"]));

			console.log(date.toString());
			console.log(now.toString());

			if (now.getMonth() == date.getMonth() &&
				now.getFullYear() == date.getFullYear() && g) totals[udb[user]["classes"][k]] += value;
		}
	}

	for (var k in udb[user]["classes"]){
		if(!(udb[user]["classes"][k] in ["health","bills","food","fun"])){
			totals[udb[user]["classes"][udb[user]["classes"][k]]] += totals[udb[user]["classes"][k]];
		}
	}

	var gain = 0;
	var spent = 0;

	for (var t = 0; t < history.length; t++){
		var name  = history[t]["name"];
		var value = history[t]["value"];
		var g = history[t]["g"];
		var desc  = history[t]["desc"];
		var date  = new Date(parseInt(history[t]["date"]));
		if (now.getDate() == date.getDate() &&
			now.getMonth() == date.getMonth() &&
			now.getFullYear() == date.getFullYear()){
			if (g) spent += value;
			else gain += value;
		} 
	}


	var vec = [];
	var not = [];

	for (var i = 0; i < 10; i++){
		var tmp = null;
		for (var t = 0; t < history.length; t++)
		{
			var name  = history[t]["name"];
			var value = history[t]["value"];
			var desc  = history[t]["desc"];
			var date  = new Date(parseInt(history[t]["date"]));
			if (not.indexOf(name) < 0 && (tmp == null || tmp["date"] < date)) tmp = history[t];

		}
		if(tmp != null) {
			vec.push(tmp);
			not.push(tmp["name"]);
		}
	}

	var final_string = "<tr style=\"background-color: purple; color: white\"><td>Nome</td><td>Categoria</td><td>Data</td><td>Valor</td></tr>";

	for(var t = 0; t < vec.length; t++){

		var_node = "<tr><td>"+vec[t]["name"]+
			"</td><td>"+vec[t]["class"]+
			"</td><td>"+(new Date(vec[t]["date"])).toLocaleString()+
			"</td><td>R$ "+vec[t]["value"]+"</td></tr>";
		final_string+=var_node;
	}

	$("#last_table").html(final_string);


	$("#gasto").html("R$ "+String(spent));

	$("#ganho").html("R$ "+String(gain));

	print_money("health_sum", totals["health"]);
	print_money("bills_sum", totals["bills"]);
	print_money("food_sum", totals["food"]);
	print_money("fun_sum", totals["fun"]);
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
			update_summary(day, mon, year);
		}
	});

	$("#addst").click( function () {
		var user = localStorage.getItem("session");
		$(".username").html(user);
		var udb = JSON.parse(localStorage.getItem("users"));
		udb[user]["transactions"].push({g: true, name: $("#namest").val(), value: parseFloat(($("#value").val()).replace(",",".").replace("-","")), class: $("#classst").val(), date: (new Date()).getTime(), desc: null});
		localStorage.setItem("users", JSON.stringify(udb));
		update_summary(day, mon, year);
	});

	$("#addgn").click( function () {
		var user = localStorage.getItem("session");
		$(".username").html(user);
		var udb = JSON.parse(localStorage.getItem("users"));
		udb[user]["transactions"].push({g: false, name: $("#namegn").val(), value: parseFloat(($("#valuegn").val()).replace(",",".").replace("-","")), class: $("#classgn").val(), date: (new Date()).getTime(), desc: null});
		localStorage.setItem("users", JSON.stringify(udb));
		update_summary(day, mon, year);
	});

	update_summary(day, mon, year);
});