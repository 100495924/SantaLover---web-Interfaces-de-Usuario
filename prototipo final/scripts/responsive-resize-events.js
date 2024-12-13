$(document).ready(function(){
  $(window).on("resize", function(){
    displayIniciarSesionRegistrarse();
    //displayModales();
  });
});

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

// function displayModales(){
//   WIDTH1 = 457;
//   WIDTH2 = 600;

//   if (window.innerWidth < WIDTH2){
//     $("#modal-registrarse-inicial-opciones-adulto").hide();
//     $("#modal-registrarse-inicial-opciones-niño").hide();
//   }
//   else{
//     $("#modal-registrarse-inicial-opciones-adulto").css("display", "flex");
//     $("#modal-registrarse-inicial-opciones-niño").css("display", "flex");
//   }

//   // if (window.innerWidth < WIDTH2){

//   // }
// }