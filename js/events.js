import { obtenerTotalEventos, obtenerEventos } from "./api/eventoApi.js";

let currentPage = 1; // Inicializa la página actual
let totalPages = 1;  // Inicializa el número de páginas
const nElementos = 6;

async function setupPage() {
    // Añadir los listeners de los botones de paginación
    document.querySelectorAll(".pagination-container .page-btn")[0].addEventListener("click", () => goToPage(1)); // «
    document.querySelectorAll(".pagination-container .page-btn")[1].addEventListener("click", () => goToPage(currentPage - 1)); // ‹
    document.querySelectorAll(".pagination-container .page-btn")[2].addEventListener("click", () => goToPage(currentPage + 1)); // ›
    document.querySelectorAll(".pagination-container .page-btn")[3].addEventListener("click", () => goToPage(totalPages)); // »

    // Esperar a que obtenerTotalEventos termine antes de continuar
    let cantidadEventos = await obtenerTotalEventos();
    totalPages = Math.ceil(cantidadEventos / nElementos);

    // Actualizar el DOM con el número de páginas
    const container = document.getElementsByClassName("pagination-container")[0];
    const info = container.getElementsByClassName("page-info")[0];
    info.innerHTML = `Página <span id="currentPage">${currentPage}</span> de <span id="totalPages">${totalPages}</span>`;
    
    goToPage(currentPage); // Ir a la página inicial
}

async function goToPage(page) {
    if (page < 1) {
        page = 1;
    } else if (page > totalPages) {
        page = totalPages;
    }
    currentPage = page;
    
    let eventos = await obtenerEventos(currentPage, nElementos);
    const contenedor = document.getElementById("cont-eventos");
    contenedor.innerHTML = ""; // Limpiar eventos anteriores

    eventos.forEach(evento => {
        const div = document.createElement("div");
        let img = (!evento.rutaImgEvento || evento.rutaImgEvento === "null")? "resources/img/party.jpg" : evento.rutaImgEvento;

        div.className = "cajita-evento";
        div.innerHTML = `
            <img src="${img}" alt="Evento">
            <div class="info">
                <h3>${evento.nombreEvento}</h3>
                <p>Lugar: ${evento.nombreEvento}</p>
                <p>Fecha: ${evento.fechaEvento}</p>
                <p>Hora: ${evento.horaEvento}</p>
            </div>
        `;
        contenedor.appendChild(div);
    });

    // Actualizar el número de página actual (opcional)
    document.getElementById("currentPage").textContent = currentPage;
}

export { setupPage, goToPage}