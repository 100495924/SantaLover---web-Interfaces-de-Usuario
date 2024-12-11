document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el objeto usuarioData existe
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));

    if (!usuarioData || !usuarioData.sesionIniciada) {
        // Mostrar mensaje y deshabilitar el formulario
        const form = document.querySelector(".form");
        alert("Debes iniciar sesión para acceder a esta página.");

        // Deshabilitar todos los elementos del formulario
        form.querySelectorAll("input, button").forEach((element) => {
            element.disabled = true;
        });
    }
});


document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Recopilar datos del formulario
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Obtener usuarioData desde localStorage
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));

    // Verificar si existe el arreglo mensajesPersonalizados
    if (!usuarioData.mensajesPersonalizados) {
        usuarioData.mensajesPersonalizados = [];
    }

    // Crear el objeto mensaje
    const mensaje = {
        name: data.name,
        relation: data.relation,
        likes: data.likes,
        gift: data.gift,
        username: data.username
    };

    // Añadir el mensaje al arreglo mensajesPersonalizados
    usuarioData.mensajesPersonalizados.push(mensaje);

    // Guardar el usuario actualizado en localStorage
    localStorage.setItem("usuarioData", JSON.stringify(usuarioData));

    alert("¡Mensaje guardado!");
    event.target.reset(); // Limpia el formulario
});

// Función para cargar los mensajes guardados en el popup
function loadMessages() {
    const modalBody = document.getElementById("modal-mis-mensajes-body");

    // Obtener usuarioData desde localStorage
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));

    // Verificar si existen mensajes personalizados
    const mensajes = usuarioData?.mensajesPersonalizados || [];

    modalBody.innerHTML = ""; // Limpia el contenido previo

    if (mensajes.length === 0) {
        modalBody.innerHTML = "<p>No tienes mensajes guardados.</p>";
    } else {
        mensajes.forEach((mensaje, index) => {
            const personalizedMessage = `
                ¡Hola ${mensaje.name}!
                Acabo de hablar con tu ${mensaje.relation}, al cual le encanta de ti ${mensaje.likes}.
                Me ha dicho que te haría mucha ilusión recibir un mensaje mío. Si te portas bien este año, haré todo lo posible para dejarte debajo del árbol el 25 de diciembre ${mensaje.gift}.
                ¡Feliz Navidad!
                - Papá Noel
            `;

            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.style.marginBottom = "10px";
            messageElement.style.padding = "10px";
            messageElement.style.border = "1px solid #ccc";
            messageElement.style.borderRadius = "5px";
            messageElement.innerHTML = `
                <h3>Mensaje ${index + 1}</h3>
                <p>${personalizedMessage}</p>
            `;
            modalBody.appendChild(messageElement);
        });
    }
}


// Mostrar el modal al hacer clic en "Mis mensajes"
document.querySelector(".boton-mis-mensajes").addEventListener("click", () => {
    loadMessages();
    document.getElementById("modal-mis-mensajes").style.display = "flex";
});

// Cerrar el modal al hacer clic en el botón "Cerrar"
document.getElementById("boton-atras-mis-mensajes").addEventListener("click", () => {
    document.getElementById("modal-mis-mensajes").style.display = "none";
});

// Mostrar el modal y cargar mensajes
document.querySelector(".boton-mis-mensajes").addEventListener("click", () => {
    loadMessages();
    document.getElementById("modal-mis-mensajes").style.display = "block";
});

// Cerrar el modal
document.getElementById("boton-atras-mis-mensajes").addEventListener("click", () => {
    document.getElementById("modal-mis-mensajes").style.display = "none";
});
