const getLocalData = () => {
	const localStorageData = JSON.parse(localStorage.getItem('color'));

	if (localStorageData) {
		return localStorageData;
	} else {
		return true;
	}
};

export default function useCss() {
	const data = getLocalData();
	return data;
}
