import React from 'react';
import PropTypes from 'prop-types';
import { Motion, StaggeredMotion, spring } from 'react-motion';

import Question from './question';
import QuestionCount from './questioncount';
import AnswerOption from './answeroption';

//import { connect } from 'react-redux';
import ActivityList     from '../redux-material/activitylist.js';
import QualiteList      from '../redux-material/qualitylist.js';
import SituationList    from '../redux-material/situationlist.js';
import ChiffresList     from '../redux-material/chiffreslist.js';
import DefiList         from '../redux-material/defis.js';

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

const styleButton = {
    minWidth:'75px',
    flex:'1',
    height:'40px',
    margin:'5px 3px',
    fontSize:'1rem',
    backgroundColor:'rgb(116,184,33)',
    borderRadius:'5px',
    color:'#fff',
    textTransform:'uppercase',
    letterSpacing:'.055rem',
    border:'none',
    //outline: 'none'
};

const innerWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}

function Quiz(props) {

    function renderAnswerOptions(key) {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                //answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />
        );
    }

    function renderActivityList() { return <ActivityList />;}

    function renderQualiteList() { return <QualiteList />; } 

    function renderChiffresList() { return <ChiffresList />; } 

    function renderSituationList() { return <SituationList />; } 

    function renderDefiList() { return <DefiList />; } 

    return (
        <div style={{
            width:'100%',
            margin:'0vh auto',
            backgroundColor:'#fff',
            padding:20,
            border:'1px solid rgba(0,0,0,0.1)'
            }}>
            <StaggeredMotion
                defaultStyles={[
                    // Add more items here for more dots
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },
                    { y: startY, o: startOpacity },

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
                                case 0: return (
                                    <div key={index} style={{ 
                                        //fontSize:'150%',
                                        //padding:'20px', 
                                        //textAlign:'center',
                                        opacity: style.o, //WebkitTransform: `translate3d(0, ${style.y}px, 0)` }}>
                                        WebkitTransform: `translate3d(0, ${style.y}px, 0)`, 
                                        //backgroundColor:'rgb(230,230,250)',
                                        transform: `translate3d(0, ${style.y}px, 0)` 
                                        }}>
                                        Question <span>{props.questionId}</span> 
                                            {(props.langue === 'FR') ? ' de ' : ' of '}
                                        <span>{props.questionTotal}</span>
                                    </div>
                                );
                                case 1: return (
                                    <div key={index} style={{
                                            //display:'flex',
                                            //justifyContent:'flex-end',
                                            //padding:'5px',
                                            //paddingRight:'5%',
                                            opacity: style.o, 
                                            //backgroundColor:'rgb(230,230,250)',
                                            WebkitTransform: `translate3d(0, ${style.y}px, 0)`,
                                            transform: `translate3d(0, ${style.y}px, 0)` 
                                        }}>
                                        {props.questionId === 1 ? renderActivityList() : null}
                                        {props.questionId === 2 ? renderQualiteList() : null}
                                        {props.questionId === 3 ? renderChiffresList() : null}
                                        {props.questionId === 4 ? renderSituationList() : null}
                                        {props.questionId === 5 ? renderDefiList() : null}
                                    </div>
                                );
                                case 2: return (
                                    <div key={index} style={{textAlign:'right',
                                            opacity: style.o, 
                                            //backgroundColor:'rgb(230,230,250)',
                                            WebkitTransform: `translate3d(0, ${style.y}px, 0)`,
                                            transform: `translate3d(0, ${style.y}px, 0)` 
                                        }}>
                                        <button style={ styleButton } onClick={props.onAnswerSelected}>SUIVANT</button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                }
            </StaggeredMotion>
        </div>
    );

}

Quiz.propTypes = {
    //counter: PropTypes.number.isRequired,
    //answer: PropTypes.string.isRequired,
    //answerOptions: PropTypes.array.isRequired,
    //question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    langue: PropTypes.string.isRequired,
};

export default Quiz;