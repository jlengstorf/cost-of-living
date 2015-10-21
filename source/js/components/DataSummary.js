import React, {Component} from 'react';
import {formatMoney as format} from 'accounting';
import debug from 'debug';
const log = debug('components/DataSummary');

class DataSummary extends Component {

  constructor (props) {
    super(props);

    this.state = {
      averages: {
        lease: 0,
        travel: 0,
      },
      savings: 0,
    };
  }

  getCostBreakdown (type) {
    const total = this.props[type][this.props[type].length - 1];
    const months = this.props[type].length;
    const average = Math.round(total / months);

    const totalFormatted = format(total, '$', 0);
    const averageFormatted = format(average, '$', 0);

    const label = (type === 'lease') ? 'Lease or Mortgage' : 'Travel (average)';

    return `${label}: ${averageFormatted}/month (${totalFormatted}/year)`;
  }

  getCostSavings () {
    const totalLease = this.props.lease[this.props.lease.length - 1];
    const totalTravel = this.props.travel[this.props.travel.length - 1];

    let savings = 0;
    let savingsText = '';

    if (totalLease > totalTravel) {
      savings = format(totalLease - totalTravel, '$', 0);
      savingsText = `You could save ${savings}/year by traveling the world.`;
    } else if (totalLease === totalTravel) {
      savingsText = 'You could travel the world for the same amount you pay to live now.';
    } else {
      savings = format(totalTravel - totalLease, '$', 0);
      savingsText = `Looks like it would cost an extra ${savings}/year for you to travel.`;
    }

    return savingsText;
  }

  render () {
    const leaseText = this.getCostBreakdown('lease');
    const travelText = this.getCostBreakdown('travel');
    const savingsText = this.getCostSavings();

    return (
      <div className="cost-of-living__summary">
        <ul className="cost-of-living__summary-list">
          <li className="cost-of-living__summary-item">
            {leaseText}
          </li>
          <li className="cost-of-living__summary-item">
            {travelText}
          </li>
          <li className="cost-of-living__summary-item">
            <strong>{savingsText}</strong>
          </li>
        </ul>
      </div>
    );
  }

}

DataSummary.defaultProps = {
  lease: [],
  travel: [],
};

export default DataSummary;
