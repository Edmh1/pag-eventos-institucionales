import { API_CARG } from "./api.js";

function cargarCargos() {
    const cargosCache = localStorage.getItem('cargos');

    if (cargosCache!=null) {
        poblarSelect(JSON.parse(cargosCache));
    } else {
        fetch(API_CARG)
            .then(response => response.json())
            .then(cargos => {
                localStorage.setItem('cargos', JSON.stringify(cargos));
                poblarSelect(cargos);
            })
            .catch(error => console.error('Error cargando programas:', error));
    }
}

function poblarSelect(cargos) {
    const selectCargo = document.getElementById('cargo-funcionario');
    selectCargo.innerHTML = '<option value="" disabled selected>Seleccione un cargo</option>';
    cargos.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo.idCargo;
        option.textContent = cargo.nombreCargo;
        selectCargo.appendChild(option);
    });
}

export {cargarCargos}