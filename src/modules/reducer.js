import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  //SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const SecteursFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SELECTED: 'SHOW_SELECTED',
}

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    services: [
        // DEMARRAGE
        { id:1, text: "structure d'entreprise",                situations: ["demarrage"], completed:false },
        { id:2, text: "incorporation",                         situations: ["demarrage"], completed:false },
        { id:3, text: "plan d'affaire",                        situations: ["demarrage"], completed:false },
        { id:4, text: "plan comptable",                        situations: ["demarrage"], completed:false },
        { id:5, text: "prévisions budgétaires",                situations: ["demarrage"], completed:false },
        { id:6, text: "recherche subventions",                 situations: ["demarrage"], completed:false },
        { id:7, text: "financement",                           situations: ["demarrage"], completed:false },
        { id:8, text: "plan de commercialisation",             situations: ["demarrage"], completed:false },

        // COURT TERME
        { id:9,  text: "procédures de fin de mois",             situations: ["court terme"], completed:false },
        { id:10, text: "gestion des RH",                        situations: ["court terme"], completed:false },
        { id:11, text: "comparables budget vs réel",            situations: ["court terme"], completed:false },
        { id:12, text: "analyse des ratios financiers",        situations: ["court terme"], completed:false },
        { id:13, text: "préparation des budgets annuels",       situations: ["court terme"], completed:false },
        //{ id:14, text: "CT14",                                  situations: ["court terme"], completed:false },

        // MOYEN TERME
        { id:15, text: "révision structure financière",         situations: ["moyen terme"], completed:false },
        { id:16, text: "analyse stratégique",                   situations: ["moyen terme"], completed:false },
        { id:17, text: "programme réduction des coûts",         situations: ["moyen terme"], completed:false },
        { id:18, text: "analyse rentabilité & efficacité",      situations: ["moyen terme"], completed:false },
        { id:19, text: "révision de la structure d'entreprise", situations: ["moyen terme"], completed:false },
        { id:20, text: "amélioration des processus continues",  situations: ["moyen terme"], completed:false },
        { id:21, text: "contrôles internes",                    situations: ["moyen terme"], completed:false },
        { id:22, text: "prix de revient",                       situations: ["court terme"], completed:false },

        // EXCELLENCE
        { id:23, text: "planification stratégique",         situations: ["excellence"], completed:false },
        { id:24, text: "plan de relève",                    situations: ["excellence"], completed:false },
        { id:25, text: "tableau de bord (scorecard)",       situations: ["excellence"], completed:false },
        { id:26, text: "analyse de la chaine des valeurs",  situations: ["excellence"], completed:false },
        { id:27, text: "rigueur & discipline",              situations: ["excellence"], completed:false },
        { id:28, text: "plans quinquennaux",                situations: ["excellence"], completed:false },
        
        // REDRESSEMENT
        { id:29, text: "respirateur artificiel",            situations: ["redressement"], completed:false,   tooltip: "accompagnement chez notre syndic de faillite et proposition aux créanciers"},
        { id:30, text: "consolidation de dettes",           situations: ["redressement"], completed:false,   tooltip: "évaluation et maximsation des actifs" },
        { id:31, text: "recherche de nouveaux investisseurs", situations: ["redressement"], completed:false, tooltip: "investisseurs privés, associés" },
        { id:32, text: "réingénierie",                      situations: ["redressement"], completed:false },
        { id:34, text: "plan de revitalisation",            situations: ["redressement"], completed:false },
        { id:35, text: "refinancement",                     situations: ["redressement"], completed:false },

        //{ id:37, text: "R & D",                             situations: ["demarrage","redressement"], completed:false },
    ],
    team: [
        { 
            id:0,
            text: "Pierre Richer",
            desc : "Pierre est le président de notre entreprise. Ceux qui le connaissent vous diront sans hésiter qu'il est un banquier hors-pair et un investisseur aguerri. Pierre a oeuvré dans le domaine bancaire pendant 20 ans et y a gravi les échelons jusqu'à un poste de direction. Il a ensuite occupé un poste de directeur chez Investissement Québec. Ses objectifs et vos objectifs sont les mêmes : atteindre des résultats supérieurs !",
            selected: false 
        },
        { 
            id:1, 
            text: "Guy Boucher",
            desc : "Guy est le vice-président de notre entreprise. Il est surtout reconnu pour ses qualités d'analyste en rendement & redressement et de fiscaliste. Il a acquis beaucoup d'expérience en oeuvrant pour de nombreuses compagnies mais rien n'égale l'expérience acquise en tant que propriétaire-fondateur de sa propre compagnie. Ses objectifs sont de mettre ses qualités et son expérience à votre disposition !",
            selected: false 
        },
    ],
    /*
    cie: {
        name: "data poulamon 2",
        company : "C2",
        email: "E2",
        tel: "T2",
        data: {
            name: "cie",
            company : "companie",
            email: "E2",
            tel: "T2",
        }
    },
    company: [
        {
            data : {
                name: "company",
                company : "",
                email: "",
                tel: ""
            }
        }
    ],*/
    secteurs: [
        {   id:1, text: "Administrations publiques",selected: false},
        {   id:2, text: "Agriculture, foresterie, pêche et chasse", selected: false },
        {   id:3, text: "Arts, spectacles et loisirs", selected: false },
        {   id:4, text: "Autres services (sauf les administrations publiques)", selected: false },
        {   id:5, text: "Commerce de détail", selected: false },
        {   id:6, text: "Commerce de gros", selected: false },
        {   id:7, text: "Construction", selected: false },
        {   id:8, text: "Extraction minière, exploitation en carrière, et extraction de pétrole et de gaz", selected: false },
        {   id:9, text: "Fabrication", selected: false },
        {   id:10,text: "Finance et assurances", selected: false },
        {   id:11,text: "Gestion de sociétés et d’entreprises", selected: false },
        {   id:12,text: "Hébergement et services de restauration", selected: false },
        {   id:13,text: "Industrie de l’information et industrie culturelle", selected: false},
        {   id:14,text: "Services administratifs, services de soutien, services de gestion des déchets et services d’assainissement", selected: false},
        {   id:15, text: "Services d’enseignement", selected: false},
        {   id:16, text: "Services de restauration et débit de boisson", selected: false },
        {   id:17, text: "Services immobiliers et services de location et de location à bail", selected: false },
        {   id:18, text: "Services professionnels, scientifiques et techniques", selected: false },
        {   id:19, text: "Services publics", selected: false },
        {   id:20, text: "Soins de santé et assistance sociale", selected: false },
        {   id:21, text: "Transport et entreposage, transport par camion", selected: false },
    ],
    situations: [
        {   id:1, texte: "Démarrage",text: "Startup",selected: false},
        {   id:2, texte: "Court terme",text: "Short Term", selected: false },
        {   id:3, texte: "Moyen terme",text: "Middle Term", selected: false },
        {   id:4, texte: "Excellence",text: "Excellence", selected: false },
        {   id:5, texte: "Redressement",text: "Re-engineering", selected: false },
    ],
    qualites: [
        {   id:1, text: "Expérience - le consultant externe ajoute sa vaste expérience à notre équipe",selected: false},
        {   id:2, text: "Impartialité - le consultant externe apporte une vue non-biaisée de la situation", selected: false },
        {   id:3, text: "Compétence - le consultant externe possède une expertise que notre entreprise a besoin", selected: false },
        {   id:4, text: "Réseau - mise à profit du réseau de contact du consultant externe", selected: false },
        {   id:5, text: "Confiance - inspirer, insuffler une plus grande confiance à notre équipe", selected: false },
        {   id:6, text: "Confirmation - le consultant externe nous aide à confirmer notre démarche et nos objectifs", selected: false },
        {   id:7, text: "Proximité culturelle et géographique - le consultant externe est conscient de la réalité et des problèmes que nous rencontrons", selected: false },
    ],
    chiffres: [
        { id:1, text: "moins de $100000", selected: false },
        { id:2, text: "entre $100000 et $500000", selected: false },
        { id:3, text: "entre $500000 et $1000000", selected: false },
        { id:4, text: "entre $1,000,000 et $10,000,000", selected: false },
        { id:5, text: "plus de $10,000,000", selected: false },
    ],
    defis: [
        { id:1, text: "augmenter nos ventes", selected: false },
        { id:2, text: "réduire nos coûts", selected: false },
        { id:3, text: "manque de structure", selected: false },
        { id:4, text: "gestion des ressources humaines", selected: false },
        { id:5, text: "manque de planification", selected: false },
        { id:6, text: "manque d'outils", selected: false },
        { id:7, text: "manque de financement", selected: false },
        { id:8, text: "manque de rentabilité et d'efficacité", selected: false },
        { id:9, text: "acquérir des outils d'analyse", selected: false },
        { id:10, text: "acquérir une vision à long terme", selected: false },
        { id:11, text: "procéder à un redressement", selected: false },
    ]
}

