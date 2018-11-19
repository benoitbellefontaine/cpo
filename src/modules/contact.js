import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';

// redux
import { connect } from 'react-redux';
import store from '../index';

// animation
import { Motion, StaggeredMotion, spring } from 'react-motion';

// D3 for color
import * as d3 from 'd3';

import pr from './images/PierreRicher.jpg';
import gb from './images/GuyBoucher.jpg';

// comm
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import './styles/contact.css';

// styles
import {Button,Modal,OverlayTrigger,Tooltip,Popover} from 'react-bootstrap';
import {FieldGroup,FormGroup,FormControl,ControlLabel,HelpBlock} from 'react-bootstrap';
import {Tab,Tabs,Alert} from 'react-bootstrap';
import {Row,Col,Nav,NavItem} from 'react-bootstrap';

const patternEmail = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
const patternTel = "[0-9]{3}-[0-9]{3}-[0-9]{4}";

/* MAIL */
/*
var helper = require('sendgrid').mail;
var from_email = new helper.Email('noreply@example.com');
var to_email = new helper.Email('consultantspmeoutaouais@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});
*/

/* react motion */
    /* ------------ SPRING ------------ */
    const startY = 25;
    const startOpacity = 0;

    // Lower damping and stiffness here will exaggerate the 
    // Start of the sequence of animations
    const initialStiffness = 400;
    const initialDamping = 60;

    // Lower damping and stiffness here will exaggerate the 
    // End of the sequence of animations
    const finalStiffness = 400; 
    const finalDamping = 60;

    const springConfig = {stiffness: 400, damping: 60};
    /* -------------------------------- */
/* react motion */

//const childButtonIcons = ['rocket','low-vision','eye','trophy','sync-alt','servicestack','pencil','bell','comment','bolt', 'ban', 'code'];

const images = [pr,gb];

var color = d3.scaleOrdinal(d3.schemeCategory10);

const NavigationLink = ({ filter, color, width, fontWeight, children }) => (
    <NavLink
        className='servicesNavLink'
        style={{color:color, width:width, fontWeight:fontWeight}}
        to={filter === 'SHOW_ALL' ? '/' : `/${ filter }`}
        >
        {children}
    </NavLink>
)

/* action */
    const toggleTodo = id => {
        return {
        type: 'TOGGLE_TODO',
        id
        }
    }
    const secteurSelect = id => {
        return {
        type: 'ACTIVITY_SELECT',
        id
        }
    }
    const chiffreSelect = id => {
        return {
        type: 'CHIFFRE_SELECT',
        id
        }
    }
    const defiSelect = id => {
        return {
        type: 'DEFI_SELECT',
        id
        }
    }
    const select = id => {
        return {
        type: 'SELECT',
        id
        }
    }
    const situationSelect = id => {
        return {
            type: 'SITUATION_SELECT',
            id
        }
    }
    const qualiteSelect = id => {
        return {
            type: 'QUALITE_SELECT',
            id
        }
    }
/* action */

