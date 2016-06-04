import * as d3 from 'd3'
import { redditObject, redditChild } from 'reddit'
export class chart {
    private _group: d3.Selection<Element>;
    private _paddingLeft = 60;
    private _paddingBottom = 30;
    private _paddingTop = 30;
    private _height: number;
    private _xScale: d3.time.Scale<number, number>;
    private _yScale: d3.scale.Linear<number, number>;
    private _xAxisGroup: d3.Selection<Element>;
    private _yAxisGroup: d3.Selection<Element>;
    private _xAxis: d3.svg.Axis;
    private _yAxis: d3.svg.Axis;

    constructor(container: any) {
        this.init(container);
        this.update()
    }

    private init(container: any) {
        let selection = d3.select(container);
        let node: Element = <Element>selection.node();
        let width = node.clientWidth;
        let height = node.clientHeight;
        this._height = height;
        this._group = selection.append('svg')
            .attr({
                'width': width,
                'height': height
            })
            .append('g');
        this.draw(width, height);
    }

    public draw(width: number, height: number) {
        this.drawXAxis(width);
        this.drawYAxis(height);
    }

    private drawYAxis(height: number) {
        let yScale = d3.scale.linear();
        this._yScale = yScale;
        yScale.domain([0, 1]);
        yScale.range([height - this._paddingBottom, 0]);
        let yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left');
        this._yAxis = yAxis;
        this._yAxisGroup = this._group.append('g');
        this._yAxisGroup.call(yAxis)
            .attr({
                'transform': `translate(${this._paddingLeft}, 0)`
            });
    }

    private drawXAxis(width: number) {
        let xScale = d3.time.scale();
        this._xScale = xScale;
        let endDate = new Date(2015, 0, 0);
        let beginDate = new Date(2014, 0, 0);
        xScale.domain([beginDate, endDate]);
        xScale.range([0, width - this._paddingLeft]);
        let xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');
        this._xAxis = xAxis;
        this._xAxisGroup = this._group.append('g');
        this._xAxisGroup.call(xAxis)
            .attr({
                'transform': `translate(${this._paddingLeft}, ${this._height - this._paddingBottom})`
            });
    }

    private update() {
        d3.json('http://api.reddit.com/', (error: any, data: redditObject) => {
            let children = data.data.children;
            let [minCreatedSeconds, maxCreatedSeconds] = d3.extent(children, c => c.data.created);
            let minDate = new Date(minCreatedSeconds);
            let maxDate = new Date(maxCreatedSeconds);
            this._xScale.domain([minDate, maxDate]);
            this._xAxisGroup.call(this._xAxis);
            
            let [minScore, maxScore] = d3.extent(children, c => c.data.score);
            this._yScale.domain([minScore, maxScore]);
            this._yAxisGroup.call(this._yAxis);
            
            var dataGroup = this._group.append('g');
            dataGroup.selectAll('.post')
              .data(children)
              .enter()
              .append('circle')
              .classed('post', true)
              .attr({
                  'r': 2,
                  'cx': (d: redditChild, i: number) => this._xScale(new Date(d.data.created)),
                  'cy': (d: redditChild, i: number) => this._yScale(d.data.score),
                  'transform': `translate(${this._paddingLeft}, 0)`
              })
        })
    }
}
