import React, {Component} from 'react';
import {formatMoney as format} from 'accounting';

class TableCell extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let showFlight = false;
    let flightText = '';
    if (this.props.flight > 0) {
      showFlight = true;
      flightText = `${format(this.props.flight, '$', 0)}`;
    }

    return (
      <td colSpan={this.props.months}>
        <strong>{this.props.city}</strong>
        <span className="travel-cost__icon travel-cost__icon--rent">
          {format(this.props.cost, '$', 0)}/mo.
        </span>
        {showFlight &&
        <span className="travel-cost__icon travel-cost__icon--flight">
          {flightText}
        </span>
        }
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
