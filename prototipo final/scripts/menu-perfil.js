$(document).ready(function(){
  setLogin(false);
  // $("#icono-sesion-iniciada").show();

  calcularPosicionMenus();
  $(window).on("resize", function() {
    calcularPosicionMenus();
  });

  // Iconos de perfil y de menú hamburguesa
  
  $("#icono-sesion-iniciada").click(function(){
    if( $("#div-opciones-perfil-adulto").css("display").toLowerCase() === "none") {
      $("#div-opciones-perfil-adulto").fadeIn("fast");
      $("#div-opciones-perfil-adulto").css("display", "flex");
    }
    else {
      $("#div-opciones-perfil-adulto").fadeOut("fast");
    }
  });

  $("#icono-sesion-iniciada-niño").click(function(){
    if( $("#div-opciones-perfil-niño").css("display").toLowerCase() === "none") {
      $("#div-opciones-perfil-niño").fadeIn("fast");
      $("#div-opciones-perfil-niño").css("display", "flex");
    }
    else {
      $("#div-opciones-perfil-niño").fadeOut("fast");
    }
  });

  $("#cerrar").click(function(){
    $("#div-opciones-perfil-adulto").hide();
  });

  $("#menu-hamburguesa").click(function(){
    $("#div-opciones-perfil-adulto").hide();
  });
  
  // Mi perfil

  $("#contraseña-mi-perfil-adulto").change(function(){
    $("#repetir-contraseña-mi-perfil-adulto").val("");
  });

  $("#contraseña-mi-perfil-niño").change(function(){
    $("#repetir-contraseña-mi-perfil-niño").val("");
  });

  $("#boton-mi-perfil-niño").click(function(){
    rellenarFormMiPerfilNiño();
    $("#modal-mi-perfil-niño").fadeIn("fast");
    $("#div-opciones-perfil-niño").fadeOut("fast");
  });

  $("#boton-modificar-mi-perfil-niño").click(function(){
    validarFormCuentaAsociada("mi-perfil-niño");
  });

  $("#boton-atras-mi-perfil-niño").click(function(){
    $("#modal-mi-perfil-niño").fadeOut("fast");
  });

  // Mis cartas

  $(".boton-mis-cartas").click(function(){
    $("#modal-mis-cartas").fadeIn("fast");
    const arrayCartas = JSON.parse(localStorage.getItem("usuarioData"))["cartas"];
    if (arrayCartas !== null && arrayCartas.length != 0) {
      $("#modal-mis-cartas-body").css("display", "grid");
      rellenarMisCartas(arrayCartas);
      actualizarEventosDragDrop();
    }
    else {
      mensajeNoCartas();
    }
    $("#div-opciones-perfil-adulto").fadeOut("fast");
    $("#div-opciones-perfil-niño").fadeOut("fast");
  });

  $("#boton-atras-mis-cartas").click(function(){
    $("#modal-mis-cartas").fadeOut("fast", function(){
      const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
      modalMisCartasBody.innerHTML = "";
    });
  });

  // Mis mensajes

  $(".boton-mis-mensajes").click(function(){
    $("#modal-mis-mensajes").fadeIn("fast");
    $("#div-opciones-perfil-adulto").fadeOut("fast");
    $("#div-opciones-perfil-niño").fadeOut("fast");
    const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
    const cuentaIniciada = isCuentaNiñoAdulto();
    let arrayMensajes;
    if (cuentaIniciada === -1){
      arrayMensajes = jsonUsuario["mensajes"];
    }
    else{
      arrayMensajes = jsonUsuario["cuentasAsociadas"][cuentaIniciada]["mensajes"];
    }
    if (arrayMensajes !== null && arrayReservas.length != 0) {
      $("#modal-mis-reservas-body").css("display", "grid");
      rellenarMisMensajes(arrayMensajes);
      // actualizarEventosDragDropMensajes();
    }
    // else {
    //   mensajeNoMensajes();
    // }
  })

  $("#boton-atras-mis-mensajes").click(function(){
    $("#modal-mis-mensajes").fadeOut("fast");
  });

  // Mis reservas

  $("#boton-mis-reservas").click(function(){
    $("#modal-mis-reservas").fadeIn("fast");
    $("#div-opciones-perfil-adulto").fadeOut("fast");
    const arrayReservas = JSON.parse(localStorage.getItem("usuarioData"))["reservas"];
    if (arrayReservas !== null && arrayReservas.length != 0) {
      $("#modal-mis-reservas-body").css("display", "grid");
      rellenarMisReservas(arrayReservas);
      actualizarEventosDragDropReservas();
    }
    else {
      mensajeNoReservas();
    }
  });

  $("#boton-atras-mis-reservas").click(function(){
    $("#modal-mis-reservas").fadeOut("fast", function(){
      const modalMisReservasBody = document.getElementById("modal-mis-reservas-body");
      modalMisReservasBody.innerHTML = "";
    });
  });

  // Crear cuenta asociada

  $("#boton-crear-cuenta-asociada").click(function(){
    $("#modal-crear-cuenta-asociada").fadeIn("fast");
    $("#div-opciones-perfil-adulto").fadeOut("fast");
  })

  $("#boton-cancelar-crear-cuenta-asociada").click(function(){
    $("#modal-crear-cuenta-asociada").fadeOut("fast");
  });

  $("#boton-aceptar-crear-cuenta-asociada").click(function(){
    const cuentaCreada = validarFormCuentaAsociada("crear-cuenta-asociada");
    if (cuentaCreada) {
      document.getElementById("form-crear-cuenta-asociada").reset();
    }
  });

  // Cerrar sesión

  $(".boton-cerrar-sesion").click(function(){
    if (window.confirm("¿Estás seguro/a de que quieres cerrar sesión?")) {
      $("#div-opciones-perfil-adulto").fadeOut("fast");
      $("#div-opciones-perfil-niño").fadeOut("fast");
      $(".div-botones-menu").show();
      $("#boton-inicia-sesion-movil").show();
      $("#boton-registrarse-movil").show();
      $("#icono-sesion-iniciada").hide();
      $("#icono-sesion-iniciada-niño").hide();
      $("#boton-mostrar-reservas").hide();
      setLogin(false)
    }
  });
});

