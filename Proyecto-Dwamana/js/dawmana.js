{
	let $contenido;
	let init = function() {
		efectoInicio();
		$contenido = $('#contenido');
		$('.navLink').click(cargaContenido);

		// Al cargar la pagina, que cargue la pagina de inicio
		$.post("php/contenido.php",{seccion: "inicio" },function(respuesta){
			$contenido.html(respuesta);
		});
	}
	
	/** Carga el contenido principal según el enlace seleccionado */
	let cargaContenido = function(event) {
		event.preventDefault();
		
		$.post("php/contenido.php",{seccion: event.target.id },function(respuesta){
			$contenido.html(respuesta);
		});
	}
	
	/** Efecto inicial*/
	let efectoInicio = function() {
		$('footer').hide().delay(2200).toggle("slide",{direction: "right"});
		$('header').hide().delay(2200).toggle("slide",{direction: "left"});
		$('main').hide().delay(2200).toggle("slide",{direction: "left"});
		$('nav').hide().delay(2200).toggle("slide",{direction: "left"});
		$('#cartel').delay(2200).toggle("explode");
	}
	
	$(init)
}