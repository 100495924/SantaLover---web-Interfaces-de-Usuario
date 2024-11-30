$(document).ready(function(){
  changeSelect();
})

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function changeSelect(){
  const pantalla1 = document.getElementById("pagina2-contenido-1");
  const pantalla2 = document.getElementById("pagina2-contenido-2");
  const pantalla3 = document.getElementById("pagina2-contenido-3");

  const tipoLeche = document.getElementById("tipo-leche");
  const cantidadGalletas = document.getElementById("cantidad-galletas");
  const tipoGalleta1 = document.getElementById("tipo-galleta1");
  const tipoGalleta2 = document.getElementById("tipo-galleta2");
  const tipoGalleta3 = document.getElementById("tipo-galleta3");

  const imgLecheNormal = document.getElementById("img-leche-normal");
  const imgLecheChocolate = document.getElementById("img-leche-chocolate");
  const imgLecheFresa = document.getElementById("img-leche-fresa");
  const imgLecheNormalPedido = document.getElementById("img-leche-normal-pedido");
  const imgLecheChocolatePedido = document.getElementById("img-leche-chocolate-pedido");
  const imgLecheFresaPedido = document.getElementById("img-leche-fresa-pedido");

  const galleta1 = document.getElementById("galleta1");
  const galleta2 = document.getElementById("galleta2");
  const galleta3 = document.getElementById("galleta3");

  const imgsGalleta1 = document.getElementById("imgs-galleta1");
  const imgsGalleta2 = document.getElementById("imgs-galleta2");
  const imgsGalleta3 = document.getElementById("imgs-galleta3");
  const imgsGalleta1Pedido = document.getElementById("imgs-galleta1-pedido");
  const imgsGalleta2Pedido = document.getElementById("imgs-galleta2-pedido");
  const imgsGalleta3Pedido = document.getElementById("imgs-galleta3-pedido");

  const imgGalletaClasica1 = imgsGalleta1.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate1 = imgsGalleta1.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet1 = imgsGalleta1.querySelector(".img-galleta-red-velvet");
  const imgGalletaClasica1Pedido = imgsGalleta1Pedido.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate1Pedido = imgsGalleta1Pedido.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet1Pedido = imgsGalleta1Pedido.querySelector(".img-galleta-red-velvet");

  const imgGalletaClasica2 = imgsGalleta2.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate2 = imgsGalleta2.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet2 = imgsGalleta2.querySelector(".img-galleta-red-velvet");
  const imgGalletaClasica2Pedido = imgsGalleta2Pedido.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate2Pedido = imgsGalleta2Pedido.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet2Pedido = imgsGalleta2Pedido.querySelector(".img-galleta-red-velvet");

  const imgGalletaClasica3 = imgsGalleta3.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate3 = imgsGalleta3.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet3 = imgsGalleta3.querySelector(".img-galleta-red-velvet");
  const imgGalletaClasica3Pedido = imgsGalleta3Pedido.querySelector(".img-galleta-clasica");
  const imgGalletaChocolate3Pedido = imgsGalleta3Pedido.querySelector(".img-galleta-chocolate");
  const imgGalletaRedVelvet3Pedido = imgsGalleta3Pedido.querySelector(".img-galleta-red-velvet");

  pantalla1.style.display = "flex";
  pantalla2.style.display = "none";
  pantalla3.style.display = "none";

  imgLecheNormal.style.display = "initial";
  imgLecheChocolate.style.display = "none";
  imgLecheFresa.style.display = "none";

  galleta1.style.visibility = "initial";
  galleta2.style.visibility = "hidden";
  galleta3.style.visibility = "hidden";

  imgGalletaClasica1.style.display = "initial";
  imgGalletaChocolate1.style.display = "none";
  imgGalletaRedVelvet1.style.display = "none";

  imgGalletaClasica2.style.display = "initial";
  imgGalletaChocolate2.style.display = "none";
  imgGalletaRedVelvet2.style.display = "none";

  imgGalletaClasica3.style.display = "initial";
  imgGalletaChocolate3.style.display = "none";
  imgGalletaRedVelvet3.style.display = "none";

  imgLecheNormalPedido.style.display = "initial";
  imgLecheChocolatePedido.style.display = "none";
  imgLecheFresaPedido.style.display = "none";

  imgsGalleta1Pedido.style.visibility = "initial";
  imgsGalleta2Pedido.style.visibility = "hidden";
  imgsGalleta3Pedido.style.visibility = "hidden";

  imgGalletaClasica1Pedido.style.display = "initial";
  imgGalletaChocolate1Pedido.style.display = "none";
  imgGalletaRedVelvet1Pedido.style.display = "none";

  imgGalletaClasica2Pedido.style.display = "initial";
  imgGalletaChocolate2Pedido.style.display = "none";
  imgGalletaRedVelvet2Pedido.style.display = "none";

  imgGalletaClasica3Pedido.style.display = "initial";
  imgGalletaChocolate3Pedido.style.display = "none";
  imgGalletaRedVelvet3Pedido.style.display = "none";

  const botonEnviar = document.getElementById("pagina2-boton-enviar");
  const botonVolverPedir = document.getElementById("pagina2-boton-volver-a-pedir");

  botonEnviar.addEventListener("click", async function(event){
    pantalla1.style.display = "none";
    pantalla2.style.display = "flex";
    
    const mensajePantalla2 = document.getElementById("pagina2-contenido-2-texto");
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido.";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido..";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido...";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido.";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido..";
    await delay(300);
    mensajePantalla2.innerHTML = "☃️ Preparando tu pedido...";
    await delay(300);

    pantalla2.style.display = "none";
    pantalla3.style.display = "flex";
  })

  botonVolverPedir.addEventListener("click", function(event){
    pantalla3.style.display = "none";
    pantalla1.style.display = "flex";
  })

  tipoLeche.addEventListener("change", function(event){
    if (event.target.value == "leche-normal"){
      imgLecheNormal.style.display = "initial";
      imgLecheChocolate.style.display = "none";
      imgLecheFresa.style.display = "none";

      imgLecheNormalPedido.style.display = "initial";
      imgLecheChocolatePedido.style.display = "none";
      imgLecheFresaPedido.style.display = "none";
    }
    else if (event.target.value == "leche-chocolate"){
      imgLecheNormal.style.display = "none";
      imgLecheChocolate.style.display = "initial";
      imgLecheFresa.style.display = "none";

      imgLecheNormalPedido.style.display = "none";
      imgLecheChocolatePedido.style.display = "initial";
      imgLecheFresaPedido.style.display = "none";
    }
    else{
      imgLecheNormal.style.display = "none";
      imgLecheChocolate.style.display = "none";
      imgLecheFresa.style.display = "initial";

      imgLecheNormalPedido.style.display = "none";
      imgLecheChocolatePedido.style.display = "none";
      imgLecheFresaPedido.style.display = "initial";
    }
  });

  cantidadGalletas.addEventListener("change", function(event){
    if (event.target.value == "cantidad-galletas-1"){
      galleta1.style.visibility = "initial";
      galleta2.style.visibility = "hidden";
      galleta3.style.visibility = "hidden";

      imgsGalleta1Pedido.style.visibility = "initial";
      imgsGalleta2Pedido.style.visibility = "hidden";
      imgsGalleta3Pedido.style.visibility = "hidden";
    }
    else if (event.target.value == "cantidad-galletas-2"){
      galleta1.style.visibility = "initial";
      galleta2.style.visibility = "initial";
      galleta3.style.visibility = "hidden";

      imgsGalleta1Pedido.style.visibility = "initial";
      imgsGalleta2Pedido.style.visibility = "initial";
      imgsGalleta3Pedido.style.visibility = "hidden";
    }
    else{
      galleta1.style.visibility = "initial";
      galleta2.style.visibility = "initial";
      galleta3.style.visibility = "initial";

      imgsGalleta1Pedido.style.visibility = "initial";
      imgsGalleta2Pedido.style.visibility = "initial";
      imgsGalleta3Pedido.style.visibility = "initial";
    }
  })

  tipoGalleta1.addEventListener("change", function(event){
    if (event.target.value == "galleta-clasica"){
      imgGalletaClasica1.style.display = "initial";
      imgGalletaChocolate1.style.display = "none";
      imgGalletaRedVelvet1.style.display = "none";

      imgGalletaClasica1Pedido.style.display = "initial";
      imgGalletaChocolate1Pedido.style.display = "none";
      imgGalletaRedVelvet1Pedido.style.display = "none";
    }
    else if (event.target.value == "galleta-chocolate"){
      imgGalletaClasica1.style.display = "none";
      imgGalletaChocolate1.style.display = "initial";
      imgGalletaRedVelvet1.style.display = "none";

      imgGalletaClasica1Pedido.style.display = "none";
      imgGalletaChocolate1Pedido.style.display = "initial";
      imgGalletaRedVelvet1Pedido.style.display = "none";
    }
    else{
      imgGalletaClasica1.style.display = "none";
      imgGalletaChocolate1.style.display = "none";
      imgGalletaRedVelvet1.style.display = "initial";

      imgGalletaClasica1Pedido.style.display = "none";
      imgGalletaChocolate1Pedido.style.display = "none";
      imgGalletaRedVelvet1Pedido.style.display = "initial";
    }
  })

  tipoGalleta2.addEventListener("change", function(event){
    if (event.target.value == "galleta-clasica"){
      imgGalletaClasica2.style.display = "initial";
      imgGalletaChocolate2.style.display = "none";
      imgGalletaRedVelvet2.style.display = "none";

      imgGalletaClasica2Pedido.style.display = "initial";
      imgGalletaChocolate2Pedido.style.display = "none";
      imgGalletaRedVelvet2Pedido.style.display = "none";
    }
    else if (event.target.value == "galleta-chocolate"){
      imgGalletaClasica2.style.display = "none";
      imgGalletaChocolate2.style.display = "initial";
      imgGalletaRedVelvet2.style.display = "none";

      imgGalletaClasica2Pedido.style.display = "none";
      imgGalletaChocolate2Pedido.style.display = "initial";
      imgGalletaRedVelvet2Pedido.style.display = "none";
    }
    else{
      imgGalletaClasica2.style.display = "none";
      imgGalletaChocolate2.style.display = "none";
      imgGalletaRedVelvet2.style.display = "initial";

      imgGalletaClasica2Pedido.style.display = "none";
      imgGalletaChocolate2Pedido.style.display = "none";
      imgGalletaRedVelvet2Pedido.style.display = "initial";
    }
  })

  tipoGalleta3.addEventListener("change", function(event){
    if (event.target.value == "galleta-clasica"){
      imgGalletaClasica3.style.display = "initial";
      imgGalletaChocolate3.style.display = "none";
      imgGalletaRedVelvet3.style.display = "none";

      imgGalletaClasica3Pedido.style.display = "initial";
      imgGalletaChocolate3Pedido.style.display = "none";
      imgGalletaRedVelvet3Pedido.style.display = "none";
    }
    else if (event.target.value == "galleta-chocolate"){
      imgGalletaClasica3.style.display = "none";
      imgGalletaChocolate3.style.display = "initial";
      imgGalletaRedVelvet3.style.display = "none";

      imgGalletaClasica3Pedido.style.display = "none";
      imgGalletaChocolate3Pedido.style.display = "initial";
      imgGalletaRedVelvet3Pedido.style.display = "none";
    }
    else{
      imgGalletaClasica3.style.display = "none";
      imgGalletaChocolate3.style.display = "none";
      imgGalletaRedVelvet3.style.display = "initial";

      imgGalletaClasica3Pedido.style.display = "none";
      imgGalletaChocolate3Pedido.style.display = "initial";
      imgGalletaRedVelvet3Pedido.style.display = "none";
    }
  })
}