function calcularPosicionMenus(){
  // Pone los menús justo por debajo del "header superior" (usando la propiedad top de CSS)
  headerSuperior = document.querySelector(".div-logo-iconos");
  headerSuperiorHeight = headerSuperior.offsetHeight;

  divOpcionesPerfilAdulto = document.getElementById("div-opciones-perfil-adulto");
  divOpcionesPerfilAdulto.style.top = `${headerSuperiorHeight}px`;

  divOpcionesPerfilNiño = document.getElementById("div-opciones-perfil-niño");
  divOpcionesPerfilNiño.style.top = `${headerSuperiorHeight}px`;

  divOpcionesMenu = document.querySelector(".div-opciones-menu");
  divOpcionesMenu.style.top = `${headerSuperiorHeight}px`;
}

function setLogin(valorSesionIniciada){
  // Cambia el atributo "sesionIniciada" del local storage de usuarioData
  const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
  if (jsonUsuario === null){
    return -1;
  }

  if (!valorSesionIniciada && !jsonUsuario["sesionIniciada"]){
    // Cambiar el valor de la cuenta asociada de la que se está cerrando sesión
    const index = encontrarCuentaNiñoIndex(jsonUsuario)
    if (index === -1){
      jsonUsuario["sesionIniciada"] = valorSesionIniciada;
    }
    else{
      jsonUsuario["cuentasAsociadas"][index]["sesionIniciada"] = valorSesionIniciada;
    }
  }
  else{
    jsonUsuario["sesionIniciada"] = valorSesionIniciada;
  }

  localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));
  return 0;
}

function encontrarCuentaNiñoIndex(jsonUsuario){
  // Se asume que un niño tiene la sesión iniciada
  let cuentaEncontrada = false;
  let index = 0;

  while (!cuentaEncontrada && index < jsonUsuario["cuentasAsociadas"].length){
    let cuentaActual = jsonUsuario["cuentasAsociadas"][index];
    if (cuentaActual["sesionIniciada"]){
      cuentaEncontrada = true;
    }
    else {
      index += 1;
    }
  }

  if (cuentaEncontrada){
    return index;
  }
  return -1
}

