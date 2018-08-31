import React, { Component } from 'react';

// routing
import { Switch } from 'react-router';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';

// modules
import Cycles from './modules/cycles';
import Home from './modules/home';
import Contact from './modules/contact';
import Services from './modules/services';
import Quiz from './modules/quiz/appquiz';

// styles
import './App.css';

/* WEBPAGES */
  const CyclesTest = () => (
    <div style={{width:'100%',height:'50%',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,1)',color:'black'}}>
      <h2 style={{fontSize:200}}>CyclesTest</h2>
    </div>
  );
  const Equipe = () => (
    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'fixed',top:'0',left:'0',backgroundColor:'white',color:'black'}}>
      <h2 style={{fontSize:200}}>Équipe</h2>
    </div>
  );
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

    var visibility = "hide";
 
    if (this.props.menuOpen) {
      visibility = "show";
    }

    console.log('Menu.Render - visibility: ', visibility);

    return (
      
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown}
           className={visibility}>

        <nav className="menu-items">
          <Link className="menu-item" to="/home" onClick={ toggle }>
            <i className="fas fa-home"></i>
            {(langue === 'FR') ? ' Accueil' : ' Home'}
          </Link>
          <Link className="menu-item" to="/cycles" onClick={ toggle } >
            <i className="fas fa-bicycle"></i>
            { ' Cycles'}</Link>
          <Link className="menu-item" to="/equipe" onClick={ toggle } >
            <i className="fas fa-people-carry"></i>
            {(langue === 'FR') ? ' Équipe' : ' Team'}</Link>
          <Link className="menu-item" to="/Services" onClick={ toggle } >
            <i className="fas fa-hands-helping"></i>
            { ' Services'}</Link>
          <Link className="menu-item" to="/quiz" onClick={ toggle } >
            <i className="fas fa-question"></i>
            {(langue === 'FR') ? ' Q&R' : ' Q&A'}</Link>
          <Link className="menu-item" to="/contact" onClick={ toggle } >
            <i className="fas fa-at"></i>
            {(langue === 'FR') ? ' Contact' : ' Contact'}</Link>
          <Link className="menu-item" to="/amstest" onClick={ toggle } >
            <i className="fas fa-vial"></i>
           { ' Test + ToDos'}</Link>
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
    console.log("handleMouseDown");
    this.toggleMenu();
    e.stopPropagation();
  }

  toggleMenu() { 
    const {menuOpen} = this.state;
    console.log('if menu is ',menuOpen,' just before toggling')
    const ref = this.refs.menutoggle;
    (menuOpen) ? ref.classList.remove("menu-open") : ref.classList.add("menu-open");
    this.setState({ menuOpen: !menuOpen });
    console.log('toggleMenu');
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
    const RenderCycles = (props) => {return (<Cycles langue={langue} width={width} height={height} {...props}/>);}
    const RenderServices = (props) => {return (<Services langue={langue} width={width} height={height} {...props}/>);}
    const RenderQuiz = (props) => {return (<Quiz langue={langue} width={width} height={height} {...props}/>);}

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
          <Route path='/equipe' component={Equipe} />
          <Route path='/cycles' render={RenderCycles} />
          <Route path='/cyclestest' component={CyclesTest} />
          <Route path='/services' render={RenderServices} />
          <Route path='/amstest' component={AMSTest} />
          <Route path='/quiz' component={RenderQuiz} />
          <Route path='/contact' component={Contact} />
          <Route path='/' render={RenderHome} />
        </Switch>

      </div>
    );
  }
}

export default App;
