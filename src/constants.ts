import type { Feature, LimitedPlan } from './Interface';

export const LICENSE_SERVER_URL = 'https://license.n8n.io/';

export const FEATURE_FORUM_SUPPORT: Feature = {
	labelKey: 'feature.forumSupport',
};

export const TEAM_PLAN: LimitedPlan = {
	id: 'team',
	name: 'Team',
	description: 'Great for teams who need to collaborate with a bit more power',
	features: [FEATURE_FORUM_SUPPORT],
	primaryCTA: 'start-trial',
	secondaryCTA: 'email',
	unlimited: false,
	options: [],
};

export const PLANS = [
	TEAM_PLAN,
]
