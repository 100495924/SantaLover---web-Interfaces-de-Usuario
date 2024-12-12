$(document).ready(function(){
  // El pop-up aparece al darle al botón de "Inicia sesión"
  $(".boton-inicia-sesion").click(function(){
    $("#modal-inicia-sesion").fadeIn("fast");
    $("#modal-registrarse").fadeOut("fast");
  });

  // Al iniciar sesión con éxito, al darle al botón de "Aceptar", se oculta el pop-up
  // También se eliminan los botones de "Inicia sesión" y "Registrarse" para pasar a mostrar el icono del perfil del usuario
  $("#boton-aceptar-inicia-sesion").click(function(){
    const cerrarModal = comprobarIniciarSesion();
    if (cerrarModal) {
      $("#modal-inicia-sesion").fadeOut("fast");
      $(".div-botones-menu").hide();
    }
  });

  // Al darle al botón de "Cancelar", se devuelve el pop-up a su estado inicial
  $("#boton-cancelar-inicia-sesion").click(function(){
    $("#modal-inicia-sesion").fadeOut("fast", function(){
      $("#form-inicia-sesion")[0].reset();
      cambiarVisibilityMessageError("hidden");
    });
  });
});

function comprobarIniciarSesion(){
  const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));

  // Si no se ha registrado ningún usuario (no existe la key "usuarioData")
  if (jsonUsuario === null){
    cambiarVisibilityMessageError("visible");
    return false;
  }

  // Si hay un usuario registrado, comprobar que el usuario y contraseña introducidos coinciden con los almacenados
  // en local storage
  const usernameLocalStorage = jsonUsuario["username"];
  const contraseñaLocalStorage = jsonUsuario["contraseña"];
  const usernameInput = document.getElementById("username-inicia-sesion").value.trim();
  const contraseñaInput = document.getElementById("contraseña-inicia-sesion").value.trim();

  // La cuenta es de un adulto
  if (usernameInput === usernameLocalStorage && contraseñaInput === contraseñaLocalStorage){
    cambiarVisibilityMessageError("hidden");
    jsonUsuario["sesionIniciada"] = true;
    localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));
    $("#icono-sesion-iniciada").show();
    $("#icono-sesion-iniciada-niño").hide();
    $("#boton-inicia-sesion-movil").hide();
    $("#boton-registrarse-movil").hide();
    startChat();
    return true;
  }

  // Comprobar si es la cuenta de una cuenta asociada
  let cuentaEncontrada = false;
  let index = 0;

  while (!cuentaEncontrada && index < jsonUsuario["cuentasAsociadas"].length){
    let cuentaActual = jsonUsuario["cuentasAsociadas"][index];
    if (usernameInput === cuentaActual["username"] && contraseñaInput === cuentaActual["contraseña"]){
      cuentaEncontrada = true;
    }
    else {
      index += 1;
    }
  }

  if (cuentaEncontrada){
    cambiarVisibilityMessageError("hidden");
    jsonUsuario["cuentasAsociadas"][index]["sesionIniciada"] = true;
    localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));
    $("#icono-sesion-iniciada").hide();
    $("#icono-sesion-iniciada-niño").show();
    $("#boton-inicia-sesion-movil").hide();
    $("#boton-registrarse-movil").hide();
    startChat();
    return true;
  }

  cambiarVisibilityMessageError("visible");
  return false;
}

function cambiarVisibilityMessageError(opcion){
  const mensajeError = document.querySelector(".mensaje-error-inicia-sesion");
  mensajeError.style.visibility = opcion;
}