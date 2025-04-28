import { camContrasena } from "./auth.js";

function openModal(formToShow) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById(formToShow).style.display = "block";
}

function closeAndResetModal(formToClose) {
    document.getElementById("modal").style.display = "none";
    document.getElementById(formToClose).style.display = "none";
    resetForm(formToClose);
}

function resetForm(formToReset) {
    if (formToReset === "register") {
        document.getElementById("tipo-usuario").value = "";
        document.getElementById("programa-estudiante").style.display = "none";
        document.getElementById("cargo-funcionario").style.display = "none";
    } else if (formToReset === "cambiar-con") {
        document.getElementById("contrasena-user-actual").value = "";
        document.getElementById("contrasena-user-nueva").value = "";
    } else if (formToReset === "login") {
        document.getElementById("login-user").value = "";
        document.getElementById("login-password").value = "";
    }
}

function setupModals() {
    document.addEventListener("click", (e) => {
        if (e.target.id === "ingresar") {
            openModal("login");
        } else if (e.target.dataset.closeForm) {
            closeAndResetModal(e.target.dataset.closeForm);
        } else if (e.target.id === "mod-cam-con") {
            e.preventDefault();
            openModal("cambiar-con");
        }
    });

    const confirmarBtn = document.getElementById("btnConfirmar-con");
    if (confirmarBtn) {
        confirmarBtn.addEventListener("click", (e) => {
            e.preventDefault();
            camContrasena();
        });
    }
}

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function loadView(nameView) {
    fetch(`${nameView}.html`)
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar la vista");
            return res.text();
        })
        .then(html => {
            document.getElementsByTagName("main")[0].innerHTML = html;
            actualizarPerfil();
            setupModals(); 
        })
        .catch(error => {
            document.getElementsByTagName("main")[0].innerHTML = "<p>Error al cargar la vista.</p>";
            console.error(error);
        });
}

function actualizarPerfil() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const rutaImg = localStorage.getItem("rutaImg") === "null" ? "resources/img/user-solid.svg" : localStorage.getItem("rutaImg");

    // Actualizamos los datos en la vista de perfil
    document.querySelector(".perfil-imagen").src = rutaImg;
    document.querySelector(".perfil-info h2").textContent = username;
    document.querySelector(".perfil-info p").textContent = email;
}

export { closeAndResetModal, setupModals, resetForm ,showLoader, hideLoader, loadView };
