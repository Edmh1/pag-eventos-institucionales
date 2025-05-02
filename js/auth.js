import { closeAndResetModal, resetForm } from './modal.js';
import { updateHeader } from './header.js';
import { login, registrarEstudiante, registrarFuncionario, actualizarContrasena } from './api/usuarioApi.js'
import { cargarProgramas } from './api/programaApi.js';
import { cargarCargos } from './api/cargoApi.js';


function setupAuth() {
    document.getElementById("register-btn").addEventListener("click", () => switchForms("login", "register"));
    document.getElementById("login-btn").addEventListener("click", () => switchForms("register", "login"));

    document.getElementById("tipo-usuario").addEventListener("change", toggleUserFields);
    document.getElementById("btnIngresar").addEventListener("click", loginUser);
    document.getElementById("btnRegistrarse").addEventListener("click", async () => {
        const success = registerUser();
        if (success) {
            switchForms("register", "login");
            closeAndResetModal("register");
        }
    });
}

function toggleUserFields() {
    const tipo = document.getElementById("tipo-usuario").value;
    document.getElementById("programa-estudiante").style.display = tipo === "estudiante" ? "block" : "none";
    document.getElementById("cargo-funcionario").style.display = tipo === "funcionario" ? "block" : "none";

    if(tipo === "estudiante"){ 
        cargarProgramas();
    }else if(tipo === "funcionario"){
        cargarCargos();
    }
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
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        codigo: document.getElementById("codigo").value.trim(),
        email: document.getElementById("email").value.trim(),
        contrasena: document.getElementById("contrasena").value,
        tipo: tipo
    };

    const confirmarContrasena = document.getElementById("confirmar-contrasena").value;

    // Validación de campos vacíos
    if (!data.nombre || !data.apellido || !data.codigo || !data.email || !data.contrasena || !tipo) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }

    // Validación: código solo números
    if (!/^\d+$/.test(data.codigo)) {
        Swal.fire({
            icon: "error",
            title: "Código inválido",
            text: "El código debe contener solo números.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }

    // Validación: email debe tener formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Por favor, ingresa un correo electrónico válido.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }


    // Validación: contraseñas coinciden
    if (data.contrasena !== confirmarContrasena) {
        Swal.fire({
            icon: "info",
            title: "Las contraseñas no coinciden",
            text: "Por favor, verifica las contraseñas.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }

    // Validación según tipo
    if (tipo === "estudiante") {
        const programa = document.getElementById("programa-estudiante").value;
        if (!programa) {
            Swal.fire({
                icon: "error",
                title: "Programa requerido",
                text: "Por favor selecciona un programa para el estudiante.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3085d6",
            });
            return false;
        }
        data.idPrograma = programa;
        registrarEstudiante(data);
    } else if (tipo === "funcionario") {
        const cargo = document.getElementById("cargo-funcionario").value;
        if (!cargo) {
            Swal.fire({
                icon: "error",
                title: "Cargo requerido",
                text: "Por favor selecciona un cargo para el funcionario.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3085d6",
            });
            return false;
        }
        data.idCargo = cargo;
        registrarFuncionario(data);
    }
    return true;
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
