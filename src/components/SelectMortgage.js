import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
  <MenuItem value={'30 Year Fixed Conventional'} primaryText={'30 Year Fixed Conventional'} />,
  <MenuItem value={'15 Year Fixed Conventional'} primaryText={'15 Year Fixed Conventional'} />,
  <MenuItem value={'10 Year Fixed Conventional'} primaryText={'10 Year Fixed Conventional'} />
];
/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class DropDownMenuLongMenuExample extends Component {
  state = {
    value: "",
  };

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.changeMortgage(event.target.innerText)
  };

  render() {
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange}
        maxHeight={200}
        floatingLabelText="Mortgage Type (if applicable)"
        floatingLabelStyle={{ color: '#000' }}
        floatingLabelFocusStyle={{ color: '#000' }}
        underlineFocusStyle={{ borderColor: '#000' }}

      >
        {items}
      </SelectField>
    );
  }
}