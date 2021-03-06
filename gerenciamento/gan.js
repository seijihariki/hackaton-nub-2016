function update ()
{	
	var user = localStorage.getItem("session");
	$(".username").html(user);
	var udb = JSON.parse(localStorage.getItem("users"));

	var history = udb[user]["transactions"];

	var now = (new Date()).getTime();

	var vec = [];
	var not = [];

	for (var i = 0; i < 10; i++){
		var tmp = null;
		for (var t = 0; t < history.length; t++)
		{
			var name  = history[t]["name"];
			var value = history[t]["value"];
			var g = history[t]["g"];
			var desc  = history[t]["desc"];
			var date  = new Date(parseInt(history[t]["date"]));
			if (not.indexOf(name) < 0 && (tmp == null || tmp["date"] < date) && !g) tmp = history[t];

		}
		if(tmp != null) {
			vec.push(tmp);
			not.push(tmp["name"]);
		}
	}
	var final_string = "<tr style=\"background-color: blue; color: white\"><td>Nome</td><td>Categoria</td><td>Data</td><td>Valor</td></tr>";

	for(var t = 0; t < vec.length; t++){

		var var_node = "<tr><td>"+vec[t]["name"]+
			"</td><td>"+vec[t]["class"]+
			"</td><td>"+(new Date(vec[t]["date"])).toLocaleString()+
			"</td><td>R$ "+vec[t]["value"]+"</td></tr>";
		final_string+=var_node;
	}

	$("#last_table").html(final_string);
}

$(document).ready( function () {
	$("#add").click( function () {
		var user = localStorage.getItem("session");
		var udb = JSON.parse(localStorage.getItem("users"));
		udb[user]["transactions"].push({g: false, name: $("#name").val(), value: parseFloat(($("#value").val()).replace(",",".").replace("-","")), class: $("#class").val(), date: (new Date()).getTime(), desc: null});
		localStorage.setItem("users", JSON.stringify(udb));
		update();
	});
	update();
});
