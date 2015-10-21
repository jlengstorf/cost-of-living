import React, {Component} from 'react';

class NumberInput extends Component {

  render () {
    return (
      <li className="cost-of-living__input-item">
        <label className="cost-of-living__input-group">
          {this.props.labelValue}
          {!!this.props.toolTip &&
            (
              <span
                className="cost-of-living__tooltip"
                data-tooltip={this.props.toolTip}
              >?</span>
            )
          }
          <input
            name={this.props.inputName}
            type="number"
            defaultValue={this.props.inputValue}
            onChange={this.props.inputHandler}
          />
        </label>
      </li>
    );
  }

}

NumberInput.propTypes = {
  labelValue: React.PropTypes.string.isRequired,
  toolTip: React.PropTypes.string,
  inputName: React.PropTypes.string.isRequired,
  inputValue: React.PropTypes.number.isRequired,
  inputHandler: React.PropTypes.func.isRequired,
}

NumberInput.defaultPropTypes = {
  toolTip: false,
};

export default NumberInput;
