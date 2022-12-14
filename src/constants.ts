import type {
	CustomPlan,
	FAQ,
	Feature,
	FreePlan,
	LimitedPlan,
} from './Interface';

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

export const FEATURE_LOG_STREAMING: Feature = {
	labelKey: 'feature.logStreaming',
};

export const DEFAULT_ACTIVE_WORKFLOWS_OPTION = 2;
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
	unitSize: 5,
	options: [
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
		{ value: 6 },
		{ value: 7 },
		{ value: 8 },
		{ value: 9 },
		{ value: 10 },
		{ value: 11 },
		{ value: 12 },
		{ value: 13 },
		{ value: 14 },
		{ value: 15 },
		{ value: 16 },
		{ value: 17 },
		{ value: 18 },
		{ value: 19 },
		{ value: MORE_THAN_MAX_OPTION },
	],
	pricing: 'custom',
};

export const ENTERPRISE_PLAN: CustomPlan = {
	id: 'enterprise',
	nameKey: 'plan.enterprise',
	descriptionKey: 'plan.enterprise.description',
	features: [
		FEATURE_DEDICATED_SUPPORT,
		FEATURE_SHARING,
		FEATURE_LDAP,
		FEATURE_LOG_STREAMING,
	],
	unlimited: true,
	pricing: 'quote',
	primaryCTA: 'email',
};

export const SUPPORT_EMAIL = 'sales@n8n.io';
export const TENANT_ID: string = import.meta.env.VITE_LICENSE_TENANT_ID || '1';
export const PLANS_ON_PREM_GROUP = 'on-prem';
export const TEAM_PLAN_NAME = 'Team';
export const CURRENCY_USD = 'USD';

export const PLANS_FAQ: FAQ[] = [
	{
		questionKey: 'faq.whatAreActiveWorkflows.question',
		answerKey: 'faq.whatAreActiveWorkflows.answer',
	},
	{
		questionKey: 'faq.whyUpgrade.question',
		answerKey: 'faq.whyUpgrade.answer',
	},
	{
		questionKey: 'faq.whatIsAnExecution.question',
		answerKey: 'faq.whatIsAnExecution.answer',
	},
	{
		questionKey: 'faq.communityVsPrioritySupport.question',
		answerKey: 'faq.communityVsPrioritySupport.answer',
	},
];
