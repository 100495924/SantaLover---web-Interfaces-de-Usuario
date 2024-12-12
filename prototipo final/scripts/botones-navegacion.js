$(document).ready(function(){
  clickEventsBotonesNavegacion();
})

// Darle click a los botones
function clickEventsBotonesNavegacion(){
  const homeBoton = document.getElementById("boton-navegacion-home");
  const comidaBoton = document.getElementById("boton-navegacion-comida");
  const cartasBoton = document.getElementById("boton-navegacion-cartas");
  const enviaBoton = document.getElementById("boton-navegacion-envia");
  const mqBoton = document.getElementById("boton-navegacion-mq");
  const mensajesBoton = document.getElementById("boton-navegacion-mensajes");
  const reservaBoton = document.getElementById("boton-navegacion-reserva");
  const chatBoton = document.getElementById("boton-navegacion-chat");
  const advientoBoton = document.getElementById("boton-navegacion-adviento");
  const videollamadaBoton = document.getElementById("boton-navegacion-videollamada");

  const homeSection = document.getElementById("pagina1");
  const comidaSection = document.getElementById("pagina2");
  const cartasSection = document.getElementById("pagina3");
  const enviaSection = document.getElementById("pagina4");
  const mqSection = document.getElementById("pagina5");
  const mensajesSection = document.getElementById("MensajesPersonalizados"); // pendiente cambiar
  const reservaSection = document.getElementById("reserva-fabrica");
  const chatSection = document.getElementById("chat");
  const advientoSection = document.getElementById("calendario-adviento"); // pendiente cambiar
  const videllamadaSection = document.getElementById("pagina1"); // pendiente cambiar

  arrayBotones = [
    homeBoton, comidaBoton, cartasBoton, enviaBoton, mqBoton, mensajesBoton,
    reservaBoton, chatBoton, advientoBoton, videollamadaBoton
  ];

  arraySections = [
    homeSection, comidaSection, cartasSection, enviaSection, mqSection, mensajesSection,
    reservaSection, chatSection, advientoSection, videllamadaSection
  ];

  // A cada botón le asignamos un evento al hacerle click para que haga scroll a su sección correspondiente
  // Para hacer scroll al lugar adecuado debemos saber el height del header
  for (let i = 0; i < arrayBotones.length; i++) {
    arrayBotones[i].addEventListener("click", function(){
      const header = document.querySelector(".barra-navegacion");
      const headerHeight = header.offsetHeight;
      arraySections[i].scrollIntoView();
      window.scrollBy(0, -headerHeight + 1);
    })
  }

  // Queremos que los botones de navegación destaquen cuando te encuentras dentro de una sección,
  // para que el usuario sepa dónde se encuentra
  document.addEventListener("scroll", function(){
    const header = document.querySelector(".barra-navegacion");
    const headerHeight = header.offsetHeight;
    // Chequear para cada sección y botón
    for (let i = 0; i < arrayBotones.length; i++) {
      // Información sobre la posición de los elementos
      let rect = arraySections[i].getBoundingClientRect();
      // Si la parte más baja del header está tocando la sección, destacamos su botón correspondiente
      if (rect["top"] <= headerHeight && headerHeight <= rect["bottom"]){
        // Rojo
        if (arrayBotones[i].classList.contains("link-rojo") && 
              !arrayBotones[i].classList.contains("link-evidencia-rojo")){
          arrayBotones[i].classList.add("link-evidencia-rojo");
        }
        // Verde
        else if (arrayBotones[i].classList.contains("link-verde") && 
                  !arrayBotones[i].classList.contains("link-evidencia-verde")){
          arrayBotones[i].classList.add("link-evidencia-verde");
        }
      }
      // Para dejar de destacar el botón si se ha salido de la zona tocando el header
      else{
        // Rojo
        if (arrayBotones[i].classList.contains("link-evidencia-rojo")){
          arrayBotones[i].classList.remove("link-evidencia-rojo");
        }
        // Verde
        else if (arrayBotones[i].classList.contains("link-evidencia-verde")){
          arrayBotones[i].classList.remove("link-evidencia-verde");
        }
      }
    }
  });

  botonEmpezar = document.getElementById("pagina1-boton-empezar");
  botonEmpezar.addEventListener("click", function(){
    const header = document.querySelector(".barra-navegacion");
    const headerHeight = header.offsetHeight;
    comidaSection.scrollIntoView();
    window.scrollBy(0, -headerHeight + 1);
  })

}