
function reservas_init(){
    reserva_map = document.getElementById("reserva-mapa");
    $("#boton-mostrar-reservas").hide();
    $("#boton-mostrar-reservas").click(function(){
        $("#modal-mis-reservas").fadeIn("fast");
      })
    const reserva_button = document.getElementById("reserva-button");
    reserva_button.addEventListener(
        "click", (event) => guardarReserva()
    );
    resizeGMap(reserva_map)
    window.addEventListener(
        "resize", (event) => resizeGMap(reserva_map)
    );
}

function guardarReserva(){
    const respuesta_form = document.forms["reservar-form"];
    const reserva_formulario = document.getElementById("reservar-form");
    let jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
    
    if (respuesta_form["reserva-hora"].value === ""){
        // marcamos en rojo el cuadro en el que el usuario
        // no ha introducido respuesta.
        window.alert("¡Selecciona una hora por favor!");
        return -1;
    }

    // revisamos si el usuario ha iniciado sesión en su cuenta o si 
    // se ha iniciado sesión en una cuenta de niño.
    const codigoCuenta = isCuentaNiñoAdulto();

    // no existen cuentas registradas
    if (codigoCuenta === -2){
        console.log(codigoCuenta);
        window.alert("¡Regístrate o inicia sesión primero para poder hacer una reserva!");
        return -1;
    }else if(codigoCuenta > -1){
        console.log(codigoCuenta);
        window.alert("¡Pídele a tu padre que haga la reserva por tí!");
        return -1;
    }


    // Guardamos la reserva en formato JSON.
    const reserva = { 
        "lugar": "Fábrica de Papá Noel, Leganés, Madrid, España",
        "dia": respuesta_form["reserva-dia"].value,
        "hora": respuesta_form["reserva-hora"].value
    };

    let mostrarYaReservado = false;
    // Revisar otras reservas con la misma combinación de hora y día.
    jsonUsuario["reservas"].forEach(reservaUsuario => {
        if (reservaUsuario.lugar === reserva.lugar && 
            reservaUsuario.dia === reserva.dia && 
            reservaUsuario.hora === reserva.hora){
                mostrarYaReservado = true;
        }
    });

    if (mostrarYaReservado){
        window.alert("¡No ha sido posible realizar la reserva! Por favor inténta elegir otra hora D:");
        return -1;
    }
    

    if (codigoCuenta === -1){
        jsonUsuario["reservas"].push(reserva);
    }

    // Subimos el array de cartas al local storage.
    localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));

    // limpiar inputs del form.
    reserva_formulario.reset();

    // enseñar mensaje de la página.
    window.alert("¡Reserva realizada con éxito! :)");
    // mostrar botón para revisar las reservas.
    // Arreglar que el botón se siga mostrando después de cerrar sesión.
    $("#boton-mostrar-reservas").show();

}

function resizeGMap(div_padre){
    if (window.innerWidth < 768){
        $("#reserva-g-map").css({"width": div_padre.offsetWidth + "px", "height": window.innerHeight/2 + "px"})
    }
    else{
        $("#reserva-g-map").css({"width": window.innerWidth/2 + "px", "height": window.innerHeight/2 + "px"})
    }
}

$(document).ready(reservas_init())