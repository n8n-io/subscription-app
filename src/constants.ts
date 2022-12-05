import type { CustomPlan, Feature, FreePlan, LimitedPlan } from './Interface';

export const LICENSE_SERVER_URL = 'https://license.n8n.io/';

export const FEATURE_FORUM_SUPPORT: Feature = {
	labelKey: 'feature.forumSupport',
};

export const FEATURE_DEDICATED_SUPPORT: Feature = {
	labelKey: 'feature.dedicatedSupport',
};

export const FEATURE_SHARING: Feature = {
	labelKey: 'feature.sharing',
};

export const FEATURE_LDAP: Feature = {
	labelKey: 'feature.ldap',
};

export const DEFAULT_ACTIVE_WORKFLOWS_OPTION = 10;
export const MORE_THAN_MAX_OPTION = '100+';

export const COMMUNITY_PLAN: FreePlan = {
	id: 'community',
	nameKey: 'plan.community',
	descriptionKey: 'plan.community.description',
	features: [FEATURE_FORUM_SUPPORT],
	unlimited: true,
	pricing: 'free',
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
		{ value: 5 },
		{ value: 10 },
		{ value: 15 },
		{ value: 20 },
		{ value: 25 },
		{ value: 30 },
		{ value: 35 },
		{ value: 40 },
		{ value: 45 },
		{ value: 50 },
		{ value: 55 },
		{ value: 60 },
		{ value: 65 },
		{ value: 70 },
		{ value: 75 },
		{ value: 80 },
		{ value: 85 },
		{ value: 90 },
		{ value: 95 },
		{ value: MORE_THAN_MAX_OPTION },
	],
	pricing: 'custom',
};

export const ENTERPRISE_PLAN: CustomPlan = {
	id: 'enterprise',
	nameKey: 'plan.enterprise',
	descriptionKey: 'plan.enterprise.description',
	features: [FEATURE_DEDICATED_SUPPORT, FEATURE_SHARING, FEATURE_LDAP],
	unlimited: true,
	pricing: 'quote',
	primaryCTA: 'email',
};

export const SUPPORT_EMAIL = 'sales@n8n.io';
export const TENANT_ID = '1001';
export const PLANS_ON_PREM_GROUP = 'on-prem';
export const TEAM_PLAN_NAME = 'Team';
export const CURRENCY_USD = 'USD';
