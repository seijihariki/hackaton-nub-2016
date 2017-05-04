$(document).ready(function (){
	$("#login").click(function (){
		var user = $("#user").val();
		var pass = $("#pass").val();
		var rem	 = $("#remain").val();

		if ( user == '' || pass == ''){
			$("#user").attr("class", "wrong_input w3-input w3-border");
			$("#pass").attr("class", "wrong_input w3-input w3-border");
			$("#alert").html("Não deixe campos em branco.");
		} else {
			$.post("login.php",{username: user, password: pass, remain: rem},
				function (data) {
					var parsed = JSON.parse(data);
					var status = parsed["status"];
					if (status == "OK"){
						$("#user").attr("class", "ok_input w3-input w3-border");
						$("#pass").attr("class", "ok_input w3-input w3-border");
						$("form")[0].reset();
						$("#alert").html("Verificado. Redirecionando...");
						window.location.href = "gerenciador/index.html";
					} else if (status == "wrong"){
						$("#user").attr("class", "wrong_input w3-input w3-border");
						$("#pass").attr("class", "wrong_input w3-input w3-border");
						$("#alert").html("Usuário ou senha incorretos.");
					} else {
						$("#user").attr("class", "ok_input w3-input w3-border");
						$("#pass").attr("class", "ok_input w3-input w3-border");
					}
				}
			);
		}
	});
});