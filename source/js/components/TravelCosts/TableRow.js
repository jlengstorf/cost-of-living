import React, {Component} from 'react';

import TableCell from './TableCell';

class TableRow extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <tr className={this.props.active && 'active-row' || ''}>
        <th>{this.props.rowHeader}</th>
        {this.props.travelCosts.map((stop, index) => {
          return (
            <TableCell key={index} {...stop} />
          );
        })}
      </tr>
    );
  }

}

TableRow.defaultProps = {
  active: false,
  rowHeader: '',
  travelCosts: [],
};

export default TableRow;
