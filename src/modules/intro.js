import React, { Component } from 'react';
import * as d3 from 'd3';

class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            svg:{},
            innerwidth:0,
            innerheight:0
        };
        this.renderMethode      = this.renderMethode.bind(this);
        this.renderCycleDeVie  = this.renderCycleDeVie.bind(this);
        this.renderCourbeCroissance  = this.renderCourbeCroissance.bind(this);
    }

    renderMethode = () => {

        const titre = this.props.langue === 'FR' 
            ? "Notre méthodologie vous aidera ..."
            : "Our methods will help you ...";

        const {
            innerwidth, innerheight, svg
        } = this.state;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var radius = 125;

        var cdata = [
            {x: innerwidth/2,           y:innerheight/2-radius,     xtext:0,ytext:-25,    r:20, delay:1000, color:'#69c242', nom:'Interne',name:'Internal'},
            {x: innerwidth/2+radius,    y:innerheight/2,         xtext:60,ytext:5,     r:20,delay:1000, color:'#64bbe3', nom:'Externe',name:'External'},
            {x: innerwidth/2,           y:innerheight/2+radius,     xtext:0,ytext:35,     r:20, delay:1000, color:'#ffcc00', nom:'Stratégie',name:'Strategy'},
            {x: innerwidth/2-radius,    y:innerheight/2,         xtext:-50,ytext:5,    r:20,delay:1000, color:'#ff7300', nom:'Futur',name:'Future'},
        ]

        const newCircleData = cdata.map((_,i) => {
            return {
                name: this.props.langue === 'FR' ? _.nom  : _.name,
                x: _.x,
                y: _.y,
                xtext: _.xtext,
                ytext: _.ytext,
                r: _.r
            }
        });

        const data = d3.range(180,420).map(function(i){ return {
            x: radius*Math.cos(((i+90)*3)*Math.PI/180)+innerwidth/2,
            y: radius*Math.sin(((i+90)*3)*Math.PI/180)+innerheight/2
        }});

        const spinnerData = d3.range(0,90).map(function(i){ return {
            x: radius*Math.cos((i)*Math.PI/180)+innerwidth/2,
            y: radius*Math.sin((i)*Math.PI/180)+innerheight/2
        }});

        var plotline = d3.line()
            .curve(d3.curveNatural)
            .x(function(d) {return d.x;})
            .y(function(d) {return d.y;});

        var line = svg.selectAll("#line").datum(data).attr("id","line");
        var line2 = svg.selectAll("#line2").datum(spinnerData).attr("id","line2");

        line
            .transition().duration(1500)
            .attr("d",plotline)
            .style("stroke", function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); })
            .style("stroke", "lightblue")
            .style("stroke-width", 6);

        line2
            .attr("d", plotline)
            .attr("opacity", 0)
            .transition().delay(1500).duration(2000)
            .attr("opacity", 1)
            .style("stroke", function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); })
            .style("stroke", "darkblue")
            .style("stroke-width", "2px")
            .style("fill", "none");

        // HANDLE TITRE
        var gtitre = svg.selectAll(".titre")
            //.transition().duration(1000)
            .attr('font-size','30px')            
            .attr('transform','translate(0,-10)')
            .attr('opacity',0)
            .transition().duration(1000)
            .attr('transform','translate(0,-15)')
            .attr('opacity',1)
            .text(titre)

        // HANDLE NEW NODES
        var nodes = svg.selectAll(".nodes");
        var gnodes = nodes.selectAll("g").data(newCircleData).attr("class","nodes");

        gnodes
            .transition()
            .duration(1000)
            .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"})
            .select("circle")
                .transition()
                .delay(1000).duration(1000)
                .attr("r",function(d){return d.r;});

        gnodes.select("text")
            .transition()
            .delay(1000).duration(1000)
            .attr('font-size','18px')
            .attr('x', function(d) {return d.xtext;})
            .attr('y', function(d) {return d.ytext;})
            .text(function(d){return d.name;});
            
        svg.selectAll("#line").exit().remove();
        gnodes.exit().remove();

        var t0 = Date.now();

        d3.timer(function () {
            var delta = Date.now() - t0;
            svg.selectAll('#line2')
              .attr('transform', function (d) {return 'translate('+(innerwidth/2)+','+(innerheight/2)+')rotate(' + 90 + delta * 50 / 200 + ')translate('+(-innerwidth/2)+','+(-innerheight/2)+')';});
        });
        
    }

    renderCycleDeVie = () => {

        /*const titre = this.props.langue === 'FR' 
            ? "à sortir du cycle de vie des entreprises et ..."
            : "exit the enterprise lifecycle ...";*/

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
        var gtitre = svg.selectAll(".titre")
            .attr('font-size','30px')
            .attr('transform','translate(0,-10)')
            .attr('opacity',0)
            .transition().delay(1000).duration(1000)
            .attr('transform','translate(0,-15)')
            .attr('opacity',1)
            //.text(titre)

        // PERIODE X - AXIS
        /*var xAxisLabels = svg.selectAll('text')
            .data(circleData).enter()
            .append('text')
                .attr("class","xAxisLabels")
                .attr("text-anchor","middle")
                .attr('x', function(d) {return xScaleCurve(d.x);})
                .attr('y', function(d) {return innerheight+40;})
                .attr('font-size', "14px")
                .attr("fill", function(d,i) { return color((i)); })
                //.text(function(d) {return d.span;})
                .style("opacity", 0);*/

        
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
            //.text(function(d) {return d.name;});
        
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

        var l = svg.selectAll(".xAxisLabels")
            .transition()
            .delay(1500)
            .duration(1000)
            .style("opacity", 1)
            //.attr("transform","translate(0,10)");

    }

    renderCourbeCroissance = () => {

        const titre = this.props.langue === 'FR' 
            ? "emprunter à nouveau le cycle de croissance !"
            : "and hop on the growth curve again !";

        const { innerwidth, innerheight, svg } = this.state;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var lifeCycleData = [
            {x:0,       nom:"démarrage",            name:"startup",           span_f:"de 0 à 6 mois",       span_e:"from 0 to 6 months",      r:20}, 
            {x:60,      nom:"court terme",          name:"short term",        span_f:"de 6 mois à 1 an",    span_e:"from 6 months to 1 year", r:20}, 
            {x:120,     nom:"moyen terme",          name:"middle term",       span_f:"de 1 à 3 ans",        span_e:"from 1 to 3 year",        r:20}, 
            {x:180,     nom:"excellence",           name:"excellence",        span_f:"de 3 à 5 ans",        span_e:"from 3 to 5 year",        r:20},
            {x:240,     nom:"croissance accrue",    name:"organic growth",    span_f:"après 5 ans",         span_e:"after 5 years",           r:20},
        ];

        const circleData = lifeCycleData.map((_,i) => {
            return {
                name: this.props.langue === 'FR' ? _.nom : _.name,
                span: this.props.langue === 'FR' ? _.span_f : _.span_e,
                r:      _.r,
                x:      _.x,
                y:      Math.pow(_.x,2),
                ytext:  -30,
                xtext:  0
            }
        });

        const linedata = d3.range(0,240).map(function(i){ return {
            x: i,
            y: Math.pow(i,2)
        }});

        var xScale = d3.scaleLinear()
            .range([0,innerwidth])
            .domain(d3.extent(circleData, function(d) {return d.x;}))
        var yScale = d3.scaleLinear()
            .range([innerheight,0])
            .domain(d3.extent(circleData, function(d) {return d.y;}))

        var xScaleCurve = d3.scaleLinear()
            .range([0,innerwidth])
            .domain(d3.extent(linedata, function(d) {return d.x;}))
        var yScaleCurve = d3.scaleLinear()
            .range([innerheight,0])
            .domain(d3.extent(linedata, function(d) {return d.y;}))

        // CURVE for MappedData
        const plotline = d3.line()
            .curve(d3.curveNatural)
            .x(function(d) {return xScaleCurve(d.x);})
            .y(function(d) {return yScaleCurve(d.y);})

        var line = svg.selectAll("#line").datum(linedata).attr("id","line");

        line
            .transition().duration(1500)
            .attr("d",plotline)
            .style("opacity", 1)
            .style("stroke", function(){ return '#'+Math.floor(Math.random()*16777215).toString(16); })
            .style("stroke", "lightblue")
            .style("stroke-width", 6);

        // HANDLE TITRE
        /*var gtitre = svg.selectAll(".titre")
            .attr('font-size','30px')
            .attr('transform','translate(0,-10)')
            .attr('opacity',0)
            .transition().delay(1000).duration(1000)
            .attr('transform','translate(0,-15)')
            .attr('opacity',1)
            //.text(titre)*/

        // MANUAL X - AXIS
        var xAxisLabels = svg.selectAll('text')
            .data(circleData).enter()
            .append('text')
                .attr("class","xAxisLabels")
                .attr("text-anchor","middle")
                .attr('x', function(d) {return xScaleCurve(d.x);})
                .attr('y', function(d) {return innerheight+40;})
                .attr('font-size', "14px")
                .attr("fill", function(d,i) { return color((i)); })
                //.text(function(d) {return d.span;})
                .style("opacity", 0);

        /*var selection = d3.select("#chart")
            .selectAll(".bar").data(numbers);
        */
        
        var group = svg.select('.nodes')
            .selectAll('g')
            .data(circleData);

        //group.exit().remove();

        var groupEnter = group.enter()
            .append('g')
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"});
            //.attr('class','nodes');

        console.log('groupEnter = group.enter()');

        group.transition()
            .duration(1000)
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .style('opacity',1) 
            .select('circle')
                .transition()
                .duration(2000)
                .attr('r', function (item) { return item.r })
                .style("opacity", 1);

        /*group.transition()
            .delay(1000).duration(1000)
            .select('text')
                .attr('x', function(d) {return d.xtext;})
                .attr('y', function(d) {return d.ytext;})
                //.text(function(item){return item.name;});*/
         
        groupEnter.transition()
            .delay(1000).duration(1000)
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"});
        
        // remove
        //group.exit().remove();

        var l = svg.selectAll(".xAxisLabels")
            .transition()
            .delay(1500)
            .duration(1000)
            .style("opacity", 1)
            //.attr("transform","translate(0,10)");
        
    }

    componentDidMount() {

        const titre = this.props.langue === 'FR' 
            ? "Voici la courbe de cycle de vie de votre entreprise !"
            : "The all too familiar enterprise lifecycle curve !";

        const {width,height} = this.props;

        //const {langue} = this.props.langue;

        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var padding = 100,
            innerwidth = this.props.width - padding - padding,
            innerheight = this.props.height - padding - padding;

        const svg = d3.select(this.refs.anchor);

        var group = svg.append("g");
        
        svg.attr("transform", "translate(" + padding + "," + padding + ")");
        group.attr("transform", "translate(" + 0 + "," + 0 + ")");

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
            .style("opacity", 0.5) 
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
        var totalLength = line2.node().getTotalLength();
        line2.attr("stroke-dasharray", totalLength + " " + totalLength )
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease(d3.easePolyInOut)
            .attr("stroke-dashoffset", 0);

        // TITLE
        var title = svg
            .append('text')
                .attr("class","titre")
                .attr("text-anchor","middle")
                .attr('x', innerwidth/2)
                .attr('y', -20)
                .attr('font-size', "20px")
                .attr("opacity","0")
                .attr("transform","translate(0,-10)")
                .style("fill", "black")
                //.text(titre)
                .transition().duration(1000)
                .attr("opacity","1")
                .attr('transform','translate(0,-15)')

        // MANUAL X - AXIS
        /*var xAxisLabels = group.selectAll('text')
            .data(circleData).enter()
            .append('text')
                .attr("class","xAxisLabels")
                .attr("text-anchor","middle")
                .attr('x', function(d) {return xScale(d.x);})
                .attr('y', function(d) {return innerheight+40;})
                .attr('font-size', "14px")
                .attr("fill", function(d,i) { return color((i)); })
                .text(function(d) {return d.span;});*/
            
        // NODES
        var node = group.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(circleData)
            .enter().append("g")
            .attr("transform",function(d){ var translate = "translate("+ xScale(d.x) +","+ yScale(d.y) +")";return translate});
        
        // NODES CIRCLES
        var circles = node.append("circle")
            .attr("r", 15)
            .attr("fill", function(d,i) { return color((i)); })
            .style("opacity", 0.5);

        // NODES TEXT   
        /*var labels = node.append("text")
            //.text(function(d) {return d.name;})
            .attr('x', 0)
            .attr('y', -20)
            .attr("text-anchor","middle")
            .attr("font-size", "14px")
            .attr("fill", function(d,i) { return color(i); });*/

        var l = group.selectAll(".xAxisLabels")
            //.attr("transform","translate(0,10)")
            .transition()
            .delay(3000)
            .duration(1000)
            .style("opacity", 0);
            
        d3.timeout( () => { this.renderMethode(); }, 5000 )

        d3.timeout(
            () => {
                this.renderCycleDeVie();
            }, 7000
        )

        d3.timeout(
            () => {
                this.renderCourbeCroissance();
            }, 9000
        )
        
        this.setState({innerwidth:innerwidth,innerheight:innerheight,svg:svg });

    }
 
    render() {
        
        const {width,height} = this.props;
        const viewbox = "0 0 " + width + " " + height;

        let w = 100;
        let h = 100;

        return (
            <div style={{width:'15vw',height:'20vh',margin:'200px auto',textAlign:'center'}}>
                <svg className='svg-container2' style={{backgroundColor:''}}viewBox={viewbox}>
                    <g ref="anchor" width={width} height={height} />
                </svg>
            </div>
        )
            
    } 

}

export default Intro;