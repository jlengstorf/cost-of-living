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

    const breakdown = {
      text: `${label}:`,
      value: `${averageFormatted}/mo (${totalFormatted}/yr)`,
    };

    return breakdown;
  }

  getCostSavings () {
    const totalLease = this.props.lease[this.props.lease.length - 1];
    const totalTravel = this.props.travel[this.props.travel.length - 1];

    let savings = 0;
    let savingsText = '';
    let savingsValue = '';

    if (totalLease > totalTravel) {
      savings = format(totalLease - totalTravel, '$', 0);
      savingsText = `You could save money by traveling the world:`;
      savingsValue = `${savings}/yr`;
    } else if (totalLease === totalTravel) {
      savingsText = 'You could travel the world for the same amount you pay to live now.';
      savingsValue = false;
    } else {
      savings = format(totalTravel - totalLease, '$', 0);
      savingsText = 'Looks like it would cost extra to travel:';
      savingsValue = `${savings}/yr`;
    }

    return {savingsText, savingsValue};
  }

  render () {
    const lease = this.getCostBreakdown('lease');
    const travel = this.getCostBreakdown('travel');
    const {savingsText, savingsValue} = this.getCostSavings();

    return (
      <div className="cost-of-living__summary">
        <ul className="cost-of-living__summary-list">
          <li className="cost-of-living__summary-item">
            {lease.text}
            <em>{lease.value}</em>
          </li>
          <li className="cost-of-living__summary-item">
            {travel.text}
            <em>{travel.value}</em>
          </li>
          <li className="cost-of-living__summary-item">
            {savingsText}
            <strong>{savingsValue}</strong>
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
