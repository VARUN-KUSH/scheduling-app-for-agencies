import { createTheme } from '@material-ui/core/styles';
import color from './colorPallete';

const theme = createTheme({
	palette: {
		primary: {
			main: color.primary
		},
		secondary: {
			main: color.secondary
		},
		warning: {
			main: color.tomato
		}
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		useNextVariants: true
	},
	overrides: {
		MuiButton: {
			label: {
				letterSpacing: '2px',
				fontSize: '1.2rem'
			}
		}
	}
});

export default theme;
