import { API_TIPO_EVENTO } from "./api.js";

function cargarTipoEvento() {
    const tiposEventoCache = localStorage.getItem('tipos-evento');

    if (tiposEventoCache!=null) {
        poblarSelect(JSON.parse(tiposEventoCache));
    } else {
        fetch(API_TIPO_EVENTO)
            .then(response => response.json())
            .then(tiposEvento => {
                localStorage.setItem('tipos-evento', JSON.stringify(tiposEvento));
                poblarSelect(tiposEvento);
            })
            .catch(error => console.error('Error cargando tipos de eventos:', error));
    }
}

function poblarSelect(tiposEvento) {
    const selectTiposEvento = document.getElementById('tipo-evento');
    selectTiposEvento.innerHTML = '<option value="" disabled selected>Seleccione un Tipo de Evento</option>';
    tiposEvento.forEach(tipoEvento => {
        const option = document.createElement('option');
        option.value = tipoEvento.idTipoEvento;
        option.textContent = tipoEvento.nombreTipoEvento;
        selectTiposEvento.appendChild(option);
    });
}

export {cargarTipoEvento}