$(document).ready(function(){
  startChat();
})

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function startChat(){
  // Chequear iniciar sesión
  chatBody = document.getElementById("chat-body");

  const papaNoelPrimero = `<p class="chat-mensaje-papa-noel-primero chat-mensaje-papa-noel"> \
                            ¡Ho, ho, ho! ¡Hola! ¡Vamos a hablar un poco sobre la navidad! ¿Por dónde quieres empezar? 🎅\
                          </p>`;

  chatBody.innerHTML += papaNoelPrimero;

  appendUsuarioInicial(chatBody);
}

async function appendPapaNoelInicial(chatBody){
  const item = "¿Qué quieres hacer? 🎅";
  const listaClases = ["chat-mensaje-papa-noel-inicial", "chat-mensaje-papa-noel"];
  
  await escribirRespuestaPapaNoel(item, listaClases, chatBody);
  appendUsuarioInicial(chatBody);

}

function appendUsuarioInicial(chatBody){
  const divMensaje = document.createElement("div");
  divMensaje.classList.add("chat-mensaje-usuario-inicial", "chat-mensaje-usuario");

  const botonChiste = document.createElement("button");
  botonChiste.classList.add("chat-boton-chiste", "chat-boton");
  botonChiste.innerHTML = "Cuéntame un chiste";
  const botonCuriosidad = document.createElement("button");
  botonCuriosidad.classList.add("chat-boton-curiosidad", "chat-boton");
  botonCuriosidad.innerHTML = "Cuéntame una curiosidad";
  const botonAdios = document.createElement("button");
  botonAdios.classList.add("chat-boton-adios", "chat-boton");
  botonAdios.innerHTML = "Adiós";

  divMensaje.appendChild(botonChiste);
  divMensaje.appendChild(botonCuriosidad);
  divMensaje.appendChild(botonAdios);

  chatBody.appendChild(divMensaje);

  botonChiste.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelChiste(chatBody);
  });
  botonCuriosidad.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelCuriosidad(chatBody);
  });
  botonAdios.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelAdios(chatBody);
  });
}

function cloneMensajeUsuario(chatBody, divMensaje){
  // Para que los botones del mensaje ya no sean funcionales (quitarles el event listener de click)
  const divMensajeClone = divMensaje.cloneNode(true);
  chatBody.appendChild(divMensajeClone);
  divMensaje.remove();
}

async function escribirRespuestaPapaNoel(item, listaClases, chatBody){
  // Simula que Papá Noel está escribiendo su respuesta y la añade al DOM
  const pMensaje = document.createElement("p");
  listaClases.forEach((clase) => {
    pMensaje.classList.add(clase);
  })
  chatBody.appendChild(pMensaje);
  pMensaje.innerHTML = "escribiendo...";
  await delay(1000);
  pMensaje.innerHTML = item;
}

async function appendPapaNoelChiste(chatBody){
  const chistesArray = 
  ['¿Sabes qué tipo de coche lleva Papá Noel?<br> \
    Un "Renol".',

    '¿Cómo se llaman los habitantes de Belén?<br> \
    Figuritas.',

    '¿Qué le regaló Batman a Dora exploradora para Navidad?<br> \
    Una BatiDora.',

    'Dos niños están preparando el árbol de Navidad, y uno le dice al otro:<br> \
    - Avísame si se encienden las luces.<br> \
    Y el otro le contesta:<br> \
    - Sí...no...sí...no...',

    'Como el juez prometió ser tolerante esta Navidad, le pregunta a un acusado:<br> \
    - Hombre, ¿De qué se le acusa?<br> \
    - De haber hecho mis compras navideñas con anticipación.<br> \
    - Hombre, pero eso no es un delito, ¿Con cuánta anticipación las compró usted?<br> \
    - Antes que abrieran la tienda.',

    '- Papá Noel me trajo un reloj.<br> \
    ¿Qué marca?<br> \
    - Pues la hora.',

    '¿Sabes cuál es el letrero más visto durante la Navidad? \
    "No incluye pilas".',

    'Una madre le cuenta a su hijo:<br> \
    - Tres magos que venían de Oriente siguiendo una estrella, se bajaron de sus camellos, se arrodillaron ante Jesús y le regalaron oro, incienso y mirra.<br> \
    Y el hijo contesta:<br> \
    - Será que por entonces aún no habían inventado la "Play".',

    '¿Qué ocurre cuando Santa Claus se queda atrapado en una chimenea?<br> \
    Que le entra Claus-trofobia.',

    'Dos niños se van al bosque en busca de un pino para Navidad. Después de dos horas de búsqueda, uno le dice al otro:<br> \
    - Bueno, ¡ya es suficiente! El próximo pino que veamos nos lo llevamos, ¡tenga o no tenga bolas de colores de Navidad!'
  ];
  const itemElegido = chistesArray[Math.floor(Math.random()*chistesArray.length)];
  const listaClases = ["chat-mensaje-papa-noel-chiste", "chat-mensaje-papa-noel"];
  
  await escribirRespuestaPapaNoel(itemElegido, listaClases, chatBody);
  appendUsuarioChisteAnswer(chatBody);
}

