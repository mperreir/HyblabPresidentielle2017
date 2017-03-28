
class Infos {
    constructor() {
        this.infos = document.querySelector('.js-infos');

        this.openButton = document.querySelector('.js-open-infos');
        this.openButton.addEventListener('click', this.open.bind(this));

        this.closeButton = document.querySelector('.js-close-infos');
        this.closeButton.addEventListener('click', this.close.bind(this));
    }

    open() {
        this.infos.classList.add('mod-open');
    }

    close() {
        this.infos.classList.remove('mod-open');
    }
}

export default Infos;
