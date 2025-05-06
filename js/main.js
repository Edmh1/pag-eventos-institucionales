import { setupModals } from './modal.js';
import { setupAuth } from './auth.js';
import { updateHeader } from './header.js';
import { obtenerTotalEventos } from './api/eventoApi.js';

document.addEventListener("DOMContentLoaded", () => {
    updateHeader();
    setupModals();
    setupAuth();
    //loadEvents();
    obtenerTotalEventos();
});
