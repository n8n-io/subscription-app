import type { FAQ } from './Interface';

export const LICENSE_SERVER_URL = 'https://license.n8n.io/';

export const SUPPORT_EMAIL = 'sales@n8n.io';
export const ENTERPRISE_CONTACT_FORM_URL =
	'https://n8n-community.typeform.com/to/y9X2YuGa';
export const BUSINESS_CONTACT_FORM_URL =
	'https://n8n-community.typeform.com/to/nTaly8BO';
export const TENANT_ID: string = import.meta.env.VITE_LICENSE_TENANT_ID || '1';

export const PLANS_FAQ: FAQ[] = [
	{
		questionKey: 'faq.whatIsAnExecution.question',
		answerKey: 'faq.whatIsAnExecution.answer',
	},
	{
		questionKey: 'faq.productionExecution.question',
		answerKey: 'faq.productionExecution.answer',
	},
	{
		questionKey: 'faq.supportDifference.question',
		answerKey: 'faq.supportDifference.answer',
	},
	{
		questionKey: 'faq.businessPlanSupport.question',
		answerKey: 'faq.businessPlanSupport.answer',
	},
	{
		questionKey: 'faq.collaborateWorkflows.question',
		answerKey: 'faq.collaborateWorkflows.answer',
	},
	{
		questionKey: 'faq.quotaExceeded.question',
		answerKey: 'faq.quotaExceeded.answer',
	},
	{
		questionKey: 'faq.usageMonitoring.question',
		answerKey: 'faq.usageMonitoring.answer',
	},
	{
		questionKey: 'faq.afterSubscription.question',
		answerKey: 'faq.afterSubscription.answer',
	},
	{
		questionKey: 'faq.licenseInstances.question',
		answerKey: 'faq.licenseInstances.answer',
	},
	{
		questionKey: 'faq.cancelSubscription.question',
		answerKey: 'faq.cancelSubscription.answer',
	},
	{
		questionKey: 'faq.freeTrial.question',
		answerKey: 'faq.freeTrial.answer',
	},
	{
		questionKey: 'faq.executionCounts.question',
		answerKey: 'faq.executionCounts.answer',
	},
	{
		questionKey: 'faq.assessExecutions.question',
		answerKey: 'faq.assessExecutions.answer',
	},
	{
		questionKey: 'faq.wireTransfer.question',
		answerKey: 'faq.wireTransfer.answer',
	},
	{
		questionKey: 'faq.startupDiscount.question',
		answerKey: 'faq.startupDiscount.answer',
	},
];

export interface PricingTier {
	executionsMonthly: number;
	executionsAnnual: number;
	priceMonthly: number;
	priceAnnual: number;
	priceIds: {
		monthly: string;
		annual: string;
	};
}

export const BUSINESS_PRICING_TIERS_PRODUCTION: PricingTier[] = [
	{
		executionsMonthly: 40000,
		executionsAnnual: 480000,
		priceMonthly: 800,
		priceAnnual: 8000,
		priceIds: {
			monthly: 'pri_01jvby47fzh40fbbf8e4agfyf4',
			annual: 'pri_01jvby634p61d0qynw87036n7t',
		},
	},
	{
		executionsMonthly: 50000,
		executionsAnnual: 600000,
		priceMonthly: 985,
		priceAnnual: 9852,
		priceIds: {
			monthly: 'pri_01jvpa8852ersvg2yt9mgwxwpp',
			annual: 'pri_01jvpabct5a4gry9y8s3ah9k6v',
		},
	},
	{
		executionsMonthly: 75000,
		executionsAnnual: 900000,
		priceMonthly: 1456,
		priceAnnual: 14555,
		priceIds: {
			monthly: 'pri_01jvpad1sxpa62xjwvwy68nntk',
			annual: 'pri_01jvpadxbbh3jh8tdjzy84c0wa',
		},
	},
	{
		executionsMonthly: 100000,
		executionsAnnual: 1200000,
		priceMonthly: 1726,
		priceAnnual: 17260,
		priceIds: {
			monthly: 'pri_01jvpaeza812qk9gafcmtkncz8',
			annual: 'pri_01jvpafwd2vphpn8ebw7y0sqtd',
		},
	},
	{
		executionsMonthly: 150000,
		executionsAnnual: 1800000,
		priceMonthly: 2189,
		priceAnnual: 21890,
		priceIds: {
			monthly: 'pri_01jvpagxazkjcvng2hwwn159hg',
			annual: 'pri_01jvpaj8h7z0x20jxd77t8pprn',
		},
	},
];

export const BUSINESS_PRICING_TIERS_SANDBOX: PricingTier[] = [
	{
		executionsMonthly: 40000,
		executionsAnnual: 480000,
		priceMonthly: 800,
		priceAnnual: 8000,
		priceIds: {
			monthly: 'pri_01jvpc7dfa9773e8t5s948rp76',
			annual: 'pri_01jvpc8akq2ktkk66tjakh4xs6',
		},
	},
	{
		executionsMonthly: 50000,
		executionsAnnual: 600000,
		priceMonthly: 985,
		priceAnnual: 9852,
		priceIds: {
			monthly: 'pri_01jxftgqg8z7cwhg2fhc0bxdde',
			annual: 'pri_01jxftg026k3ra6y34r2hcdxkb',
		},
	},
];

export const STARTUP_PRICING_TIERS_SANDBOX: PricingTier[] = [
	{
		executionsMonthly: 40000,
		executionsAnnual: 480000,
		priceMonthly: 400,
		priceAnnual: 4000,
		priceIds: {
			monthly: 'pri_01jyehgjbqgsctrytpzx55y9nw',
			annual: 'pri_01jyehhg9ar0xv1t16p2qjzxg1',
		},
	},
];

