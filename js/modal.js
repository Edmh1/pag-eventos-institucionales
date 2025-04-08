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

export { openModal, closeModal, setupModals, resetRegisterForm };
