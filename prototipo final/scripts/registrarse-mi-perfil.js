// Funcionalidades relacionadas con registrarse y con "mi perfil" del menú de la cuenta al iniciar sesión

$(document).ready(function(){
  // El pop-up aparece al darle al botón de "Registrarse"
  $(".boton-registrarse").click(function(){
    modalRegistrarseInicial();
    $("#modal-registrarse").fadeIn("fast");
    $("#modal-inicia-sesion").fadeOut("fast");
  });

  // Si todos los datos se validan y son almacenados con éxito, se oculta el pop-up de "Registrarse"
  // Además, la sesión se inicia automáticamente
  $("#boton-aceptar-registrarse").click(function(){
    const cerrarModal = validarForm("registrarse");
    if (cerrarModal){
      $("#modal-registrarse").fadeOut("fast");
      $(".div-botones-menu").hide();
      $("#icono-sesion-iniciada").show();
    }
  });

  // El pop-up desaparece al darle al botón de "Cancelar"
  // También se limpian los campos para que el form vuelva a su estado inicial
  $("#boton-cancelar-registrarse").click(function(){
    $("#modal-registrarse").fadeOut("fast", function(){
      limpiar("registrarse");
    });
  });

  $("#modal-registrarse-niño-boton-iniciar-sesion").click(function(){
    $("#modal-registrarse").hide();
    $("#modal-inicia-sesion").show();
  });

  $("#modal-registrarse-niño-boton-registrarse").click(function(){
    const buttonAceptar = document.getElementById("boton-aceptar-registrarse");
    const buttonCancelar = document.getElementById("boton-cancelar-registrarse");
    const buttonAtras = document.getElementById("boton-atras-registrarse");

    const opcionAdulto = document.getElementById("modal-registrarse-inicial-opciones-adulto");
    const opcionNiño = document.getElementById("modal-registrarse-inicial-opciones-niño");
    const formRegistrarse = document.getElementById("form-registrarse");
    const contenidoNiño = document.getElementById("modal-registrarse-inicial-opciones-niño-elegido");
    clickOpcionAdultoInicial(buttonAtras, opcionAdulto, opcionNiño, formRegistrarse, buttonAceptar, buttonCancelar, contenidoNiño)
  });

  $("#boton-mi-perfil-adulto").click(function(){
    rellenarFormMiPerfilAdulto();
    $("#modal-mi-perfil-adulto").fadeIn("fast");
    $("#div-opciones-perfil-adulto").fadeOut("fast");
  });

  $("#boton-modificar-mi-perfil-adulto").click(function(){
    validarForm("mi-perfil-adulto");
  });

  $("#boton-atras-mi-perfil-adulto").click(function(){
    $("#modal-mi-perfil-adulto").fadeOut("fast", function(){
      limpiar("mi-perfil-adulto");
    });
  });

  // Cuando el usuario aumenta o disminuye el campo número de hijos, hay que modificar el form para poder introducir
  // la información correspondientes a cada hijo
  $("#hijos-registrarse").change(function(){
    cambioInputHijos()
  });
});

// Registrarse

function modalRegistrarseInicial(){
  const modalRegistrarse = document.getElementById("modal-registrarse");
  const modalHeader = modalRegistrarse.querySelector(".modal-header");
  const modalBody = modalRegistrarse.querySelector(".modal-body");
  const modalFooter = modalRegistrarse.querySelector(".modal-footer");

  const buttonAceptar = document.getElementById("boton-aceptar-registrarse");
  const buttonCancelar = document.getElementById("boton-cancelar-registrarse");
  const buttonAtras = document.getElementById("boton-atras-registrarse");

  const opcionAdulto = document.getElementById("modal-registrarse-inicial-opciones-adulto");
  const opcionNiño = document.getElementById("modal-registrarse-inicial-opciones-niño");
  const formRegistrarse = document.getElementById("form-registrarse");
  const contenidoNiño = document.getElementById("modal-registrarse-inicial-opciones-niño-elegido");

  const modalSubtitulo = modalBody.querySelector(".modal-subtitulo");

  const displayInitial = [buttonAtras, opcionAdulto, opcionNiño];
  const displayNone = [buttonAceptar, buttonCancelar, formRegistrarse, contenidoNiño];

  displayInitial.forEach(function(elemento){
    elemento.style.display = "initial";
  })
  displayNone.forEach(function(elemento){
    elemento.style.display = "none";
  })

  modalSubtitulo.innerHTML = "¿Cuántos años tienes?";
  modalSubtitulo.style.color = "black";
  modalSubtitulo.style.visibility = "visible";

  opcionAdulto.style.cursor = "pointer";
  opcionNiño.style.cursor = "pointer";

  buttonAtras.removeEventListener("click", modalRegistrarseInicial);
  buttonAtras.addEventListener("click", clickAtrasInicial);
  opcionAdulto.addEventListener("click", clickOpcionAdultoInicial.bind(null, buttonAtras, opcionAdulto, opcionNiño, formRegistrarse, buttonAceptar, buttonCancelar, contenidoNiño, modalSubtitulo), false);
  opcionNiño.addEventListener("click", clickOpcionNiñoInicial.bind(null, buttonAtras, opcionAdulto, opcionNiño, buttonCancelar, contenidoNiño, modalSubtitulo), false);
  
  limpiar("registrarse");
}

