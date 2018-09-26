import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { createStore } from 'redux';
import { connect } from 'react-redux';
import { combineReducers } from 'redux';

import "./styles/tree.css";

var treeData =
  {
    "name": "CPO",
    "id": 0,
    "desc": "CPO description",
    "children": [
        { 
        "name": "Démarrage",
        "id": 1,
        "desc": "Démarrage description",
        "children": [
            {   "id": 6,
                "name": "structure d'entreprise",
                "desc": "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 7,
                "name": "incorporation",
                "desc": "He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 8,
                "name": "plan d'affaire",
                "desc": "The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. ",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 9,
                "name": "plan comptable",
                "desc": "His room, a proper human room although a little too small, lay peacefully between its four familiar walls.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 10,
                "name": "prévisions budgétaires",
                "desc": "A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 11,
                "name": "recherche subventions",
                "desc": "It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 12,
                "name": "financement",
                "desc": "Gregor then turned to look out the window at the dull weather.",
                "type": "demarrage",
                "selected": false
            },
            {   "id": 13,
                "name": "plan de commercialisation",
                "desc": "Drops of rain could be heard hitting the pane, which made him feel quite sad.",
                "type": "demarrage",
                "selected": false
            },
        ]
        },
        { "name": "Court terme",
            "id": 2,
            "children": [
                { "id": 14,"name": "procédures de fin de mois", "desc": "procédures de fin de mois description",
                "selected": false},
                { "id": 15,"name": "gestion des RH", "desc": "gestion RH description",
                "selected": false},
                { "id": 16,"name": "comparables budget vs réel", "desc": "comparables budget vs réeldescription",
                "selected": false },
                { "id": 17,"name": "analyse des ratios financiers", "desc": "analyse des ratios financiers description",
                "selected": false},
                { "id": 18,"name": "préparation des budgets annuels", "desc": "préparation des budgets annuels description",
                "selected": false}
            ]
        },
      { "name": "Moyen terme" ,
        "id": 3,
        "children": [
            { "id": 19,"name": "révision structure financière",
            "selected": false },
            { "id": 20,"name": "analyse stratégique",
            "selected": false },
            { "id": 21,"name": "programme réduction des coûts",
            "selected": false },
            { "id": 22,"name": "analyse rentabilité & efficacité",
            "selected": false },
            { "id": 23,"name": "révision de la structure d'entreprise",
            "selected": false },
            { "id": 24,"name": "amélioration des processus continues",
            "selected": false },
            { "id": 25,"name": "contrôles internes",
            "selected": false },
            { "id": 26,"name": "prix de revient",
            "selected": false }
        ]
        },
      { "name": "Excellence" ,
        "id": 4,
        "children": [
            { "id": 27,"name": "planification stratégique",
            "selected": false },
            { "id": 28,"name": "plan de relève",
            "selected": false },
            { "id": 29,"name": "tableau de bord (scorecard)",
            "selected": false },
            { "id": 30,"name": "analyse de la chaine des valeurs",
            "selected": false },
            { "id": 31,"name": "rigueur & discipline",
            "selected": false },
            { "id": 32,"name": "plans quinquennaux",
            "selected": false },
        ]
        },
      { "name": "Redressement" ,
        "id": 5,
        "children": [
            { "id": 33,"name": "respirateur artificiel",
            "selected": false },
            { "id": 34,"name": "consolidation de dettes",
            "selected": false },
            { "id": 35,"name": "recherche de nouveaux investisseurs",
            "selected": false },
            { "id": 36,"name": "réingénierie",
            "selected": false },
            { "id": 37,"name": "plan de revitalisation",
            "selected": false },
            { "id": 38,"name": "refinancement",
            "selected": false },
        ]
        },
    ]
};

