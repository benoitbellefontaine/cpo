import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* action */

    const qualiteSelect = id => {
        return {
            type: 'QUALITE_SELECT',
            id
        }
    }

/* action */

/* QUALITE presentation */
    const QualiteItem = ({ onClick, selected, text, id }) => (
        <li
            onClick={onClick}
            style={ {
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

    export default QualiteList;
    
/* container 3 : QualiteList */

