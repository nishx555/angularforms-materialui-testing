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
    this.generateBarChart();
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
      top: 20,
      right: 50,
      bottom: 20,
      left: 80,
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

    const yAxis = axisLeft(yScale);
    const xAxis = axisBottom(xScale);

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // yAxis(g.append("g"));
    //Shorthand in d3 to call the function
    g.append("g").call(yAxis);
    //Transform the xAxis to the bottom of the chart by using transform innerHeight else
    //by default it comes at the top
    g.append("g").call(xAxis).attr("transform", `translate(0,${innerHeight})`);

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue");
  }

  generateBarChart() {
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

      this.renderBarChart(parsedData);
    });
  }
}
