
import { without, find } from 'underscore';
import cheet from 'cheet.js';

import data from './services/candidates';

import Stage from './components/Stage';
import CandidatePanel from './components/CandidatePanel';
import ActionBar from './components/ActionBar';
import CandidatesBar from './components/CandidatesBar';
import Soucoupe from './components/Soucoupe';

import CandidateGroup from './containers/CandidateGroup';
import AverageCandidateGroup from './containers/AverageCandidateGroup';

import { SELECTOR_TITLES } from './dataviz/index';

import { getWidth, getHeight } from './utils/window';

const AVERAGE_CANDIDATE = 'AVERAGE_CANDIDATE';

const
    width  = getWidth(),
    height = getHeight(),
    canvas = document.querySelector('.js-canvas-container');

class AppController {
    constructor() {
        // The WebGL root object
        this.stage = new Stage(canvas, width, height);

        this.candidates = {};
        this.buildCandidates(data.candidats);

        this.candidatePanel = new CandidatePanel(
            {
                container: '.js-candidate-panel',
                panel1:    '.js-candidate-1',
                panel2:    '.js-candidate-2',
            },
            (index) => this.candidateClose(index)
        );

        this.criteresBar = new ActionBar(
            '.js-actions-criteres',
            (critere) => this.selectDataviz(critere)
        );

        this.planetsChoiceBar = new CandidatesBar(
            '.js-actions-choix',
            '.js-add-candidate-open',
            '.js-add-candidate-close',
            (candidate) => this.addCandidate(candidate)
        );

        this.selectedCandidates = [];
        this.currentSelector = null;

        this.titleData = document.querySelector('.js-title-dataviz');
        this.titleDataContent = this.titleData
            .querySelector('.js-title-dataviz-content');

        this.soucoupe = new Soucoupe();
        this.soucoupe.moveAround();
        this.stage.add(this.soucoupe);
        cheet('↑ ↑ ↓ ↓ ← → ← → b a', this.toggleSoucoupe.bind(this));

        document.onkeyup = (e) => {
            if (e.keyCode === 27) { // ESC key
                const l = this.selectedCandidates.length;
                if (l > 0) {
                    this.candidateClose(l - 1);
                }

                if (this.soucoupe.crazy) {
                    this.toggleSoucoupe();
                }
            }
        };
    }

    buildCandidates(results) {
        Object
            .keys(results)
            .forEach((key) => {
                const candidate = results[key];
                const group = new CandidateGroup(
                    {
                        position: {
                            x: candidate.x,
                            y: candidate.y,
                        },
                    },
                    {
                        id:          key,
                        name:        candidate.name,
                        parti:       candidate.parti,
                        color:       candidate.color,
                        age:         candidate.age,
                        image:       candidate.texture,
                        total:       candidate.total_parrainages,
                        totalMaires: candidate.totalMaires,
                    },
                    candidate.parrainages,
                    candidate.texture,
                    this
                );

                this.candidates[key] = group;
                this.stage.add(group);
            });

        // add the "average" candidat
        this.candidates[AVERAGE_CANDIDATE] = new AverageCandidateGroup(
            {
                id:          AVERAGE_CANDIDATE,
                name:        'Moyenne des candidats',
                pannelClass: 'mod-average',
                image:       'images/4_candidats.png',
            },
            data.stats,
            this
        );
        this.stage.add(this.candidates[AVERAGE_CANDIDATE]);
    }

    start() {
        this.stage.start();
    }

    // show selectec candidates and update panel
    activateSelectedCandidates() {
        this.candidatePanel.reset();

        const n = this.selectedCandidates.length;
        this.selectedCandidates.forEach((candidate, i) => {
            candidate.activate(
                ((1 + (i * 2)) * width) / (2 * n),
                height / 2,
                n === 1 ? 2 : 1.6
            );

            this.candidatePanel.updateInfo(i, candidate.infos);
            this.candidatePanel.openPanel(i);
        });

        if (this.currentSelector) {
            this.selectDataviz(this.currentSelector);
        }

        this.candidatePanel.open();
    }

    openTitle(title) {
        this.titleDataContent.innerText = SELECTOR_TITLES[title];
        this.titleData.classList.add('mod-open');
    }

    closeTitle() {
        this.titleData.classList.remove('mod-open');
    }

    // select a candidate
    candidateOpen(selectedCandidate) {
        Object.values(this.candidates).forEach((candidate) => {
            if (candidate !== selectedCandidate) {
                candidate.hide();
            }
        });

        this.stage.center();
        this.criteresBar.open();
        this.planetsChoiceBar.start();
        this.soucoupe.hide();

        this.addCandidate(selectedCandidate.id);
    }

    /**
     * Close a candidate. If it's the last, reset the screen to show the full
     * universe
     * @param  {Number} index       0 or 1
     */
    candidateClose(index) {
        const close = this.selectedCandidates.length < 2;

        // remove unique selected candidate
        if (close) {
            Object.values(this.candidates)
                .forEach((candidate) => candidate.reset());

            this.candidatePanel.close();
            this.criteresBar.close();
            this.planetsChoiceBar.stop();
            this.stage.active();
            this.soucoupe.show();

            this.currentSelector = null;
        } else {
            // just remove one of the two
            this.selectedCandidates[index].hide(-width / 2);
        }

        this.selectedCandidates = without(
            this.selectedCandidates,
            find(this.selectedCandidates, (_, i) => i === index)
        );

        if (!close) {
            this.activateSelectedCandidates();
        }

        this.closeTitle();
    }

    // on click on a criteria
    selectDataviz(selector) {
        this.openTitle(selector);
        // retrieve data for each candidates (one or two)
        const dataviz = this.selectedCandidates.map(
            (candidate) => candidate.buildDatavizData(selector)
        );

        // compute max if needed
        const max = dataviz.reduce((reduced, current) => (
            current.max ? Math.max(current.max, reduced) : reduced
        ), 0);

        // show dataviz
        this.selectedCandidates.forEach(
            (candidate, i) => candidate.showDataviz(
                selector,
                this.selectedCandidates.length,
                dataviz[i].data,
                max,
                data.stats[selector]
            )
        );

        this.currentSelector = selector;
    }

    // add a selected candidate to compare
    addCandidate(id) {
        const candidate = this.candidates[id];
        if (this.selectedCandidates.indexOf(candidate) > -1) {
            return;
        }

        // if already 2 candidates, remove the last one
        if (this.selectedCandidates.length === 2) {
            const old = this.selectedCandidates.pop();
            old.hide();
        }

        this.selectedCandidates.push(candidate);
        this.activateSelectedCandidates();
    }

    // ¯\_(ツ)_/¯
    toggleSoucoupe() {
        if (this.soucoupe.crazy) {
            this.soucoupe.stopCrazy();
            this.stage.active();

            Object.values(this.candidates).forEach((candidate) => {
                candidate.reset();
            });
        } else if (this.selectedCandidates.length === 0) {
            console.log('Hello you 👽');
            this.stage.fullscreen();
            this.soucoupe.crazySoucoupe();

            Object.values(this.candidates).forEach((candidate) => {
                candidate.hide();
            });
        }
    }

}

export default AppController;
