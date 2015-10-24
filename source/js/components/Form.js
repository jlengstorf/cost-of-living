import React from 'react';
import classnames from 'classnames';

function InputList(props) {
  return (
    <ul className="cost-of-living__input-list">
      {props.children}
    </ul>
  );
}

function NumberInput(props) {
  return (
    <li className="cost-of-living__input-item">
      <label className="cost-of-living__input-group">
        {props.label}
        {!!props.tooltip &&
          (
            <span
              className="cost-of-living__tooltip"
              data-tooltip={props.tooltip}
            >?</span>
          )
        }
        <input
          name={props.inputName}
          type="number"
          defaultValue={props.inputValue}
          onChange={props.callback}
        />
      </label>
    </li>
  );
}

function RadioGroup(props) {
  return(
    <li className="cost-of-living__input-item cost-of-living__input-item--radio">
      <div className="cost-of-living__input-group">
        {props.children}
      </div>
    </li>
  );
}

/**
 * Creates a React component that displays a radio input
 *
 * @param {object} props    config properties
 *  - selected  {string}    the currently-selected input value
 *  - label     {string}    the text label for display
 *  - value     {string}    the input value
 *  - callback  {function}  the function to call on change
 *
 * @return React.Component
 */
function RadioInput(props) {
  const isSelected = props.selected === props.value;
  const classes = classnames({
    'cost-of-living__radio-label': true,
    'cost-of-living__radio-label--selected': isSelected,
  });

  return (
    <label className={classes}>
      <input
        name="cost-toggle"
        type="radio"
        value={props.value}
        checked={isSelected}
        onChange={props.callback}
      /> {props.label}
    </label>
  );
}

export {
  InputList,
  NumberInput,
  RadioGroup,
  RadioInput,
};
