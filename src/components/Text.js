import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleSimple = (props) => (
  <div>
  <br/>
    <TextField
      hintText="Hint Text"
      floatingLabelText="Fixed Floating Label Text"
			floatingLabelFixed={true}/>
		<br/>
  </div>
);

export default TextFieldExampleSimple;