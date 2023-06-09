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

export const FEATURE_UNLIMITED_USERS: Feature = {
	labelKey: 'feature.unlimitedUsers',
};

export const FEATURE_DEDICATED_SUPPORT: Feature = {
	labelKey: 'feature.dedicatedSupport',
};

export const FEATURE_SHARING: Feature = {
	labelKey: 'feature.sharing',
};

export const FEATURE_SSO: Feature = {
	labelKey: 'feature.saml',
};

export const FEATURE_VARIABLES: Feature = {
	labelKey: 'feature.variables',
};

export const FEATURE_LOG_STREAMING: Feature = {
	labelKey: 'feature.logStreaming',
};

export const FEATURE_UNLIMITED_WORKFLOWS: Feature = {
	labelKey: 'feature.unlimitedTestWorkflows',
};

export const FEATURE_UNLIMITED_EXECUTIONS: Feature = {
	labelKey: 'feature.unlimitedExecutions',
};

export const DEFAULT_ACTIVE_WORKFLOWS_OPTION = 4;
export const MORE_THAN_MAX_OPTION = '200+';

export const COMMUNITY_PLAN: FreePlan = {
	id: 'community',
	nameKey: 'plan.community',
	descriptionKey: 'plan.community.description',
	features: [
		FEATURE_UNLIMITED_WORKFLOWS,
		FEATURE_UNLIMITED_EXECUTIONS,
		FEATURE_FORUM_SUPPORT,
	],
	unlimited: true,
	pricing: 'free',
};

export const STARTUP_PLAN: LimitedPlan = {
	id: 'startup',
	nameKey: 'plan.startup',
	descriptionKey: 'plan.startup.description',
	features: [
		FEATURE_UNLIMITED_WORKFLOWS,
		FEATURE_UNLIMITED_EXECUTIONS,
		FEATURE_UNLIMITED_USERS,
		FEATURE_SHARING,
		FEATURE_SSO,
		FEATURE_VARIABLES,
		FEATURE_LOG_STREAMING,
		FEATURE_FORUM_SUPPORT,
	],
	primaryCTA: 'start-trial',
	secondaryCTA: 'email',
	unlimited: false,
	unitSize: 25,
	options: [
		{ value: 4 },
		{ value: 5 },
		{ value: 6 },
		{ value: 7 },
		{ value: 8 },
		{
			value: MORE_THAN_MAX_OPTION,
			labelKey: 'features.activeWorkflows.moreThanMax',
		},
	],
	pricing: 'custom',
};

export const ENTERPRISE_PLAN: CustomPlan = {
	id: 'enterprise',
	nameKey: 'plan.enterprise',
	descriptionKey: 'plan.enterprise.description',
	features: [
		FEATURE_UNLIMITED_WORKFLOWS,
		FEATURE_UNLIMITED_EXECUTIONS,
		FEATURE_UNLIMITED_USERS,
		FEATURE_SHARING,
		FEATURE_SSO,
		FEATURE_VARIABLES,
		FEATURE_LOG_STREAMING,
		FEATURE_DEDICATED_SUPPORT,
	],
	unlimited: true,
	pricing: 'quote',
	primaryCTA: 'email',
};

export const SUPPORT_EMAIL = 'sales@n8n.io';
export const ENTERPRISE_CONTACT_FORM_URL =
	'https://n8n-community.typeform.com/to/y9X2YuGa';
export const TENANT_ID: string = import.meta.env.VITE_LICENSE_TENANT_ID || '1';
export const PLANS_ON_PREM_GROUP = 'on-prem';
export const STARTUP_PLAN_NAME = 'Startup';
export const CURRENCY_USD = 'USD';

export const PLANS_FAQ: FAQ[] = [
	{
		questionKey: 'faq.whatAreActiveWorkflows.question',
		answerKey: 'faq.whatAreActiveWorkflows.answer',
	},
	{
		questionKey: 'faq.whatAreTestWorkflows.question',
		answerKey: 'faq.whatAreTestWorkflows.answer',
	},
	{
		questionKey: 'faq.whatIsAnExecution.question',
		answerKey: 'faq.whatIsAnExecution.answer',
	},
	{
		questionKey: 'faq.support.question',
		answerKey: 'faq.support.answer',
	},
	{
		questionKey: 'faq.logStreaming.question',
		answerKey: 'faq.logStreaming.answer',
	},
	{
		questionKey: 'faq.sharing.question',
		answerKey: 'faq.sharing.answer',
	},
];
