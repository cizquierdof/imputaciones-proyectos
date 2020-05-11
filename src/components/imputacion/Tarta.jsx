import React, { PureComponent } from 'react';
import {PieChart, Pie,  Cell,} from 'recharts';



const COLORS = ['#db2828', '#2185d0'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {

  render() {
    //console.log('datos tarta',this.props.data)
    return (
      <PieChart width={150} height={200}>
        <Pie
          data={this.props.data}
          cx={55}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          animationDuration={1000}
        >
          {
            this.props.data.map(
              (entry, index) => 
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            )
          }
        </Pie>
      </PieChart>
    );
  }
}
