// https://observablehq.com/@d3/sunburst@242
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["taste.json",new URL("./files/taste.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Sunburst`
)});
  main.variable(observer("chart")).define("chart", ["partition","data","d3","color","arc","format","autoBox"], function(partition,data,d3,color,arc,format,autoBox)
{
  const root = partition(data);

  const svg = d3.create("svg");

  svg.append("g")
      .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter(d => d.depth))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("d", arc) .style("opacity", function(d) {
        if( d.data.name == '피트향' || d.data.name == '허브' || d.data.name == '꿀' || d.data.name == '나무향' || d.data.name == '바닐라향' || d.data.name == '탄오크' || d.data.name == '떡갈나무' || d.data.name == '오크' ||d.data.name == '시나몬' || d.data.name == "과일향" || d.data.name == "달콤" || d.data.name == "장미" || d.data.name == "절인사과" || d.data.name == "건과일") {
          return 1.0;
        }else if(d.data.name == "몰트향" || d.data.name == "견과류" || d.data.name == "아몬드"  || d.data.name == "숯불향" || d.data.name == "카라멜"  || d.data.name == "매운향"  || d.data.name == "향신료"
         || d.data.name == "스모키" || d.data.name == "시원한향" || d.data.name == "시트러스" || d.data.name == "레몬") {
          return 0.4;
        } else{
          return 0.1;
        }
      }) 
    .append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 37)
      .attr("font-weight", "bold")
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);

  return svg.attr("viewBox", autoBox).node();
}
);




  main.variable(observer("autoBox")).define("autoBox", function(){return(
function autoBox() {
  document.body.appendChild(this);
  const {x, y, width, height} = this.getBBox();
  document.body.removeChild(this);
  return [x, y, width, height];
}
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("taste.json").json()
)});
  main.variable(observer("partition")).define("partition", ["d3","radius"], function(d3,radius){return(
data => d3.partition()
    .size([2 * Math.PI, radius])
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("radius")).define("radius", ["width"], function(width){return(
width / 2
)});
  main.variable(observer("arc")).define("arc", ["d3","radius"], function(d3,radius){return(
d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
