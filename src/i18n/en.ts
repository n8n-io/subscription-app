const MAILTO = `href="mailto:sales{'@'}n8n.io"`;
const ENTERPRISE_CONTACT = `href="https://n8n-community.typeform.com/to/y9X2YuGa"`;

export default {
	backToN8n: 'Back to n8n',
	'plan.community': 'Community',
	'plan.community.description':
		'Everything a single user needs to get automating',
	'features.includes': 'Includes',
	'features.activeWorkflows.unlimited': 'Unlimited active workflows *',
	'feature.forumSupport': 'Forum support',
	'feature.sharing': 'Collaborate on workflows',
	'feature.unlimitedUsers': 'Unlimited users',
	'cta.startFreeTrial': 'Start free trial',
	'cta.contactUs': 'Contact us',
	'plan.enterprise': 'Enterprise',
	'plan.enterprise.description':
		'For larger companies with compliance requirements',
	'plan.startup': 'Startup',
	'plan.startup.description':
		'For startups with up to 50 employees that raised up to $5M',
	'feature.ldap': 'LDAP',
	'feature.saml': 'SSO SAML and LDAP',
	'feature.variables': 'Global variables',
	'feature.logStreaming': 'Log streaming',
	'feature.dedicatedSupport': 'Dedicated support with SLA',
	'feature.unlimitedTestWorkflows': 'Unlimited test workflows',
	'feature.unlimitedExecutions': 'Unlimited executions',
	'features.activeWorkflows.count': '{count} active workflows *',
	'features.activeWorkflows.moreThanMax': 'Over 200 active workflows *',
	'pricing.dollars': '$',
	'pricing.permonth': '/ month',
	'subscription.confirmation.message': `Your plan was successfully upgraded. <a ${MAILTO}>Contact us</a> if you need help.`,
	'subscription.copyactivation': 'Copy activation code to activate license',
	'generic.copy': 'Copy',
	'generic.copied': 'Copied',
	'management.title': 'Manage plan',
	'management.cancelled.title': 'Subscription cancelled',
	'management.cancel.title': 'Do you want to cancel your subscription?',
	'management.cancel.cta': 'Cancel your subscription',
	'management.cancel.confirm': 'Are you sure you want to cancel your plan?',
	'management.cancel.cancel': 'Yes, cancel my plan',
	'management.error.missingToken': 'Missing management token',
	'subscription.activateRedirect.cta': 'Activate your key on n8n',
	'subscription.copyactivation.title': 'Your activation key',
	'subscription.helpinfo': 'For help,',
	'subscription.helpinfo.email': 'please reach out',
	'subscription.plans.title': 'Self-hosted plans',
	'subscription.confirmation.title': 'Plan upgraded',
	faq: 'FAQ',
	'faq.sharing.question': 'What does ‘collaborate on workflows’ mean?',
	'faq.sharing.answer': `It means the ability to: <br/>1. Share workflows with other users, so that they can also edit them, run them or inspect their executions<br/>2. Share credentials with other users, so that they can use them in their own workflows`,
	'faq.whatAreActiveWorkflows.question': '* What are active workflows?',
	'faq.whatAreActiveWorkflows.answer': `Workflows are either 'test' or 'active'. An 'active' workflow can be triggered automatically (e.g. at regular intervals, or when an event happens in another system). <br/> <br/> Note that if an active workflow contains multiple triggers, each will count as an active workflow. For example, 1 active workflow with 3 triggers will count as 3 active workflows.`,
	'faq.logStreaming.question': 'What is log streaming?',
	'faq.logStreaming.answer': `Log streaming allows you to automatically pipe n8n activity to an external log aggregator of your choice (e.g. Datadog, Splunk, syslog), allowing you to deal with them using a similar process to the one you use for other tools.`,
	'faq.whatIsAnExecution.question': 'What is an execution?',
	'faq.whatIsAnExecution.answer':
		'An execution is when n8n completes one cycle of the workflow that you’ve built. You can make as many executions as you like in any of our self-hosted plans — regardless of how complex the workflow is or how much data it uses.',
	'faq.support.question':
		'What is the difference between forum and dedicated support?',
	'faq.support.answer': `Dedicated support gives you direct access to our in-house support startup, with an SLA for response times. <br/> <br/> Forum support is offered on the <a href="https://community.n8n.io/" target="_blank">n8n community forum</a>, which consists of over 4,000 tech enthusiasts and professionals plus our community engineers.`,
	'faq.whatAreTestWorkflows.question': `What are test workflows?`,
	'faq.whatAreTestWorkflows.answer': `Workflows are either 'test' or 'active'. A 'test' workflow is triggered by clicking a button in n8n. This is handy when building workflows as it gives you immediate feedback on whether things are working. <br/> <br/> Test workflows can be activated when they’re ready, which allows them to be triggered automatically.`,
	'management.cancel.success':
		'Your plan was cancelled, but will be available for another {days} days.',
	'management.cancel.success.soon':
		'Your plan was cancelled, and soon will no longer be available.',
	'management.cancel.info': `We’re sorry things didn’t work out this time. Please <a ${MAILTO}>let us know</a> how we can improve and make things better for you next time around.`,
	'cta.orContactUs': `or <a ${ENTERPRISE_CONTACT}>contact us</a>`,
	'plan.recommended': 'Recommended plan',
	'management.cta.1': `To upgrade your plan or your active workflow quota, <a ${MAILTO}>contact us</a>. You can view all plans <a href="/">here</a>. <br/> <br /> To cancel your plan and lose access to paid features, `,
	'management.cta.2': 'click here',
	'management.cta.3': '.',
	'error.somethingWentWrong': 'Something went wrong',
};
