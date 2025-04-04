document.addEventListener("DOMContentLoaded", function () {
    // Actualizar el header al cargar la página
    updateHeader();
    
    // Botón "Ingresar" en el header
    document.addEventListener('click', function(e) {
        if(e.target && e.target.id === 'ingresar') {
            e.preventDefault();
            document.getElementById("modal").style.display = "flex";
            document.getElementById("login").style.display = "block";
            document.getElementById("register").style.display = "none";
        }
    });

    // Botón "cerrar" dentro del modal
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });

    document.querySelector(".close-register").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });

    // Manejo de los botones de registro/login
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
    
    // Botón de ingresar en el modal
    document.getElementById("btnIngresar").addEventListener("click", changeUserType);
    
    // Botón de registrarse (opcional)
    document.getElementById("btnRegistrarse")?.addEventListener("click", function() {
        alert("Registro exitoso (simulado)");
        switchForms(registerForm, loginForm);
    });
});

function changeUserType() {
    const usuario = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    
    if (usuario === "user" && password === "user") {
        localStorage.setItem("userType", "user");
        localStorage.setItem("username", usuario);
        updateHeader();
        document.getElementById("modal").style.display = "none";
        return;
    }

    if (usuario === "admin" && password === "admin") {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("username", usuario);
        updateHeader();
        document.getElementById("modal").style.display = "none";
        return;
    }

    alert("Credenciales incorrectas. Usa 'user/user' o 'admin/admin'");
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
            <button id="ingresar" class="button-header">Ingresar</button>
        </div>
        `;
    } else {
        const username = localStorage.getItem("username") || "Usuario";
        contenidoHeader += `
        <div id="cont-user" class="user-header">
            <button id="mis-eventos" class="button-header">Mis Eventos</button>
        `;

        if (userType === "admin") {
            contenidoHeader += `<button id="crear-evento" class="button-header">Crear Evento</button>`;
        }

        contenidoHeader += `
            <button id="cerrar-sesion" class="button-header">Cerrar Sesión</button>
            <img src="./resources/img/user-solid.svg" alt="Foto de perfil" id="user-pic">
            <span>${username}</span>
        </div>
        `;
    }

    header.innerHTML = contenidoHeader;
    
    // Volver a agregar los event listeners a los nuevos botones
    document.getElementById("cerrar-sesion")?.addEventListener("click", resetUserType);
    document.getElementById("ingresar")?.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("modal").style.display = "flex";
    });
}

function resetUserType() {
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    updateHeader();
}