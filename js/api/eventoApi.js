import { API_EVENTO, API_EVENTO_CONTAR } from "./api.js";
import {showLoader, hideLoader} from '../ui/modal.js';

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

async function obtenerEventos(pagina, limite) {
    try {
        showLoader();
        const response = await fetch(API_EVENTO+`?pagina=${pagina}&limite=${limite}`);
        if (!response.ok) throw new Error("Error al obtener eventos");

        const data = await response.json();
        return data.content; // Devolver solo los eventos
    } catch (error) {
        console.error("Error:", error);
        return []; // Devolver array vacío en caso de error
    }finally{
        hideLoader();
    }
}

async function crearEvento(evento) {
    try {
        showLoader();
        const response = await fetch(API_EVENTO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });

        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorInfo = JSON.parse(errorText);
                throw new Error(errorInfo.info || "Error desconocido");
            } catch (jsonError) {
                throw new Error("Error al crear evento");
            }
        }

        Swal.fire({
            title: "Registro exitoso",
            text: "El evento ha sido registrado correctamente.",
            icon: "success"
        });

        return true;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Ocurrió un error inesperado.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
        });
    } finally {
        hideLoader();
    }
}


export {obtenerTotalEventos, obtenerEventos, crearEvento}