export const STARTUP_PRICING_TIERS_PRODUCTION: PricingTier[] = [
	{
		executionsMonthly: 40000,
		executionsAnnual: 480000,
		priceMonthly: 400,
		priceAnnual: 4000,
		priceIds: {
			monthly: 'pri_01jyegkx7200mfypvra163c7g0',
			annual: 'pri_01jyegnqzw7k2hqahtfr8gz3wq',
		},
	},
	{
		executionsMonthly: 50000,
		executionsAnnual: 600000,
		priceMonthly: 492.5,
		priceAnnual: 4926,
		priceIds: {
			monthly: 'pri_01jyegr9x66830tr5vmbthdwm7',
			annual: 'pri_01jyegtky0c01rgmjka6zmzfsj',
		},
	},
	{
		executionsMonthly: 75000,
		executionsAnnual: 900000,
		priceMonthly: 728,
		priceAnnual: 7277.5,
		priceIds: {
			monthly: 'pri_01jyegw2fbx11nrp4tzwz1ah60',
			annual: 'pri_01jyegxsdr6caak7b67dgc5cfd',
		},
	},
	{
		executionsMonthly: 100000,
		executionsAnnual: 1200000,
		priceMonthly: 863,
		priceAnnual: 8630,
		priceIds: {
			monthly: 'pri_01jyegz5jtkn1d2zrdpms6mtfe',
			annual: 'pri_01jyeh0ff0tqd3csqhdrb2jxxn',
		},
	},
	{
		executionsMonthly: 150000,
		executionsAnnual: 1800000,
		priceMonthly: 1094.5,
		priceAnnual: 10945,
		priceIds: {
			monthly: 'pri_01jyeh1s2ssa5hggpy8tbvdk4w',
			annual: 'pri_01jyeh395xaa4x45h55zkrs7nm',
		},
	},
];

import { isProductionMode } from '@/utils/environment';

export const BUSINESS_PRICING_TIERS: PricingTier[] = isProductionMode()
	? BUSINESS_PRICING_TIERS_PRODUCTION
	: BUSINESS_PRICING_TIERS_SANDBOX;

export const STARTUP_PRICING_TIERS: PricingTier[] = isProductionMode()
	? STARTUP_PRICING_TIERS_PRODUCTION
	: STARTUP_PRICING_TIERS_SANDBOX;

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
			'6 shared projects',
			'Forum support',
			'SSO, SAML and LDAP',
			'Different environments',
			'Global variables',
			'Version control using Git',
			'Insights',
		],
		workflows: 'unlimited',
		users: 'unlimited',
		primaryCTA: 'start-trial',
		pricingTiers: BUSINESS_PRICING_TIERS,
	},
	startup: {
		id: 'startup',
		name: 'Startup',
		description:
			'For teams that need to collaborate and scale workflows executions.',
		basePrice: 4000,
		features: [
			'6 shared projects',
			'Forum support',
			'SSO, SAML and LDAP',
			'Different environments',
			'Global variables',
			'Version control using Git',
			'Insights',
		],
		workflows: 'unlimited',
		users: 'unlimited',
		primaryCTA: 'start-trial',
		pricingTiers: STARTUP_PRICING_TIERS,
	},
	enterprise: {
		id: 'enterprise',
		name: 'Enterprise',
		description:
			'Ideal for businesses with strict security and performance requirements.',
		price: 'contact',
		features: [
			'Unlimited shared projects',
			'Dedicated support with SLAs',
			'Log streaming',
			'External secret store integration',
			'Invoice billing',
			'API key scoping',
			'Additional date ranges on Insights',
		],
		executions: 'custom',
		workflows: 'unlimited',
		users: 'unlimited',
		primaryCTA: 'contact-us',
	},
};

export const INFO_CARDS = {
	title: 'Looking for something else?',
	cards: [
		{
			id: 1,
			title: 'See why n8n is the most cost-effective option in the market',
			description:
				'You only pay for full workflow executions, not for each operation, step, or task.',
			button: {
				text: 'Learn more',
				url: 'https://blog.n8n.io/n8n-execution-advantage/?_gl=1*1lqfxz0*_gcl_au*NzIyMjU0Mzk0LjE3NDcyMjkzMTc.*_ga*MTE0NDc5MTE3NS4xNzQ3ODMzMzI5*_ga_0SC4FF2FH9*czE3NTAwNTc4MjEkbzQxJGcxJHQxNzUwMDU5MTgzJGo1NiRsMCRoMA..',
			},
		},
		{
			id: 1,
			title: 'Community Edition',
			description: 'A basic version of n8n is available on GitHub.',
			button: {
				text: 'View docs',
				url: 'https://docs.n8n.io/hosting/?_gl=1*1cwmczd*_gcl_au*NzIyMjU0Mzk0LjE3NDcyMjkzMTc.*_ga*MTE0NDc5MTE3NS4xNzQ3ODMzMzI5*_ga_0SC4FF2FH9*czE3NTAwNTc4MjEkbzQxJGcxJHQxNzUwMDU5MTk4JGo0MSRsMCRoMA..',
			},
		},
		{
			id: 1,
			title: 'Startup Plan',
			description:
				'For startups with up to 20 employees that raised up to $5M.',
			button: {
				text: "Let's start",
				url: 'https://n8n.notion.site/Supercharge-Your-Startup-with-n8n-e64d5892eb6a43b19a18124595d77625',
			},
		},
	],
};