function isCuentaNiñoAdulto(){
  // -2: ninguna cuenta ha iniciado sesión
  // -1: cuenta adulto
  // otro: cuenta niño
  // "otro" es el index del niño con respecto al array de "cuentas asociadas" de la cuenta de adulto
  const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
  if (jsonUsuario === null){
    return -2;
  }
  if (!jsonUsuario["sesionIniciada"]){
    const index = encontrarCuentaNiñoIndex(jsonUsuario);
    if (index === -1){
        return -2;
    }
    else{
      return index;
    }
  }
  else{
    return -1;
  }
}

// Mi perfil

function rellenarFormMiPerfilNiño(){
  const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));

  const cuenta = jsonUsuario["cuentasAsociadas"][encontrarCuentaNiñoIndex(jsonUsuario)];

  const usernameValue = cuenta["username"];
  const contraseñaValue = cuenta["contraseña"];

  $("#username-mi-perfil-niño").val(usernameValue);
  $("#contraseña-mi-perfil-niño").val(contraseñaValue);
  $("#repetir-contraseña-mi-perfil-niño").val(contraseñaValue);
}

// Mis cartas

function mensajeNoCartas(){
  $("#modal-mis-cartas-body").css("display", "block");
  $("#modal-mis-cartas-body").append(`<p class="mensaje-no-cartas">Visita a la sección <span class="texto-destacado-rojo">¡Envía tu carta! 📩</span> para escribir una carta ;)</p>`);
}

function rellenarMisCartas(arrayCartas){
  const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
  for(let i = 0; i < arrayCartas.length; i++) {
    let cartaJSON = arrayCartas[i];
    let cartaNombre = cartaJSON.carta_nombre;
    let cartaCiudad = cartaJSON.carta_ciudad;
    let cartaPais = cartaJSON.carta_pais;
    let cartaTexto = cartaJSON.carta_texto;
    let currentID = i.toString();
    let codeToAppend = `<div id="dropzone-${currentID}" class="drop-zone">
                          <div class="carta-mis-cartas" draggable="true">
                            <div class="carta-mis-cartas-sub">
                              <img class="foto_carta"
                              src="images/perfil-icon.svg"
                              alt="Foto">
                              <div>
                                <h2 class="texto-carta-mis-cartas">${cartaNombre}</h2>
                                <h3 class="texto-carta-mis-cartas">${cartaCiudad}, ${cartaPais}</h3>
                              </div>
                            </div>
                            <p class="texto-carta-mis-cartas">${cartaTexto}</p>
                            <button class="boton-borrar-mis-cartas">Borrar</button>
                          </div>
                        </div>`;
    modalMisCartasBody.innerHTML += codeToAppend;
  }
}


function borrarMisCartas(dropZoneParent){
  let userData = JSON.parse(localStorage.getItem("usuarioData"));
  let arrayCartas = userData["cartas"];
  const indexBorrar = Number(dropZoneParent.id.split("-")[1]);

  arrayCartas.splice(indexBorrar, 1);

  localStorage.setItem("usuarioData", JSON.stringify(userData));

  const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
  modalMisCartasBody.innerHTML = "";

  if (arrayCartas.length > 0){
    rellenarMisCartas(arrayCartas);
    actualizarEventosDragDrop();
  }
  else {
    mensajeNoCartas();
  }
}


function actualizarEventosDragDrop(){
  const cartas = document.querySelectorAll(".carta-mis-cartas");
  const dropZones = document.querySelectorAll(".drop-zone");
  const buttons = document.querySelectorAll(".boton-borrar-mis-cartas");
  
  buttons.forEach(function(boton) {
    // 
    boton.addEventListener("click", function() {
      if (window.confirm("¿Estás seguro/a de que quieres borrar esta carta?")) {
        dropZoneParent = boton.closest(".drop-zone");
        borrarMisCartas(dropZoneParent);
      }
    })
  })

  cartas.forEach(function(carta) {
    // Evento para detectar cuándo el usuario le hace "drag"
    carta.addEventListener("dragstart", function() {
      carta.classList.add("carta-en-movimiento");
    })

    // Evento para detectar cuándo el usuario la suelta 
    carta.addEventListener("dragend", function() {
      carta.classList.remove("carta-en-movimiento");
    })
  })

  dropZones.forEach(function(dropZone) {
    // Evento para detectar que un elemento está siendo movido por encima de la zona del div "drop-zone"
    // El elemento pasa a estar ahí colocado y el usuario lo comprueba a tiempo real, no una vez soltado
    dropZone.addEventListener("dragover", function(event) {
      event.preventDefault();  
      const dropZone = event.target.closest(".drop-zone");
      const dropeZoneCarta = dropZone.querySelector(".carta-mis-cartas");
      const dragCarta = document.querySelector(".carta-en-movimiento");
      const dragCartaParent = dragCarta.closest(".drop-zone");
      dropZone.appendChild(dragCarta);
      dragCartaParent.appendChild(dropeZoneCarta);

      let arrayCartas = JSON.parse(localStorage.getItem("usuarioData"))["cartas"];
      const indexDrag = Number(dragCartaParent.id.split("-")[1]);
      const indexDrop = Number(dropZone.id.split("-")[1]);

      [arrayCartas[indexDrag], arrayCartas[indexDrop]] = [arrayCartas[indexDrop], arrayCartas[indexDrag]];

      localStorage.setItem("arrayCartas", JSON.stringify(arrayCartas));
    })
  })
}

