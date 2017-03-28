
class ActionBar {
    constructor(classname, onClick) {
        this.onClick = onClick;

        this.bar = document.querySelector(classname);
        this.actions = this.bar.querySelectorAll('.js-action');

        this.actions.forEach((c) => {
            c.addEventListener('click', () => this.clickHandler(c));
        });

        this.selected = null;
    }

    open() {
        this.bar.classList.add('mod-open');
    }

    close() {
        this.bar.classList.remove('mod-open');
        this.selected = null;
    }

    reset() {
        if (this.selected) {
            this.selected.classList.remove('mod-active');
        }
    }

    clickHandler(element) {
        this.reset();

        this.selected = element;
        element.classList.add('mod-active');

        this.onClick(element.dataset.id);
    }
}

export default ActionBar;
