
import ActionBar from './ActionBar';

class CandidatesBar extends ActionBar {
    constructor(barClassname, openClassname, closeClassname, onClick) {
        super(barClassname, onClick);

        this.openButton = document.querySelector(openClassname);
        this.closeButton = document.querySelector(closeClassname);

        this.openButton.addEventListener('click', () => {
            this.open();
        });

        this.closeButton.addEventListener('click', () => {
            this.close();
        });

        this.offset = document
            .querySelector('.action-bar-element').offsetHeight;

        this.upButton = document
            .querySelector('.action-bar-arrow-up');
        this.downButton = document
            .querySelector('.action-bar-arrow-down');

        this.actionBar = document
            .querySelector('.action-bar-planets-list');

        this.upButton.addEventListener('click', this.up.bind(this));
        this.downButton.addEventListener('click', this.down.bind(this));
    }

    open() {
        super.open();
        this.openButton.classList.remove('mod-open');
        this.closeButton.classList.add('mod-open');
    }

    close() {
        super.close();
        this.openButton.classList.add('mod-open');
        this.closeButton.classList.remove('mod-open');
    }

    up() {
        this.actionBar.scrollTop -= this.offset;
    }

    down() {
        this.actionBar.scrollTop += this.offset;
    }

    start() {
        this.openButton.classList.add('mod-open');
    }

    stop() {
        this.close();
        this.openButton.classList.remove('mod-open');
    }
}

export default CandidatesBar;
