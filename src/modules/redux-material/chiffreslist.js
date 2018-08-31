import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

/* action */
    const chiffreSelect = id => {
        return {
            type: 'CHIFFRE_SELECT',
            id
        }
    }
/* action */

/* presentation */
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
/* end presentation */

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

  export default ChiffresList;

/* container 4 : ChiffresList */
