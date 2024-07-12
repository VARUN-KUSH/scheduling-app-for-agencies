import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import '@atlaskit/css-reset';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import theme from './muiCustomTheme';
import colors from './colorPallete';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ScThemeProvider theme={colors}>
				<MuiThemeProvider theme={theme}>
					<App />
				</MuiThemeProvider>
			</ScThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
