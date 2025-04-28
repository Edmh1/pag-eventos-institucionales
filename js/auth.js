import { closeAndResetModal } from './modal.js';
import { updateHeader } from './header.js';
import { login, registrarEstudiante, registrarFuncionario, actualizarContrasena } from './api/usuarioApi.js'


function setupAuth() {
    document.getElementById("register-btn").addEventListener("click", () => switchForms("login", "register"));
    document.getElementById("login-btn").addEventListener("click", () => switchForms("register", "login"));

    document.getElementById("tipo-usuario").addEventListener("change", toggleUserFields);
    document.getElementById("btnIngresar").addEventListener("click", loginUser);
    document.getElementById("btnRegistrarse").addEventListener("click", () => {
        registerUser();
        switchForms("register", "login");
    });
}

function toggleUserFields() {
    const tipo = document.getElementById("tipo-usuario").value;
    document.getElementById("programa-estudiante").style.display = tipo === "estudiante" ? "block" : "none";
    document.getElementById("cargo-funcionario").style.display = tipo === "funcionario" ? "block" : "none";
}

function switchForms(hideId, showId) {
    const hideForm = document.getElementById(hideId);
    const showForm = document.getElementById(showId);

    hideForm.classList.add("flip-out-hor-top");
    hideForm.addEventListener("animationend", function onHideEnd() {
        hideForm.classList.remove("flip-out-hor-top");
        hideForm.style.display = "none";

        showForm.style.display = "block";
        showForm.classList.add("flip-in-hor-bottom");
        showForm.addEventListener("animationend", function onShowEnd() {
            showForm.classList.remove("flip-in-hor-bottom");
            showForm.removeEventListener("animationend", onShowEnd);
        });

        hideForm.removeEventListener("animationend", onHideEnd);
    });

    // Esto es para resetear solo si estamos ocultando "register"
    if (hideId === "register") {
        resetForm("register");
    }
}


function registerUser() {
    const tipo = document.getElementById("tipo-usuario").value;
    const data = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        codigo: document.getElementById("codigo").value,
        email: document.getElementById("email").value,
        contrasena: document.getElementById("contrasena").value,
        tipo: tipo
    };

    if(!data.nombre || !data.apellido || !data.codigo || !data.email || !data.contrasena || !tipo) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          }); 
          
        return;
    }

    if (data.contrasena !== document.getElementById("confirmar-contrasena").value) {
        Swal.fire({
            icon: "info",
            title: "Las contraseñas no coinciden",
            text: "Las contraseñas no coinciden, por favor verifica.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          });
        return;
    }

    if (tipo === "estudiante") {
        data.programa = document.getElementById("programa-estudiante").value;
        registrarEstudiante(data);
    } else if (tipo === "funcionario") {
        data.cargo = document.getElementById("cargo-funcionario").value;
        registrarFuncionario(data);
    }
    
}


async function loginUser() {
    const data = {
        email: document.getElementById("email-user").value,
        contrasena: document.getElementById("contrasena-user").value
    };

    await login(data);
    updateHeader();
    closeAndResetModal("register");
    closeAndResetModal("login");  
}


async function camContrasena() {
    const data = {
        contrasenaActual: document.getElementById("contrasena-user-actual").value,
        contrasenaNueva: document.getElementById("contrasena-user-nueva").value
    };
    
    await actualizarContrasena(data);
    closeAndResetModal("cambiar-con");
}

export { setupAuth, camContrasena };
