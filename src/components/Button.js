import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const RaisedButtonExampleSimple = (props) => (
  <div>
    <RaisedButton onClick={props.handleClick} label={props.label} style={style} />
  </div>
);

export default RaisedButtonExampleSimple;