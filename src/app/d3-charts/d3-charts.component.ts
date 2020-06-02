import { Component, OnInit } from "@angular/core";
import {
  select,
  arc,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
  scalePoint,
} from "d3";

interface populationObject {
  country: string;
  population: number;
}

@Component({
  selector: "app-d3-charts",
  templateUrl: "./d3-charts.component.html",
  styleUrls: ["./d3-charts.component.css"],
})
export class D3ChartsComponent implements OnInit {
  svg: any;
  height: number;
  width: number;
  constructor() {}

  ngOnInit(): void {
    this.svg = select("svg");

    this.height = +this.svg.attr("height");
    this.width = +this.svg.attr("width");
    // this.generateSmileFace();
    // this.generateBarChart();
    this.generateScatteredPlotChart();
  }

  generateSmileFace() {
    //group
    const g = this.svg
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);

    const circle = g
      .append("circle")
      .attr("r", this.height / 2)
      .attr("fill", "yellow")
      .attr("stroke", "black");

    const eyeSpacing = 100;
    const eyeYOffset = -70;
    const eyeRadius = 40;
    const eyebrowWidth = 70;
    const eyebrowHeight = 15;
    const eyebrowYOffset = -70;

    const eyesG = g
      .append("g")
      .attr("transform", `translate(0, ${eyeYOffset})`);

    const leftEye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", -eyeSpacing);

    const rightEye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", eyeSpacing);

    const eyebrowG = eyesG
      .append("g")
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    eyebrowG
      .transition()
      .duration(2000)
      .attr("transform", `translate(0, ${eyebrowYOffset - 50})`)
      .transition()
      .duration(2000)
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    const leftEyebrow = eyebrowG
      .append("rect")
      .attr("x", -eyeSpacing - eyebrowWidth / 2)
      .attr("height", eyebrowHeight)
      .attr("width", eyebrowWidth);

    const rightEyebrow = eyebrowG
      .append("rect")
      .attr("x", eyeSpacing - eyebrowWidth / 2)
      .attr("height", eyebrowHeight)
      .attr("width", eyebrowWidth);

    const mouth = g.append("path").attr(
      "d",
      arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: (Math.PI * 3) / 2,
      })
    );
  }

  renderBarChart(data) {
    const xValue = (d: populationObject) => d.population;
    const yValue = (d: populationObject) => d.country;
    const margin = {
      top: 50,
      right: 50,
      bottom: 70,
      left: 120,
    };

    const innerWidth = this.width - margin.left - margin.right;
    const innerHeight = this.height - margin.top - margin.bottom;

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    // To make it 1.0Billion instead of G
    const xAxisTickFormat = (number) => format(".3s")(number).replace("G", "B");

    const yAxis = axisLeft(yScale);
    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      //Add this to make the ticks bars from bottom till up so as to make it more readible
      .tickSize(-innerHeight);

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // yAxis(g.append("g"));
    //Shorthand in d3 to call the function
    const yAxisG = g
      .append("g")
      .style("font-size", "1.2em")
      .style("font-family", "sans-serif")
      .call(yAxis);
    //used to select multiple dom elements using multiple selectors
    yAxisG
      .selectAll(".domain, .tick line")
      //and then removing those selected dom elements
      .remove();

    //Transform the xAxis to the bottom of the chart by using transform innerHeight else
    //by default it comes at the top

    const xAxisG = g
      .append("g")
      .style("font-size", "1.2em")
      .style("font-family", "sans-serif")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    //used to select multiple dom elements using single selector
    xAxisG.select(".domain").remove();

    //Text Main
    yAxisG.selectAll(".tick text").attr("fill", "#635F5D");
    xAxisG.selectAll(".tick text").attr("fill", "#635F5D");

    //Line Grey Accent
    xAxisG.selectAll(".tick line").attr("stroke", "#C0C0BB");
    //Append the xAxis Legend
    xAxisG
      .append("text")
      //TODO: class is not working - need to check
      // .attr("class", "axis-label")
      .text("Population")
      .attr("y", 50)
      .attr("x", innerWidth / 2)
      .attr("fill", "#8e8883")
      .style("font-size", "1.5em")
      .style("font-family", "sans-serif");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue");

    g.append("text")
      .text("Top 10 Most Populous Countries")
      .attr("y", -10)
      .style("font-size", "1.5em")
      .style("font-family", "sans-serif");
  }

  renderScatteredPlotChart(data) {
    const xValue = (d: populationObject) => d.population;
    const yValue = (d: populationObject) => d.country;
    const margin = {
      top: 50,
      right: 50,
      bottom: 70,
      left: 120,
    };

    const innerWidth = this.width - margin.left - margin.right;
    const innerHeight = this.height - margin.top - margin.bottom;

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])
      .nice();

    const yScale = scalePoint()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.7);

    // To make it 1.0Billion instead of G
    const xAxisTickFormat = (number) => format(".3s")(number).replace("G", "B");

    const yAxis = axisLeft(yScale).tickSize(-innerWidth);
    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      //Add this to make the ticks bars from bottom till up so as to make it more readible
      .tickSize(-innerHeight);

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // yAxis(g.append("g"));
    //Shorthand in d3 to call the function
    const yAxisG = g
      .append("g")
      .style("font-size", "1.2em")
      .style("font-family", "sans-serif")
      .call(yAxis);
    //used to select multiple dom elements using multiple selectors
    yAxisG
      .selectAll(".domain")
      //and then removing those selected dom elements
      .remove();

    //Transform the xAxis to the bottom of the chart by using transform innerHeight else
    //by default it comes at the top

    const xAxisG = g
      .append("g")
      .style("font-size", "1.2em")
      .style("font-family", "sans-serif")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    //used to select multiple dom elements using single selector
    xAxisG.select(".domain").remove();

    //Text Main
    yAxisG.selectAll(".tick text").attr("fill", "#635F5D");
    xAxisG.selectAll(".tick text").attr("fill", "#635F5D");

    //Line Grey Accent
    xAxisG.selectAll(".tick line").attr("stroke", "#C0C0BB");
    yAxisG.selectAll(".tick line").attr("stroke", "#C0C0BB");
    //Append the xAxis Legend
    xAxisG
      .append("text")
      //TODO: class is not working - need to check
      // .attr("class", "axis-label")
      .text("Population")
      .attr("y", 50)
      .attr("x", innerWidth / 2)
      .attr("fill", "#8e8883")
      .style("font-size", "1.5em")
      .style("font-family", "sans-serif");

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", 18)
      .attr("fill", "steelblue");

    g.append("text")
      .text("Top 10 Most Populous Countries")
      .attr("y", -10)
      .style("font-size", "1.5em")
      .style("font-family", "sans-serif");
  }

  loadCsvData() {
    return new Promise((resolve, reject) => {
      csv("../../assets/countries-population.csv").then((data) => {
        let parsedData = [];
        console.log(data);
        data.forEach((d) => {
          parsedData.push({
            country: d.country,
            population: +d.population * 1000,
          });
          // const populationInNum: number = +d.population * 1000;
          // d.populationInNum = populationInNum as number;
        });
        console.log(parsedData);
        resolve(parsedData);
      });
    });
  }

  async generateBarChart() {
    let parsedData = await this.loadCsvData();
    this.renderBarChart(parsedData);
  }

  async generateScatteredPlotChart() {
    let parsedData = await this.loadCsvData();
    this.renderScatteredPlotChart(parsedData);
  }
}
