import React, {Component} from 'react';
import {formatMoney} from 'accounting';

class TableCell extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let flightText = '';
    if (this.props.flight > 0) {
      flightText = ` plus a ${formatMoney(this.props.flight)} plane ticket`;
    }

    return (
      <td colSpan={this.props.months}>
        {this.props.city} ({formatMoney(this.props.cost)}/month + {flightText})
      </td>
    );
  }

}

TableCell.defaultProps = {
  months: 0,
  city: '',
  cost: 0,
  flight: 0,
};

export default TableCell;
