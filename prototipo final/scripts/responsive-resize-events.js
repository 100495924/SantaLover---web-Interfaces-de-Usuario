$(document).ready(function(){
  $(window).on("resize", function(){
    displayIniciarSesionRegistrarse();
  });
});

// Para que, según el tamaño del navegador, se muestren los botones de iniciar sesión
// y registrarse correspondientes (son elementos HTML distintos)
function displayIniciarSesionRegistrarse(){
  sesionIniciada = isCuentaNiñoAdulto();
  WIDTH = 1024;
  if (window.innerWidth < WIDTH && sesionIniciada === -2){
    $("#boton-inicia-sesion-movil").show();
    $("#boton-registrarse-movil").show();
    $(".div-botones-menu").hide();
  }
  else if (window.innerWidth >= WIDTH && sesionIniciada === -2){
    $("#boton-inicia-sesion-movil").hide();
    $("#boton-registrarse-movil").hide();
    $(".div-botones-menu").css("display", "flex");
  }
}