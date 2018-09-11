import React,{Component} from 'react';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import { connect } from 'react-redux';
import { StaggeredMotion, spring } from 'react-motion';
import * as d3 from 'd3';

import './styles/services.css';

/* ------------ SPRING CONSTANTS ------------ */
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
/* ------------------------------------------ */

/*
demarrage       rgb(116,184,33),
court terme     rgb(198,218,252),
long terme      rgb(141,182,248),
excellence      rgb(84,145,245),
redressement    rgb(214,45,32),
*/

const childButtonIcons = ['rocket','low-vision','eye','trophy','sync-alt','servicestack','pencil','bell','comment','bolt', 'ban', 'code'];

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* action */
  const toggleTodo = id => {
      return {
        type: 'TOGGLE_TODO',
        id
      }
  }
  const setVisibilityFilter = filter => {
    return {
      type: 'SET_VISIBILITY_FILTER',
      filter
    }
  }
  const VisibilityFilters = {
      SHOW_NONE: 'SHOW_NONE',
      SHOW_ALL: 'SHOW_ALL',
      SHOW_COMPLETED: 'SHOW_COMPLETED',
      SHOW_ACTIVE: 'SHOW_ACTIVE',
      SHOW_DEMARRAGE: 'SHOW_DEMARRAGE',
      SHOW_COURTTERME: 'SHOW_COURTTERME',
      SHOW_MOYENTERME: 'SHOW_MOYENTERME',
      SHOW_EXCELLENCE: 'SHOW_EXCELLENCE',
      SHOW_REDRESSEMENT: 'SHOW_REDRESSEMENT'
  }
/* end action */

/* presentation */
  const Item = ({ onClick, completed, text }) => (
      <li
        onClick={onClick}
        style={{
          listStyleType: 'none',
          padding: 10,
          margin: 3,
          borderRadius: 10,
          color: completed ? 'white' : 'rgba(0,0,0,0.7)',
          backgroundColor: completed ? 'rgb(116,184,33)' : 'rgba(0,0,0,0.1)',
          //border: completed ? '2px solid rgb(116,184,33)' : '2px solid gray',
          fontSize: '100%',
          fontWeight: 600,
          flexGrow: 1
        }}
        >
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><i className={completed ? `fas fa-check-square fa-2x` : `far fa-square fa-2x`}></i></div>
            <span style={{width:'90%',margin:'0 auto',textAlign:'center'}}>{text}</span>
            <span> </span>
        </div>
      </li>
  )
  Item.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }
  
  const List = ({ todos, onTodoClick }) => {
    return (
      <ul style={{width:'100%',boxSizing:'border-box',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',margin:3,padding:0}}>
        {todos.map(todo => (
          <Item key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        ))}
      </ul>
    );
  }

  List.propTypes = {
      todos: PropTypes.arrayOf(
          PropTypes.shape({
              id: PropTypes.number.isRequired,
              completed: PropTypes.bool.isRequired,
              text: PropTypes.string.isRequired
          }).isRequired
      ).isRequired,
      onTodoClick: PropTypes.func.isRequired
  }

  /*
    const Header = () => (
      <button style={{outlineStyle:'none',borderRadius:3,padding:10,marginTop:10,marginBottom:10,backgroundColor:'white',border:'1px solid gray',width:'100%'}}>
        <NavigationLink
          color={'rgb(116,184,33)'}
          filter={'situations'}
          >
          Les cinq situations possibles
        </NavigationLink>
      </button>
    )
  */

  const NavigationLink = ({ filter, color, children }) => (
    <NavLink
      className='servicesNavLink'
      style={{color:color}}
      to={filter === 'SHOW_ALL' ? '/' : `/${ filter }`}
      >
      {children}
    </NavLink>
  )

  const ServiceButtons = (props) => (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}>
      <FilterButton color={props.color[1]}  index={0} fa='fas' r={116}  g={184} b={33}  filter={VisibilityFilters.SHOW_DEMARRAGE}>Démarrage</FilterButton>
      <FilterButton color={props.color[2]}  index={1} fa='fas' r={84}   g={145} b={245} filter={VisibilityFilters.SHOW_COURTTERME}>Court terme</FilterButton>
      <FilterButton color={props.color[3]}  index={2} fa='fas' r={84}   g={145} b={245} filter={VisibilityFilters.SHOW_MOYENTERME}>Moyen terme</FilterButton>
      <FilterButton color={props.color[4]}  index={3} fa='fas' r={84}   g={145} b={245} filter={VisibilityFilters.SHOW_EXCELLENCE}>Excellence</FilterButton>
      <FilterButton color={props.color[5]}  index={4} fa='fas' r={214}  g={45}  b={32}  filter={VisibilityFilters.SHOW_REDRESSEMENT}>Redressement</FilterButton>
      <FilterButton color={props.color[6]}  index={5} fa='fab' r={116}  g={116} b={116} filter={VisibilityFilters.SHOW_ALL}>Tous les services</FilterButton>
    </div>
  )

  const Button = ({ active, children, index, r, g, b, fa, onClick, color }) => {
      if (active) {
          return <button className='servicesShadow' style={{
            outlineStyle:'none',
            border: 'none',
            backgroundColor: 'rgba('+ r +',' + g + ',' + b + ',1)',
            //backgroundColor: color,
            color: 'white',
            fontSize:20,
            borderRadius:3,       
            padding: '5px 0 5px 0',
            marginTop: '1px 0 0 0',
            width:'100%'}}
            >
            <div style={{display:'flex',flexDirection:'column'}}>
                <i className={ fa + ` fa-` + childButtonIcons[index] + ` fa-1x` }></i>
                <span>{children}</span>
            </div>
          </button>
      }
      return (
          <button className='servicesShadow' 
            style={{
              border: 'none',
              fontSize: 20,
              borderRadius: 3, paddingTop: 5, paddingBottom: 5,
              //backgroundColor: 'rgb(230,230,250)',
              backgroundColor: 'rgb(230,230,250)',
              color: 'rgba('+ r +',' + g + ',' + b + ',1)',
              marginTop: 1,
              width: '100%'
            }}
            onClick={e => { 
              e.preventDefault() 
              onClick() }}
          >
          <div style={{display:'flex',flexDirection:'column'}}>
            <i className={ fa + ` fa-` + childButtonIcons[index] + ` fa-1x` }></i>
            <span>{children}</span>
          </div>
          </button>
      )
  }

  Button.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    fa: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

/* end presentation */

/* container 0 : FilterButton */
  const mapStateToPropsFB = (state, ownProps) => {
      return {
        active: ownProps.filter === state.visibilityFilter
      }
  }
     
  const mapDispatchToPropsFB = (dispatch, ownProps) => {
      return {
          onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
            console.log('FL:mapDispatchToPropsFL:ownProps.filter',ownProps.filter);
          }
      }
  }
   
  const FilterButton = connect(
      mapStateToPropsFB,
      mapDispatchToPropsFB
  )(Button)
