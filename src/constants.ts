import type { FAQ } from './Interface';

export const LICENSE_SERVER_URL = 'https://license.n8n.io/';

export const SUPPORT_EMAIL = 'sales@n8n.io';
export const ENTERPRISE_CONTACT_FORM_URL =
	'https://n8n-community.typeform.com/to/y9X2YuGa';
export const TENANT_ID: string = import.meta.env.VITE_LICENSE_TENANT_ID || '1';

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

export interface PricingTier {
	executions: number;
	priceMonthly: number;
	priceAnnual: number;
	priceIds: {
		monthly: string;
		annual: string;
	};
}

export const BUSINESS_PRICING_TIERS_PRODUCTION: PricingTier[] = [
	{
		executions: 480000,
		priceMonthly: 667,
		priceAnnual: 8000,
		priceIds: {
			monthly: 'pri_01jvby47fzh40fbbf8e4agfyf4',
			annual: 'pri_01jvby634p61d0qynw87036n7t',
		},
	},
	{
		executions: 600000,
		priceMonthly: 834,
		priceAnnual: 10000,
		priceIds: {
			monthly: 'pri_01jvpa8852ersvg2yt9mgwxwpp',
			annual: 'pri_01jvpabct5a4gry9y8s3ah9k6v',
		},
	},
	{
		executions: 900000,
		priceMonthly: 1250,
		priceAnnual: 15000,
		priceIds: {
			monthly: 'pri_01jvpad1sxpa62xjwvwy68nntk',
			annual: 'pri_01jvpadxbbh3jh8tdjzy84c0wa',
		},
	},
	{
		executions: 1200000,
		priceMonthly: 1667,
		priceAnnual: 20000,
		priceIds: {
			monthly: 'pri_01jvpaeza812qk9gafcmtkncz8',
			annual: 'pri_01jvpafwd2vphpn8ebw7y0sqtd',
		},
	},
	{
		executions: 1800000,
		priceMonthly: 2500,
		priceAnnual: 30000,
		priceIds: {
			monthly: 'pri_01jvpagxazkjcvng2hwwn159hg',
			annual: 'pri_01jvpaj8h7z0x20jxd77t8pprn',
		},
	},
];

export const BUSINESS_PRICING_TIERS_SANDBOX: PricingTier[] = [
	{
		executions: 40000,
		priceMonthly: 800,
		priceAnnual: 8000,
		priceIds: {
			monthly: 'pri_01jvpc7dfa9773e8t5s948rp76',
			annual: 'pri_01jvpc8akq2ktkk66tjakh4xs6',
		},
	},
];

import { isProductionMode } from '@/utils/environment';

export const BUSINESS_PRICING_TIERS: PricingTier[] = isProductionMode()
	? BUSINESS_PRICING_TIERS_PRODUCTION
	: BUSINESS_PRICING_TIERS_SANDBOX;

export const STATIC_PLANS = {
	community: {
		id: 'community',
		name: 'Community',
		description:
			'Everything a single user needs to get started with automation.',
		price: 0,
		features: [
			'Visual canvas',
			'All integrations (+600)',
			'AI agent builder',
			'Code steps in workflows',
			'Forum support',
		],
		executions: 'unlimited',
		workflows: 'unlimited',
		primaryCTA: 'get-started',
	},
	business: {
		id: 'business',
		name: 'Business',
		description:
			'For teams that need to collaborate and scale workflows executions.',
		basePrice: 8000,
		features: [
			'Everything in Community plan',
			'6 shared projects',
			'SSO, SAML and LDAP',
			'Different environments',
			'Global variables',
			'Version control using Git',
			'Insights',
		],
		workflows: 'unlimited',
		users: 'unlimited',
		primaryCTA: 'subscribe',
		pricingTiers: BUSINESS_PRICING_TIERS,
	},
	enterprise: {
		id: 'enterprise',
		name: 'Enterprise',
		description:
			'Ideal for businesses with strict security and performance requirements',
		price: 'contact',
		features: [
			'Everything in Business plan',
			'Unlimited shared projects',
			'Dedicated support with SLAs',
			'Log streaming',
			'External secret store integration',
			'Invoice billing',
			'API key scoping',
			'Additional date ranges on Insights',
		],
		executions: '600k+',
		workflows: 'unlimited',
		users: 'unlimited',
		primaryCTA: 'contact-us',
	},
};