const services = ( state = initialState.services, action ) => {
    switch (action.type) {
        case 'ADD_TODO':    
        return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
        ]
        case 'TOGGLE_TODO':
        return state.map(todo =>
            (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
        default:
        return state
    }
}

const team = ( state = initialState.team, action ) => {
    switch (action.type) {
        case 'SELECT':
        return state.map(person =>
            (person.id === action.id)
            ? {...person, selected: !person.selected}
            : person
        )
        case 'CLICK':
        console.log('CLICK');
        return state.map(person =>
            (
                person.id === action.id)
                    ? {...person, selected: !person.selected}
                    : {...person, selected: false} //person
            )
        default:
        return state
    }
}

const situations = ( state = initialState.situations, action ) => {
    switch (action.type) {
        case 'SITUATION_SELECT':
        return state.map(s =>
            (
                s.id === action.id)
                    ? {...s, selected: !s.selected}
                    : {...s, selected: false} //situation
            )
        default:
        return state
    }
}

const secteurs = ( state = initialState.secteurs, action ) => {
    switch (action.type) {
        case 'SECTEUR_SELECT':
        return state.map(secteur =>
            (secteur.id === action.id)
            ? {...secteur, selected: !secteur.selected}
            : secteur
        )
        case 'GET_COUNT':
        return state.map(secteur =>
            (secteur.id === action.id)
            ? {...secteur, selected: !secteur.selected}
            : secteur
        ).length
        default:
        return state
    }
}

const qualites = ( state = initialState.qualites, action ) => {
    switch (action.type) {
        case 'QUALITE_SELECT':
        return state.map(qualite =>
            (qualite.id === action.id)
            ? {...qualite, selected: !qualite.selected}
            : qualite
        )
        default:
        return state
    }
}

const chiffres = ( state = initialState.chiffres, action ) => {
    switch (action.type) {
        case 'CHIFFRE_SELECT':
        return state.map(ca =>
            (
                ca.id === action.id)
                    ? {...ca, selected: !ca.selected}
                    : {...ca, selected: false} //chiffre d'affaire
            )
        default:
        return state
    }
}

const defis = ( state = initialState.defis, action ) => {
    switch (action.type) {
        case 'DEFI_SELECT':
        return state.map(defi =>
            (defi.id === action.id)
            ? {...defi, selected: !defi.selected}
            : defi
        )
        default:
        return state
    }
}

const visibilityFilter = (state = 'SHOW_NONE', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const reducers = combineReducers({
  services,
  visibilityFilter,
  team,
  secteurs,
  situations,
  qualites,
  chiffres,
  defis,
  form: formReducer
})

export default reducers