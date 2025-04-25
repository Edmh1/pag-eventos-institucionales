import { loadView } from "./modal.js";

function updateHeader() {
    const header = document.querySelector("header");
    const userType = localStorage.getItem("userType") || "guest";
    const admin = localStorage.getItem("admin") === "true" || false;
    const username = localStorage.getItem("username");
    const rutaImg = localStorage.getItem("rutaImg") || "resources/img/user-solid.svg";


    let html = `
        <div id="cont-logo"><img id="logo" src="resources/img/logo-umagdalena.svg" alt="Logo"></div>
        <div id="cont-nombre-institucion"><h2>UNIVERSIDAD DEL MAGDALENA</h2></div>
    `;

    if (userType === "guest") {
        html += `<div id="cont-ingresar"><button id="ingresar" class="button-header">Ingresar</button></div>`;
    } else {
        html += `
            <div id="cont-user" class="user-header">
                <button id="mis-eventos" class="button-header">Mis Eventos</button>
                ${(admin) ? `<button id="crear-evento" class="button-header">Crear Evento</button>` : ""}
                <button id="cerrar-sesion" class="button-header">Cerrar Sesión</button>
                <img src="${rutaImg}" alt="Usuario" id="user-pic">
                <span style="color: white;">${username}</span>
            </div>
        `;
    }
    
    header.innerHTML = html;
    
    document.getElementById("cerrar-sesion")?.addEventListener("click", logout);
    var img = document.getElementById("user-pic")?.addEventListener("click", () => {
        loadView("perfil");
    });
}


function logout() {
    localStorage.clear();
    updateHeader();
}

export { updateHeader };