// Mis mensajes

function mensajeNoMensajes(){
  $("#modal-mis-reservas-body").css("display", "block");
  $("#modal-mis-reservas-body").append(`<p class="mensaje-no-cartas">Visita a la sección <span class="texto-destacado-rojo">Mensajes personalizados 🎅</span> para que Papá Noel le escriba una carta a un ser querido ;)</p>`);
}

function rellenarMisMensajes(arrayMensajes, codigoCuenta){
  const modalMisCartasBody = document.getElementById("modal-mis-mensajes-body");
  for(let i = 0; i < arrayMensajes.length; i++) {
    let cartaJSON = arrayMensajes[i];
    let mensajeNombre = cartaJSON.nombre;
    let mensajeRelacion = cartaJSON.relacion;
    let mensajeGusta = cartaJSON.gusta;
    let mensajeRegalo = cartaJSON.regalo;
    let currentID = i.toString();
    let codeToAppend = `<div id="dropzone-mensajes-${currentID}" class="drop-zone">
                          <div class="mensaje-mis-mensajes" draggable="true">
                            <p><strong>¡Hola ${mensajeNombre}!</strong></p>
                            <p>Acabo de hablar con tu ${mensajeRelacion} ${username}, al cual le encanta de ti "${mensajeGusta}".
                            Me ha dicho que te haría mucha ilusión recibir un mensaje mío. Si te portas bien este año, haré todo lo posible para dejarte debajo del árbol el 25 de diciembre "${mensajeRegalo}".</p>
                            <div>
                              <p>Un abrazo, Papá Noel</p>
                              <div>
                                <img class="mensaje-foto-papa-noel"
                                src="images/papa-noel-tracker.png"
                                alt="Foto de Papá Noel">
                              </div>
                            </div>
                            
                            <button class="boton-eliminar-mis-mensajes">ELIMINAR</button>
                          </div>
                        </div>`;
    modalMisCartasBody.innerHTML += codeToAppend;
  }
}


// function borrarMisMensajes(dropZoneParent){
//   let userData = JSON.parse(localStorage.getItem("usuarioData"));
//   let arrayCartas = userData["cartas"];
//   const indexBorrar = Number(dropZoneParent.id.split("-")[1]);

//   arrayMensajes.splice(indexBorrar, 1);

//   localStorage.setItem("usuarioData", JSON.stringify(userData));

//   const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
//   modalMisCartasBody.innerHTML = "";

//   if (arrayMensajes.length > 0){
//     rellenarMisMensajes(arrayMensajes);
//     actualizarEventosDragDropMensajes();
//   }
//   else {
//     mensajeNoMensajes();
//   }
// }


// function actualizarEventosDragDropMensajes(codigoCuenta){
//   const cartas = document.querySelectorAll(".mensaje-mis-mensajes");
//   const dropZones = document.querySelectorAll(".drop-zone");
//   const buttons = document.querySelectorAll(".boton-eliminar-mis-mensajes");
  
//   buttons.forEach(function(boton) {
//     // 
//     boton.addEventListener("click", function() {
//       if (window.confirm("¿Estás seguro/a de que quieres borrar este mensaje personalizado?")) {
//         dropZoneParent = boton.closest(".drop-zone");
//         borrarMisCartas(dropZoneParent);
//       }
//     })
//   })

