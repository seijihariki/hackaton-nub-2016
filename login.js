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
			var userobj = JSON.parse(localStorage.getItem("users"));
			if(userobj == null) userobj = JSON.parse("{}");

			if(user in userobj && userobj[user]["password"] == pass){
				localStorage.setItem("session", user);
				document.location.href = "gerenciamento/index.html";
			} else {
				$("#alert").html("Usuário ou senha inválidos.");
			}
		}
	});
});
