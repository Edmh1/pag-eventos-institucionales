import { API_EVENTO_CONTAR } from "./api.js";

async function obtenerTotalEventos() {
    const ahora = Date.now();
    const intervalo = 5 * 60 * 1000; // 1 minutos en milisegundos

    const cache = localStorage.getItem("cacheTotalEventos");
    if (cache) {
        const { cantidadEventos, timestamp } = JSON.parse(cache);
        if (ahora - timestamp < intervalo) {
            return cantidadEventos;
        }
    }

    const respuesta = await fetch(API_EVENTO_CONTAR);
    const data = await respuesta.json();

    // Guardar en localStorage
    localStorage.setItem("cacheTotalEventos", JSON.stringify({
        cantidadEventos: data.cantidadEventos,
        timestamp: ahora
    }));

    return data.cantidadEventos;
}

export {obtenerTotalEventos}