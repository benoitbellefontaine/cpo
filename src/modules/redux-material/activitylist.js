import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { connect } from 'react-redux';

//var color = d3.scaleOrdinal(d3.schemeCategory10);

/* action */
    const secteurSelect = id => {
        return {
            type: 'SECTEUR_SELECT',
            id
        }
    }
/* action */

/* presentation */
    /* SECTEUR presentation */
        const ActivityItem = ({ onClick, selected, text, id }) => (
            <li
                onClick={onClick}
                style={ {
                    listStyleType: 'none',
                    padding: 10,
                    margin: 3,
                    borderRadius: 5,
                    color: selected ? 'white' : 'gray',
                    backgroundColor: selected ? 'rgb(116,184,33)' : 'rgba(180,180,180,0.1)', //'rgba('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +','+ Math.random()*0.2 +')',
                    border: selected ? '1px solid rgb(116,184,33)' : '1px solid rgba(180,180,180,0.1)',
                    fontSize: '100%',
                    fontWeight: 600,
                    flexGrow: 1
                }}
                >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        ActivityItem.propTypes = {
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const AList = ({ secteurs, onTodoClick /*, questionId*/ }) => (
            <div>
                <h3>
                    Indiquez le ou les secteurs d'activité de votre entreprise
                </h3>
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',padding:0}}>
                    {secteurs.map(secteur => (
                        <ActivityItem key={secteur.id} {...secteur} onClick={() => onTodoClick(secteur.id)} />
                    ))}
                </ul>
            </div>
        )
        AList.propTypes = {
            //questionId: PropTypes.number,
            secteurs: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* SECTEUR presentation */
/* end presentation */

/* container 3 : ListeDeSecteurs */
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
     
    const mapDispatchToPropsSecteur = dispatch => {
        return {
        onTodoClick: id => {
            dispatch(secteurSelect(id));
        }
        }
    }
    
    const ListeDeSecteurs = connect(mapStateToPropsSecteur,mapDispatchToPropsSecteur)(AList)

    export default ListeDeSecteurs;

/* container 3 : ListeDeSecteurs */
