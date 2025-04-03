document.addEventListener("DOMContentLoaded", function () {
    
    // Botón "Ingresar" en el header
    document.getElementById("ingresar").addEventListener("click", function (event) {
        event.preventDefault(); 
        document.getElementById("modal").style.display = "flex"; // Muestra el modal
    });
    

    // Botón "cerrar" dentro del modal
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none"; // Oculta el modal
    });

    document.querySelector(".close-register").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none"; // Oculta el modal
    });

    let registerButton = document.getElementById("register-btn");
    let loginButton = document.getElementById("login-btn");
    let loginForm = document.getElementById("login");
    let registerForm = document.getElementById("register");

    function switchForms(hideForm, showForm) {
        hideForm.classList.add("flip-out-hor-top");
        hideForm.addEventListener("animationend", function onAnimationEnd() {
            hideForm.classList.remove("flip-out-hor-top");
            hideForm.style.display = "none";
            showForm.style.display = "block";
            showForm.classList.add("flip-in-hor-bottom");
            showForm.addEventListener("animationend", function onShowAnimationEnd() {
                showForm.classList.remove("flip-in-hor-bottom");
                showForm.removeEventListener("animationend", onShowAnimationEnd);
            });
            hideForm.removeEventListener("animationend", onAnimationEnd);
        });
    }

    registerButton.addEventListener("click", function () {
        switchForms(loginForm, registerForm);
    });

    loginButton.addEventListener("click", function () {
        switchForms(registerForm, loginForm);
    });
    
});

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