/* container 0 : FilterButton */

/* container 1 : AllList */
  const getVisibleTodosAll = (todos, filter) => {
      switch (filter) {
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
        case 'SHOW_DEMARRAGE':
          return todos.filter(t => t.situations.find(function(element) {return element === 'demarrage'} ))
        case 'SHOW_COURTTERME':
          return todos.filter(t => t.situations.find(function(element) {return element === 'court terme'} ))
        case 'SHOW_MOYENTERME':
          return todos.filter(t => t.situations.find(function(element) {return element === 'moyen terme'} ))
        case 'SHOW_EXCELLENCE':
          return todos.filter(t => t.situations.find(function(element) {return element === 'excellence'} ))
        case 'SHOW_REDRESSEMENT':
          return todos.filter(t => t.situations.find(function(element) {return element === 'redressement'} ))
         case 'SHOW_NONE':
          return [];
        case 'SHOW_ALL':
        default:
          return todos
      }
  }
     
  const mapStateToPropsAll = (state, ownProps) => {
      return {
        todos: getVisibleTodosAll(state.services, state.visibilityFilter)
      }
  }
     
  const mapDispatchToPropsAll = dispatch => {
      return {
        onTodoClick: id => {
          dispatch(toggleTodo(id));
        }
      }
  }
     
  const AllList = connect(
      mapStateToPropsAll,
      mapDispatchToPropsAll
  )(List)
/* container 1: AllList */

const innerWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}

export default class Services extends Component {

