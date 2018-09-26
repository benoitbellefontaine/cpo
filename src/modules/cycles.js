import React, { Component } from 'react';
import * as d3 from 'd3';

import SituationList from './redux-material/situationlist';

let descriptions =  [
    {
        titre: 'DÉMARRAGE',
        title: 'STARTUP',
        texte:"Votre entreprise est sur le point d'éclore et vous être maintenant prêt à l'introduire au monde entier. Mais avez-vous ou maîtrisez-vous les outils essentiels à un bon démarrage? Voici quelques outils et services mis à votre disposition pour assurer un démarrage réussi : incorporation, plan d'affaire, plan comptable, etc...",
        text:"Your business is about to hatch and you are now ready to introduce it to the world. But do you have or master the essential tools for a good start? Here are some tools and services at your disposal to ensure a successful start: incorporation, business plan, accounting plan, etc.",
    },
    {
        titre: 'COURT TERME',
        title: 'SHORT TERM',
        texte:"Votre entreprise a le vent dans les voiles mais sa vitesse de croisière n'est pas au niveau de vos espérances (les problèmes sont difficilement identifiables et une consultation externe est requise). Les services que nous offront pour ce cycle pourront faire la différence entre la vitesse actuelle et une meilleure vitesse de croisiêre.",
        text:"Your company has the wind in the sails but its cruising speed is not up to your expectations (problems are difficult to identify and external consultation is required). The services we offer for this cycle can make the difference between current speed and better cruising speed.",
    },
    {
        titre: 'MOYEN TERME',
        title: 'MIDDLE TERM',
        texte:"Une vision à long terme est maintenant nécessaire pour votre entreprise pour emprunter la voie de la pérennité. Que ce soit pour parer à un changement de garde soudain (plan de relève), vérifier l'état actuel de la situation (analyse des états financiers) ou améliorer les méthodes actuelles (analyse du prix de revient), nous proposons maintenant des outils spécialisés pour assurer la pérennité de votre entreprise",
        text:"A long-term vision is now necessary for your company to take the path to success. Whether to prevent a sudden change of guard (succession plan), check the current state of affairs (analysis of financial statements) or improve current methods (cost analysis), we now offer specialized tools to ensure the sustainability of your business.",

    },
    {
        title: 'EXCELLENCE',
        titre: 'EXCELLENCE',
        texte:"Pas de temps pour la complaisance et inutile de s'asseoir sur ses lauriers. Même si tout semble bien aller, en est-il vraiment ainsi? Un survol rapide par notre équipe sur les modus operandi de votre entreprise nous permettront de trouver les failles existentes et optimer votre rendement. Une simple analyse des états financiers ou l'aplication d'un contrôle interne peut parfois révéler d'importantes lacunes au niveaux des méthodes et des opérations.",
        text: "No time for complacency and getting laid back. Even if everything looks good, is it so? A quick overview by our team on the modus operandi of your company will allow us to find the flaws and optimize your performance. Just a simple analysis of your financial statements or a quick review of your internal controls can sometimes show significant methodological and operational deficiencies.",
    },
    {
        titre: 'REDRESSEMENT',
        title: 'REENGINEERING',
        texte:"Votre entreprise est en déclin et doit subir un redressement (problèmes fondamentaux liés à la structure de l'entreprise et les méthodes employées). Une application des services ci-dessous nous permettront de vous aider à redresser et remettre votre entreprise rapidement sur la voie du succès.",
        text:"At this stage, you either do a turnaround or you close shop. We can help. In fact we are specialized in company reengineering and revitalization, and we can quickly turn back the clock and put your business back on track.",
    }
];

function wrapTitle(text, texte, posx, posy, width, color) {
    // 1em = 16px
    var d_em = posy/16;
    var
        words = texte.split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")) + d_em,
        tspan = text.text(null).append("tspan").attr("x", posx).attr("y", y).attr("dy", dy + "em").style("fill",color);
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
    }
}

function wrapBox(texto, texte, posx, posy, width ) {
    // 1em = 16px
    var d_em = posy/16;
    var words = texte.split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = texto.attr("y"),
        dy = parseFloat(texto.attr("dy")) + d_em,
        tspan = texto.text(null).append("tspan").attr("x", posx).attr("y", y).attr("dy", dy + "em");
        console.log('dy',dy);
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = texto.append("tspan").attr("x", posx).attr("y", y)
                .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
    }
}

