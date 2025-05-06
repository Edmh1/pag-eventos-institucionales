import { camContrasena } from "./auth.js";
import { eliminarUsuario } from "./api/usuarioApi.js";
import { logout } from "./header.js";

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
        const tipoUsuario = document.getElementById("tipo-usuario");
        const programaEstudiante = document.getElementById("programa-estudiante");
        const cargoFuncionario = document.getElementById("cargo-funcionario");

        if (tipoUsuario) tipoUsuario.value = "";
        if (programaEstudiante) programaEstudiante.style.display = "none";
        if (cargoFuncionario) cargoFuncionario.style.display = "none";
    } else if (formToReset === "cambiar-con") {
        const actual = document.getElementById("contrasena-user-actual");
        const nueva = document.getElementById("contrasena-user-nueva");

        if (actual) actual.value = "";
        if (nueva) nueva.value = "";
    } else if (formToReset === "login") {
        const user = document.getElementById("login-user");
        const pass = document.getElementById("login-password");

        if (user) user.value = "";
        if (pass) pass.value = "";
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
        } else if (e.target.id === "mod-eli-cuen"){
            e.preventDefault(); //evita que el link de # haga que recargue la pag
            confirmEliminar();
        }
    });

    // En el caso que este cargado el html del perfil
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

async function confirmEliminar() {
    const result = await Swal.fire({
        title: "¿Está seguro que quieres eliminar esta cuenta?",
        icon: "info",
        focusConfirm: false,
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: `Sí`,
        denyButtonText: `No`,
    });

    if (result.isConfirmed) {
        const exito = await eliminarUsuario();
        if (exito) {
            localStorage.clear();
            window.location.href = "index.html";
        }
    }
}


export { closeAndResetModal, setupModals, resetForm ,showLoader, hideLoader, loadView };
