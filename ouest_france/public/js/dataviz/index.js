/* eslint-disable max-len */

export const SELECTOR_GENDER   = 'SELECTOR_GENDER';
export const SELECTOR_AGE      = 'SELECTOR_AGE';
export const SELECTOR_CSP      = 'SELECTOR_CSP';
export const SELECTOR_POP      = 'SELECTOR_POP';
export const SELECTOR_URBANITE = 'SELECTOR_URBANITE';
export const SELECTOR_CHOMAGE  = 'SELECTOR_CHOMAGE';
export const SELECTOR_LISTE    = 'SELECTOR_LISTE';

export const SELECTOR_TYPE       = 'SELECTOR_TYPE';
export const SELECTOR_GENDER_ALL = 'SELECTOR_GENDER_ALL';

export const mairesOnly = (selector) => (
    selector !== SELECTOR_TYPE && selector !== SELECTOR_GENDER_ALL
);

export const SELECTOR_TITLES   = {
    [SELECTOR_GENDER]:     'Répartition par sexe des parrains',
    [SELECTOR_AGE]:        'Répartition des parrains par tranche d’âge',
    [SELECTOR_CSP]:        'Répartition des parrains par catégorie socio-professionnelle (CSP)',
    [SELECTOR_POP]:        'Population totale des communes dirigées par les parrains',
    [SELECTOR_URBANITE]:   'Répartition des communes des parrains selon leur degré d’urbanité/ruralité',
    [SELECTOR_CHOMAGE]:    'Répartition des communes des parrains selon le taux de chômage de leur bassin d’emploi',
    [SELECTOR_LISTE]:      'Répartition des couleurs politiques des parrains',
    [SELECTOR_GENDER_ALL]: 'Répartition par sexe des parrains',
    [SELECTOR_TYPE]:       'Répartition des parrains par type de mandat',
};
