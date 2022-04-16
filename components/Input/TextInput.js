import * as React from 'react';
import { TextInput } from 'react-native-paper';

const TextInputOrigin = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Email"
      mode="outlined"
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};

export default TextInputOrigin;