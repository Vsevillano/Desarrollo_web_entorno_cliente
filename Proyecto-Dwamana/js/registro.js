{
	let $nombre;
	let $spanNombre;
	let $apellidos;
	let $spanApellidos;
	let $dni;
	let $spanDni;
	let $mail;
	let $spanMail;
	let $procedencia;
	let $spanProcedencia;
	let $submit;
	
	let init = function() {
		$( "#dialog-message" ).dialog({ autoOpen: false });
		
		$nombre = $("#nombreRegistro");
		$spanNombre = $("#errNombreRegistro");
		$apellidos = $('#apellidosRegistro');
		$spanApellidos = $("#errApellidosRegistro");
		$dni = $("#dniRegistro");
		$spanDni = $("#errDniRegistro");
		$mail = $("#mailRegistro");
		$spanMail = $("#errMailRegistro");
		$procedencia = $("#procedenciaRegistro");
		$spanProcedencia = $("#errProcedenciaRegistro");
		$submit = $("#submit");
		
		$nombre.blur(function(event){validarNombre($(this))});
		$apellidos.blur(function(event){validarApellidos($(this))});;
		$dni.blur(function(event){validarDni($(this))});
		$mail.blur(function(event){validarMail($(this))});
		$procedencia.blur(function(event){validarProcedencia($(this))});
		$submit.click(enviarRegistro);
	}
	
	/* Valida el input de nombre*/
	let validarNombre = function(event) {
		(event.val().length > 5) ? $spanNombre.html("") : $spanNombre.html("al menos 6 caracteres");
	}
	
	/* Valida el input de apellidos (2 apellidos)*/
	let validarApellidos = function(event) {
		let pattern = /[a-zA-Z]{3,}\s[a-zA-Z]{3,}/;
		(pattern.test(event.val())) ? $spanApellidos.html("") : $spanApellidos.html("introduce tus 2 apellidos");		
	}
	
	/* Valida el input de dni */
	let validarDni = function(event) {
		let pattern =  /^\d{8}[\s-]?[a-zA-Z]$/ ;
		(pattern.test(event.val())) ? validarLetraDni(event.val()) : $spanDni.html("Formato incorrecto");	
		(pattern.test(event.val())) ? $spanDni.html("") : $spanDni.html("Formato incorrecto");		
		
	}
	
	/* Valida que la letra del dni sea correcta*/
	let validarLetraDni = function(dni) {
		let letter = dni.substr(dni.length-1).toLowerCase();
		let number = parseInt(dni.slice(0,8));
		let letters = ['t','r','w','a','g','m','y','f','p','d','x','b','n','j','z','s','q','v','h','l','c','k','e'];
		if(letter!=letters[number%23])
		$spanDni.html("Letra incorrecta");
	}
	
	/* Valida el input de email*/
	let validarMail = function(event) {
		let pattern = /^[_a-z0-9-]+([\._a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
		(pattern.test(event.val())) ? $spanMail.html("") : $spanMail.html("Email inválido");		
	}
	
	/* Valida el input de procedencia*/
	let validarProcedencia = function() {
		($procedencia.val().length > 5) ? $spanProcedencia.html("") : $spanProcedencia.html("al menos 6 caracteres");
	}
	
	/* Comprueba todos los campos antes de enviarlos*/
	let enviarRegistro = function(event) {
		event.preventDefault();
		
		validarNombre($nombre);
		validarApellidos($apellidos);
		validarDni($dni);
		validarMail($mail);
		validarProcedencia($procedencia);
		
		//if(validarTodo())
		confirmar();
	}
	
	/* Hace la validación de todos los imputs*/
	let validarTodo = function() {
		let error = false;
		$('#formRegister span').each(function(i){
			if($(this).val() !="")
			error = true;
		});
		return error;
	}
	
	/* Lanza el mensaje de confirmación*/
	let confirmar = function() {
		$( "#dialog-message" ).dialog("open");
		
		$( "#dialog-confirm" ).dialog({resizable: false, height: "auto", width: 400, modal: true,
		show: { effect: "puff", duration: 1000},
		hide: { effect: "drop", duration: 1000 },
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
				
				$.post("php/contenido.php",{seccion: 'inicio' },function(respuesta){
					$('#contenido').html(respuesta);
				});
			}
		}
	});
}

$(init);
}