  componentDidMount() {

    var svg = d3.select(this.refs.anchor);
    var width = this.props.width;
    var height = this.props.height;
    var node, link;
    var rx, ry;
    var edgepaths, edgelabels;
    
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var nodes = [

      {"id": "CPO",           r:30, "group": 1, "fontsize":25},
      {"id": "démarrage",     r:15, "group": 2, "fontsize":15},
      {"id": "court terme",   r:15, "group": 3, "fontsize":15},
      {"id": "moyen terme",   r:15, "group": 4, "fontsize":15},
      {"id": "excellence",    r:15, "group": 5, "fontsize":20},
      {"id": "redressement",  r:15, "group": 6, "fontsize":15},

      {"id": "structure d'entreprise", r:5, "group": 2, "fontsize":15},
      {"id": "incorporation", r:5, "group": 3, "fontsize":15},
      {"id": "plan d'affaire", r:5, "group": 4, "fontsize":15},
      {"id": "plan comptable", r:5, "group": 5, "fontsize":20},
      {"id": "prévisions budgétaires", r:5, "group": 6, "fontsize":15},
      {"id": "recherche subventions", r:5, "group": 4, "fontsize":15},
      {"id": "financement", r:5, "group": 5, "fontsize":20},
      {"id": "plan de commercialisation", r:5, "group": 6, "fontsize":15},

      {"id": "procédures de fin de mois", r:5, "group": 2, "fontsize":15},
      {"id": "gestion des RH", r:5, "group": 3, "fontsize":15},
      {"id": "comparables budget vs réel", r:5, "group": 4, "fontsize":15},
      {"id": "analyse des ratios financiers", r:5, "group": 5, "fontsize":20},
      {"id": "préparation des budgets annuels", r:5, "group": 6, "fontsize":15},
      {"id": "prix de revient", r:5, "group": 4, "fontsize":15},

      {"id": "révision structure financière", r:5, "group": 2, "fontsize":15},
      {"id": "analyse stratégique", r:5, "group": 3, "fontsize":15},
      {"id": "programme réduction des coûts", r:5, "group": 4, "fontsize":15},
      {"id": "analyse rentabilité & efficacité", r:5, "group": 5, "fontsize":20},
      {"id": "révision de la structure d'entreprise", r:5, "group": 6, "fontsize":15},
      {"id": "amélioration des processus continues", r:5, "group": 4, "fontsize":15},
      {"id": "contrôles internes", r:5, "group": 4, "fontsize":15},

      {"id": "planification stratégique", r:5, "group": 3, "fontsize":15},
      {"id": "plan de relève", r:5, "group": 4, "fontsize":15},
      {"id": "tableau de bord (scorecard)", r:5, "group": 5, "fontsize":20},
      {"id": "analyse de la chaine des valeurs", r:5, "group": 6, "fontsize":15},
      {"id": "rigueur & discipline", r:5, "group": 4, "fontsize":15},
      {"id": "plans quinquennaux", r:5, "group": 4, "fontsize":15},

      {"id": "respirateur artificiel", r:5, "group": 3, "fontsize":15},
      {"id": "consolidation de dettes", r:5, "group": 4, "fontsize":15},
      {"id": "recherche de nouveaux investisseurs", r:5, "group": 5, "fontsize":20},
      {"id": "réingénierie", r:5, "group": 6, "fontsize":15},
      {"id": "plan de revitalisation", r:5, "group": 4, "fontsize":15},
      {"id": "refinancement", r:5, "group": 4, "fontsize":15},

    ];
    var links = [
      {"source": "CPO", "target": "démarrage", "group":2, "value": 5},
      {"source": "CPO", "target": "court terme", "group":3, "value": 8},
      {"source": "CPO", "target": "moyen terme", "group":4, "value": 10},
      {"source": "CPO", "target": "excellence", "group":5, "value": 6},
      {"source": "CPO", "target": "redressement", "group":6, "value": 6},

      {"source": "démarrage", "target": "structure d'entreprise", "group":2, "value": 5},
      {"source": "démarrage", "target": "incorporation", "group":3, "value": 8},
      {"source": "démarrage", "target": "plan d'affaire", "group":4, "value": 10},
      {"source": "démarrage", "target": "plan comptable", "group":5, "value": 6},
      {"source": "démarrage", "target": "prévisions budgétaires", "group":6, "value": 6},
      {"source": "démarrage", "target": "recherche subventions", "group":4, "value": 10},
      {"source": "démarrage", "target": "financement", "group":5, "value": 6},
      {"source": "démarrage", "target": "plan de commercialisation", "group":6, "value": 6},

      {"source": "court terme", "target": "procédures de fin de mois", "group":4, "value": 10},
      {"source": "court terme", "target": "gestion des RH", "group":5, "value": 6},
      {"source": "court terme", "target": "comparables budget vs réel", "group":6, "value": 6},
      {"source": "court terme", "target": "analyse des ratios financiers", "group":4, "value": 10},
      {"source": "court terme", "target": "préparation des budgets annuels", "group":5, "value": 6},
      {"source": "court terme", "target": "prix de revient", "group":6, "value": 6},

      {"source": "moyen terme", "target": "révision structure financière", "group":3, "value": 8},
      {"source": "moyen terme", "target": "analyse stratégique", "group":4, "value": 10},
      {"source": "moyen terme", "target": "programme réduction des coûts", "group":5, "value": 6},
      {"source": "moyen terme", "target": "analyse rentabilité & efficacité", "group":6, "value": 6},
      {"source": "moyen terme", "target": "révision de la structure d'entreprise", "group":4, "value": 10},
      {"source": "moyen terme", "target": "amélioration des processus continues", "group":5, "value": 6},
      {"source": "moyen terme", "target": "contrôles internes", "group":6, "value": 6},

      {"source": "excellence", "target": "planification stratégique", "group":3, "value": 8},
      {"source": "excellence", "target": "plan de relève", "group":4, "value": 10},
      {"source": "excellence", "target": "tableau de bord (scorecard)", "group":5, "value": 6},
      {"source": "excellence", "target": "analyse de la chaine des valeurs", "group":6, "value": 6},
      {"source": "excellence", "target": "rigueur & discipline", "group":4, "value": 10},
      {"source": "excellence", "target": "plans quinquennaux", "group":5, "value": 6},

      {"source": "redressement", "target": "respirateur artificiel", "group":3, "value": 8},
      {"source": "redressement", "target": "consolidation de dettes", "group":4, "value": 10},
      {"source": "redressement", "target": "recherche de nouveaux investisseurs", "group":5, "value": 6},
      {"source": "redressement", "target": "réingénierie", "group":6, "value": 6},
      {"source": "redressement", "target": "plan de revitalisation", "group":4, "value": 10},
      {"source": "redressement", "target": "refinancement", "group":5, "value": 6},

    ];

    svg.append('defs').append('marker')
      .attr('id','arrowhead')
      .attr('viewBox','-0 -5 10 10')
      .attr('refX',13)
      .attr('refY',0)
      .attr('orient','auto')
      .attr('markerWidth',13)
      .attr('markerHeight',13)
      .attr('xoverflow','visible')
      /*.attrs({'id':'arrowhead',
          'viewBox':'-0 -5 10 10',
          'refX':13,
          'refY':0,
          'orient':'auto',
          'markerWidth':13,
          'markerHeight':13,
          'xoverflow':'visible'})*/
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke','none');

    /*
    svg.append("defs").selectAll("marker")
        //.data(pathtype)
        .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    */

    // TITLE
    svg.append('text')
        .attr("class","titre")
        .attr("text-anchor","middle")
        .attr('x',width/2)
        .attr('y',50)
        .attr('font-size', "20px")
        .attr("opacity","0")
        .attr("transform","translate(0,-10)")
        .style("fill", "black")
        .text('Eventail de services')
        .transition().duration(1000)
        .attr("opacity","1")
        .attr('transform','translate(0,-15)');

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(150).strength(4))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        //.attr('marker-end','url(#arrowhead)')        