/* presentation */

    /* TEAM presentation */
        const ItemTeam = ({ onClick, selected, text, id }) => (
            <li
            onClick={onClick}
            style={ {
                fontWeight: 700,
                listStyleType: 'none',
                padding: 5,
                margin: 2,
                borderRadius: 10,
                color: selected ? 'white' : 'gray',
                backgroundColor: selected ? 'rgb(116,184,33)' : 'rgb(250,250,255)',
                border: selected ? '1px solid rgb(116,184,33)' : '1px solid gray',
            }}
            >
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'50%'}}>
                    <img style={{borderRadius:50,width:100}} src={images[id]}/>
                </span>
                <span style={{marginLeft:5}}>{text}</span>
            </div>
            </li>
        )
        ItemTeam.propTypes = {
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const ListTeam = ({ team, onTodoClick }) => (
            <ul style={{display:'flex',justifyContent:'center',width:'100%'}}>
                    {team.map(todo => (
                        <ItemTeam key={todo.id} id={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
                    ))}
            </ul>
        )
        ListTeam.propTypes = {
            team: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* TEAM presentation */

    /* SECTEURS presentation */
        const ActivityItem = ({ selected, text, id }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : color[Math.floor(Math.random()*10)],
                }}
                >
                <div>
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        ActivityItem.propTypes = {
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const AList = ({ secteurs, langue }) => {
            if (secteurs.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'100%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Il n'y a pas de réponse" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
            <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:0,padding:10}}>
                {secteurs.map(activity => (
                    <ActivityItem key={activity.id} {...activity} />
                ))}
            </ul>
        )}

        AList.propTypes = {
            secteurs: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            langue: PropTypes.bool.isRequired
            //onTodoClick: PropTypes.func.isRequired
        }
    /* SECTEURS presentation */

    /* CHIFFRE presentation */
        const ChiffreItem = ({ onClick, selected, text, id }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : color[Math.floor(Math.random()*10)],
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-circle fa-2x` : `far fa-circle fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        ChiffreItem.propTypes = {
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }
        const CList = ({ chiffres, langue }) => {
            if (chiffres.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Aucun service sélectionné" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
            <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:0,padding:10}}>
                {chiffres.map(chiffre => (
                    <ChiffreItem key={chiffre.id} {...chiffre} />
                ))}
            </ul>
        )}
        CList.propTypes = {
            chiffres: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            langue: PropTypes.bool.isRequired
            //onTodoClick: PropTypes.func.isRequired
        }
    /* CHIFFRE presentation */

    /* DEFI presentation */
        const DefiItem = ({ onClick, selected, text, id }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : color[Math.floor(Math.random()*10)],
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        DefiItem.propTypes = {
            //onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const DList = ({ defis, langue }) => {
            if (defis.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Aucun service sélectionné" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:0,padding:10}}>
                    {defis.map(defi => (
                        <DefiItem key={defi.id} {...defi} />
                    ))}
                </ul>
        )}
        
        DList.propTypes = {
            //questionId: PropTypes.number,
            defis: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            //onTodoClick: PropTypes.func.isRequired
        }
    /* DEFI presentation */

    /* SERVICE presentation */
        const Item = ({ onClick, selected, name, color }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? color : color[Math.floor(Math.random()*10)],
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{name}</span>
                    <span> </span>
                </div>
            </li>
        )
        Item.propTypes = {
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
        }

        const List = ({ todos, onTodoClick, langue }) => {
            if (todos.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Aucun service sélectionné" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
                <ul style={{display:'flex',flexWrap:'wrap',width:'100%',padding:10,margin:0}}>
                    {todos.map(todo => (
                        <Item key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
                    ))}
                </ul>
        )}
        
        List.propTypes = {
            todos: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    completed: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            langue: PropTypes.bool.isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* SERVICE presentation */

    /* QUALITE presentation */
        const QualiteItem = ({ onClick, selected, text, id }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : color[Math.floor(Math.random()*10)],
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        QualiteItem.propTypes = {
            //onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const QList = ({ qualites, langue }) => {
            if (qualites.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Aucun service sélectionné" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:0,padding:10}}>
                    {qualites.map(q => (
                        <QualiteItem key={q.id} {...q} />
                    ))}
                </ul>
        )}
        QList.propTypes = {
            qualites: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            langue: PropTypes.bool.isRequired,
            //onTodoClick: PropTypes.func.isRequired
        }
    /* QUALITE presentation */

    /* SITUATION presentation */
        const SituationItem = ({ onClick, selected, text, id }) => (
            <li className="item-presentation-li"
                style={{
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : color[Math.floor(Math.random()*10)],
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-circle fa-2x` : `far fa-circle fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        SituationItem.propTypes = {
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const SList = ({ situations, onTodoClick, questionId, langue }) => {
            if (situations.length === 0)
                return (
                    <div className="item-presentation-li">
                            <div style={{margin:'0px',padding:'0px'}}>
                                <div><i className={`fas fa-times-circle fa-2x`}></i></div>
                                <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>
                                    {(langue) ? "Aucun service sélectionné" : "No services selected"}
                                </span>
                                <span> </span>
                            </div>
                    </div>)
            return (
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:0,padding:10}}>
                    {situations.map(situation => (
                        <SituationItem key={situation.id} {...situation} />
                    ))}
                </ul>
        )}
        
        SList.propTypes = {
            situations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            langue: PropTypes.string.isRequired
        }
    /* SITUATION presentation */

/* end presentation */

/* container 1 : TeamList */
  const getVisibleTodosTeam = (team, filter) => {
      //console.log('getVisibleTodosTeam');
      switch (filter) {
        case 'SELECTED':
          return team.filter(t => t.selected)
        case 'SHOW_ACTIVE':
          return team.filter(t => t.selected)
        case 'SHOW_NONE':
          return [];
        case 'SHOW_ALL':
        default:
          return team
      }
  }
    
  const mapStateToPropsTeam = state => {
    return {
        team: state.team //getVisibleTodosTeam(state.team, 'SELECTED')
    }
  }
     
  const mapDispatchToPropsTeam = dispatch => {
      return {
          onTodoClick: id => {
            dispatch( select(id) )
          }
      }
  }
     
  const TeamList = connect(
      mapStateToPropsTeam,
      mapDispatchToPropsTeam
  )(ListTeam)
/* container 1 : TeamList */

/* container 2 : ContainerServices */
  const getVisibleTodos = (todos, filter) => {
      switch (filter) {
        case 'SHOW_SELECTED':
          return todos.filter(t => t.selected)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.selected)
        case 'SHOW_NONE':
          return [];
        case 'SHOW_ALL':
        default:
          return todos
      }
  }
    
  const mapStateToProps = state => {
      return {
          todos: getVisibleTodos(state.serviceApp, 'SHOW_SELECTED')
      }
  }
     
  const mapDispatchToProps = dispatch => {
      return {
          onTodoClick: id => {
            dispatch(toggleTodo(id))
          }
      }
  }
     
  const ContainerServices = connect(
      mapStateToProps,
      mapDispatchToProps 
  )(List)
/* container 2 : ContainerServices */

/* container 3 : ContainerDefis */
    const getVisibleTodosDefi = (defis, filter) => {
        switch (filter) {
        case 'SHOW_SELECTED':
            return defis.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
            return defis
        }
    }
     
    const mapStateToPropsDefi = (state, ownProps) => {
        return {
            defis: getVisibleTodosDefi(state.defis, ownProps.filter)
        }
    }
     
    const mapDispatchToPropsDefi = dispatch => {
        return {
            onTodoClick: id => {
                dispatch(defiSelect(id));
            }
        }
    }
    
    const ContainerDefis = connect(
        mapStateToPropsDefi,
        //mapDispatchToPropsDefi
    )(DList)

/* container 3 : ContainerDefis */

/* container 3 : ContainerSecteurs */
    const getVisibleSecteurs = (secteurs, filter) => {
        switch (filter) {
        case 'SHOW_SELECTED':
            return secteurs.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
            return secteurs
        }
    }
     
    const mapStateToPropsSecteur = (state, ownProps) => {
        return {
            secteurs: getVisibleSecteurs(state.secteurs, ownProps.filter)
        }
    }
     
    /*const mapDispatchToPropsSecteur = dispatch => {
        return {
            onTodoClick: id => {
                dispatch(secteurSelect(id));
            }
        }
    }*/
    
    const ContainerSecteurs = connect(mapStateToPropsSecteur)(AList)

/* container 3 : ContainerSecteurs */

/* container 4 : ContainerChiffre */
  const getVisibleTodosChiffres = (chiffres, filter) => {
      switch (filter) {
        case 'SHOW_SELECTED':
          return chiffres.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
          return chiffres
      }
  }
     
  const mapStateToPropsChiffres = (state, ownProps) => {
      return {
        chiffres: getVisibleTodosChiffres(state.chiffres, ownProps.filter)
      }
  }
     
  const mapDispatchToPropsChiffres = dispatch => {
      return {
        onTodoClick: id => {
          dispatch(chiffreSelect(id));
        }
      }
  }
     
  const ContainerChiffre = connect(
      mapStateToPropsChiffres,
      //mapDispatchToPropsChiffres
  )(CList)

/* container 4 : ContainerChiffre */

/* container 3 : ContainerQualites */
    const getVisibleTodosQualite = (qualites, filter) => {
        switch (filter) {
        case 'SHOW_SELECTED':
            return qualites.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
            return qualites
        }
    }
    const mapStateToPropsQualite = (state, ownProps) => {
        return {
            qualites: getVisibleTodosQualite(state.qualites, ownProps.filter)
        }
    }
    const mapDispatchToPropsQualite = dispatch => {
        return {
            onTodoClick: id => {
                dispatch(qualiteSelect(id));
            }
        }
    }
    const ContainerQualites = connect(
        mapStateToPropsQualite,
        //mapDispatchToPropsQualite
    )(QList)

/* container 3 : ContainerQualites */

/* container 5 : ContainerSituation */
    const getVisibleTodosSituation = (situations, filter) => {
        switch (filter) {
        case 'SHOW_SELECTED':
            return situations.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
            return situations
        }
    }
    const mapStateToPropsSituation = (state, ownProps) => {
        //console.log('getVisibleTodosSituation(state.situations, ownProps.filter)',getVisibleTodosSituation(state.situations, ownProps.filter))
        return {
            situations: getVisibleTodosSituation(state.situations, ownProps.filter)
        }
    }
    const mapDispatchToPropsSituation = dispatch => {
        return {
            onTodoClick: id => {
                dispatch(situationSelect(id));
            }
        }
    }
    const ContainerSituation = connect(
        mapStateToPropsSituation,
        //mapDispatchToPropsSituation
        //getSituationData
    )(SList)

/* container 5 : ContainerSituation */

const innerWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}

const DELAY = 1500;

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [], 
            name:'Benoit', 
            email: 'benoit.bellefontaine@gmail.com', 
            tel: '999-999-9999',
            message: 'Commentaires',
            qa: [],
            callback: "not fired",
            services : [], secteurs : [], qualites : [], chiffre : [],cycle : [], defis : [],
            //value: "",
            load: false,
            datastatus: null,
            showAlert: false,
        };

        this.handleMailSubmitLocalServer = this.handleMailSubmitLocalServer.bind(this);
        //this.handleMailSubmitHeroku = this.handleMailSubmitHeroku.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeTel = this.handleChangeTel.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
        this.getValidationStateName = this.getValidationStateName.bind(this);
        this.getValidationStateEmail = this.getValidationStateEmail.bind(this);
        this.getValidationStateTel = this.getValidationStateTel.bind(this);
        this.getValidationStateMsg = this.getValidationStateMsg.bind(this);
        this._reCaptchaRef = React.createRef();

    }

    /*
        componentDidMount() {
            console.log('contact::componentDidMount()');
            //const script = document.getElementById("captcha");
            //document.head.removeChild(script);
            //$script("https://www.google.com/recaptcha/api.js", "recaptcha");
            const script = document.createElement("script");
            //script.id = "captcha";
            script.src = "https://www.google.com/recaptcha/api.js";
            script.async = true;
            document.body.appendChild(script);
            console.log('script',script);
        }

        componenWillUnmount() {
            console.log('contact::componenWillUnmount()');
            const script = document.getElementById("captcha");
            console.log('script',script);
            document.body.removeChild(script);
        }
    */

    componentDidMount() {
        setTimeout(() => {
        this.setState({ load: true });
        }, DELAY);
        console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
    }

    /* Validation */
        getValidationStateName() {
            const length = this.state.name.length;
            if (length > 2) return 'success';
            //else if (length > 5) return 'warning';
            else if (length > 0) return 'error';
            return null;
        }

        handleChangeName(e) {
            this.setState({ name: e.target.value });
        }

        getValidationStateEmail() {
            const length = this.state.email.length;
            const str = this.state.email;
            //if (length > 2) return 'success';
            if (str.match(patternEmail)) return 'success';
            else if (length > 0) return 'error';
            return null;
        }

        handleChangeEmail(e) {
            this.setState({ email: e.target.value });
        }

        getValidationStateTel() {
            const length = this.state.tel.length;
            const str = this.state.tel;
            //if (length > 2) return 'success';
            if (str.match(patternTel)) return 'success';
            else if (length > 0) return 'error';
            return null;
        }

        handleChangeTel(e) {
            this.setState({ tel: e.target.value });
        }

        getValidationStateMsg() {
            return 'success';
        }

        handleChangeMsg(e) {
            this.setState({ message: e.target.value });
        }
    /**/
    
    /*handleMailSubmitHeroku(comment){
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY); 
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
    }*/

    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ value });
    };

    /*onSubmit = () => { 
        const recaptchaValue = this._reCaptchaRef.getValue();
        this.props.onSubmit(recaptchaValue);
    }*/

    handleMailSubmitLocalServer() {

        const {services, secteurs, qualites, chiffre ,cycle, defis} = this.state;
        
        /*
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('noreply@example.com');
        var to_email = new helper.Email('consultantspmeoutaouais@gmail.com');
        var subject = 'Hello World from the SendGrid Node.js Library!';
        var content = new helper.Content('text/plain', 'Hello, Email!');
        var mail = new helper.Mail(from_email, subject, to_email, content);
        */
        
        let svcs = [], sctrs = [], qlts = [], chffr = [],ccl= [], dfs= [];
        let servicesT = '',secteursT = '',qualitesT = '',chiffreT = '',cycleT = '',defisT = '';

        store.getState().services.map(
            (service) => { 
                if (service.completed) svcs.push(service.text);
                if (service.completed) servicesT += service.text + ', ';
            }
        )

        store.getState().secteurs.map(
            (secteur) => { 
                if (secteur.selected) sctrs.push(secteur.text);
                if (secteur.selected) secteursT += secteur.text + ', ';
            }
        )

        store.getState().situations.map(
            (situation) => { 
                if (situation.selected) ccl.push(situation.text);
                if (situation.selected) cycleT += situation.text + ', ';
            }
        )
        store.getState().chiffres.map(
            (c) => { 
                if (c.selected) chffr.push(c.text);
                if (c.selected) chiffreT += c.text + ', ';
            }
        )
        store.getState().qualites.map(
            (q) => { 
                if (q.selected) qlts.push(q.text);
                if (q.selected) qualitesT += q.text + ', ';
            }
        )
        store.getState().defis.map(
            (d) => { 
                if (d.selected) dfs.push(d.text);
                if (d.selected) defisT += d.text + ', ';
            }
        )

        this.setState({services:svcs,secteurs:sctrs,qualites:qlts,defis:defis,chiffre:chffr,});

        console.log( 'services', servicesT );
        console.log( 'services - store', store.getState().services );

        var qa = [
            {q:'services',a: servicesT},
            {q:'secteurs',a: secteursT},
            {q:'qualites',a: qualitesT},
            {q:'chiffre',a: chiffreT},
            {q:'cycle',a: cycleT},
            {q:'défis',a: defisT},
        ];

        //const captcha = document.querySelector('#g-recaptcha-response').value;
        //const recaptchaValue = this._reCaptchaRef.getValue();

        //qa.push("<ContainerSituation filter={'SHOW_SELECTED'}/>");
        //console.log( 'ContainerSituation2', <ContainerSituation2 filter={'SHOW_SELECTED'} /> )
        axios.post(
            `http://localhost:3001/api/mail`,
            {
                id:     Date.now(), 
                name:   this.state.name, 
                tel:    this.state.tel, 
                email:  this.state.email, 
                text:   this.state.message, 
                qa:     qa,
                captcha:this.state.value
            },
            {
                headers:{
                    'Accept':'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            },
        )
        .catch(err => {
            console.log('err', err);
            //this.setState({data: comments});
          })
        //.then((res) => res.json())
        .then((response) => {
            console.log('response',response);
            this.setState({datastatus:response.data.success,showAlert:true})
        })
    }

    render() {
        
        const {langue} = this.props;

        const {width,height} = this.props;
        const viewbox = "0 0 " + width + " " + height;

        const fraLienServices = "Visitez notre page Services pour ajouter ou retrancher des services";
        const angLienServices = "Visit our Services page to add or remove services";

        return (
            <div>

                <h2 style={{display:'flex',fontSize:35, justifyContent:'center',marginTop:50}}>
                    {(langue === 'FR') ? "Nous joindre" : "Contact"}
                </h2>
                
                <StaggeredMotion
                    defaultStyles={[
                        // Add more items here for more dots
                        { y: startY, o: startOpacity }
                    ]}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                        return i === 0
                        // Initial stiffness and damping
                        ? { y: spring(0, { stiffness: initialStiffness, damping: initialDamping }), o: spring(1) }
                        // Final stiffness and damping 
                        : { 
                            y: spring(prevInterpolatedStyles[i - 1].y, { stiffness: finalStiffness, damping: finalDamping }),
                            o: spring(prevInterpolatedStyles[i - 1].o)
                        };
                    })}
                    >
                    {interpolatingStyles =>
                        <div style={innerWrapperStyles}>
                            {interpolatingStyles.map((style, index) => {
                                switch (index) {
                                    case 0: return ( // TITLE
                                        
                                        <div key={0}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '50vw',
                                                minWidth:'344px',
                                                margin: '5vh auto',
                                                //border: '1px solid black',
                                                padding: 20,
                                                boxShadow: '1px 1px 3px rgba(0,0,0,0.2), -1px -1px 3px rgba(0,0,0,0.2)',
                                                boxSizing: 'border-box',
                                                backgroundColor: "rgba(173, 216, 230,1)",//'lightblue',
                                                opacity: style.o,
                                                WebkitTransform: `translate3d(0, ${style.y}px, 0)`, 
                                                transform: `translate3d(0, ${style.y}px, 0)`
                                            }}>
                                               <Tab.Container className="contact-tabs" id="left-tabs-example" defaultActiveKey="first" style={{padding:15}}>
                                                    <Row>
                            
                                                        <Nav bsStyle="tabs" style={{display:'flex',width:'100%'}} justified>
                                                            <NavItem eventKey="first" style={{width:'33%',textAlign:"center",color:'black',fontSize:'100%'}}>Services</NavItem>
                                                            <NavItem eventKey="second" style={{width:'34%',textAlign:"center",color:'black',fontSize:'100%'}}>Questions</NavItem>
                                                            <NavItem eventKey="third" style={{width:'33%',textAlign:"center",color:'black',fontSize:'100%'}}>{(langue === 'FR') ? "Envoi" : "Send"}</NavItem>
                                                        </Nav>
                                                        <Tab.Content animation>
                                                            <Tab.Pane eventKey="first">
                                                                <div><h4 style={{textAlign:'center',padding:'10px',textTransform:'uppercase',color:'black', fontSize:'2vw'}}>
                                                                    {(langue === 'FR') ? "Voici les services dont vous pourriez avoir besoin" : "Some of the services you could use"}</h4></div>
                                                                <div style={{ display:'flex', width: '100%',justifyContent:'center',alignItems:'flex-start',
                                                                    borderBottom:'1px solid lightgray', backgroundColor:'rgb(250,250,255)'}}>
                                                                    <ContainerServices filter={'SHOW_COMPLETED'}/>
                                                                </div>
                                                                <div style={{ display:'flex', width: '100%',justifyContent:'center',alignItems:'center',
                                                                    textAlign:'center',borderBottom:'1px solid lightgray', fontSize:'16px', color:'black',
                                                                    backgroundColor:'rgb(250,250,255)',textTransform:'uppercase'}}>
                                                                    <NavigationLink width={'70%'} fontWeight={'800'} color={'rgb(54, 117, 136)'} filter={'services'}>
                                                                        {(langue === 'FR') ? fraLienServices : angLienServices}
                                                                    </NavigationLink>
                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="second">
                                                                <div>
                                                                    <div className="titre-section">
                                                                        <h4>
                                                                            Votre secteur d'activité
                                                                        </h4>
                                                                    </div>
                                                                    <div className="sous-section">
                                                                        <ContainerSecteurs filter={'SHOW_SELECTED'} langue={this.props.langue === "FR"}/>
                                                                    </div>

                                                                    <div className="titre-section">
                                                                        <h4>
                                                                            Les qualités du consultant
                                                                        </h4>
                                                                    </div>
                                                                    <div className="sous-section">
                                                                        <ContainerQualites filter={'SHOW_SELECTED'} langue={this.props.langue === "FR"}/>
                                                                    </div>

                                                                    <div className="titre-section">
                                                                        <h4>
                                                                            Votre chiffre d'affaire
                                                                        </h4>
                                                                    </div>
                                                                    <div className="sous-section">
                                                                        <ContainerChiffre filter={'SHOW_SELECTED'} langue={this.props.langue === "FR"}/>
                                                                    </div>

                                                                    <div className="titre-section">
                                                                        <h4>
                                                                            Votre cycle de vie
                                                                        </h4>
                                                                    </div>
                                                                    <div className="sous-section">
                                                                        <ContainerSituation filter={'SHOW_SELECTED'} langue={this.props.langue === "FR"}/>
                                                                    </div>

                                                                    <div className="titre-section">
                                                                        <h4>
                                                                            Vos défis
                                                                        </h4>
                                                                    </div>
                                                                    <div className="sous-section">
                                                                        <ContainerDefis filter={'SHOW_SELECTED'} langue={this.props.langue === "FR"}/>
                                                                    </div>

                                                                    <div style={{ display:'flex', width: '100%',justifyContent:'center',alignItems:'center',
                                                                        textAlign:'center',borderBottom:'1px solid lightgray',
                                                                        backgroundColor:'rgb(250,250,255)', borderRight:'0px solid lightgray', fontSize:'16px'}}>
                                                                        <NavigationLink width={'70%'} fontWeight={'800'} color={'rgb(54, 117, 136)'} filter={'quiz'}>
                                                                            {(langue === 'FR') ? "Cliquer ici pour répondre ou retourner aux cinq questions fondamentales!" : "Click here to access the questionaire form!"}
                                                                        </NavigationLink>
                                                                    </div>

                                                                </div>                                  
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="third">
                                                                <br />
                                                                <form style={{display:'flex',flexDirection:'column',width:'100%'}}>

                                                                    <FormGroup
                                                                        controlId="formBasicText"
                                                                        validationState={ this.getValidationStateName() }
                                                                        >
                                                                        <FormControl
                                                                            type="text"
                                                                            value={this.state.name}
                                                                            placeholder="nom"
                                                                            onChange={this.handleChangeName}
                                                                        />
                                                                        <FormControl.Feedback />
                                                                    </FormGroup>
                                                                    <FormGroup
                                                                        controlId="formBasicText"
                                                                        validationState={this.getValidationStateEmail()}
                                                                        >
                                                                        <FormControl
                                                                            type="email"
                                                                            value={this.state.email}
                                                                            placeholder="courriel"
                                                                            onChange={this.handleChangeEmail}
                                                                        />
                                                                        <FormControl.Feedback />
                                                                    </FormGroup>
                                                                    <FormGroup
                                                                        controlId="formBasicText"
                                                                        validationState={ this.getValidationStateTel() }
                                                                        >
                                                                        <FormControl
                                                                            type="text"
                                                                            value={this.state.tel}
                                                                            placeholder="999-999-9999"
                                                                            onChange={this.handleChangeTel}
                                                                        />
                                                                        <FormControl.Feedback />
                                                                    </FormGroup>
                                                                    <FormGroup 
                                                                        controlId="formControlsTextarea"
                                                                        validationState={ this.getValidationStateMsg() }
                                                                        >
                                                                        <FormControl 
                                                                            componentClass="textarea" 
                                                                            placeholder="Commentaires"
                                                                            value={this.state.message} 
                                                                            onChange={this.handleChangeMsg}/>
                                                                    </FormGroup>

                                                                    { (this.state.showAlert && this.state.datastatus) ? 
                                                                        <Alert bsStyle='success'>
                                                                        
                                                                                <div>
                                                                                    <h4>Du succès sur toute la ligne!</h4> 
                                                                                    <p>
                                                                                    Nous communiquerons avec vous sous peu.
                                                                                    </p>
                                                                                </div>
                                                                            
                                                                        </Alert>
                                                                        : null
                                                                    }
                                                                    { (this.state.showAlert && !this.state.datastatus) ?
                                                                        <Alert bsStyle='danger'>
                                                                                <div>
                                                                                    <h4>Il y a une erreur de transmission!</h4>
                                                                                    <p>
                                                                                        Veuillez recommencer le processus du captcha et re-appuyer sur SEND.
                                                                                    </p>
                                                                                </div> 
                                                                        </Alert>
                                                                        : null
                                                                    }

                                                                    {this.state.load && (
                                                                        <ReCAPTCHA
                                                                            lang="fr"
                                                                            grecaptcha={{lang:'fr'}}
                                                                            //size='normal'
                                                                            //width='100%'
                                                                            style={{ marginTop: -5,textAlign:'center' }}
                                                                            theme="light"
                                                                            ref={this._reCaptchaRef}
                                                                            sitekey='6LfRiWsUAAAAAEkbfPpF01pnC4TgydIQOqVLmmp9'
                                                                            onChange={this.handleChange}
                                                                            asyncScriptOnLoad={this.asyncScriptOnLoad}
                                                                            />
                                                                    )}
                                                                    <Button className='contact-send-button'
                                                                        onClick={ this.handleMailSubmitLocalServer }>
                                                                        {(this.props.langue === 'FR') ? 'ENVOI' : 'SEND'}
                                                                    </Button>
                                                                    

                                                                </form>                                    
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                        
                                                    </Row>
                                                </Tab.Container>

                                        </div>
        
                                    );
                                }
                            })}
                        </div>
                    }
                </StaggeredMotion>
            </div> 
        )
    }
}

export default Contact;



