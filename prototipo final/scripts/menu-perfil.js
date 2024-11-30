$(document).ready(function(){
  $("#icono-sesion-iniciada").click(function(){
    if( $("#div-opciones-perfil").css("display").toLowerCase() === "none") {
      $("#div-opciones-perfil").fadeIn("fast");
      $("#div-opciones-perfil").css("display", "flex");
    }
    else {
      $("#div-opciones-perfil").fadeOut("fast");
    }
  });

  $("#cerrar").click(function(){
    $("#div-opciones-perfil").hide();
  });

  $("#menu-hamburguesa").click(function(){
    $("#div-opciones-perfil").hide();
  });

  $("#boton-mis-cartas").click(function(){
    $("#modal-mis-cartas").fadeIn("fast");
    const arrayCartas = JSON.parse(localStorage.getItem("arrayCartas"));
    if (arrayCartas !== null && arrayCartas.length != 0) {
      $("#modal-mis-cartas-body").css("display", "grid");
      rellenarMisCartas(arrayCartas);
      actualizarEventosDragDrop();
    }
    else {
      mensajeNoCartas();
    }

  });

  $("#boton-atras-mis-cartas").click(function(){
    $("#modal-mis-cartas").fadeOut("fast", function(){
      const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
      modalMisCartasBody.innerHTML = "";
    });
  });

  $("#boton-cerrar-sesion").click(function(){
    if (window.confirm("¿Estás seguro/a de que quieres cerrar sesión?")) {
      $("#div-opciones-perfil").fadeOut("fast");
      $(".div-botones-menu").show();
      $("#icono-sesion-iniciada").hide();
    }
  });

  $("#hijos-mi-perfil").change(function(){
    actualizarHijosVariableMiPerfil();
  });

  $("#contraseña-mi-perfil").change(function(){
    $("#repetir-contraseña-mi-perfil").val("");
  });
});

function mensajeNoCartas(){
  $("#modal-mis-cartas-body").css("display", "block");
  $("#modal-mis-cartas-body").append(`<p class="mensaje-no-cartas">Visita a la sección <span class="texto-destacado-rojo">¡Envía tu carta! 📩</span> para escribir una carta ;)</p>`);
}

function rellenarMisCartas(arrayCartas){
  const modalMisCartasBody = document.getElementById("modal-mis-cartas-body");
  for(let i = 0; i < arrayCartas.length; i++) {
    let cartaJSON = JSON.parse(arrayCartas[i]);
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
  let arrayCartas = JSON.parse(localStorage.getItem("arrayCartas"));
  const indexBorrar = Number(dropZoneParent.id.split("-")[1]);

  arrayCartas.splice(indexBorrar, 1);

  localStorage.setItem("arrayCartas", JSON.stringify(arrayCartas));

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

      let arrayCartas = JSON.parse(localStorage.getItem("arrayCartas"));
      const indexDrag = Number(dragCartaParent.id.split("-")[1]);
      const indexDrop = Number(dropZone.id.split("-")[1]);

      [arrayCartas[indexDrag], arrayCartas[indexDrop]] = [arrayCartas[indexDrop], arrayCartas[indexDrag]];

      localStorage.setItem("arrayCartas", JSON.stringify(arrayCartas));
    })
  })
}