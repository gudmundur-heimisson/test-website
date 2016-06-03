//import { d3 } from 'd3'
import * as d3 from 'd3'
export class chart {
  private _group: d3.Selection<any>;
    
  constructor(container: any) {
    this.init(container);
  }

  private init(container: any) {
    this._group = d3.select(container).append('g');
  }
}
