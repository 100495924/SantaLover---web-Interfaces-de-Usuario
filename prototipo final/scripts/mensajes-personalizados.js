$(document).ready(function(){
    botonEnviarMensaje = document.getElementById("mensajes-boton-enviar");
    botonEnviarMensaje.addEventListener("click", guardarMensaje);
})

function guardarMensaje() {
    const form = document.getElementById("form-mensajes-personalizados");

    const mensajeNombre = document.getElementById("form-mensajes-nombre");
    const mensajeRelacion = document.getElementById("form-mensajes-relacion");
    const mensajeGusta = document.getElementById("form-mensajes-gusta");
    const mensajeRegalo = document.getElementById("form-mensajes-regalo");

    const mensajeError = document.getElementById("mensajes-mensaje-error");

    let isFormComplete = true;

    arrayInputs = [mensajeNombre, mensajeRelacion, mensajeGusta, mensajeRegalo]
    
    arrayInputs.forEach(input => {
        if (input.value === ""){
            // Marcamos en rojo el cuadro en el que el usuario no ha introducido respuesta
            input.style.border = "solid rgb(206, 68, 82)";
            isFormComplete = false;
        }
        else {
            input.style.border = null;
        }
    });

    if (!isFormComplete){
        mensajeError.innerHTML = "Tienes que rellenar todos los campos";
        return -1;
    }

    const codigoCuenta = isCuentaNiñoAdulto();
    
    if (codigoCuenta === -2){
        mensajeError.innerHTML = "Tienes que iniciar sesión para generar el mensaje";
        return -1;
    }

    const mensaje = { 
        "mensajeNombre": mensajeNombre.value,
        "mensajeRelacion": mensajeRelacion.value,
        "mensajeGusta": mensajeGusta.value,
        "mensajeRegalo": mensajeRegalo.value
    };

    const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));

    if (codigoCuenta === -1){
        jsonUsuario["mensajesPersonalizados"].push(mensaje);
    }
    else{
        jsonUsuario["cuentasAsociadas"][codigoCuenta]["mensajesPersonalizados"].push(mensaje);
    }

    // Subimos el array de mensajes al local storage.
    localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));

    // Limpiar inputs del form
    form.reset();

    // Quitar mensaje de error
    mensajeError.innerHTML = "&nbsp";

    // Enseñar mensaje de la página
    window.alert("¡Mensaje generado!");

    $("#modal-mis-mensajes").fadeIn("fast");

}