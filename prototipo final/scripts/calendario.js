document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");

    // Obtener el día actual
    const today = new Date().getDate();

    // Añadir evento de clic a cada celda
    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            // Evitar hacer clic en días futuros
            const day = parseInt(item.getAttribute("data-day"));

            if (day > today) {
                alert("¡Este día aún no está disponible!");
                return;
            }

            // Si la celda ya ha sido revelada, no hacer nada
            if (item.classList.contains("revealed")) return;

            // Crear la imagen correspondiente al día
            const img = document.createElement("img");
            img.src = `./images/dia-${day}.jpg`; // Asegúrate de que la imagen exista con el formato correcto
            img.alt = `Día ${day}`;

            // Añadir la imagen a la celda
            item.appendChild(img);

            // Revelar la celda y cambiar el fondo
            item.classList.add("revealed");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");

    // Obtener el día actual
    const today = new Date().getDate();

    // Añadir evento de clic a cada celda
    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            // Obtener el día de la celda
            const day = parseInt(item.getAttribute("data-day"));

            // Evitar hacer clic en días futuros
            if (day > today) {
                alert("¡Este día aún no está disponible!");
                return; // Detiene la ejecución aquí si el día no está disponible
            }

            // Si la celda ya ha sido revelada, no hacer nada
            if (item.classList.contains("revealed")) return;

            // Crear la imagen correspondiente al día
            const img = document.createElement("img");
            img.src = `./images/dia-${day}.jpg`; // Asegúrate de que la imagen exista con el formato correcto
            img.alt = `Día ${day}`;

            // Añadir la imagen a la celda
            item.appendChild(img);

            // Revelar la celda y cambiar el fondo
            item.classList.add("revealed");
        });
    });
});