var cpo = [
    { id:1, name: "structure d'entreprise",                type: "demarrage", selected:false },
    { id:2, name: "incorporation",                         type: "demarrage", selected:false },
    { id:3,  name: "procédures de fin de mois",            type: "court terme", selected:false },
    { id:4, name: "gestion des RH",                        type: "court terme", selected:false },
    { id:5, name: "révision structure financière",         type: "moyen terme", selected:false },
    { id:6, name: "analyse stratégique",                   type: "moyen terme", selected:false },
    { id:7, name: "planification stratégique",             type: "excellence", selected:false },
    { id:8, name: "plan de relève",                        type: "excellence", selected:false },
    { id:9, name: "tableau de bord (scorecard)",           type: "excellence", selected:false },
    { id:10, name: "respirateur artificiel",               type: "redressement", selected:false },
    { id:11, name: "consolidation de dettes",              type: "redressement", selected:false },
];

/* ACTION */
const toggleService = id => {
    return {
        type: 'TOGGLE_SERVICE',
        id
    }
}
/* ACTION */

/* PRESENTATION */
    const Item = ({ onClick, selected, name }) => 
    (
        <li
        onClick={onClick}
        style={{
            listStyleType: 'none',
            padding: 10,
            margin: 3,
            borderRadius: 10,
            color: selected ? 'white' : 'black',
            backgroundColor: selected ? 'rgb(116,184,33)' : 'rgba(255,255,255,1)',
            //border: selected ? '2px solid rgb(116,184,33)' : '2px solid gray',
            fontSize: '16px',
            fontWeight: 600,
            flexGrow: 1
        }}
        >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><i className={selected ? `fas fa-check-square fa-1x` : `far fa-square fa-1x`}></i></div>
            <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{name}</span>
            <span> </span>
        </div>
        </li>
    )
    Item.propTypes = {
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
    }

    const List = ({ services, onServiceClick, langue }) => {
        if (services.length === 0) {
            return (
                <div className="item-presentation-li">
                    <div style={{margin:'0px',padding:'0px'}}>
                        <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                        <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                            {(langue) ? "Aucun service sélectionné" : "No services selected"}
                        </span>
                    </div>
                </div>
                )
        }
        return (
            <ul style={{display:'flex',flexWrap: 'wrap',width:'100%',padding:10}}>
                {services.map(service => (
                    <Item key={service.id} {...service} name={service.name} onClick={() => onServiceClick(service.id)} />
                ))}
            </ul>
        )
    }
    
    List.propTypes = {
        services: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                selected: PropTypes.bool.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired
        ).isRequired,
        langue: PropTypes.bool.isRequired,
        onServiceClick: PropTypes.func.isRequired
    }
/* PRESENTATION */

/* CONTAINER CPOServices */ 
    const getVisibleServices = (svcs, filter) => {
        //console.log(getVisibleServices)
        switch (filter) {
        case 'SHOW_SELECTED':
            return svcs.filter(t => t.selected)
        case 'SHOW_DEMARRAGE':
            return svcs.filter( t => (t.type === 'demarrage') )
        case 'SHOW_COURTTERME':
            return svcs.filter( t => (t.type === 'court terme') )
        case 'SHOW_MOYENTERME':
            return svcs.filter( t => (t.type === 'moyen terme') )
        case 'SHOW_EXCELLENCE':
            return svcs.filter(t => (t.type === 'excellence') )
        case 'SHOW_REDRESSEMENT':
            return svcs.filter(t => (t.type === 'redressement') )
        case 'SHOW_NONE':
            return [];
        case 'SHOW_ALL':
        default:
            return svcs
        }
    }
    
    const mapStateToProps = (state, ownProps) => {
        return { services: getVisibleServices(state.services, ownProps.filter) }
        // return all services
        //return { services: state.services }
    }
     
    const mapDispatchToProps = dispatch => {
        return {
            onServiceClick: id => {
                dispatch(toggleService(id))
            }
        }
    }

    const CPOServices = connect(
        mapStateToProps,
        mapDispatchToProps
    )(List)
/* CONTAINER CPOServices */

const reducers = combineReducers({
    services2,
    cpo
})

// deep cloning function excerpted from underscore.js
function snapshot (obj) {
  if(obj == null || typeof(obj) != 'object') {
    return obj;
  }
  var temp = new obj.constructor();
  for(var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = snapshot(obj[key]);
    }
  }
  return temp;
}; 

