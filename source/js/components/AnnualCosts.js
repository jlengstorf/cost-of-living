// # AnnualCosts Component
'use strict';

// Loads React
import React, {Component} from 'react';
import ChartistGraph from 'react-chartist';
import {formatMoney as format} from 'accounting';

class AnnualCosts extends Component {

  render () {
    const props = {
      data: {
        labels: this.props.months,
        series: [
          {
            className: 'series-lease',
            name: 'Cost of a Lease',
            data: this.props.lease,
          },
          {
            className: 'series-travel',
            name: 'Cost of World Travel',
            data: this.props.travel,
          },
        ],
      },
      options: {
        stretch: true,
        low: 0,
        showArea: true,
        fullWidth: true,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : ' ';
          },
        },
        axisY: {
          low: 0,
          labelInterpolationFnc: function(value, index) {
            return format(value, '$', 0);
          },
        },
      },
      type: 'Line',
    };

    return (
      <div className="cost-of-living__graph aligncenter">
        <ChartistGraph {...props} />
        <ul className="cost-of-living__legend">
          <li className="cost-of-living__legend-item cost-of-living__legend-item--lease">
            Lease/Mortgage Cost
          </li>
          <li className="cost-of-living__legend-item cost-of-living__legend-item--travel">
            Travel Cost
          </li>
        </ul>
      </div>
    );
  }

}

AnnualCosts.defaultProps = {

  // Data for the visualization
  months: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],

  lease: [],
  travel: [],
};

export default AnnualCosts;
