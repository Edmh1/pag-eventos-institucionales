function openModal(formToShow) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById(formToShow).style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    resetRegisterForm();
}

function setupModals() {
    document.addEventListener("click", (e) => {
        if (e.target.id === "ingresar") 
            openModal("login");
    });

    document.querySelectorAll(".close, .close-register").forEach(btn =>
        btn.addEventListener("click", closeModal)
    );
}

function resetRegisterForm() {
    document.getElementById("tipo-usuario").value = "";
    document.getElementById("programa-estudiante").style.display = "none";
    document.getElementById("cargo-funcionario").style.display = "none";
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
      })
      .catch(error => {
        document.getElementsByTagName("main")[0].innerHTML = "<p>Error al cargar la vista.</p>";
        console.error(error);
    });
}

function actualizarPerfil() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const rutaImg = localStorage.getItem("rutaImg") === "NULL" ? "resources/img/user-solid.svg" : localStorage.getItem("rutaImg");

    // Actualizamos los datos en la vista de perfil
    document.querySelector(".perfil-imagen").src = rutaImg;  // Imagen
    document.querySelector(".perfil-info h2").textContent = username;  // Nombre
    document.querySelector(".perfil-info p").textContent = email;  // Correo
}

  

export { openModal, closeModal, setupModals, resetRegisterForm, showLoader, hideLoader, loadView};
