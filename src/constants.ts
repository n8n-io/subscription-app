import type { CustomPlan, Feature, FreePlan, LimitedPlan } from './Interface';

export const LICENSE_SERVER_URL = 'https://license.n8n.io/';

export const FEATURE_FORUM_SUPPORT: Feature = {
	labelKey: 'feature.forumSupport',
};

export const FEATURE_SHARING: Feature = {
	labelKey: 'feature.sharing',
};

export const FEATURE_LDAP: Feature = {
	labelKey: 'feature.ldap',
};

export const MORE_THAN_MAX_OPTION = '100+';

export const COMMUNITY_PLAN: FreePlan = {
	id: 'community',
	nameKey: 'plan.community',
	descriptionKey: 'plan.community.description',
	features: [FEATURE_FORUM_SUPPORT],
	unlimited: true,
	free: true,
};

export const TEAM_PLAN: LimitedPlan = {
	id: 'team',
	nameKey: 'plan.team',
	descriptionKey: 'plan.team.description',
	features: [FEATURE_FORUM_SUPPORT, FEATURE_SHARING],
	primaryCTA: 'start-trial',
	secondaryCTA: 'email',
	unlimited: false,
	options: [
		{ value: '10' },
		{ value: '15' },
		{ value: '20' },
		{ value: '30' },
		{ value: '40' },
		{ value: '50' },
		{ value: '60' },
		{ value: '70' },
		{ value: '80' },
		{ value: '90' },
		{ value: MORE_THAN_MAX_OPTION },
	],
};

export const ENTERPRISE_PLAN: CustomPlan = {
	id: 'enterprise',
	nameKey: 'plan.enterprise',
	descriptionKey: 'plan.enterprise.description',
	features: [FEATURE_FORUM_SUPPORT],
	unlimited: true,
	custom: true,
	secondaryCTA: 'email',
};

export const PLANS = [COMMUNITY_PLAN, TEAM_PLAN, ENTERPRISE_PLAN];
