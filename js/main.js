import { setupModals } from './modal.js';
import { setupAuth } from './auth.js';
import { updateHeader } from './header.js';

document.addEventListener("DOMContentLoaded", () => {
    updateHeader();
    setupModals();
    setupAuth();
});
