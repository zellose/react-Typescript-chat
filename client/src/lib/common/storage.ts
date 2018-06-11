
const storage = {
	set: (key:string, object: any) => {
		if(!localStorage) return;
		localStorage[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
	},

	get: (key: string) => {
		if(!localStorage) return null;

		if(!localStorage[key]) {
			return null;
		}

		try {
			const parsed = JSON.parse(localStorage[key]);
			return parsed;
		} catch(e) {
			return localStorage[key];
		}
	},

	remove: (key: string) => {
		if(!localStorage) return null;

		if(localStorage[key]) {
			return localStorage.removeItem(key);
		}
	}
};

export default storage;