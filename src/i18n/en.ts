const MAILTO = `href="mailto:sales{'@'}n8n.io"`;

export default {
	backToN8n: 'Back to n8n',
	'plan.community': 'Community',
	'plan.community.description':
		'Ideal for single users who are getting started with automation',
	'features.includes': 'Includes',
	'features.activeWorkflows.unlimited': 'Unlimited active workflows *',
	'features.activeWorkflows.extras':
		'For unlimited executions and unlimited test workflows',
	'feature.forumSupport': 'Forum support',
	'feature.sharing': 'Sharing',
	'cta.startFreeTrial': 'Start free trial',
	'cta.contactUs': 'Contact us',
	'plan.enterprise': 'Enterprise',
	'plan.enterprise.description':
		'Perfect for enterprise level features and support',
	'plan.team': 'Team',
	'plan.team.description':
		'Great for teams who need to collaborate with a bit more power',
	'feature.ldap': 'LDAP',
	'feature.logStreaming': 'Log streaming',
	'feature.dedicatedSupport': 'Dedicated support',
	'features.activeWorkflows.count': '{count} Active workflows',
	'pricing.dollars': '$',
	'pricing.permonth': '/mo',
	'subscription.confirmation.message': `Your plan was successfully upgraded. <a ${MAILTO}>Contact us</a> if you need help.`,
	'subscription.copyactivation': 'Copy activation code to activate license',
	'generic.copy': 'Copy',
	'generic.copied': 'Copied',
	'management.title': 'Manage plan',
	'management.cancelled.title': 'Plan cancelled',
	'management.cancel.title': 'Do you want to cancel your subscription?',
	'management.cancel.cta': 'Cancel your subscription',
	'management.cancel.confirm': 'Are you sure you want to cancel your plan?',
	'management.cancel.cancel': 'Yes, cancel my plan',
	'management.error.missingToken': 'Missing management token',
	'subscription.activateRedirect.cta': 'Activate your key on n8n',
	'subscription.copyactivation.title': 'Your activation key',
	'subscription.helpinfo': 'For help,',
	'subscription.helpinfo.email': 'please reach out',
	'subscription.plans.title': 'Plans and pricing',
	'subscription.confirmation.title': 'Plan upgraded',
	faq: 'FAQ',
	'faq.whatAreActiveWorkflows.question': '* What are active workflows?',
	'faq.whatAreActiveWorkflows.answer':
		'If an active workflow contains multiple triggers, each will count as an active workflow. For example, 1 active workflow with 3 triggers will count as 3 active workflows.',
	'faq.whyUpgrade.question': 'Why should I upgrade?',
	'faq.whyUpgrade.answer':
		'By default, you are using our open-source Community edition. While the Community edition has no limits on active workflows, you won’t have access to any of the premium n8n features. This includes workflows & credentials sharing, LDAP, advanced logging, multi-environments (coming soon), and much more.',
	'faq.whatIsAnExecution.question': 'What is an execution?',
	'faq.whatIsAnExecution.answer':
		'An execution is when n8n completes one cycle of the workflow that you’ve built. Regardless of the amount of data that is processed and how many nodes are used.',
	'faq.communityVsPrioritySupport.question':
		'What is the difference between community and priority support?',
	'faq.communityVsPrioritySupport.answer':
		'Priority support gives you direct access to our support team whereas community support is offered by the n8n community, which consists of over 4,000 tech enthusiasts & professionals, along with our support and community engineers, who are passionate about improving n8n and addressing any user questions or issues. Once you post your question, you can expect to receive an answer within 8 business hours.',
	'management.cancel.success':
		'Your plan was cancelled, but it will still be available for another {days} days. Please disregard the cancellation email from Paddle, our payments provider.',
	'management.cancel.success.soon':
		'Your plan was cancelled, and soon will no longer be availble.',
	'management.cancel.info': `It’s sad that things didn’t work out this time. Please <a ${MAILTO}>contact us</a> to let us know how we can improve and make things better for you next time around.`,
	'cta.orContactUs': `or <a ${MAILTO}>contact us</a>`,
	'plan.recommended': 'Recommended plan',
	'management.cta.1': `To upgrade your plan or your active workflow quota, <a ${MAILTO}>contact us</a>. You can view all plans <a href="/">here</a>. To cancel your plan and lose access to paid features, `,
	'management.cta.2': 'click here',
	'management.cta.3': '.',
};
