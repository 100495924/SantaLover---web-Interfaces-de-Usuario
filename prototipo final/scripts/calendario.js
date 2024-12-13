document.addEventListener("DOMContentLoaded", () => {
    const gridItems = document.querySelectorAll(".grid-item");
    const today = new Date().getDate();

    // Añadir evento de click a cada elemento del calendario
    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            // Evitar hacer click en días futuros
            const day = parseInt(item.innerHTML);
            if (day > today) {
                alert("¡Este día aún no está disponible!");
                return;
            }

            // Si la celda ya ha sido revelada, no hacer nada
            if (item.classList.contains("revealed")){
                return;
            }

            // Crear la imagen correspondiente al día
            const img = document.createElement("img");
            img.src = `./images/dia-${day}.jpg`;
            img.alt = `Día ${day}`;

            // Añadir la imagen a la celda
            item.appendChild(img);

            // Revelar la celda
            item.classList.add("revealed");
        });
    });
});