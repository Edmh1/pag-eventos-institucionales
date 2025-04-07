import { closeModal, resetRegisterForm } from './modal.js';
import { updateHeader } from './header.js';

function setupAuth() {
    document.getElementById("register-btn").addEventListener("click", () => switchForms("login", "register"));
    document.getElementById("login-btn").addEventListener("click", () => switchForms("register", "login"));

    document.getElementById("tipo-usuario").addEventListener("change", toggleUserFields);
    document.getElementById("btnIngresar").addEventListener("click", loginUser);
    document.getElementById("btnRegistrarse").addEventListener("click", () => {
        alert("Registro exitoso (simulado)");
        switchForms("register", "login");
    });
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

    resetRegisterForm();
}

function toggleUserFields() {
    const tipo = document.getElementById("tipo-usuario").value;
    document.getElementById("programa-estudiante").style.display = tipo === "estudiante" ? "block" : "none";
    document.getElementById("cargo-funcionario").style.display = tipo === "funcionario" ? "block" : "none";
}

function loginUser() {
    const user = document.getElementById("email-user").value;
    const pass = document.getElementById("password-user").value;

    if ((user === "admin" && pass === "admin") || (user === "user" && pass === "user")) {
        const role = user === "admin" ? "admin" : "user";
        localStorage.setItem("userType", role);
        localStorage.setItem("username", user);
        updateHeader();
        closeModal();
    } else {
        alert("Credenciales incorrectas.");
    }
}

export { setupAuth };
