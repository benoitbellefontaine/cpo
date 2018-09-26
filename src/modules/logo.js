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
        this.renderCycleDeVie  = this.renderCycleDeVie.bind(this);
        this.renderCourbeCroissance  = this.renderCourbeCroissance.bind(this);
    }

    renderCycleDeVie = () => {

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
                x: ( _.x ) ,
                y: innerheight + (Math.cos( _.x )),
                r: 20,
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
        
        var group = d3.select('.nodes')
            .selectAll('g')
            .data(circleData);

        var groupEnter = group.enter()
            .append('g')
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .attr('class','nodes');

        groupEnter.append('circle')
            .attr('r', function (item) { return item.r })
            .style('opacity',0)
            .attr("fill", function(d,i) { return color(i); })
            .transition().duration(1000)
            .style('opacity',1);
        
        group.transition()
            .duration(1000)
            .attr("transform", function(d) {return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"})
            .style('opacity',1)
            .select('circle')
                .transition()
                .duration(2000)
                .attr('r', function (item) { return item.r });

        // remove
        group.exit().remove();

    }

    renderCourbeCroissance = () => {

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
                r:      _.r,
                x:      _.x,
                y:      Math.pow(_.x,2),
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

        d3.timeout(
            () => {
                this.renderCycleDeVie();
            }, 3000
        )

        d3.timeout(
            () => {
                this.renderCourbeCroissance();
            }, 5000
        )
        
        this.setState({innerwidth:innerwidth,innerheight:innerheight,svg:svg });

    }
 
    render() {
        
        const {width,height} = this.props;
        const viewbox = "0 0 " + width + " " + height;

        return (
            <div style={{width:'20vw',height:'20vh',margin:'0px auto',textAlign:'center'}}>
                <svg className='svg-container2' style={{backgroundColor:''}}viewBox={viewbox}>
                    <g ref="anchor" />
                </svg>
            </div>
        )
            
    } 

}

export default Intro;