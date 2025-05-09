import { setupModals } from './modal.js';
import { setupAuth } from '../auth.js';
import { updateHeader } from './header.js';
import { setupPage } from '../events.js';

document.addEventListener("DOMContentLoaded", () => {
    updateHeader();
    setupPage();
    setupModals();
    setupAuth();
});
