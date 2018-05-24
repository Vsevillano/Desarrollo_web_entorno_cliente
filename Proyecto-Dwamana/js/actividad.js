{
	let registrar;
	let anadir;
	
	let init = function() {
		$( "#dialog-message" ).dialog({ autoOpen: false });
		registrar = $('.submitActividad');
		anadir = $('.anadirActividad');
		registrar.click(guardarActividad);
		anadir.click(anadirActividad);
	}
	
	/**
	* Guarda la actividad en un registro
	*/
	let guardarActividad = function(event) {
		event.preventDefault();
		$(':input','#formActivity').not(':button, :submit').val(''); 
		$('textarea').val('');
		mostrarConfirmacion();
	}
	/**
	* Lanza un mensaje de confirmación
	*/
	let mostrarConfirmacion = function() {
		$( "#dialog-message" ).dialog("open");
		$( "#dialog-message" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	/**
	* Añade otro formulario de actividad
	*/
	let anadirActividad = function(event) {
		event.preventDefault();
		$('.anadirActividad').remove();
		$('.submitActividad').remove();	
		$.get('php/actividad.html',function(data){
			$('#extra').append(data);
		});
	}
	
	$(init)
}