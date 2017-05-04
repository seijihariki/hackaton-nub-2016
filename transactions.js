$(document).ready(function (){
	$("#send_tr").click(function (){
		var name  = $("#name").val();
		var value = $("#value").val();
		var desc = $("#desc").val();
		var categ = $("#catg").val();

		if ( name == '' || value == ''){
			$("#name").attr("class", "wrong_input");
			$("#value").attr("class", "wrong_input");
			$("#alert").html("Há campos obrigatórios vazios.");
		} else {
			$.post("insert_transaction.php",
				{name: name, value: value, desc: desc, categ: categ},
				function (data) {
					var parsed = JSON.parse(data);
					var status = parsed["status"];
					if (status == "OK"){
						
					} else {
						$("#alert").html(
							"Não foi possível realizar a inserção. Desculpe pelo incômodo. Tente novamente mais tarde.");
					}
				}
			);
		}
	});
});