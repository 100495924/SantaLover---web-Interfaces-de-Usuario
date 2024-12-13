$(document).ready(function(){
  // Memory quest
  // El estado inicial del juego
  $("#mq-vidas").hide()
  $("#mq-puntos").hide()
  $("#mq-boton").show()
  $("#mq-boton").text("Jugar")
  $("#mq-mensaje").text("¡Encuentra las parejas!")
  // Crear el grid inicial
  setMemoryQuest(4, 4);
  $("#mq-boton").click(function(){
    // Botón para confirmar que se quiere empezar una partida a memory quest
    $(this).hide()
    $("#mq-mensaje").text("¡Encuentra las parejas!")
    // Iniciar el juego
    startMemoryQuest(4, 4);
  });
});

// Crear un temporizador (en milisegundos)
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Insertar la grid inicial (los elementos reales se colocarán solo al darle al botón de jugar)
function setMemoryQuest(numFilas, numColumnas){
  const divMemoryQuest = document.getElementById("memory-quest");
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  const totalELementos = numFilas * numColumnas;

  for(let i = 0; i < totalELementos; i++){
    let codeToAppend = `<div class="card">
                          <h3 class="card-content">🎅</h3>
                        </div>`;
    cardContainer.innerHTML += codeToAppend;
  }

  divMemoryQuest.style.display = "flex";
}

async function startMemoryQuest(numFilas, numColumnas){
  // Vidas y puntos iniciales
  let numVidas = 5;
  let numPuntos = 0;
  actualizarVidasMQ(numVidas);
  actualizarPuntosMQ(numPuntos);

  // Primero tenemos que colocar las cards en la grid de forma aleatoria

  const cardContainer = document.getElementById("card-container");

  const totalELementos = numFilas * numColumnas;
  let numParejas = (numFilas * numColumnas) / 2;

  possibleCards = [
    {emoji: "☃️", name: "card-snowman"},
    {emoji: "🎄", name: "card-tree"},
    {emoji: "🎅", name: "card-santa"},
    {emoji: "❄️", name: "card-snowflake"},
    {emoji: "🎁", name: "card-present"},
    {emoji: "✉️", name: "card-letter"},
    {emoji: "🦌", name: "card-rudolph"},
    {emoji: "🛷", name: "card-sleigh"},
    {emoji: "❤️", name: "card-love"},
  ];

  // Elegir un subconjunto aleatorio de las posibles cards
  const possibleCardsShuffled = possibleCards.sort(() => 0.5 - Math.random());
  const parejasEscogidas = possibleCardsShuffled.slice(0, numParejas);

  // Los elementos del grid real del juego se insertarán en orden aleatorio
  const cardsDisplay = [];

  for(let i = 0; i < totalELementos; i++){
    cardsDisplay.push(parejasEscogidas[i], parejasEscogidas[i]);
  }

  const cardsDisplayShuffled = cardsDisplay.sort(() => 0.5 - Math.random());

  cardContainer.innerHTML = "";

  for(let i = 0; i < totalELementos; i++){
    let codeToAppend = `<div class="card ${cardsDisplayShuffled[i].name}">
                          <h3 class="card-content">${cardsDisplayShuffled[i].emoji}</h3>
                        </div>`;
    cardContainer.innerHTML += codeToAppend;
  }

  // Le enseñamos las cards al usuario durante 2 segundos para que las memorice y luego las ocultamos
  // para que empiece el juego
  const cards = document.querySelectorAll(".card");

  cards.forEach(function(card){
    updateVisibilityContentMQ(card);
  });

  await delay(2000);

  cards.forEach(function(card){
    updateVisibilityContentMQ(card);
  });

  // Mostramos el número de vidas y puntos
  const vidas = document.getElementById("mq-vidas");
  const puntos = document.getElementById("mq-puntos");
  vidas.style.display = "block";
  puntos.style.display = "block";

  // Lo que ocurrirá cuando el usuario le de click a alguna de las cards
  cards.forEach(function(card) {
    card.addEventListener("click", async function() {
      // Si al darle a la card, esta muestra un emoji
      if (updateVisibilityContentMQ(card)){
        // Todas las cards que muestran un emoji en el momento actual
        const cardsOnList = document.querySelectorAll(".on");
        // Si hay una pareja de cartas al descubierto, chequear si matchean o no
        if (cardsOnList.length === 2){
          divPadre0 = cardsOnList[0].closest(".card");
          divPadre1 = cardsOnList[1].closest(".card");
          // Si las dos cartas comparten el mismo nombre (representan el mismo emoji, match)
          if (divPadre0.classList[1] === divPadre1.classList[1]){
            // Se ponen las dos cards en verde para enfatizar al usuario que ha acertado
            divPadre0.style.backgroundColor = "rgb(192, 222, 206)"; // green
            divPadre1.style.backgroundColor = "rgb(192, 222, 206)"; // green
            // Se suman puntos y se actualiza su display en pantalla
            // Una pareja menos a descubrir para ganar el juego
            numPuntos += 50;
            numParejas -= 1;
            actualizarPuntosMQ(numPuntos);
            // Esperar para ocultar las cartas y los emojis (para que antes se pueda ver el cambio de color a verde)
            await delay(500);
            divPadre0.style.visibility = "hidden";
            divPadre1.style.visibility = "hidden";
            updateVisibilityContentMQ(divPadre0);
            updateVisibilityContentMQ(divPadre1);
            // El juego se gana cuando no quedan más parejas que matchear
            if (numParejas == 0){
              winMQ();
            }
          }
          // Si las dos cartas tienen distintos emojis
          else{
            // Se ponen las dos cards en verde para enfatizar al usuario que no ha tenido éxito
            divPadre0.style.backgroundColor = "rgb(248, 193, 193)"; // red
            divPadre1.style.backgroundColor = "rgb(248, 193, 193)"; // red
            // Se resta 1 vida y algunos puntos y se actualiza su display en pantalla
            numVidas -= 1;
            numPuntos -= 15;
            actualizarVidasMQ(numVidas);
            actualizarPuntosMQ(numPuntos);
            // Esperar para ocultar las cartas (para que antes se pueda ver el cambio de color a rojo)
            await delay(500);
            // Cambiar el color de las cards de rojo a blanco de nuevo y ocultar el emoji
            divPadre0.style.backgroundColor = "white";
            divPadre1.style.backgroundColor = "white";
            updateVisibilityContentMQ(divPadre0);
            updateVisibilityContentMQ(divPadre1);
            // El juego se pierde cuando te quedas sin vidas
            if (numVidas == 0){
              gameOverMQ();
            }
          }
        }
      }
    })
  })
}