    edgepaths = svg.selectAll(".edgepath")
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('stroke', '#999')
        .attr('stroke-width', 1)
        .attr('fill', 'black')
        //.attr('fill-opacity', 0)
        //.attr('stroke-opacity', 0)
        .attr('id', function (d, i) {return 'edgepath' + i})
        /*.attrs({
            'class': 'edgepath',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'id': function (d, i) {return 'edgepath' + i}
        })*/
        .style("pointer-events", "none");
    
    edgepaths.attr('d', function (d) {
      return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    edgelabels = svg.selectAll(".edgelabel")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr('fill', '#aaa')
        .attr('font-size', 10)
        .attr('id', function (d, i) {return 'edgelabel' + i})
        /*.attrs({
            'class': 'edgelabel',
            'id': function (d, i) {return 'edgelabel' + i},
            'font-size': 10,
            'fill': '#aaa'
        });*/

    /*
    edgelabels.append('textPath')
        .attr('xlink:href', function (d, i) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d) {return d.target});
    */

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);

    node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

    node.append("circle")
        .attr("r", function (d) {return d.r;})
        .style("stroke", function (d, i) {return colors(i);})
        .style("fill", function (d, i) {return colors(i);})

    node
        .append("text")
        .text(function (d) {return d.id;})
        .attr('dx',function (d) {return d.r + 7;})
        .attr('dy',5)
        .style('font-size','80%');

    function ticked() {

        link
            .attr("x1", function (d) {return d.source.x;})
            .attr("y1", function (d) {return d.source.y;})
            .attr("x2", function (d) {return d.target.x;})
            .attr("y2", function (d) {return d.target.y;});

        node.attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

        edgepaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        edgelabels.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                var bbox = this.getBBox();
                rx = bbox.x + bbox.width / 2;
                ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
                return 'rotate(0)';
            }
        });

      }

      function dragstarted(d) {
        console.log("dragstarted(d)");
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

  }

  render() {

    const {langue} = this.props;

    const {width,height} = this.props;
    const viewbox = "0 0 " + width + " " + height;

    // `translate3d(0, ${this.props.style.y}px, 0) scale(${scale})`
    
    return (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}>

          <h2 style={{display:'flex',fontSize:35, justifyContent:'center',marginTop:50}}>
              {(langue === 'FR') ? "Services" : "Services"}
          </h2>

          <svg style={{width:'calc(100% - 20vw)',backgroundColor:'white',margin:'0 10vw 0 10vw',
            boxShadow: 'inset 5px 5px 10px rgba(0,0,0,.5),inset -5px -5px 10px rgba(0,0,0,.5)',
            borderRadius: 10
            //boxShadow: '5px 5px 5px rgba(255,255,255,.8),-5px -5px 5px rgba(255,255,255,.8)'
            }} viewBox={viewbox}>
              <g ref="anchor" width={width} height={height} />
          </svg>
          
          <StaggeredMotion
              defaultStyles={[
                  // Add more items here for more dots
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
                                <div key={index} style={{ fontSize:'150%',margin:'20px', width:'100%', textAlign:'center',
                                  opacity: style.o, WebkitTransform: `translate3d(0, ${style.y}px, 0)`,color:color[index] }}>
                                  SERVICES
                                </div>
                              );
                              case 1: return (
                                <div key={index} style={{display: 'flex',justifyContent: 'flex-end',marginRight:'5%',marginBottom:'1%',
                                  opacity: style.o, WebkitTransform: `translate3d(${style.y}px, 0,  0)`}}>
                                  <NavigationLink color={'rgb(116,184,33)'} filter={'lifecycle'}>
                                    Besoin d'en apprendre davantage sur le cycle de vie de l'entreprise ?
                                  </NavigationLink>
                                </div>
                              );
                              case 2: return (
                                <div key={index} style={{ display:'flex',width: '100%', height: '70px',justifyContent:'center',
                                  opacity: style.o, WebkitTransform: `translate3d(0, ${style.y}px, 0)`}}>
                                    <span style={{ display:'flex', width: '20%',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom:'1px solid lightgray',backgroundColor:'rgb(230,230,250)',borderRight:'1px solid lightgray'}}>Cliquer sur la situation qui vous caractérise</span>
                                    <span style={{ display:'flex', width: '60%',justifyContent:'center',alignItems:'center',textAlign:'center',borderBottom:'1px solid lightgray',backgroundColor:'rgb(230,230,250)'}}>
                                      <div>Select</div>
                                      <NavigationLink color={'rgb(116,184,33)'} filter={'situations'}>
                                        Vous voulez prendre rendez-vous avec nous?
                                      </NavigationLink>
                                    </span>
                                </div>
                              );
                              case 3: return (
                                <div key={index} style={{ display:'flex',width: '100%',justifyContent:'center',
                                  opacity: style.o, WebkitTransform: `translate3d(0, ${style.y}px, 0)`}}>
                                    <div style={{ display:'flex', width: '20%',justifyContent:'center',
                                      alignItems:'flex-start',borderRight:'1px solid lightgray'}}>
                                      <ServiceButtons color={{color}} />
                                    </div>
                                    
                                    <div style={{ display:'flex', flexDirection:'column', width: '60%',
                                      justifyContent:'flex-start', alignItems:'center'}}>
                                      <div style={{width:'100%'}}>
                                      
                                        <AllList filter={'SHOW_COMPLETED'}/>

                                        <div className='servicesShadow' style={{ display:'flex', width:'100%',
                                          textAlign:'center', margin:'3', padding:0, boxSizing:'border-box',
                                          backgroundColor: 'rgb(45,214,32)', color: 'white', borderRadius:10 }}>
                                          <div style={{ display:'flex', justifyContent:'center',alignItems:'center',width:'40%',}}>
                                            <i className={`fa fa-at fa-4x` }></i>
                                          </div>
                                          <div style={{ width:'60%', textAlign:'center', margin:'0px' }}>
                                            <NavigationLink color='white' filter={'contact'}>
                                              Vous voulez prendre rendez-vous avec nous?
                                            </NavigationLink>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
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

// ServiceButtons - component
// FilterButton - container
// Button - component