function clickAtrasInicial(){
  $("#modal-registrarse").fadeOut("fast");
}

function clickOpcionAdultoInicial(buttonAtras, opcionAdulto, opcionNiño, formRegistrarse, buttonAceptar, buttonCancelar, contenidoNiño, modalSubtitulo){
  buttonAtras.removeEventListener("click", clickAtrasInicial);
  buttonAtras.addEventListener("click", modalRegistrarseInicial);
  opcionAdulto.removeEventListener("click", clickOpcionAdultoInicial);
  opcionNiño.style.display = "none";
  contenidoNiño.style.display = "none";
  opcionAdulto.style.display = "initial";
  formRegistrarse.style.display = "initial";
  opcionAdulto.style.cursor = "default";
  buttonAceptar.style.display = "initial";
  buttonCancelar.style.display = "initial";

  modalSubtitulo.innerHTML = "¡Los niños que se registren aquí entrarán en la lista de niños malos de Papá Noel!";
  modalSubtitulo.style.color = "rgb(224, 102, 102)";
}

function clickOpcionNiñoInicial(buttonAtras, opcionAdulto, opcionNiño, buttonCancelar, contenidoNiño, modalSubtitulo){
  buttonAtras.removeEventListener("click", clickAtrasInicial);
  buttonAtras.addEventListener("click", modalRegistrarseInicial);
  opcionNiño.removeEventListener("click", clickOpcionNiñoInicial);
  opcionAdulto.style.display = "none";
  contenidoNiño.style.display = "initial";
  opcionNiño.style.cursor = "default";
  buttonCancelar.style.display = "initial";

  modalSubtitulo.style.visibility = "hidden";
}

function limpiar(opcionForm){
  // Devolver el formulario a su estado inicial
  resetMensajesError(opcionForm);
  if (opcionForm === "registrarse") {
    $("#form-registrarse")[0].reset();
  }
}

// Funciones relacionadas con comprobar que el usuario ha introducido datos válidos en el form y proporcionarle 
// feedback al respecto

function validarForm(opcionForm){
  // Conseguir los inputs del form
  const username = document.getElementById("username-" + opcionForm);
  const email = document.getElementById("email-" + opcionForm);
  const contraseña = document.getElementById("contraseña-" + opcionForm);
  const repetirContraseña = document.getElementById("repetir-contraseña-" + opcionForm);
  
  // Conseguir el valor de cada input (se eliminan los espacios en blanco que pueda haber)
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
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
  const isValidadoEmail = validarEmail(email, emailValue);

  isValidado = isValidadoNombre && 
                isValidadoConstraseña &&
                isValidadoRepetirContraseña &&
                isValidadoEmail;

  // Si todos los campos son validados, guardar en local storage los datos del usuario
  if (isValidado){
    if (opcionForm === "registrarse"){
      localStorage.setItem("usuarioData", JSON.stringify({
        tipoCuenta: "adulto",
        username: usernameValue,
        contraseña: contraseñaValue,
        email: emailValue,
        sesionIniciada: true,
        cartas: [],
        mensajesPersonalizados: [],
        reservas: [],
        cuentasAsociadas: []
      }));
      window.alert("¡Cuenta creada con éxito!");
    }
    else {
      const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
      jsonUsuario["username"] = usernameValue;
      jsonUsuario["email"] = emailValue;
      jsonUsuario["contraseña"] = contraseñaValue;
      localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));
      
      window.alert("¡Datos modificados con éxito!");
    }
  }

  return isValidado;
}


function validarMinimo3Caracteres(campo, campoValue){
  if (campoValue.length < 3){
    mostrarMensajeError(campo);
    return false;
  }
  else {
    ocultarMensajeError(campo);
    return true;
  }
}


function validarContraseña(contraseña, contraseñaValue){
  if (contraseñaValue.length >= 12){
    let numNumeros = 0;
    let numMayuscula = 0;
    let numMinuscula = 0;
    let numEspecial = 0;

    for(let i = 0; i < contraseñaValue.length; i++){
      let currentChar = contraseñaValue.charAt(i);
      if (/[0-9]/.test(currentChar)){
        numNumeros++;
      }
      if (/[A-Z]/.test(currentChar)){
        numMayuscula++;
      }
      if (/[a-z]/.test(currentChar)){
        numMinuscula++;
      }
      if (/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(currentChar)){
        numEspecial++;
      }
    }

    if (numNumeros < 2 || numMayuscula < 1 || numMinuscula < 1 || numEspecial < 1){
      mostrarMensajeError(contraseña);
      return false;
    }
    else{
      ocultarMensajeError(contraseña);
      return true;
    }
  }
  else {
    mostrarMensajeError(contraseña);
    return false;
  }
}

