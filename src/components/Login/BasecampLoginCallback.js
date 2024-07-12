import axios from 'axios';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const BasecampLoginCallback = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const code = queryParams.get('code');
	const token = localStorage.getItem('red_wing_token');
	const token_expiry_date = localStorage.getItem('red_wing_token_expiry_date');

	useEffect(() => {
		if (!token || token === 'undefined' || new Date(token_expiry_date) <= new Date()) {
			axios
				.post(`${process.env.REACT_APP_API_URL}/pages/get_token.php`, { code: code })
				.then(data => {
					localStorage.setItem('red_wing_token', data.data.access_token);
					var now = new Date();
					localStorage.setItem(
						'red_wing_token_expiry_date',
						new Date(now.getTime() + data.data.expires_in * 1000)
					);
					window.location.href = '/team-work';
				});
		}
	}, [code, token, token_expiry_date]);

	if (token && token !== 'undefined' && new Date(token_expiry_date) > new Date()) {
		return <Redirect to='/team-work' />;
	} else {
		return null;
	}
};

export default BasecampLoginCallback;
