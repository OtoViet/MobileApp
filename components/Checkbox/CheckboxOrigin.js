import * as React from 'react';
import { Checkbox } from 'react-native-paper';

const CheckboxOrigin = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
  );
};

export default CheckboxOrigin;