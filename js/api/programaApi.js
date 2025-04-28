import { API_PROGRAM } from "./api.js";

function cargarProgramas() {
    const programasCache = localStorage.getItem('programas');

    if (programasCache!=null) {
        poblarSelect(JSON.parse(programasCache));
    } else {
        fetch(API_PROGRAM)
            .then(response => response.json())
            .then(programas => {
                localStorage.setItem('programas', JSON.stringify(programas));
                poblarSelect(programas);
            })
            .catch(error => console.error('Error cargando programas:', error));
    }
}

function poblarSelect(programas) {
    const selectPrograma = document.getElementById('programa-estudiante');
    selectPrograma.innerHTML = '<option value="" disabled selected>Seleccione un programa</option>';
    programas.forEach(programa => {
        const option = document.createElement('option');
        option.value = programa.idPrograma;
        option.textContent = programa.nombrePrograma;
        selectPrograma.appendChild(option);
    });
}

export {cargarProgramas}