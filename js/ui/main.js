import { setupModals } from './modal.js';
import { setupAuth } from '../auth.js';
import { updateHeader } from './header.js';
import { setupPage } from '../events.js';
import {showLoader, hideLoader} from './modal.js';
import {esperarBackend} from '../api/api.js';

document.addEventListener("DOMContentLoaded", async () => {
    updateHeader();

    try {
        showLoader();
        await esperarBackend();
        hideLoader();

        setupPage();    
        setupModals();
        setupAuth();
    } catch (e) {
        hideLoader();

        Swal.fire({
            icon: 'error',
            title: 'Servidor no disponible',
            text: e.message || 'No se pudo conectar con el servidor',
            confirmButtonText: 'OK'
        });
    }
});

