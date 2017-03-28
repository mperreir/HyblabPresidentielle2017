
import { groupBy, flatten } from 'underscore';

import {
    GREY,
    COLOR1,
    COLOR2,
    COLOR3,
    COLOR4,
    COLOR5,
    COLOR6,
    COLOR7,
    COLOR8,
    LISTE_EXG,
    LISTE_PC,
    LISTE_FG,
    LISTE_PG,
    LISTE_PS,
    LISTE_UG,
    LISTE_DVG,
    LISTE_EELV,
    LISTE_MODEM,
    LISTE_UC,
    LISTE_UDI,
    LISTE_DVD,
    LISTE_UD,
    LISTE_UMP,
    LISTE_FN,
    LISTE_EXD,
    LISTE_DIV,
    LISTE_SE,
    listColor,
} from '../style/color';

export const GENDER_LABELS = {
    Hommes: COLOR1,
    Femmes: COLOR7,
};

export const CSP_LABELS = {
    'Professions agricoles':                     COLOR6,
    'Salariés du privé':                         COLOR3,
    'Professions libérales':                     COLOR8,
    'Professions de l\'enseignement':            COLOR5,
    'Personnels des entreprises publiques':      COLOR1,
    'Professions industrielles et commerciales': COLOR2,
    Divers:                                      COLOR7,
    Retraités:                                   COLOR4,
    Inconnue:                                    GREY,
};

export const AGES_LABELS = {
    'Moins de 29 ans': COLOR1,
    '30 à 44 ans':     COLOR2,
    '45 à 59 ans':     COLOR3,
    '60 à 74 ans':     COLOR4,
    '75 ans et plus':  COLOR5,
    Inconnu:           GREY,
};

export const POPULATION_LABELS = {
    Inconnue:                   GREY,
    '0 à 199 habitants':        COLOR1,
    '200 à 399 habitants':      COLOR2,
    '400 à 999 habitants':      COLOR3,
    '1 000 à 2 000 habitants':  COLOR4,
    '2 000 à 10 000 habitants': COLOR5,
    'Plus de 10 000 habitants': COLOR6,
};

export const URBANITE_LABELS = {
    Inconnu: GREY,
    Urbaine: COLOR6,
    Rurale:  COLOR7,
};

export const CHOMAGE_LABELS = {
    Inconnu:           GREY,
    'Moins de 5%':     COLOR1,
    'Entre 5 et 10%':  COLOR2,
    'Entre 10 et 15%': COLOR5,
    'Plus de 15%':     COLOR6,
};

export const LISTE_LABELS = {
    EXG:            LISTE_EXG,
    PC:             LISTE_PC,
    FG:             LISTE_FG,
    PG:             LISTE_PG,
    PS:             LISTE_PS,
    UG:             LISTE_UG,
    DVG:            LISTE_DVG,
    EELV:           LISTE_EELV,
    MODEM:          LISTE_MODEM,
    UC:             LISTE_UC,
    UDI:            LISTE_UDI,
    DVD:            LISTE_DVD,
    UD:             LISTE_UD,
    UMP:            LISTE_UMP,
    FN:             LISTE_FN,
    EXD:            LISTE_EXD,
    DIV:            LISTE_DIV,
    SE:             LISTE_SE,
    Inconnue:       LISTE_SE,
    'Pas de liste': GREY,
};

export const LISTE_LABELS_FULL = { // TODO Full names
    EXG:   'EXG',
    PC:    'PC',
    FG:    'FG',
    PG:    'PG',
    PS:    'PS',
    UG:    'UG',
    DVG:   'DVG',
    EELV:  'EELV',
    MODEM: 'MODEM',
    UC:    'UC',
    UDI:   'UDI',
    DVD:   'DVD',
    UD:    'UD',
    UMP:   'UMP',
    FN:    'FN',
    EXD:   'EXD',
    DIV:   'DIV',
    SE:    'Sans étiquette',
};

export const TYPE_LABELS = {
    Autre:                            GREY,
    Maire:                            COLOR1,
    'Conseiller/ère départemental-e': COLOR2,
    'Conseiller/ère régional-e':      COLOR3,
    'Maire délégué-e':                COLOR4,
    'Député-e':                       COLOR5,
    'Sénateur/trice':                 COLOR6,
};

const buildRawData = (labels, groups) => Object.keys(labels)
    .map((cat) => ({
        points: groups[cat] || [],
        value:  groups[cat] ? groups[cat].length : 0,
        label:  cat,
    }));

const maxValueInGroups = (groups) => Object.values(groups).reduce(
    (maxValue, group) => (
        group.length > maxValue
        ? group.length
        : maxValue
    ),
    0
);

export const buildGenderData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.sexe
    );

    return {
        data: buildRawData(GENDER_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildCSPData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.csp_name
    );

    return {
        data: buildRawData(CSP_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildAgeData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.age_category
    );

    return {
        data: buildRawData(AGES_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildPopData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.population
    );

    return {
        data: buildRawData(POPULATION_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildUrbaniteData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.urbainite
    );

    return {
        data: buildRawData(URBANITE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildChomageData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.chomage
    );

    return {
        data: buildRawData(CHOMAGE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

export const buildListData = (supporters) => {
    // group then flatten to sort points
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.liste
    );

    const points = flatten(Object.values(groups));

    return {
        data: {
            points,
            labels: CSP_LABELS,
            colors: points.map((s) => listColor(s.data.liste)),
        },
    };
};

export const buildTypeData = (supporters) => {
    const groups = groupBy(
        supporters,
        (supporter) => supporter.data.mandat
    );

    return {
        data: buildRawData(TYPE_LABELS, groups),
        max:  maxValueInGroups(groups),
    };
};

