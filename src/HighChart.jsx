import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ProductsIndex } from "./ProductsIndex";

export function ChartExample() {
const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [{ProductsIndex}.products],
    type: "pie"
  }]
}

return(
<div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>
)
}