function appendUsuarioChisteAnswer(chatBody){
  const divMensaje = document.createElement("div");
  divMensaje.classList.add("chat-mensaje-usuario-chiste", "chat-mensaje-usuario");

  const botonChistePositivo = document.createElement("button");
  botonChistePositivo.classList.add("chat-boton-chiste-positivo", "chat-boton");
  botonChistePositivo.innerHTML = "JAJAJAJAJA 🤣";
  const botonChisteNegativo = document.createElement("button");
  botonChisteNegativo.classList.add("chat-boton-chiste-negativo", "chat-boton");
  botonChisteNegativo.innerHTML = "Qué malo... 😅";
  const botonChisteOtro = document.createElement("button");
  botonChisteOtro.classList.add("chat-boton-chiste-otro", "chat-boton");
  botonChisteOtro.innerHTML = "Cuéntame otro chiste";

  divMensaje.appendChild(botonChistePositivo);
  divMensaje.appendChild(botonChisteNegativo);
  divMensaje.appendChild(botonChisteOtro);

  chatBody.appendChild(divMensaje);

  botonChistePositivo.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelChisteAnswer(chatBody, "positivo");
  });
  botonChisteNegativo.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelChisteAnswer(chatBody, "negativo");
  });
  botonChisteOtro.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelChisteAnswer(chatBody, "otro");
  });
}

async function appendPapaNoelChisteAnswer(chatBody, tipo){
  if (tipo === "positivo"){
    const item = "¡Me alegro de que te haya gustado! 😁";
    const listaClases = ["chat-mensaje-papa-noel-chiste-positivo", "chat-mensaje-papa-noel"];
    await escribirRespuestaPapaNoel(item, listaClases, chatBody);
    await delay(500);
    appendPapaNoelInicial(chatBody);
  }
  else if (tipo === "negativo"){
    const item = "¿Tan malo era...? 😔";
    const listaClases = ["chat-mensaje-papa-noel-chiste-negativo", "chat-mensaje-papa-noel"];
    await escribirRespuestaPapaNoel(item, listaClases, chatBody);
    await delay(500);
    appendPapaNoelInicial(chatBody);
  }
  else{
    appendPapaNoelChiste(chatBody);
  }
}

