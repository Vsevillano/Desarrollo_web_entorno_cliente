{
	let callback = function(){
	}
	
	let $lista;
	let $ponentes;
	
	let init = function() {
		$lista = $('#lista');
		lightbox.option({
			'resizeDuration': 200,
			'wrapAround': true,
			'albumLabel': "Ponentes"
		})
		cargarListadoPonentes(callback);
	}
	
	/**
	* Carga toda la lista de ponentes
	*/
	let cargarListadoPonentes = function() {
		mostrarDia('Lunes');		
		mostrarDia('Martes');
		mostrarDia('Miércoles');
		mostrarDia('Jueves');
		mostrarDia('Viernes');
	}
	
	/**
	* Muestra los ponentes de todos los días
	*/
	let mostrarPonentes = function(datos) {
		
		$.each(datos,function(key,value){
			let $div = $('<div class="ponente"></div>')
			let $imagen = $('<img>').prop('src',value.imagen);
			let $enlace =  $('<a data-lightbox="roadtrip"></a>').prop("href",value.imagen);
			$enlace.append($imagen);
			let $ponente = $('<h4></h4>').html(value.ponente);
			$div.append($enlace,$ponente);
			$lista.append($div);
		});
	}
	
	/**
	* muestra los ponentes del día indicado
	*/
	let mostrarDia = function(dia) {
		switch(dia){
			case 'Lunes':
				$.getJSON('js/lunes.json', function(data) {
					mostrarPonentes(data['actividades']);	
				}).done(function() {
					$('.ponente').first().remove();  //Eliminamos la tarjeta duplicada de Nacho
				});
			break;
			case 'Martes':
				$.getJSON('js/martes.json', function(data) {
					mostrarPonentes(data['actividades']);	
				});
			break;
			case 'Miercoles':
				$.getJSON('js/miercoles.json', function(data) {
					mostrarPonentes(data['actividades']);	
				}).done(function() {
					$('.ponente:nth-child(3n)').remove();  //Eliminamos la tarjeta duplicada de Nacho
				});
			break;
			case 'Jueves':
			$.getJSON('js/jueves.json', function(data) {
				mostrarPonentes(data['actividades']);	
			});
			break;
			case 'Viernes':
			$.getJSON('js/viernes.json', function(data) {
				mostrarPonentes(data['actividades']);	
			})
			;break;
		}
	}
	
	$(init);
}