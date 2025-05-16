import { camContrasena } from "../auth.js";
import { eliminarUsuario, actualizarImg } from "../api/usuarioApi.js";
import { subirImagenAImgur } from "../api/imgur.js";
import { updateHeader } from "./header.js";
import { cargarTipoEvento } from "../api/tipoEventoApi.js";
import { crearEvento } from "../api/eventoApi.js";
import { goToPage } from "../events.js";

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
        } else if (e.target.id === "mod-eli-cuen") {
            e.preventDefault(); //evita que el link de # haga que recargue la pag
            confirmEliminar();
        } else if (e.target.id === "mod-img") {
            e.preventDefault();
            openModal("modificar-imagen");
            setupModificarImagen();
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
            if (nameView === "perfil") {
                actualizarPerfil();
            } else if (nameView === "crear_evento") {
                setupCrearEvento();
            } else if (nameView === "mis_eventos") {
                setupMisEventos();
            } else if (nameView === "actualizar_evento") {
                setupActualizarEvento();
            }
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

function setupCrearEvento() {
    cargarTipoEvento();

    const form = document.getElementById("formCrearEvento");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const imgPreview = document.getElementById("imgPreview");
    var vistaPreviaLabel = document.getElementById("vista-previa");

    if (!form || !uploadBtn || !fileInput || !imgPreview) {
        console.warn("Algunos elementos no se encontraron en el DOM.");
        return;
    }

    uploadBtn.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                vistaPreviaLabel.textContent = "Por favor, selecciona una imagen válida.";
                return;
            }
            vistaPreviaLabel.style.display = "none";
            const reader = new FileReader();

            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                imgPreview.style.width = "100%";
                imgPreview.style.height = "auto";
                imgPreview.style.display = "block";
            };

            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            vistaPreviaLabel.textContent = "Por favor, selecciona una imagen.";
            return;
        }

        const nombre = document.getElementById("nombre-evento").value.trim();
        const fecha = document.getElementById("fecha-evento").value;
        const hora = document.getElementById("hora-evento").value;
        const horaFin = document.getElementById("hora-fin-evento").value;
        const lugar = document.getElementById("lugar-evento").value.trim();
        const tipoEvento = document.getElementById("tipo-evento").value;

        if (!nombre || !fecha || !hora || !horaFin || !lugar || !tipoEvento) {
            return Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, completa todos los campos.',
            });
        }

        if (hora > horaFin) {
            return Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'La hora de inicio no puede ser mayor a la hora de fin.',
            });
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaEvento = new Date(fecha);
        fechaEvento.setHours(0, 0, 0, 0);

        if (fechaEvento < hoy) {
            return Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'La fecha no puede ser menor a la fecha actual.',
            });
        }

        let url;
        try {
            url = await subirImagenAImgur(file);
            if (!url) {
                vistaPreviaLabel.textContent = "Error al subir la imagen.";
                return;
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la imagen intente más tarde.',
            });
        }

        const evento = {
            idTipoEvento: tipoEvento,
            nombreEvento: nombre,
            lugarEvento: lugar,
            fechaEvento: fecha,
            horaEvento: hora,
            horaFinEvento: horaFin,
            rutaImgEvento: url,
            idUsuario: localStorage.getItem("idUsuario")
        };

        await enviarEvento(evento);
    });
}


async function enviarEvento(evento) {

    try {
        const response = await crearEvento(evento);
        if (!response) {
            throw new Error('Error al crear evento');
        }
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el evento. Intenta nuevamente.',
        });
    }
}

var nombre;
var lugar;
var url;

async function setupMisEventos() {
    console.log("Cargar mis eventos");
    await goToPage(1);
    addEventListenerCajas();
}

function addEventListenerCajas() {
    const cajas = document.querySelectorAll(".cajita-evento");
    cajas.forEach((caja) => {
        caja.onclick = () => {
            localStorage.setItem("idEvento", caja.id);
            loadView("actualizar_evento");
            nombre = document.getElementById("nombre-evento-text").textContent;
            lugar = document.getElementById("lugar-evento-text").textContent;
            url = document.getElementById("img-evento").src;
        }
    });
}

function setupActualizarEvento() {
    const nombreEvento = document.getElementById("nombre-evento");
    const lugarEvento = document.getElementById("lugar-evento");

    lugar = quitarPrefijo(lugar, "Lugar:");

    nombreEvento.value = nombre;
    lugarEvento.value = lugar;

    const form = document.getElementById("formActualizarEvento");

    uploadBtn.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) {
                vistaPreviaLabel.textContent = "Por favor, selecciona una imagen válida.";
                return;
            }
            vistaPreviaLabel.style.display = "none";
            const reader = new FileReader();

            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                imgPreview.style.width = "100%";
                imgPreview.style.height = "auto";
                imgPreview.style.display = "block";
            };

            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];

        const nombre = document.getElementById("nombre-evento").value.trim();
        const lugar = document.getElementById("lugar-evento").value.trim();
        document.getElementById("imgPreview").src = url;

        if (!nombre || !lugar) {
            return Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Por favor, completa todos los campos.',
            });
        }

        if (file) {
            try {
                url = await subirImagenAImgur(file);
                if (!imgUrl) {
                    console.error("Error al subir la imagen");
                    return;
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la imagen intente más tarde.',
                });
            }
        }

        const evento = {
            nombreEvento: nombre,
            lugarEvento: lugar,
            idEvento: localStorage.getItem("idEvento"),
            imgUrl: url
        };

        await updateEvento(evento);
    });
}

function quitarPrefijo(texto, prefijo) {
    if (texto.startsWith(prefijo)) {
        return texto.slice(prefijo.length).trim();
    }
    return texto;
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

function setupModificarImagen() {
    const form = document.getElementById("formModificarImagen");
    const input = document.getElementById("nuevaImagen");
    const imgPreview = document.getElementById("imgPreviewMod");

    if (!form || !input || !imgPreview) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const file = input.files[0];
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Selecciona una imagen',
            });
            return;
        }

        try {
            const url = await subirImagenAImgur(file);
            if (!url) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo subir la imagen',
                });
                return;
            }
            const data = {
                url: url,
            };

            await actualizarImg(data);
            localStorage.setItem("rutaImg", url);
            updateHeader();
            actualizarPerfil();
            closeAndResetModal("modificar-imagen");
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al subir la imagen: ${err}`,
            });
        }
    });

    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imgPreview.src = reader.result;
                imgPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
}




export { closeAndResetModal, setupModals, resetForm, showLoader, hideLoader, loadView };
