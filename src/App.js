import React, { Component } from 'react';

// routing
import { Switch } from 'react-router';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';

// modules
import Home from './modules/home';
import HomePage from './modules/Connected animation with ReactMotion and Redux/HomePage';
import ItemPage from './modules/Connected animation with ReactMotion and Redux/ItemPage';
import Intro from './modules/logo';
import Cycles from './modules/cycles';
import Equipe from './modules/equipe';
//import Services from './modules/services';
import Quiz from './modules/quiz/appquiz';
import Contact from './modules/contact';
import Tree from './modules/tree';

// styles
import './App.css';

/* WEBPAGES */
  const AMSTest = () => (
    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'fixed',top:'0',left:'0',backgroundColor:'white',color:'black'}}>
      <h2 style={{fontSize:200}}>AMSTest</h2>
    </div>
  );
/* WEBPAGES */

class Menu extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openMenu: false,
    };
  }

  render() {

    const {toggle,langue,handleMouseDown} = this.props;

    var visibility = "slideOut";
 
    if (this.props.menuOpen) { visibility = "slideIn"; }

    return ( 
      
      <div id="flyoutMenu" className={visibility}
           onMouseDown={this.props.handleMouseDown}>

        <nav className="menu-items">
          <Link className="menu-item" to="/home" onClick={ toggle }>
            {(langue === 'FR') ? 'Accueil' : 'Home'}
          </Link>
          <Link className="menu-item" to="/homepage" onClick={ toggle } >
            {'Homepage'}</Link>
          <Link className="menu-item" to="/item" onClick={ toggle } >
            {'Itempage'}</Link>
          <Link className="menu-item" to="/cycles" onClick={ toggle } >
            {'Cycles'}</Link>
          <Link className="menu-item" to="/equipe" onClick={ toggle } >
            {(langue === 'FR') ? 'Équipe' : 'Team'}</Link>
          <Link className="menu-item" to="/services" onClick={ toggle } >
            {'Services'}</Link>
          <Link className="menu-item" to="/quiz" onClick={ toggle } >
            {(langue === 'FR') ? 'Questionnaire' : 'Q&A'}</Link>
          <Link className="menu-item" to="/contact" onClick={ toggle } >
            {(langue === 'FR') ? 'Contact' : 'Contact'}</Link>
          <Link className="menu-item" to="/intro" onClick={ toggle } >
            {(langue === 'FR') ? 'Intro' : 'Intro'}</Link>
          </nav>

      </div>
    );
  }
}

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      langue:   "FR",
      theme:    "obscur",
      menuOpen: false,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    //this.handleMVI = this.handleMVI.bind(this);
  }

  handleMouseDown(e) {
    console.log(e.target);
    console.log("handleMouseDown");
    this.toggleMenu(e);
    e.stopPropagation();
  }

  toggleMenu(e) { 
    const {menuOpen} = this.state;
    console.log('if menu is ',menuOpen,' just before toggling')
    const ref = this.refs.menutoggle;
    (menuOpen) ? ref.classList.remove("menu-open") : ref.classList.add("menu-open");
    this.setState({ menuOpen: !menuOpen });
    console.log('toggleMenu');
    e.stopPropagation();
  }

  /*handleStateChange (state) {
    console.log('handleStateChange');
    this.setState({menuOpen: state.isOpen})
  }*/

  handleLanguage = () => {
    const {langue} = this.state;
    (langue === "FR") ? this.setState( {langue:"EN"}) : this.setState( {langue:"FR"})
  }

  handleTheme = () => {
    const {theme} = this.state;
    if (theme === "clair") { 
      document.body.setAttribute("style", "background:#52545A;color:#B2B5BD"); 
    }
    else { 
      document.body.setAttribute("style", "background:#B2B5BD;color:#52545A");
    }
    this.setState( {theme: (theme === "clair") ? "obscur" : "clair"} );
  }

  render() {

    const {langue} = this.state;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const RenderHome = (props) => {return (<Home langue={langue} width={width} height={height} {...props}/>);}
    const RenderItemPage = (props) => {return (<ItemPage langue={langue} width={width} height={height} {...props}/>);}
    const RenderHomePage = (props) => {return (<HomePage langue={langue} width={width} height={height} {...props}/>);}
    const RenderIntro = (props) => {return (<Intro langue={langue} width={width} height={height} {...props}/>);}
    const RenderCycles = (props) => {return (<Cycles langue={langue} width={width} height={height} {...props}/>);}
    const RenderEquipe = (props) => {return (<Equipe langue={langue} width={width} height={height} {...props}/>);}
    const RenderQuiz = (props) => {return (<Quiz langue={langue} width={width} height={height} {...props}/>);}
    const RenderContact = (props) => {return (<Contact langue={langue} width={width} height={height} {...props}/>);}
    const RenderTree = (props) => {return (<Tree langue={langue} width={width} height={height} {...props}/>);}

    return (
      <div>
        <Menu 
          //handleMouseDown={this.handleMouseDown} 
          langue={this.state.langue} 
          menuOpen={this.state.menuOpen}
          toggle={this.toggleMenu}/>
        
        <button ref="menutoggle" className="menu-toggle" onMouseDown={this.handleMouseDown}><span>Open Menu</span></button>

        <div className="langue" onMouseDown={this.handleLanguage}>{this.state.langue}</div>
        <div className="theme" onMouseDown={this.handleTheme}>{this.state.theme}</div>

        <Switch>
          <Route path='/homepage' render={RenderHomePage} />
          <Route path='/item' component={ItemPage} />
          <Route path='/cycles' render={RenderCycles} />
          <Route path='/equipe' component={RenderEquipe} />
          <Route path='/services' render={RenderTree} />
          <Route path='/amstest' component={AMSTest} />
          <Route path='/quiz' component={RenderQuiz} />
          <Route path='/contact' component={RenderContact} />
          <Route path='/intro' render={RenderIntro} />
          <Route path='/' render={RenderHome} />
        </Switch>

      </div>
    );
  }
}

export default App;