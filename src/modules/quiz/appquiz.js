import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import update from 'react-addons-update';
import Quiz from './quiz';
import quizQuestions from './quizquestions';
import Contact from '../contact';
//import Result from './result';
//import QuizContact from './quizcontact';

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
/* -------------------------------- */

const springConfig = {stiffness: 400, damping: 60};

const innerWrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}

const NavigationLink = ({ filter, color, width, children }) => (
    <NavLink
        className='servicesNavLink'
        style={{color:color, width:width}}
        to={filter === 'SHOW_ALL' ? '/' : `/${ filter }`}
        >
        {children}
    </NavLink>
)

const styleButton = {
    minWidth:'75px',
    flex:'1',
    height:'40px',
    margin:'5px 3px',
    fontSize:'1rem',
    backgroundColor:'#A3CDFD',
    borderRadius:'3px',
    color:'#fff',
    textTransform:'uppercase',
    letterSpacing:'.055rem',
    border:'none',
    //outline: 'none'
};

class AppQuiz extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {
                Nintendo: 0,
                Microsoft: 0,
                Sony: 0
            },
            result: ''
        };
    
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

    }

    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
    
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    
        return array;
    };
    
    handleAnswerSelected(event) {
        //console.log("handleAnswerSelected(event)");
        //console.log("Q",this.state.questionId)
        
        //this.setUserAnswer(event.currentTarget.value);
        
        if (this.state.questionId < 5) {
            setTimeout(() => this.setNextQuestion(), 300);
            //console.log("calling this.setNextQuestion()");
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }
    
    setUserAnswer(answer) {
        const updatedAnswersCount = update(this.state.answersCount, {
          [answer]: {$apply: (currentValue) => currentValue + 1}
        });

        this.setState({
            answersCount: updatedAnswersCount,
            answer: answer
        });
    }
    
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }
    
    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }
    
    setResults(result) {
        if (result.length === 1) {
          this.setState({ result: result[0] });
        } else {
          this.setState({ result: 'Undetermined' });
        }
    }

    componentWillMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    renderQuiz() {
        return (
          <Quiz
            //answer={this.state.answer}
            //answerOptions={this.state.answerOptions}
            //question={this.state.question}
            questionId={this.state.questionId}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
            langue={this.props.langue}
          />
        );
    }
    
    renderResult() {
        {/*<Result quizResult={this.state.result} />*/}
        return (
            <div>
            <NavigationLink width={'70%'} color={'rgb(116,184,33)'} filter={'contact'}>
                Contact
            </NavigationLink>
            <NavigationLink width={'70%'} color={'rgb(116,184,33)'} filter={'services'}>
                Services
            </NavigationLink>
            </div>
        );
    }

    render() {

        const {langue} = this.props;
        
        return (
            <div style={{
                width: "80%",
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center"
                }}>

                <h2 style={{display:'flex',fontSize:35, justifyContent:'center',marginTop:50}}>
                    {(langue === 'FR') ? "Questionnaire" : "Quiz"}
                </h2>
                <StaggeredMotion
                    defaultStyles={[
                        // Add more items here for more dots
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
                                            fontSize:'20px',
                                            padding:'10px', 
                                            textAlign:'center',
                                            opacity: style.o, //WebkitTransform: `translate3d(0, ${style.y}px, 0)` }}>
                                            WebkitTransform: `translate3d(0, ${style.y}px, 0)`, 
                                            backgroundColor: 'rgba(31, 48, 94, 1)',
                                            transform: `translate3d(0, ${style.y}px, 0)`
                                            }}>
                                            {(langue === 'FR') 
                                                ? 'Cinq questions pour mieux vous connaître'
                                                : 'Five questions to initiate the conversation'
                                            }
                                        </div>
                                    );
                                    case 1: return (
                                        <div key={index} style={{
                                                opacity: style.o, 
                                                fontSize: "16px",
                                                color: "rgba(31, 48, 94, 1)",
                                                WebkitTransform: `translate3d(0, ${style.y}px, 0)`,
                                                transform: `translate3d(0, ${style.y}px, 0)` 
                                            }}>
                                            {this.state.result ? this.renderResult() : this.renderQuiz()}
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

export default AppQuiz;