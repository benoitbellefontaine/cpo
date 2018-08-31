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

  render() {
    var visibility = "hide";
    //var langue = (this.props.langue === 'FR');
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }

    console.log('Menu');

    return (
      
      <div id="flyoutMenu"
           //onMouseDown={this.props.handleMouseDown} 
           className={visibility}>

        <div className="menu-bg js-blur"></div>
        <nav className="menu-items">
          <Link className="menu-item" to="/home">Accueil</Link>
          <Link className="menu-item" to="/cycles">Cycles</Link>
          <Link className="menu-item" to="/equipe">Équipe</Link>
          <Link className="menu-item" to="/Services">Services</Link>
          <Link className="menu-item" to="/amstest">AMSTest</Link>
          <Link className="menu-item" to="/contact">Contact</Link>
        </nav>

      </div>
    );
  }
}

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      langue: "FR",
      theme: "obscur",
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    //this.handleMVI = this.handleMVI.bind(this);
  }

  handleMouseDown(e) {
    console.log("clicked");
    const ref = this.refs.menutoggle;
    (this.state.visible) ? ref.classList.remove("menu-open") : ref.classList.add("menu-open");
    this.toggleMenu();
    e.stopPropagation();
  }

  toggleMenu() { 
    this.setState({ visible: !this.state.visible }); 
  }

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
    //const height = 5*h/100;
    //const height = 95*h/100-50;

    //const RenderMenu = (props) => {return (<Menu langue={this.state.langue} width={w} height={h} {...props}/>);}
    //const RenderTeam = (props) => {return (<Team langue={this.state.langue} width={w} height={h} {...props}/>);}
    const RenderHome = (props) => {return (<Home langue={langue} width={width} height={height} {...props}/>);}
    const RenderCycles = (props) => {return (<Cycles langue={langue} width={width} height={height} {...props}/>);}
    const RenderServices = (props) => {return (<Services langue={langue} width={width} height={height} {...props}/>);}

    return (
      <div>
        <Menu handleMouseDown={this.handleMouseDown} langue={this.state.langue} menuVisibility={this.state.visible}/>
        
        <button ref="menutoggle" className="menu-toggle" onMouseDown={this.handleMouseDown}><span>Open Menu</span></button>

        <div className="langue" onMouseDown={this.handleLanguage}>{this.state.langue}</div>
        <div className="theme" onMouseDown={this.handleTheme}>{this.state.theme}</div>

        <Switch>
          <Route path='/equipe' component={Equipe} />
          <Route path='/cycles' render={RenderCycles} />
          <Route path='/cyclestest' component={CyclesTest} />
          <Route path='/services' render={RenderServices} />
          <Route path='/amstest' component={AMSTest} />
          <Route path='/contact' component={Contact} />
          <Route path='/' render={RenderHome} />
        </Switch>

      </div>
    );
  }
}

export default App;
