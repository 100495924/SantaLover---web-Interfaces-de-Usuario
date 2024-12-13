
function videollamada_init(){
    const boton_llamar = document.getElementById("boton-llamar");
    const video_papa_noel_1 = document.getElementById("videollamada-video-1");
    const video_papa_noel_2 = document.getElementById("videollamada-video-2");
    const video_no_disponible = document.getElementById("videollamada-video-3");

    const lista_videos = Array(video_papa_noel_1, video_papa_noel_2, video_no_disponible)

    boton_llamar.addEventListener(
        "click", (event) => llamar_papa_noel(lista_videos, boton_llamar)
    );
}

async function llamar_papa_noel(lista_videos, boton_llamar){
    // Elegimos el video para mostrar.
    const boton_colgar = document.getElementById("boton-colgar");

    const video = get_random_video(lista_videos);
    // console.log("Llamando");
    $(boton_llamar).hide();
    $(boton_colgar).show();
    
    // Mostrar texto de carga.
    $("#videollamada-text-1").text("Cargando...")
    for (let i=0; i<2; i++){
        $("#videollamada-text-1").text("Cargando.");
        await delay(500);
        $("#videollamada-text-1").text("Cargando..");
        await delay(500);
        $("#videollamada-text-1").text("Cargando...");
        await delay(500);
    }

    $("#videollamada-text-1").hide();
    if (video.nodeName === "VIDEO"){
        $(video).show();
        video.play();
        $("#videollamada-body").css({"background-color": "black", "align-items": "revert"});
    }else if (video.nodeName === "IMG"){
        $(video).show();
        $("#videollamada-body").css({"background-color": "black", "align-items": "center"});
    }

    boton_colgar.addEventListener(
        "click", (event) => colgar_papa_noel(boton_llamar, boton_colgar, video)
    );
}

function colgar_papa_noel(boton_llamar, boton_colgar, video){
    // console.log("Colgando");
    $(boton_llamar).show();
    $(boton_colgar).hide();

    $("#videollamada-text-1").text("Desconectado")
    $("#videollamada-text-1").show();
    if (video.nodeName === "VIDEO"){
        $(video).hide();
        video.pause();
        video.currentTime = 0;
    }else if (video.nodeName === "IMG"){
        $(video).hide();
    }
    $("#videollamada-body").css({"background-color": "gray", "align-items": "center"});
    // Creamos un clon del botón de colgar para resetear sus 
    // eventos y evitar bugs.
    const videollamada_body = document.getElementById("videollamada-body");
    let boton_colgar_clone = boton_colgar.cloneNode(true);
    boton_colgar.remove();
    videollamada_body.appendChild(boton_colgar_clone);
}

function get_random_video (videos_list) {
    return videos_list[Math.floor((Math.random()*videos_list.length))];
}

$(document).ready(videollamada_init())