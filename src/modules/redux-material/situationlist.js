import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

/* action */
    const activitySelect = id => {
        return {
            type: 'ACTIVITY_SELECT',
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
    const chiffreSelect = id => {
        return {
            type: 'CHIFFRE_SELECT',
            id
        }
    }
/* action */

/* presentation */
    /* ACTIVITY presentation */
        const ActivityItem = ({ onClick, selected, text, id }) => (
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

        const AList = ({ activities, onTodoClick, questionId }) => (
            <div>
                <h3>
                    Indiquez le ou les secteurs d'activité de votre entreprise
                </h3>
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',padding:0}}>
                    {activities.map(activity => (
                        <ActivityItem key={activity.id} {...activity} onClick={() => onTodoClick(activity.id)} />
                    ))}
                </ul>
            </div>
        )
        AList.propTypes = {
            questionId: PropTypes.number,
            activities: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* ACTIVITY presentation */

    /* QUALITE presentation */
        const QualiteItem = ({ onClick, selected, text, id }) => (
            <li
                onClick={onClick}
                style={ {
                    fontWeight: 500,
                    listStyleType: 'none',
                    //display:'inline',
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
                    <div><i className={selected ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
                    <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
                    <span> </span>
                </div>
            </li>
        )
        QualiteItem.propTypes = {
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const QList = ({ qualites, onTodoClick }) => (
            <div>
                <h3>
                    Quelle sont les qualités que vous recherchez chez le consultant externe ?
                </h3>
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',padding:0}}>
                    {qualites.map(q => (
                        <QualiteItem key={q.id} {...q} onClick={() => onTodoClick(q.id)} />
                    ))}
                </ul>
            </div>
        )
        QList.propTypes = {
            qualites: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* QUALITE presentation */

    /* CHIFFRE presentation */
        const ChiffreItem = ({ onClick, selected, text, id }) => (
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
        ChiffreItem.propTypes = {
            onClick: PropTypes.func.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }

        const CList = ({ chiffres, onTodoClick }) => (
            <div>
                <h3>
                    Quel est votre chiffre d'affaire ?
                </h3>
                <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',padding:0}}>
                    {chiffres.map(chiffre => (
                        <ChiffreItem key={chiffre.id} {...chiffre} onClick={() => onTodoClick(chiffre.id)} />
                    ))}
                </ul>
            </div>
        )
        CList.propTypes = {
            chiffres: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    selected: PropTypes.bool.isRequired,
                    text: PropTypes.string.isRequired
                }).isRequired
            ).isRequired,
            onTodoClick: PropTypes.func.isRequired
        }
    /* CHIFFRE presentation */

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
                   Indiquez le ou les secteurs d'activité de votre entreprise
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

/* container 3 : ActivityList */
    const getVisibleTodosActivity = (activities, filter) => {
        switch (filter) {
        case 'SHOW_SELECTED':
            return activities.filter(t => t.selected)
        case 'SHOW_ALL':
        default:
            return activities
        }
    }
     
    const mapStateToPropsActivity = (state, ownProps) => {
        return {
            activities: getVisibleTodosActivity(state.activities, ownProps.filter)
        }
    }
     
    const mapDispatchToPropsActivity = dispatch => {
        return {
        onTodoClick: id => {
            dispatch(activitySelect(id));
        }
        }
    }
    
    const ActivityList = connect(mapStateToPropsActivity,mapDispatchToPropsActivity)(AList)

    class ActivityList2 extends React.Component {
        //constructor(props){***}
        render(){
            return (<ActivityList/>);
        }
    }

/* container 3 : ActivityList */

/* container 3 : QualiteList */
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
    const QualiteList = connect(
        mapStateToPropsQualite,
        mapDispatchToPropsQualite
    )(QList)
    
/* container 3 : QualiteList */

/* container 4 : ChiffresList */
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
     
  const ChiffresList = connect(
      mapStateToPropsChiffres,
      mapDispatchToPropsChiffres
  )(CList)

/* container 4 : ChiffresList */

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
