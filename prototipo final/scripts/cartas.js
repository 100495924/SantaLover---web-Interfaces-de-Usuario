
function cartas_init(){
    const form_button = document.getElementById("form-button");
    form_button.addEventListener(
        "click", (event) => guardarCarta()
    );
}

function validarUsernameCarta(usernameValue, jsonUsuario){
    // Compara el valor de username del usuario registrado en 
    // el local storage con el valor recibido.
    // -2: no coinciden los valores, -1: cuenta de adulto, otro: cuenta de niño
    if (usernameValue === jsonUsuario["username"] && jsonUsuario["sesionIniciada"]){
        return -1;
    }
    else{
        const index = encontrarCuentaNiñoIndex(jsonUsuario);
        if (index === -1){
            return -2;
        }
        else if (usernameValue === jsonUsuario["cuentasAsociadas"][index]["user-name"]){
            return index;
        }
        else{
            return -2;
        }
    }
}

function guardarCarta(){
    const respuesta_form = document.forms["carta_form"];

    const nombre_input = document.getElementById("nombre");
    const username_input = document.getElementById("user-name");
    const ciudad_input = document.getElementById("ciudad");
    const pais_input = document.getElementById("pais");
    const carta_input = document.getElementById("carta");

    const formulario = document.getElementById("carta_form");
    const mensaje_error = document.getElementById("form-no-completo");

    // Verificamos que el usuario ha introducido todos los 
    // datos (campos obligatorios). 
    let is_form_complete = true;
    
    if (respuesta_form["nombre"].value === ""){
        // marcamos en rojo el cuadro en el que el usuario
        // no ha introducido respuesta.
        nombre_input.style.border = "2px solid red";
        is_form_complete = false;
    }
    else {
        nombre_input.style.border = "2px solid gray";
    }

    if(respuesta_form["user-name"].value === ""){
        username_input.style.border = "2px solid red";
        is_form_complete = false;
    }

    if (respuesta_form["ciudad"].value === ""){
        ciudad_input.style.border = "2px solid red";
        is_form_complete = false;
    }
    else {
        ciudad_input.style.border = "2px solid gray";
    }

    if (respuesta_form["pais"].value === ""){
        pais_input.style.border = "2px solid red";
        is_form_complete = false;
    }
    else {
        pais_input.style.border = "2px solid gray";
    }

    if (respuesta_form["carta"].value === ""){
        carta_input.style.border = "2px solid red";
        is_form_complete = false;
    }
    else {
        carta_input.style.border = "2px solid gray";
    }

    // revisamos si el usuario está registrado
    const jsonUsuario_existe = localStorage.getItem("usuarioData");

    // no existen cuentas registradas
    if (jsonUsuario_existe === null){
        return -1;
    }

    const jsonUsuario = JSON.parse(jsonUsuario_existe)

    if (!jsonUsuario["sesionIniciada"]){
        const index = encontrarCuentaNiñoIndex(jsonUsuario)
        if (index === -1){
            mensaje_error.innerText = "¡Antes de mandar una carta recuerda iniciar sesión! ¿O no te has registrado? D:";
            mensaje_error.style.display = "inline";
            return -1;
        }
    }

    // revisamos si el username proporcionado en la carta es el mismo
    // que el username con el que el usuario se ha registrado.
    const codigoCuenta = validarUsernameCarta(respuesta_form["user-name"].value, jsonUsuario)

    if (codigoCuenta === -2){
        username_input.style.border = "2px solid red";
        mensaje_error.innerText = "¡El nombre de usuario puesto en la carta no coincide con tu nombre de usuario!";
        mensaje_error.style.display = "inline";
        return -1;
    }else{
        username_input.style.border = "2px solid gray";
    }

    if (is_form_complete === false){
        mensaje_error.innerText = "¡Te has olvidado de poner algún dato en tu carta! ¿Has revisado bien?";
        mensaje_error.style.display = "inline";
        return -1;
    }

    // Guardamos la carta en formato JSON.
    const carta = { 
        "carta_nombre": respuesta_form["nombre"].value,
        "carta_username": respuesta_form["user-name"].value,
        "carta_ciudad": respuesta_form["ciudad"].value,
        "carta_pais": respuesta_form["pais"].value,
        "carta_texto": respuesta_form["carta"].value,
    };

    if (codigoCuenta === -1){
        jsonUsuario["cartas"].push(carta);
    }
    else{
        jsonUsuario["cuentasAsociadas"][codigoCuenta]["cartas"].push(carta);
    }

    // Subimos el array de cartas al local storage.
    localStorage.setItem("usuarioData", JSON.stringify(jsonUsuario));

    // limpiar inputs del form.
    formulario.reset();
    nombre_input.style.border = "2px solid gray";
    username_input.style.border = "2px solid gray";
    ciudad_input.style.border = "2px solid gray";
    pais_input.style.border = "2px solid gray";
    carta_input.style.border = "2px solid gray";

    mensaje_error.style.display = "none";

    // enseñar mensaje de la página.
    window.alert("¡Carta enviada, Feliz navidad! :)");
}


function buscarCarta(num_de_carta){
    // Busca en el localStorage una carta con el número 
    // que ha recibido la función.
    // devuelve -1 si no ha encontrado una carta con ese 
    // número y devuelve la carta en un objeto json 
    // si la ha encontrado.
    const nombre_carta = "carta_" + String(num_de_carta);

    const carta = localStorage.getItem(nombre_carta);

    if (carta === null){
        return -1;
    }else{
        return JSON.parse(carta);
    }

}

$(document).ready(cartas_init())
