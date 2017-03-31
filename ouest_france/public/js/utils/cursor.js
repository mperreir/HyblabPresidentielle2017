
const
    APP_CONTAINER = '.canvas-container',
    MOD_CLIC = 'mod-clic';

const appContainer = document.querySelector(APP_CONTAINER);

export const cursorClic = () => appContainer.classList.add(MOD_CLIC);
export const cursorDefault = () => appContainer.classList.remove(MOD_CLIC);