function updateVisibilityContentMQ(card){
  // El emoji de la card
  const cardContent = card.childNodes[1];
  // Si no tiene la clase "on", ponersela
  // Si la tiene, quitarsela
  cardContent.classList.toggle("on");
  // La pertenencia a la clase "on" representa que el emoji de esa card debe mostrarse
  if (cardContent.classList.contains("on")){
    cardContent.style.visibility = "visible";
    return true
  }
  else {
    cardContent.style.visibility = "hidden";
    return false
  }
}

// Funciones para actualizar el display de nuevos valores de variables en pantalla
function actualizarVidasMQ(numVidas){
  const vidas = document.getElementById("mq-vidas");
  vidas.innerText = `Vidas: ${numVidas}`;
}
function actualizarPuntosMQ(numPuntos){
  const puntos = document.getElementById("mq-puntos");
  puntos.innerText = `Puntos: ${numPuntos}`;
}
function actualizarMensajeMQ(texto){
  const mensaje = document.getElementById("mq-mensaje");
  mensaje.innerText = texto;
}

function winMQ(){
  // Se muestra un mensaje de haber ganado y se ofrece al usuario a presionar un botón para jugar de nuevo
  const boton = document.getElementById("mq-boton");
  actualizarMensajeMQ("¡HAS GANADO!");
  boton.innerText = "Jugar de nuevo";
  boton.style.display = "initial";
}

function gameOverMQ(){
  // Se muestra un mensaje de haber perdido y se ofrece al usuario a presionar un botón para jugar de nuevo
  const boton = document.getElementById("mq-boton");
  actualizarMensajeMQ("GAME OVER");
  boton.innerText = "Jugar de nuevo";
  boton.style.display = "initial";

  // Se crea un clon de la grid para que darle click a las cards ya no surta efecto pero aún se pueda ver
  // la configuración de la grid (qué cards estaban "visible" y cuáles "hidden")
  const divMemoryQuest = document.getElementById("memory-quest");
  const cardContainer = document.getElementById("card-container");
  const cardContainerClone = cardContainer.cloneNode(true);
  cardContainer.remove();
  divMemoryQuest.appendChild(cardContainerClone);
}
