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
			var userobj = JSON.parse(localStorage.getItem("users"));
			if(userobj == null) userobj = JSON.parse("{}");
			if(user in userobj) $("#alert").html("Usuário já existe.");
			else userobj[String(user)] = {password: pass, transactions: {health: [], bills: [], food: [], fun: []}};
			localStorage.setItem("users", JSON.stringify(userobj));
			document.location.href = "login.html";
		}
	});
});
