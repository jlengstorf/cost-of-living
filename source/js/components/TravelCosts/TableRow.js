import React, {Component} from 'react';

import TableCell from './TableCell';

class TableRow extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <tr>
        <th>{this.props.rowHeader}</th>
        {this.props.travelCosts.map(stop => {
          return (
            <TableCell {...stop} />
          );
        })}
      </tr>
    );
  }

}

TableRow.defaultProps = {
  rowHeader: '',
  travelCosts: [],
};

export default TableRow;
