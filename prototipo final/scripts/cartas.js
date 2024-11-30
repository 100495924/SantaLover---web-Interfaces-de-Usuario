
function cartas_init(){
    const form_button = document.getElementById("form-button");
    form_button.addEventListener(
        "click", (event) => guardarCarta()
    );
}

function validarEmailCarta(emailValue){
    // Compara el valor de email del usuario registrado en 
    // el local storage con el valor recibido.
    const user_email = JSON.parse(localStorage.getItem("usuarioData"));
    if (emailValue === user_email.email){
        return true;
    }else{
        return false;
    }
}

function guardarCarta(){
    const respuesta_form = document.forms["carta_form"];

    const nombre_input = document.getElementById("nombre");
    const email_input = document.getElementById("email");
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

    if(respuesta_form["email"].value === ""){
        email_input.style.border = "2px solid red";
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

    // revisamos si el usuario está registrado si la foto de perfil se muetra en pantalla.
    const foto_perfil = document.getElementById("icono-sesion-iniciada");
    // display: "" si nunca se ha iniciado sesión
    // display: "none" si alguna vez se ha iniciado sesión pero luego se ha cerrado sesión
    if (foto_perfil.style.display === "" || foto_perfil.style.display === "none"){
        mensaje_error.innerText = "¡Antes de mandar una carta recuerda iniciar sesión! ¿O no te has registrado? D:";
        mensaje_error.style.display = "inline";
        return -1;
    }

    // revisamos si el email proporcionado en la carta es el mismo
    // que el email con el que el usuario se ha registrado.
    if (validarEmailCarta(respuesta_form["email"].value) === false){
        email_input.style.border = "2px solid red";
        mensaje_error.innerText = "¡El email puesto en la carta no coincide con tu email!";
        mensaje_error.style.display = "inline";
        return -1;
    }else{
        email_input.style.border = "2px solid gray";
    }

    if (is_form_complete === false){
        mensaje_error.innerText = "¡Te has olvidado de poner algún dato en tu carta! ¿Has revisado bien?";
        mensaje_error.style.display = "inline";
        return -1;
    }


    // Guardamos la carta en formato JSON.
    const carta = JSON.stringify({ 
        "carta_nombre": respuesta_form["nombre"].value,
        "carta_email": respuesta_form["email"].value,
        "carta_ciudad": respuesta_form["ciudad"].value,
        "carta_pais": respuesta_form["pais"].value,
        "carta_texto": respuesta_form["carta"].value,
    });

    // Revisamos el array de cartas
    let array_cartas_json = localStorage.getItem("arrayCartas");
    let array_cartas;

    // si está vacío, solo tenemos que poner la carta que acabamos de recibir.
    if (array_cartas_json === null){
        array_cartas = [carta];
    }
    else{
        // Si ya habían cartas, tendremos que decodificar el JSON y 
        // añadir nuestra carta como un elemento más.
        array_cartas = JSON.parse(array_cartas_json);
        array_cartas.push(carta);
    }

    // Subimos el array de cartas al local storage.
    localStorage.setItem("arrayCartas", JSON.stringify(array_cartas));

    // limpiar inputs del form.
    formulario.reset();
    nombre_input.style.border = "2px solid gray";
    email_input.style.border = "2px solid gray";
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