async function appendPapaNoelCuriosidad(chatBody){
  const curiosidadesArray = 
  ['En Japón, es tradicional comer pollo frito de KFC en Navidad, ¡y las familias hacen pedidos con meses de antelación!',
    'La primera tarjeta navideña se imprimió en 1843 en Inglaterra.',
    'El villancico "Jingle Bells" fue originalmente una canción del Día de Acción de Gracias.',
    '"Noche de Paz" es la canción navideña más traducida, con versiones en más de 300 idiomas.',
    'El turrón y el mazapán tienen origen árabe.',
    'En Filipinas, tienen la temporada navideña más larga, empezando en septiembre.',
    'Los árboles de navidad artificiales fueron inventados en Alemania en el siglo XIX con plumas de ganso pintadas de verde.',
    'El mayor regalo de Navidad de la historia fue la Estatua de la Libertad, un obsequio de Francia a Estados Unidos en 1886.',
    'En Noruega, esconden las escobas en Nochebuena para evitar que las brujas "vuelen".',
    'La Navidad se prohibió en Inglaterra durante la dictadura de Oliver Cromwell en el siglo XVII (1647-1660).'
  ];
  const itemElegido = curiosidadesArray[Math.floor(Math.random()*curiosidadesArray.length)];
  const listaClases = ["chat-mensaje-papa-noel-curiosidad", "chat-mensaje-papa-noel"];

  await escribirRespuestaPapaNoel(itemElegido, listaClases, chatBody);
  appendUsuarioCuriosidadAnswer(chatBody);
}

function appendUsuarioCuriosidadAnswer(chatBody){
  const divMensaje = document.createElement("div");
  divMensaje.classList.add("chat-mensaje-usuario-chiste", "chat-mensaje-usuario");

  const botonCuriosidadPositivo = document.createElement("button");
  botonCuriosidadPositivo.classList.add("chat-boton-curiosidad-positivo", "chat-boton");
  botonCuriosidadPositivo.innerHTML = "¡Qué interesante! 😄";
  const botonCuriosidadNegativo = document.createElement("button");
  botonCuriosidadNegativo.classList.add("chat-boton-curiosidad-negativo", "chat-boton");
  botonCuriosidadNegativo.innerHTML = "Ya lo sabía... 😑";
  const botonCuriosidadOtro = document.createElement("button");
  botonCuriosidadOtro.classList.add("chat-boton-curiosidad-otro", "chat-boton");
  botonCuriosidadOtro.innerHTML = "Cuéntame otra curiosidad";

  divMensaje.appendChild(botonCuriosidadPositivo);
  divMensaje.appendChild(botonCuriosidadNegativo);
  divMensaje.appendChild(botonCuriosidadOtro);

  chatBody.appendChild(divMensaje);

  botonCuriosidadPositivo.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelCuriosidadAnswer(chatBody, "positivo");
  });
  botonCuriosidadNegativo.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelCuriosidadAnswer(chatBody, "negativo");
  });
  botonCuriosidadOtro.addEventListener("click", function(){
    cloneMensajeUsuario(chatBody, divMensaje);
    appendPapaNoelCuriosidadAnswer(chatBody, "otro");
  });
}

async function appendPapaNoelCuriosidadAnswer(chatBody, tipo){
  if (tipo === "positivo"){
    const item = "¡El conocimiento es poder! 😎";
    const listaClases = ["chat-mensaje-papa-noel-curiosidad-positivo", "chat-mensaje-papa-noel"];
    await escribirRespuestaPapaNoel(item, listaClases, chatBody);
    await delay(500);
    appendPapaNoelInicial(chatBody);
  }
  else if (tipo === "negativo"){
    const item = "Estos niños cada vez saben más cosas... 🙄";
    const listaClases = ["chat-mensaje-papa-noel-curiosidad-negativo", "chat-mensaje-papa-noel"];
    await escribirRespuestaPapaNoel(item, listaClases, chatBody);
    await delay(500);
    appendPapaNoelInicial(chatBody);
  }
  else{
    appendPapaNoelCuriosidad(chatBody);
  }
}

async function appendPapaNoelAdios(chatBody){
  // Chequear inicio de sesión
  const item = "¡Hasta la próxima! ¡Recuerda portarte bien! ☃️";
  const listaClases = ["chat-mensaje-papa-noel-inicial", "chat-mensaje-papa-noel"];
  await escribirRespuestaPapaNoel(item, listaClases, chatBody);
  const botonRepetir = document.createElement("button");
  botonRepetir.classList.add("chat-boton-repetir");
  botonRepetir.innerHTML = "VOLVER A HABLAR";
  chatBody.appendChild(botonRepetir);
  botonRepetir.addEventListener("click", function(){
    chatBody.innerHTML = "";
    startChat();
  });
}