class Cycles extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            svg:{},innerwidth:0,innerheight:0
        };
        this.renderCycleDeVie  = this.renderCycleDeVie.bind(this);
    }

    renderCycleDeVie = () => {

        const titre = this.props.langue === 'FR' 
            ? "à sortir du cycle de vie des entreprises et ..."
            : "exit the enterprise lifecycle ...";

        const { innerwidth, innerheight, svg } = this.state;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var lifeCycleData = [
                {x:Math.PI,         nom:"démarrage",      name:"startup",           span_f:"de 0 à 6 mois",       span_e:"from 0 to 6 months"}, 
                {x:4*Math.PI/3,     nom:"court terme",    name:"short term",        span_f:"de 6 mois à 1 an",    span_e:"from 6 months to 1 year"}, 
                {x:5*Math.PI/3,     nom:"moyen terme",    name:"middle term",       span_f:"de 1 à 3 ans",        span_e:"from 1 to 3 year"}, 
                {x:6*Math.PI/3,     nom:"excellence",     name:"excellence",        span_f:"de 3 à 5 ans",        span_e:"from 3 to 5 year"},
                {x:7*Math.PI/3,     nom:"redressement",   name:"re-engineering",    span_f:"après 5 ans",         span_e:"after 5 years"}
        ];

        const circleData = lifeCycleData.map((_,i) => {
            return {
                name: this.props.langue === 'FR' ? _.nom  : _.name,
                span: this.props.langue === 'FR' ? _.span_f  : _.span_e,                
                x: ( _.x ) ,
                y: innerheight + (Math.cos( _.x )),
                r: 20,
                xtext: 0,
                ytext: -30
            }
        });

        const data = d3.range(180,420).map(function(i){ return {
            x: i,
            y: innerheight + (Math.cos( i*Math.PI/180 ))
        }});

        var xScale = d3.scaleLinear()
            .range([0,innerwidth])
            .domain(d3.extent(circleData, function(d) {return d.x;}))
        var yScale = d3.scaleLinear()
            .range([innerheight,0])
            .domain(d3.extent(circleData, function(d) {return d.y;}))

        var xScaleCurve = d3.scaleLinear()
            .range([0,innerwidth])
            .domain(d3.extent(data, function(d) {return d.x;}))
        var yScaleCurve = d3.scaleLinear()
            .range([innerheight,0])
            .domain(d3.extent(data, function(d) {return d.y;}))

                // CURVE for MappedData
        const plotline = d3.line()
            .curve(d3.curveNatural)
            .x(function(d) {return xScaleCurve(d.x);})
            .y(function(d) {return yScaleCurve(d.y);})

        var line = svg.selectAll("#line").datum(data).attr("id","line");

        line
            .transition().duration(1500)
            .attr("d",plotline)
            .style("stroke", function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); })
            .style("stroke", "lightblue")
            .style("stroke-width", 6);

        // HANDLE TITRE
        svg.selectAll(".titre")
            .attr('font-size','30px')
            .attr('transform','translate(0,-10)')
            .attr('opacity',0)
            .transition().delay(1000).duration(1000)
            .attr('transform','translate(0,-15)')
            .attr('opacity',1)
            .text(titre)

        // MANUAL X - AXIS
        svg.selectAll('text')
            .data(circleData).enter()
            .append('text')
                .attr("class","xAxisLabels")
                .attr("text-anchor","middle")
                .attr('x', function(d) {return xScaleCurve(d.x);})
                .attr('y', function(d) {return innerheight+40;})
                .attr('font-size', "14px")
                .attr("fill", function(d,i) { return color((i)); })
                .text(function(d) {return d.span;})
                .style("opacity", 0);

        
        var group = d3.select('.nodes')
            .selectAll('g')
            .data(circleData);

        //group.exit().remove();

        var groupEnter = group.enter()
            .append('g')
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .attr('class','nodes');

        groupEnter.append('svg:circle')
            .attr('r', function (item) { return item.r })
            .style('opacity',0)
            .attr("fill", function(d,i) { return color(i); })
            //.attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .transition().duration(1000)
            .style('opacity',1);

        groupEnter.append('svg:text')
            .attr('font-size','18px')
            //.attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .attr("fill", function(d,i) { return color(i); })
            .attr('text-anchor', 'middle')
            .attr('x', function(d) {return d.xtext;})
            .attr('y', function(d) {return d.ytext;})
            .text(function(d) {return d.name;});
        
        group.transition()
            .duration(1000)
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .style('opacity',1)
            .select('circle')
                .transition()
                .duration(2000)
                .attr('r', function (item) { return item.r });
        
        group.transition()
            .delay(1000).duration(1000)
            .select('text')
                .attr('x', function(d) {return d.xtext;})
                .attr('y', function(d) {return d.ytext;})
                .text(function(d){return d.name;});

        // remove
        group.exit().remove();

        svg.selectAll(".xAxisLabels")
            .transition()
            .delay(1500)
            .duration(1000)
            .style("opacity",1);

    }

    componentDidMount() {

        const {langue} = this.props;

        const titre = langue === 'FR' 
            ? "Les connaître et les comprendre!"
            : "Know and understand them!";

        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var padding = 100,
            innerwidth = this.props.width - padding - padding,
            innerheight = this.props.height - padding - padding;

        const svg = d3.select(this.refs.anchor);

        var group = svg.append("g");
        
        svg.attr("transform", "translate(" + padding + "," + padding + ")");
        group.attr("transform", "translate(" + 0 + "," + 30 + ")");

        /* DATA */

            var lifeCycleData = [
                {x:Math.PI,         nom:"démarrage",      name:"startup",           span_f:"de 0 à 6 mois",       span_e:"from 0 to 6 months"}, 
                {x:4*Math.PI/3,     nom:"court terme",    name:"short term",        span_f:"de 6 mois à 1 an",    span_e:"from 6 months to 1 year"}, 
                {x:5*Math.PI/3,     nom:"moyen terme",    name:"middle term",       span_f:"de 1 à 3 ans",        span_e:"from 1 to 3 year"}, 
                {x:6*Math.PI/3,     nom:"excellence",     name:"excellence",        span_f:"de 3 à 5 ans",        span_e:"from 3 to 5 year"},
                {x:7*Math.PI/3,     nom:"redressement",   name:"re-engineering",    span_f:"après 5 ans",         span_e:"after 5 years"}
            ];
                
            const circleData = lifeCycleData.map((_,i) => {
                return {
                    name: this.props.langue === 'FR' ? _.nom  : _.name,
                    span: this.props.langue === 'FR' ? _.span_f  : _.span_e,
                    x: ( _.x ) ,
                    y: innerheight + (Math.cos( _.x ))
                }
            });

            const curveData = d3.range(180,420).map(function(i){ return {
                x: i,
                y: innerheight + (Math.cos( i*Math.PI/180 ))
            }});

            const followUpData = d3.range(420,540).map(function(i){ return {
                x: Math.cos(((i+135)*0)*Math.PI/180)+innerwidth/2,
                y: Math.sin(((i+135)*0)*Math.PI/180)+innerheight/2
            }});
            
        /* END DATA */

        /*svg.append("defs").selectAll("marker")
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
            .attr("d", "M0,-5L10,0L0,5");*/

        /* SCALING */ 
            var xScale = d3.scaleLinear()
                .range([0,innerwidth])
                .domain(d3.extent(circleData, function(d) {return d.x;}))
            var yScale = d3.scaleLinear()
                .range([innerheight,0])
                .domain(d3.extent(circleData, function(d) {return d.y;}))

            var xScaleCurve = d3.scaleLinear()
                .range([0,innerwidth])
                .domain(d3.extent(curveData, function(d) {return d.x;}))
            var yScaleCurve = d3.scaleLinear()
                .range([innerheight,0])
                .domain(d3.extent(curveData, function(d) {return d.y;}))
        /* END SCALING */ 

        // CURVE for MappedData
        const plotline = d3.line()
            .curve(d3.curveNatural)
            .x(function(d) {return xScaleCurve(d.x);})
            .y(function(d) {return yScaleCurve(d.y);})

        // DRAW CURVE PATH
        var line = group.append("path")
            .datum(curveData, function(d) {console.log(d);})
            .attr("id","line")            
            .attr("d", plotline)
            .style("stroke", "lightblue")
            .style("stroke-width", "4px")
            .style("fill", "none");

        var totalLength = line.node().getTotalLength();

        line.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(3000)
            .ease(d3.easePolyInOut)
            .attr("stroke-dashoffset", 0)

        // DRAW FOLLOWUP PATH
        var line2 = group.append("path")
            .datum(followUpData)
            .attr("id","line2")            
            .attr("d", plotline)
            .style("stroke", "lightblue")
            .style("stroke-width", "4px")
            .style("fill", "blue");
        totalLength = line2.node().getTotalLength();
        line2.attr("stroke-dasharray", totalLength + " " + totalLength )
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease(d3.easePolyInOut)
            .attr("stroke-dashoffset", 0);

        // TEXTS (3*innerwidth/4),
        svg.append("text")
            .attr("id", "titre")
            .attr("x", 3*innerwidth/4)
            .attr("y", 0)
            .attr("dy", "0em")
            .attr("font-size","22px")
            .attr("font-weight","700")
            .attr("text-anchor", "middle")
            .text("");
            
        svg.append("text")
            .attr("id", "box")
            .attr("x", 3*innerwidth/4)
            .attr("y", -75)
            .attr("dy", "0.5em")
            .attr("font-size","20px")
            .attr("text-anchor", "middle")
            .text("");

        // TITLE
        svg.append('text')
            .attr("class","titre")
            .attr("text-anchor","middle")
            .attr('x', innerwidth/2)
            .attr('y', -20)
            .attr('font-size', "24px")
            .attr("opacity","0")
            .attr("transform","translate(0,-10)")
            .style("fill", "black")
            .text(titre)
            .transition().duration(1000)
            .attr("opacity","1")
            .attr('transform','translate(0,-15)')

        // MANUAL X - AXIS
        group.selectAll('text')
            .data(circleData).enter()
            .append('text')
                .attr("class","xAxisLabels")
                .attr("text-anchor","middle")
                .attr('x', function(d) {return xScale(d.x);})
                .attr('y', function(d) {return innerheight+40;})
                .attr('font-size', "20px")
                .attr("fill", function(d,i) { return color((i)); })
                .text(function(d) {return d.span;});
            
        // NODES
        var node = group.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(circleData)
            .enter().append("g")
            .attr("transform",function(d){ var translate = "translate("+ xScale(d.x) +","+ yScale(d.y) +")";return translate});
        
        node.append("circle")
            .attr("class", "ripple")
            .attr("r", 15)
            .attr("fill", function(d,i) { return color((i)); })
            .style("opacity",0);

        // NODES CIRCLES
        node.append("circle")
            .attr("r", 20)
            .attr("fill", function(d,i) { return color(i); })
            .style("opacity",0)
            .on("mouseover", function(d,i) {
                svg.select("#titre")
                    .call(wrapTitle, (langue === 'FR')?descriptions[i].titre:descriptions[i].title,(3*innerwidth/4),innerheight/3-80,innerwidth/4,color(i) )
                    .transition()
                    .duration(750)
                    .ease(d3.easeQuadIn)
                    .attr("opacity", 1);
                svg.select("#box") // texte, posx, width 
                    .call(wrapBox,(langue === 'FR')?descriptions[i].texte:descriptions[i].text,(3*innerwidth/4), innerheight/3, innerwidth/4)
                    .transition()
                    .duration(750)
                    .ease(d3.easeQuadIn)
                    .attr("opacity", 1);
            })
            .on("mouseout", function() {
                svg.select("#titre")
                    .transition()
                    .duration(150)
                    .ease(d3.easeQuadIn)
                    .attr("opacity", 0);
                svg.select("#box")
                    .transition()
                    .duration(150)
                    .ease(d3.easeQuadIn)
                    .attr("opacity", 0);
            })
            .transition()
                .delay(function(d,i) { return i*500; })
                .duration(1000)
                .style("opacity",1)

        // NODES TEXT   
        node.append("text")
            .text(function(d) {return d.name;})
            .attr('x', 0)
            .attr('y', -30)
            .attr("text-anchor","middle")
            .attr("font-size", "20px")
            .attr("fill", function(d,i) { return color(i); });

        // draw ripples
        d3.interval( () => {
            svg.selectAll('.ripple')
                .attr("r", 20)
                .style("opacity", 1)
                .transition()
                    //.delay(Math.pow(i, 2.5) * 50)
                    .duration(2500)
                    .ease(d3.easeCubic)
                    .attr("r", 30)
                    .style("opacity", 0)
            },
            3000
        );
            
        /*d3.timeout(
            () => {
                this.renderMethode();
            }, 5000
        )

        d3.timeout(
            () => {
                this.renderCycleDeVie();
            }, 10000
        )

        d3.timeout(
            () => {
                this.renderCourbeCroissance();
            }, 13000
        )*/
        
        this.setState({innerwidth:innerwidth,innerheight:innerheight,svg:svg });

    }
 
    render() {

        const {langue} = this.props;

        const {width,height} = this.props;
        const viewbox = "0 0 " + width + " " + height;

        //width: 'calc(100% - 20vw)'

        // `translate3d(0, ${this.props.style.y}px, 0) scale(${scale})`

        return (
            <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>

                <h2 style={{display:'flex',fontSize:35, justifyContent:'center',marginTop:50}}>
                    {(langue === 'FR') ? "Cycles de vie de l'entreprise" : "Business Lifecycles"}
                </h2>

                <svg style={{width:'80vw',height:'75vh',backgroundColor:'white',
                    boxShadow: 'inset 5px 5px 10px rgba(0,0,0,.5),inset -5px -5px 10px rgba(0,0,0,.5)',
                    borderRadius: 10
                    //boxShadow: '5px 5px 5px rgba(255,255,255,.8),-5px -5px 5px rgba(255,255,255,.8)'
                    }} viewBox={viewbox}>
                    <g ref="anchor" width={width} height={height} />
                </svg>

                {
                    (langue === 'FR') 
                    ? <p>Placez le curseur sur un des cycles de vie pour afficher sa description</p>
                    : <p>Move the cursor on one of the pulsing circles (cycles) to see its description</p>
                }

                <div style={{
                    //backgroundColor:"black",
                    padding:20}}>
                    
                    <div style={{width:'80vw',margin:'0 auto',textAlign:'left',color:'white',fontFamily:"Lustria",fontSize:'1.3em',fontStyle: "italic"}}>
                        “Toute compagnie qui démarre doit faire face à certains défis et le principal défi 
                        d'une firme expert/conseil en services financiers telle que la nôtre, est de 
                        positionner ses services en fonction des besoins du client. 
                        Au fur et à mesure que nous travaillions sur les problèmes de notre clientèle, 
                        nous avions remarqué comment certains services s'agençaient mieux avec les stades 
                        d'évolution de nos clients. Et c'est ainsi que nous avons catégorisé les services 
                        selon les cycles de vie de l'entreprise. Pour nous, c'était la logique même. 
                        C'est une situation gagnante pour notre équipe et pour nos clients car nous réalisons pour eux 
                        ce que nous réalisons pour nous mêmes: plus de structure, plus d'efficacité et une meilleure gestion.”
                    </div>

                    <div style={{width:'calc(100% - 20vw)',margin:'0 auto',paddingTop:10,color:'white',fontSize:'2em',textAlign:'right'}}>
                        Pierre & Guy
                    </div>

                    <br />

                    <div style={{width:'calc(100% - 20vw)',margin:'0 auto',fontSize:18, padding: 20, backgroundColor:'white', color:'black',textAlign:'center',
                        boxShadow:'0px 0px 0px 0px #eee',
                        borderRadius:0}}>
                        Alors sans plus tarder, vous pouvez répondre ici même à la question 4 du questionnaire. 
                        Vous aurez le loisir de changer la réponse par la suite surtout après avoir consulter la liste des services.
                        <SituationList />
                    </div>
                </div>

            </div>
        )
            
    } 

}

export default Cycles;