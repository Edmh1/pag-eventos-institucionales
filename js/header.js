import { openModal } from './modal.js';

function updateHeader() {
    const header = document.querySelector("header");
    const userType = localStorage.getItem("userType") || "guest";
    const admin = localStorage.getItem("admin") === "true" || false;
    const username = localStorage.getItem("username");

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
                <img src="./resources/img/user-solid.svg" alt="Usuario" id="user-pic">
                <span style="color: white;">${username}</span>
            </div>
        `;
    }

    header.innerHTML = html;

    document.getElementById("cerrar-sesion")?.addEventListener("click", logout);
    document.getElementById("ingresar")?.addEventListener("click", () => {
        openModal("login")
    });
}

function logout() {
    localStorage.clear();
    updateHeader();
}

export { updateHeader };
