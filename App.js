import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from './theme';
import Screens from './screens';

export default function App() {
  return (
    <PaperProvider theme={Theme.Theme}>
    <Screens />
    </PaperProvider>
  );
}