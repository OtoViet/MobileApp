import {
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const theme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: '#202C45',
        accent: '#f1c40f',
        secondary: '#E81C2E'
    },
};
export default theme;