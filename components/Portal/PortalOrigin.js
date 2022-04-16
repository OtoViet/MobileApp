import * as React from 'react';
import { Portal, Text } from 'react-native-paper';

const PortalOrigin = () => (
  <Portal>
    <Text>This is rendered at a different place</Text>
  </Portal>
);

export default PortalOrigin;