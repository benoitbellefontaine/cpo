import React, { Component } from 'react';
import '../App.css';

/* MISSION - VALEURS - INTÉGRITÉ */

  const MVI = (props) => (
    <div className="statement">
        <div className="title">
          - {props.title} -
          <span>{props.text}</span>
        </div>
    </div>
  );

/* MISSION - VALEURS - INTÉGRITÉ */

/* DATA MVI */
  const mvidata = [
    {
      titre:"Mission",texte:"F - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      title:"Mission",text:"A - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      titre:"Valeurs",texte:"Respecter le client: l'écouter, relever, noter, analyser les détails importants de son discours. Réitérer en cas de besoin. Poser des questions pertinentes. Être direct et franc avec elle/lui. Apporter la solution appropriée.",
      title:"Values",text:"Respect the customer: listen, record, note, analyze his/her take on the situation. Reiterate when needed. Ask pertinent questions. Be direct and candid with her/him. Provide appropriate solution."
    },
    {
      titre:"Intégrité",texte:"Nous visons les plus hauts niveaux d'intégrité et d'éthique. Appliquer et maintenir un tel niveau est au cœur de notre stratégie pour résoudre les problèmes et mener à bien la situation.",
      title:"Integrity",text: "We strive for the highest level of integrity and ethics. Applying and maintaining such a high level is at the heart of our strategy to work the issues and bring any situation to a successful conclusion."
    }
  ];
/* DATA MVI */

class Home extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      //visible: false,
      langue: "FR",
      //theme: "dark",
      indexMVI : 0
    };

    //this.handleMouseDown = this.handleMouseDown.bind(this);
    //this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMVI = this.handleMVI.bind(this);
  }

  /*
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
    if (theme === "light") { 
      document.body.setAttribute("style", "background:#52545A;color:#B2B5BD"); 
    }
    else { 
      document.body.setAttribute("style", "background:#B2B5BD;color:#52545A");
    }
    this.setState( {theme: (theme === "light") ? "dark" : "light"} );
  }*/

  handleMVI = (i) => {
    this.setState( {indexMVI:i})
  }

  render() {

    const {indexMVI} = this.state;

    const {langue} = this.props;

    let title = "";
    let text = "";

    // MVI selector
    if (indexMVI === 1) {
      title = (langue === "FR") ? mvidata[0].titre : mvidata[0].title;
      text = (langue === "FR") ? mvidata[0].texte : mvidata[0].text;
    }
    else if (indexMVI === 2) {
      title = (langue === "FR") ? mvidata[1].titre : mvidata[1].title;
      text = (langue === "FR") ? mvidata[1].texte : mvidata[1].text;
    }
    else if (indexMVI === 3) {
      title = (langue === "FR") ? mvidata[2].titre : mvidata[2].title;
      text = (langue === "FR") ? mvidata[2].texte : mvidata[2].text;
    }

    return (
      <div className="">
        <header className="codrops-header">

          <h1>Consultants PME Outaouais<span><a href="#">
            { (this.state.langue === 'FR') ? 'construire et rénover des entreprises' : 'reengineering success' }
            </a></span></h1>

          <nav className="codrops-demos">
            <a href="#" onClick={()=>this.handleMVI(1)}>
              { (langue === 'FR') ? 'Mission' : 'Mission' }
            </a>
            <a href="#" onClick={()=>this.handleMVI(2)}>
              { (langue === 'FR') ? 'Valeurs' : 'Values' }
            </a>
            <a href="#" onClick={()=>this.handleMVI(3)}>
              { (langue === 'FR') ? 'Intégrité' : 'Integrity' }
            </a>
          </nav>

        </header>

        { (indexMVI !== 0) ? <MVI title={title} text={text}/> : null }

      </div>
    );
  }
}

export default Home;