import React, {Component} from 'react';

class TextInput extends Component {

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
              />
            )
          }
          <input
            name={this.props.inputName}
            type="text"
            defaultValue={this.props.inputValue}
            onChange={this.props.inputHandler}
          />
        </label>
      </li>
    );
  }

}

TextInput.propTypes = {
  labelValue: React.PropTypes.string.isRequired,
  toolTip: React.PropTypes.string,
  inputName: React.PropTypes.string.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  inputHandler: React.PropTypes.func.isRequired,
}

TextInput.defaultPropTypes = {
  toolTip: false,
};

export default TextInput;
