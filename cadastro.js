$(document).ready(function (){
	$("#cadastro").click(function (){
		var user = $("#user").val();
		var pass = $("#pass").val();
		var repass = $("#repass").val();

		if ( user == '' || pass == ''|| repass == ''){
			$("#user").attr("class", "wrong_input w3-input w3-border");
			$("#pass").attr("class", "wrong_input w3-input w3-border");
			$("#repass").attr("class", "wrong_input w3-input w3-border");
			$("#alert").html("Não deixe campos em branco.");
		} else if(pass != repass){
			$("#user").attr("class", "wrong_input w3-input w3-border");
			$("#pass").attr("class", "wrong_input w3-input w3-border");
			$("#repass").attr("class", "wrong_input w3-input w3-border");
			$("#alert").html("As senhas devem ser iguais.");
		} else {
			$.post("cadastro.php",{username: user, password: pass},
				function (data) {
					var parsed = JSON.parse(data);
					var status = parsed["status"];
					if (status == "OK"){
						$("#user").attr("class", "ok_input w3-input w3-border");
						$("#pass").attr("class", "ok_input w3-input w3-border");
						$("#repass").attr("class", "ok_input w3-input w3-border");
						$("form")[0].reset();
						$("#alert").html("Verificado. Redirecionando...");
						window.location.href = "login.html";
					} else if (status == "wrong"){
						$("#user").attr("class", "wrong_input w3-input w3-border");
						$("#pass").attr("class", "wrong_input w3-input w3-border");
						$("#repass").attr("class", "wrong_input w3-input w3-border");
						$("#alert").html("Usuário ou senha incorretos.");
					} else if (status == "already"){
						$("#user").attr("class", "wrong_input w3-input w3-border");
						$("#pass").attr("class", "wrong_input w3-input w3-border");
						$("#repass").attr("class", "wrong_input w3-input w3-border");
						$("#alert").html("Usuário já existe.");
					} else {
						$("#user").attr("class", "ok_input w3-input w3-border");
						$("#pass").attr("class", "ok_input w3-input w3-border");
						$("#repass").attr("class", "ok_input w3-input w3-border");

					}
				}
			);
		}
	});
});
