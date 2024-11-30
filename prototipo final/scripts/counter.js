
function counter_init(){
    const counter_text = document.getElementById("counter-text");
    let date = new Date();
    const christmas_year = "December 25, "+ String(date.getFullYear());
    const christmas_date = new Date(Date.parse(christmas_year));
    
    const actualizarContador = (event) => {
        date = new Date();
        let counter = Math.trunc((christmas_date-date)/1000); //pasamos a segundos.
        let counter_seg = counter%60;   // resto va a contador de segundos
        let counter_mins = Math.trunc(counter/60)%60; // pasamos a minutos, resto va a contador de minutos.
        let counter_hours = Math.trunc((counter/60)/60)%24; //pasamos a horas, resto va a contador de horas.
        let counter_days = Math.trunc(((counter/60)/60)/24); //pasamos a días.

        // modificamos el contador en la página. 
        counter_text.innerText = String(counter_days) + " días " + String(counter_hours) + " h " + String(counter_mins) + " min " + String(counter_seg) + " s";
    }

    setTimeout(actualizarContador, 10);
    setInterval(actualizarContador, 1000);
}

$(document).ready(counter_init())