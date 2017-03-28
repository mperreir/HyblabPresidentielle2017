
export const INTRO_MODAL = 'INTRO';
export const WEBGL_MODAL = 'WEBGL';

class Modal {
    constructor(type) {
        this.type = type;

        this.text_container = document
            .querySelector('.js-text-container');
        this.modal_container = document
            .querySelector('.js-modal-container-intro');
        this.text_container = document
            .querySelector('.js-text-container');
        this.closeButton = this.modal_container
            .querySelector('.js-close-modal');

        if (type === INTRO_MODAL) {
            this.modal_background = document
                .querySelector('.js-modal-background');
            this.closeButton
                .addEventListener('click', this.close.bind(this));
            this.closeButton.disabled = false;

            this.modal_background
                .addEventListener('click', this.close.bind(this));
        } else if (type === WEBGL_MODAL) {
            this.text_container_webGL = document
                .querySelector('.js-text-container-webgl');
        }

        this.open();
    }

    open() {
        if (this.type === INTRO_MODAL) {
            this.modal_background.classList.add('mode-open');
            this.closeButton.classList.add('mode-open');
        } else if (this.type === WEBGL_MODAL) {
            this.text_container.classList.remove('mode-open');
            this.closeButton.classList.remove('mode-open');
            this.text_container_webGL.classList.add('mode-open');
        }

        this.modal_container.classList.add('mode-open');
        this.modal_container.classList.add('mode-animate');
    }

    close() {
        this.modal_background.classList.remove('mode-open');
        this.modal_container.classList.remove('mode-open');
    }
}


export default Modal;
