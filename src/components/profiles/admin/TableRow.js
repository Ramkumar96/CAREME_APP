import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.FirstName}
          </td>
          <td>
            {this.props.obj.LastName}
          </td>
          <td>
            {this.props.obj.Location}
          </td>
          <td>
            {this.props.obj.Tel}
          </td>
          <td>
            {this.props.obj.Email}
          </td>
        </tr>
    );
  }
}

export default TableRow;