function getFinalNodes(node, array = []) {
    if (!node.children) {
        //console.log(node.name)
        array.push(node)
        return;
    }
    node.children.forEach(function(element) {
        if (node.children) getFinalNodes(element, array);
    }, this);
    return array;
}

/*const initialstate = { counter:0 };*/

function services2(_state = getFinalNodes(treeData), action = null) {
    let state = snapshot(_state); // snapshot == clone
    switch (action.type) {
        case 'TOGGLE_SERVICE':
            console.log('TOGGLE_SERVICE');
            return state.map(service =>
                (service.id === action.id)
                    ? {...service, selected: !service.selected}
                    : service
            )
        default:
            return _state;
    }
}

/*function counter(_state = initialstate, action = null) {
  let state = snapshot(_state); // snapshot == clone
  switch (action.type) {
  case 'INCREMENT':
    state.counter ++;
    return state;
  case 'DECREMENT':
    state.counter --;
    return state;
  default:
    return _state;
  }
}*/

class Tree2 extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            counter: 0,
            services: null,
            store: null,
        };
    }

    componentDidMount() {

        //let store = createStore(services);
        const store = createStore(reducers);

        /*store.subscribe(() => {
            console.log('componentDidMount:store.subscribe');
            var state = store.getState();
            this.setState({services:state.services});
        });*/

        this.setState({services:getFinalNodes(treeData)});

        console.log('store',store.getState());
        console.log('nodes',cpo);

    }

    increment = () => {
        const {store} = this.state;
        //store.dispatch({ type:'INCREMENT' });
    };

    decrement = () => {
        const {store} = this.state;
        //store.dispatch({ type:'DECREMENT' });
    };

    /*componentWillMount() {
        d3.csv("flare.csv", function(error, data) {
            //if (error) throw error;
            //this.setState({flare:data});
        })
        .catch(error => {
            console.log('err', error);
          })
        .then((data) => {
            //console.log('response',response);
            this.setState({flare:data})
        })
    }

    componentDidUpdate() {

        console.log('componentDidMount');

        const {langue} = this.props;

        const titre = langue === 'FR' 
            ? "Les connaître et les comprendre!"
            : "Know and understand them!";

        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var margin = {top: 20, right: 120, bottom: 20, left: 120};
        var padding = 100,
            width = this.props.width - padding - padding,
            height = this.props.height - padding - padding;

        const svg = d3.select(this.refs.anchor);

        var group = svg.append("g");
        
        svg.attr("transform", "translate(" + padding + "," + padding + ")");
        group.attr("transform", "translate(" + 0 + "," + 30 + ")");

        var tree = d3.cluster()
            .size([height, width - 160]);
    
        var stratify = d3.stratify()
            .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
    
        var root = stratify(this.state.flare)
            .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });
    
        tree(root);
    
        var link = group.selectAll(".link")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.parent.y + 100) + "," + d.x
                    + " " + (d.parent.y + 100) + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });
    
        var node = group.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    
        node.append("circle")
          .attr("r", 2.5);
    
        node.append("text")
          .attr("dy", 3)
          .attr("x", function(d) { return d.children ? -8 : 8; })
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });

    }*/

    render() {

        const {store, counter, services} = this.state;

        if ( !services ) return null;

        return (

            <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>

                <h2 style={{display:'flex',fontSize:35, justifyContent:'center',marginTop:50}}>
                    Tree 2
                </h2>

                <div style={{fontSize:30}}>
                    Counter: <span>{counter}</span>
                </div>

                <CPOServices langue={true} filter={'SHOW_ALL'}/>

                <CPOServices langue={true} filter={'SHOW_SELECTED'}/>

                <span>
                    <button onClick={this.increment} style={{fontSize:20,margin:2}}>Increment</button>
                    <button onClick={this.decrement} style={{fontSize:20,margin:2}}>Decrement</button>
                </span>

            </div>

        )      
    } 
}

export default Tree2;

/*
<ul style={{display:'flex',flexWrap: 'wrap',width:'50%',padding:10}}>
    {services.map(service => (
        <Item key={service.id} {...service} />
        
    ))}
</ul>
*/