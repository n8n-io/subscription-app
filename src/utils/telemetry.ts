export default {
	page(category: 'plans' | 'manage', pageName: string) {
		try {
			const rudderanalytics = window.rudderanalytics;
			if (!rudderanalytics) {
				return;
			}

			const urlParams = new URLSearchParams(window.location.search);
			const instanceId = urlParams.get('instanceid') || '';

			const params: { [key: string]: string } = {};
			if (instanceId) {
				params.instance_id = instanceId;
			}

			rudderanalytics.page(category, pageName, params);
		} catch (e: unknown) {
			// nada
		}
	},
	track(eventName: string, params: { [key: string]: string }) {
		try {
			const rudderanalytics = window.rudderanalytics;
			if (!rudderanalytics) {
				return;
			}

			rudderanalytics.track(eventName, params);
		} catch (e: unknown) {
			// nada
		}
	},
};