function validarRepetirContraseña(contraseñaValue, repetirContraseña, repetirContraseñaValue){
  if (repetirContraseñaValue !== contraseñaValue) {
    mostrarMensajeError(repetirContraseña);
    return false;
  }
  else {
    ocultarMensajeError(repetirContraseña);
    return true;
  }
}


function validarEmail(email, emailValue){
  if(/.+@.+\..+/.test(emailValue)){
    ocultarMensajeError(email);
    return true;
  }
  else {
    mostrarMensajeError(email);
    return false;
  }
}


function mostrarMensajeError(inputForm){
  // Se consigue el <p> con clase ".mensaje-error" hermano del input pasado a la función
  const divPadre = inputForm.parentElement;
  const mensajeError = divPadre.querySelector(".mensaje-error");

  // Se muestra el mensaje de error y se cambia el borde del input del form a rojo
  mensajeError.style.display = "block";
  inputForm.style.border = "solid rgb(224, 102, 102)";
}


function ocultarMensajeError(inputForm){
  // Se consigue el <p> con clase ".mensaje-error" hermano del input pasado a la función
  const divPadre = inputForm.parentElement;
  const mensajeError = divPadre.querySelector(".mensaje-error");

  // Se oculta el mensaje de error y se devuelve el borde del input del form a su estado original
  mensajeError.style.display = "none";
  inputForm.style.border = null;
}


function resetMensajesError(opcionForm){
  // Se ocultan los mensajes de error correspondientes a todos los campos del form
  const username = document.getElementById(`username-${opcionForm}`);
  const contraseña = document.getElementById(`contraseña-${opcionForm}`);
  const repetirContraseña = document.getElementById(`repetir-contraseña-${opcionForm}`);
  const email = document.getElementById(`email-${opcionForm}`);

  ocultarMensajeError(username);
  ocultarMensajeError(contraseña);
  ocultarMensajeError(repetirContraseña);
  ocultarMensajeError(email);
}

// Mi perfil

function rellenarFormMiPerfilAdulto(){
  const jsonUsuario = JSON.parse(localStorage.getItem("usuarioData"));
  const usernameValue = jsonUsuario["username"];
  const contraseñaValue = jsonUsuario["contraseña"];
  const emailValue = jsonUsuario["email"];
  const cuentasAsociadasValue = jsonUsuario["cuentasAsociadas"];

  $("#username-mi-perfil-adulto").val(usernameValue);
  $("#contraseña-mi-perfil-adulto").val(contraseñaValue);
  $("#repetir-contraseña-mi-perfil-adulto").val(contraseñaValue);
  $("#email-mi-perfil-adulto").val(emailValue);

  const cuentasAsociadasDivVariable = document.getElementById("div-cuentas-asociadas-variable-mi-perfil");
  if (cuentasAsociadasValue.length === 0){
    cuentasAsociadasDivVariable.innerHTML = `<p>No se encontraron</p>`;
  }
  else{
    cuentasAsociadasDivVariable.innerHTML = "";
    for (let i = 0; i < cuentasAsociadasValue.length; i++){
      const divItem = document.createElement("div");
      divItem.classList.add("cuenta-asociada-item");
      const pItem = document.createElement("p");
      pItem.innerHTML = cuentasAsociadasValue[i]["username"];
      const buttonItem = document.createElement("button");
      buttonItem.classList.add("boton-eliminar-cuenta-asociada");
      buttonItem.innerHTML = "Eliminar";

      divItem.appendChild(pItem);
      divItem.appendChild(buttonItem);
      cuentasAsociadasDivVariable.appendChild(divItem);

      // cuentasAsociadasDivVariable.innerHTML += `<div class="cuenta-asociada-item">
      //                                             <p>- ${cuenta["username"]}</p>
      //                                             <button class="boton-eliminar-cuenta-asociada">Eliminar</button>
      //                                           </div>`

      // ELiminar cuenta asociada
      buttonItem.addEventListener("click", function(){
        const index = i;
        newCuentasAsociadas = [];
        for (let j = 0; j < cuentasAsociadasValue.length; j++){
          if (j != index){
            newCuentasAsociadas.push(cuentasAsociadasValue[j]);
          }
        }
        if (window.confirm(`¿Estás seguro/a de que quieres eliminar la cuenta asociada?`)) {
          jsonUsuario["cuentasAsociadas"] = newCuentasAsociadas;
          console.log(jsonUsuario);
          // console.log(jsonUsuario["cuentasAsociadas"].splice(index, 1));
          localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));
          rellenarFormMiPerfilAdulto();
        }
      });
    }
  }
}

// function botonEliminarCuentaAsociadaHandler(){
//   // Sacar index
//   const cuentasAsociadasDivVariable = document.getElementById("div-cuentas-asociadas-variable-mi-perfil");
//   const index = cuentasAsociadasDivVariable.children.length - 1;
//   console.log(index);
//   if (window.confirm(`¿Estás seguro/a de que quieres eliminar la cuenta asociada?`)) {
//     jsonUsuario["cuentasAsociadas"].splice(index, 1);
//     localStorage.setItem("usuarioData", jsonUsuario);
//     rellenarFormMiPerfilAdulto();
//   }
// }