//   cartas.forEach(function(carta) {
//     // Evento para detectar cuándo el usuario le hace "drag"
//     carta.addEventListener("dragstart", function() {
//       carta.classList.add("carta-en-movimiento");
//     })

//     // Evento para detectar cuándo el usuario la suelta 
//     carta.addEventListener("dragend", function() {
//       carta.classList.remove("carta-en-movimiento");
//     })
//   })

//   dropZones.forEach(function(dropZone) {
//     // Evento para detectar que un elemento está siendo movido por encima de la zona del div "drop-zone"
//     // El elemento pasa a estar ahí colocado y el usuario lo comprueba a tiempo real, no una vez soltado
//     dropZone.addEventListener("dragover", function(event) {
//       event.preventDefault();  
//       const dropZone = event.target.closest(".drop-zone");
//       const dropeZoneCarta = dropZone.querySelector(".carta-mis-cartas");
//       const dragCarta = document.querySelector(".carta-en-movimiento");
//       const dragCartaParent = dragCarta.closest(".drop-zone");
//       dropZone.appendChild(dragCarta);
//       dragCartaParent.appendChild(dropeZoneCarta);

//       let arrayCartas = JSON.parse(localStorage.getItem("usuarioData"))["cartas"];
//       const indexDrag = Number(dragCartaParent.id.split("-")[1]);
//       const indexDrop = Number(dropZone.id.split("-")[1]);

//       [arrayCartas[indexDrag], arrayCartas[indexDrop]] = [arrayCartas[indexDrop], arrayCartas[indexDrag]];

//       localStorage.setItem("arrayCartas", JSON.stringify(arrayCartas));
//     })
//   })
// }

// Mis reservas

function mensajeNoReservas(){
  $("#modal-mis-reservas-body").css("display", "block");
  $("#modal-mis-reservas-body").append(`<p class="mensaje-no-cartas">Visita a la sección <span class="texto-destacado-rojo">Reserva 🏭</span> para hacer una reserva y conocer la fábrica ;)</p>`);
}

function rellenarMisReservas(arrayReservas){
  const modalMisReservasBody = document.getElementById("modal-mis-reservas-body");
  for(let i = 0; i < arrayReservas.length; i++) {
    let reserva = arrayReservas[i];
    let reservaDia = reserva.dia;
    let reservaHora = reserva.hora;
    let reservaLugar = reserva.lugar;
    let currentID = i.toString();
    let codeToAppend = `<div id="dropzone-reserva-${currentID}" class="drop-zone">
                          <div class="reserva-mis-reservas" draggable="true">
                            <div class="reserva-mis-reservas-sub">
                              <div>
                                <h2 class="texto-reserva-mis-reservas"> Fecha: ${reservaDia}</h2>
                                <h2 class="texto-reserva-mis-reservas"> Hora: ${reservaHora}</h2>
                                <h2 class="texto-reserva-mis-reservas"> Lugar: ${reservaLugar}</h2>
                              </div>
                              <p>¡Te esperamos! </p>
                              <img class="foto_carta"
                              src="images/reserva-te-esperamos-foto.png"
                              alt="Foto">
                            </div>
                            <button class="boton-cancelar-mis-reservas">Cancelar</button>
                          </div>
                        </div>`;
    modalMisReservasBody.innerHTML += codeToAppend;
  }
}


function borrarMisReservas(dropZoneParent){
  let userData = JSON.parse(localStorage.getItem("usuarioData"));
  let arrayReservas = userData["reservas"];
  const indexBorrar = Number(dropZoneParent.id.split("-")[1]);

  arrayReservas.splice(indexBorrar, 1);

  localStorage.setItem("usuarioData", JSON.stringify(userData));

  const modalMisReservasBody = document.getElementById("modal-mis-reservas-body");
  modalMisReservasBody.innerHTML = "";

  if (arrayReservas.length > 0){
    rellenarMisReservas(arrayReservas);
    actualizarEventosDragDrop();
  }
  else {
    mensajeNoReservas();
  }
}


