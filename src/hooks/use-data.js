import { initialData } from 'initial-data';

const APP_VERSION = '1.0.7';

const getLocalData = () => {
	const storedAppVersion = JSON.parse(localStorage.getItem('APP_VERSION'));

	if (storedAppVersion && storedAppVersion === APP_VERSION) {
		const localStorageData = JSON.parse(localStorage.getItem('data'));
		if (localStorageData) {
			return localStorageData;
		}
		return initialData;
	} else {
		localStorage.clear();
		localStorage.setItem('APP_VERSION', JSON.stringify(APP_VERSION));
		return initialData
	}
};

export default function useData() {
	const data = getLocalData();
	return data;
}
