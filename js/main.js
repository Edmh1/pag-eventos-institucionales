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
});