function actualizarEventosDragDropReservas(){
  const reservas = document.querySelectorAll(".reserva-mis-reservas");
  const dropZones = document.querySelectorAll(".drop-zone");
  const buttons = document.querySelectorAll(".boton-cancelar-mis-reservas");
  
  buttons.forEach(function(boton) {
    // 
    boton.addEventListener("click", function() {
      if (window.confirm("¿Estás seguro/a de que quieres cancelar esta reserva?")) {
        dropZoneParent = boton.closest(".drop-zone");
        borrarMisReservas(dropZoneParent);
      }
    })
  })

  reservas.forEach(function(reserva) {
    // Evento para detectar cuándo el usuario le hace "drag"
    reserva.addEventListener("dragstart", function() {
      reserva.classList.add("reserva-en-movimiento");
    })

    // Evento para detectar cuándo el usuario la suelta 
    reserva.addEventListener("dragend", function() {
      reserva.classList.remove("reserva-en-movimiento");
    })
  })

  dropZones.forEach(function(dropZone) {
    // Evento para detectar que un elemento está siendo movido por encima de la zona del div "drop-zone"
    // El elemento pasa a estar ahí colocado y el usuario lo comprueba a tiempo real, no una vez soltado
    dropZone.addEventListener("dragover", function(event) {
      event.preventDefault();  
      const dropZone = event.target.closest(".drop-zone");
      const dropeZoneCarta = dropZone.querySelector(".reserva-mis-reservas");
      const dragCarta = document.querySelector(".reserva-en-movimiento");
      const dragCartaParent = dragCarta.closest(".drop-zone");
      dropZone.appendChild(dragCarta);
      dragCartaParent.appendChild(dropeZoneCarta);

      let userData = JSON.parse(localStorage.getItem("usuarioData"));
      let arrayReservas = userData["reservas"];
      const indexDrag = Number(dragCartaParent.id.split("-")[1]);
      const indexDrop = Number(dropZone.id.split("-")[1]);

      [arrayReservas[indexDrag], arrayReservas[indexDrop]] = [arrayReservas[indexDrop], arrayReservas[indexDrag]];

      localStorage.setItem("usuarioData", JSON.stringify(userData));
    })
  })
}

// Crear cuenta asociada

function validarFormCuentaAsociada(opcionForm){
  // Conseguir los inputs del form
  const username = document.getElementById("username-" + opcionForm);
  // const email = document.getElementById("email-" + opcionForm);
  const contraseña = document.getElementById("contraseña-" + opcionForm);
  const repetirContraseña = document.getElementById("repetir-contraseña-" + opcionForm);
  
  // Conseguir el valor de cada input (se eliminan los espacios en blanco que pueda haber)
  const usernameValue = username.value.trim();
  // const emailValue = email.value.trim();
  const contraseñaValue = contraseña.value.trim();
  const repetirContraseñaValue = repetirContraseña.value.trim();

  // Indica si todos los inputs están bien (false si al menos uno no cumple los requisitos de validación)
  let isValidado = true;

  // Validar los inputs
  // Si alguno no cumple los requisitos, mostrar un mensaje de error (si lo cumple, ocultarlo)
  // Si todos los inputs están bien, guardar sus valores en local storage

  const isValidadoNombre = validarMinimo3Caracteres(username, usernameValue);
  const isValidadoConstraseña = validarContraseña(contraseña, contraseñaValue);
  const isValidadoRepetirContraseña = validarRepetirContraseña(contraseñaValue, repetirContraseña, repetirContraseñaValue);
  // const isValidadoEmail = validarEmail(email, emailValue);

  isValidado = isValidadoNombre && 
                isValidadoConstraseña &&
                isValidadoRepetirContraseña;

  // Si todos los campos son validados, guardar en local storage los datos del usuario
  if (isValidado){
    const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));

    if (opcionForm === "crear-cuenta-asociada"){
      const dictNiño = {
        tipoCuenta: "niño",
        username: usernameValue,
        contraseña: contraseñaValue,
        sesionIniciada: false,
        cartas: [],
        mensajesPersonalizados: []
      };
  
      jsonUsuario["cuentasAsociadas"].push(dictNiño);
      localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));

      window.alert("¡Cuenta asociada creada con éxito!");
    }
    else {
      const cuenta = jsonUsuario["cuentasAsociadas"][encontrarCuentaNiñoIndex(jsonUsuario)];
      cuenta["username"] = usernameValue;
      cuenta["contraseña"] = contraseñaValue;
      
      localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));

      window.alert("¡Datos modificados con éxito!");
    }
  }

  return isValidado;
}