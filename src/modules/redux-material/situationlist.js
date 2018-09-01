import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

/* action */

    const situationSelect = id => {
        return {
            type: 'SITUATION_SELECT',
            id
        }
    }

/* action */

/* presentation */
    /* SITUATION presentation */
        const SituationItem = ({ onClick, selected, text, id }) => (
            <li
                onClick={onClick}
                style={ {
                    fontWeight: 500,
                    listStyleType: 'none',
                    padding: 10,
                    margin: 3,
                    borderRadius: 10,
                    color: selected ? 'white' : 'rgba(0,0,0,0.7)',
                    backgroundColor: selected ? 'rgb(116,184,33)' : 'rgba(0,0,0,0.1)',
                    //border: selected ? '2px solid rgb(116,184,33)' : '2px solid gray',
                    fontSize: '100%',
                    fontWeight: 600,
                    flexGrow: 1
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
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const SList = ({ situations, onTodoClick, questionId }) => (
            <div>
                <h3>
                   Choisir le cycle de vie qui correspond le plus à votre entreprise
                </h3>
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',padding:0}}>
                    {situations.map(situation => (
                        <SituationItem key={situation.id} {...situation} onClick={() => onTodoClick(situation.id)} />
                    ))}
                </ul>
            </div>
        )
        SList.propTypes = {
            situations: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* SITUATION presentation */
/* end presentation */

/* container 5 : situationsList */
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
    
    const SituationList = connect(
        mapStateToPropsSituation,
        mapDispatchToPropsSituation
    )(SList)

    export default SituationList;

/* container 5 : SituationsList */
