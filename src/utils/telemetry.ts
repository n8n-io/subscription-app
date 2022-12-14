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

			if (urlParams.get('callback')) {
				params.source = 'instance';
			} else if (document.referrer) {
				const url = new URL(document.referrer);
				if (url.host.includes('n8n.io')) {
					params.source = 'n8n.io';
				}
			}

			rudderanalytics.page(category, pageName, params);
		} catch (e: unknown) {
			// nada
		}
	},
	track(eventName: string, params: { [key: string]: string | number | {} }) {
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
