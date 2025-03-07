function openModal(){
    document.getElementById("ingresar").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("modal").style.display = "flex"; 
    });

    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none"; 
    });
}

function changeUserType() {
    usuario = document.getElementById("user").value;
    password = document.getElementById("password").value;
    if (usuario == "user" && password == "user") {
        localStorage.setItem("userType", "user");
    }

    if (usuario == "admin" && password == "admin") {
        localStorage.setItem("userType", "admin");
    }

    updateHeader();
}

function updateHeader() {
    const header = document.querySelector("header");
    const userType = localStorage.getItem("userType") || "guest";
    let contenidoHeader = `
    <div id="cont-logo">
        <img id="logo" src="resources/img/logo-umagdalena.svg" alt="Logo Institucional">
    </div>
    <div id="cont-nombre-institucion">
        <h2 id="nombre-institucion">UNIVERSIDAD DEL MAGDALENA</h2>
    </div>
    `;

    if (userType === "guest") {
        contenidoHeader += `
        <div id="cont-ingresar">
            <button id="ingresar" class="button-header" onclick="openModal()">Ingresar</button>
        </div>
    `;
    } else {
        contenidoHeader += `
        <div id="cont-user" class="user-header">
            <button id="mis-eventos" class="button-header">Mis Eventos</button>
    `;

        if (userType === "admin") {
            contenidoHeader += `<button id="crear-evento" class="button-header">Crear Evento</button>`;
        }

        contenidoHeader += `<button id="cerrar-sesion" class="button-header" onclick="resetUserType()">Cerrar Sesión</button>
                            <img src="./resources/img/user-solid.svg" alt="Foto de perfil" id="user-pic">
                            </div>`;
        document.getElementById("modal").style.display = "none";
    }

    header.innerHTML = contenidoHeader;
}

function resetUserType() {
    localStorage.removeItem("userType");
    updateHeader();
}
