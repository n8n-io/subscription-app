const MAILTO = `href="mailto:sales{'@'}n8n.io"`;
const ENTERPRISE_CONTACT = `href="https://n8n-community.typeform.com/to/y9X2YuGa"`;

export default {
	backToN8n: 'Back to n8n',
	'plan.community': 'Community',
	'plan.community.description':
		'Everything a single user needs to get automating',
	'features.includes': 'Includes',
	'features.activeWorkflows.unlimited': 'Unlimited active workflows* and',
	'features.activeWorkflows.testWorkflows': 'unlimited test ones',
	'feature.forumSupport': 'Forum support',
	'feature.sharing': 'Collaborate on workflows',
	'feature.unlimitedUsers': 'Unlimited users',
	'cta.startFreeTrial': 'Start free trial',
	'cta.getStarted': 'Get started',
	'cta.contactUs': 'Contact us',
	'plan.community.includes': 'This plan includes:',
	'plan.startup.includes': 'Everything in Starter plan, plus:',
	'plan.enterprise.includes': 'Everything in Pro plan, plus:',
	'plan.enterprise': 'Enterprise',
	'plan.enterprise.description':
		'For larger companies with compliance requirements',
	'plan.startup': 'Startup',
	'plan.startup.description':
		'For startups with up to 20 employees that raised up to $5M',
	'feature.ldap': 'LDAP',
	'feature.saml': 'SSO SAML and LDAP',
	'feature.variables': 'Global variables',
	'feature.logStreaming': 'Log streaming',
	'feature.dedicatedSupport': 'Dedicated support with SLA',
	'feature.unlimitedTestWorkflows': 'Unlimited test workflows',
	'feature.unlimitedExecutions': 'Unlimited executions',
	'features.activeWorkflows.active': 'active workflows* and',
	'features.activeWorkflows.count': '{ count } active workflows*',
	'features.activeWorkflows.price': '€{ count }/month',
	'features.activeWorkflows.moreThanMax': 'Over 200 active workflows *',
	'pricing.dollars': '$',
	'pricing.permonth': 'per month',
	'pricing.peryear': 'per year',
	'pricing.month': 'month',
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
	faq: 'Frequently asked questions',

	'faq.whatIsAnExecution.question': 'What is an execution?',
	'faq.whatIsAnExecution.answer':
		"Executions are much more powerful than the 'operations' or 'tasks' that you're billed on in other products.<br/><br/>An execution <strong>is a single run of your entire workflow</strong>. It doesn't matter how many steps are in the workflow or how much data it processes — it's still a single execution.<br/><br/>This makes your usage more predictable than other tools where you pay individually for every step or task. Plus, with n8n workflows, you can do things in a single execution that would take 10,000 operations in other tools.",
	'faq.productionExecution.question':
		'Your plan include set number of production execution. What is a production execution?',
	'faq.productionExecution.answer':
		'We only count production execution as part of your usage.<br/><br/>Production executions occur when a triggering event or schedule <strong>automatically</strong> runs a workflow, as opposed to manual executions (<a href="https://docs.n8n.io/workflows/executions/manual-partial-and-production-executions/" target="_blank">see details here</a>).<br/><br/>Additionally, sub-workflows executions that are triggered from the "execute trigger" node do not count towards your usage quota.',
	'faq.supportDifference.question':
		'What is the difference between forum and dedicated support?',
	'faq.supportDifference.answer':
		"Dedicated support means direct access to our in-house team, with guaranteed response times available through SLAs. It's built for teams who are running business-critical workflows and who need fast, reliable answers.<br/><br/>Forum support is available through the n8n community, home to over 45,000 AI and automation enthusiasts, professionals, and community engineers ready to help and share solutions.",
	'faq.collaborateWorkflows.question':
		"What does 'collaborate on workflows' mean?",
	'faq.collaborateWorkflows.answer':
		'It refers to the ability for multiple users to work together on automation workflows. This includes sharing workflows so others can edit, run, or review their executions, sharing credentials so teammates can use them in their own workflows, and managing access through role-based access control (RBAC) to ensure the right level of permissions for each user.',
	'faq.quotaExceeded.question': 'What happens when I hit my quota?',
	'faq.quotaExceeded.answer':
		"If you exceed your quota, <strong>rest assured your workflows will continue running without interruption</strong>, but overage charges may apply if you do not upgrade to the next usage tier.<br/><br/>When you are close to exceeding your quota, the sales team will reach out to discuss your usage. If there's no response or upgrade path, the overages if any will be automatically invoiced 45 days after they have occurred.<br/><br/>For the Business plan, overage prices are 4,000 EUR for extra buckets of 300,000 executions.",
	'faq.usageMonitoring.question':
		'How does n8n monitor my usage on a self-hosted instance?',
	'faq.usageMonitoring.answer':
		'To access Business or Enterprise features on your self-hosted instance, you receive a license key that must ping our license server daily to stay active. This ping includes data like the number of production executions, which helps us track usage. We also collect telemetry data by default, though you can choose to disable it. You can find more details on the data we collect <a href="https://docs.n8n.io/privacy-security/privacy/#data-collection" target="_blank">here</a>',
	'faq.afterSubscription.question':
		'What happens after I subscribe? How does the upgrade from Community to Business work?',
	'faq.afterSubscription.answer':
		'Once you subscribe to the Business plan and complete your payment, you\'ll receive your license key by email. You\'ll need to apply this key to your Community instance by following the steps outlined <a href="https://docs.n8n.io/license-key/" target="_blank">here</a>.<br/><br/>Keep in mind that n8n won\'t automatically cancel any of your existing subscriptions (like Starter, Pro, Startup, Enterprise, or other Business plans). If you want to cancel one of those, you\'ll need to do it yourself. If you\'re on an annual plan and want to switch to Business, <a href="https://n8n-community.typeform.com/to/y9X2YuGa" target="_blank">reach out to our sales team</a>.',
	'faq.licenseInstances.question':
		'On how many instances can I apply my Business plan license key?',
	'faq.licenseInstances.answer':
		'You can use your license key on an unlimited number of instances. The combined usage from all instances where the license key is applied will count toward your quota.',
	'faq.cancelSubscription.question':
		'Can I cancel my Business plan subscription?',
	'faq.cancelSubscription.answer':
		"Yes, if you're on a monthly commitment, you can cancel at any time. Your subscription will then end at the close of your current billing cycle. If you're on an annual commitment, the cancellation will take effect at the end of the annual term. n8n does not offer pro-rata refunds.",
	'faq.freeTrial.question': 'Can I get access to a free trial?',
	'faq.freeTrial.answer':
		'We currently don\'t offer a free trial of the Business plan. If you\'re unsure whether this plan is right for you, feel free to reach out to our sales team <a href="https://n8n-community.typeform.com/to/y9X2YuGa" target="_blank">here</a>.',
	'faq.executionCounts.question':
		"How will I see how many production executions I've used?",
	'faq.executionCounts.answer':
		'You can review your production execution counts under your <a href="https://docs.n8n.io/insights/" target="_blank">Insights Dashboard</a>. Additionally, for annual Business plan subscribers, the n8n team will reach out to you when you are close to reaching 80% of your annual quota.',
	'faq.assessExecutions.question':
		'How can I assess how many production executions I need?',
	'faq.assessExecutions.answer':
		"If you're already using n8n, you can assess your weekly or monthly usage by reviewing your instance's execution logs.<br/><br/>If you're not yet using n8n, you can estimate your usage by listing your main use cases and evaluating how often each one will run. Here are a few examples:<br/><br/>• <strong>Scheduled workflows:</strong> For workflows triggered on a regular schedule, count how many times the schedule runs in a month. For instance, a daily schedule would result in 30 or 31 executions per month, while one that runs every 5 minutes would result in about 8,600–8,900 executions monthly.<br/>• <strong>Webhook-based workflows:</strong> Estimate how many times the event that triggers your webhook occurs per day. That number equals your daily executions.<br/>• <strong>Chatbot use case:</strong> Estimate how many conversations the chatbot will handle each week, based on your user base and expected frequency of interaction. Then multiply that by the average number of messages per conversation. This gives you the total weekly executions for the chatbot.",
	'faq.wireTransfer.question': 'Can I pay by wire transfer?',
	'faq.wireTransfer.answer':
		'Yes, we offer payment by invoice and wire transfer for the <strong>Annual</strong> Business plan. Please reach out to our sales team using <a href="https://n8n-community.typeform.com/to/nTaly8BO" target="_blank">this form.</a>',

	'management.cancel.success':
		'Your plan was cancelled, but will be available for another {days} days.',
	'management.cancel.success.soon':
		'Your plan was cancelled, and soon will no longer be available.',
	'management.cancel.info': `We’re sorry things didn’t work out this time. Please <a ${MAILTO}>let us know</a> how we can improve and make things better for you next time around.`,
	'cta.orContactUs': `or <a ${ENTERPRISE_CONTACT}>contact us</a>`,
	'plan.recommended': 'Recommended plan',
	'management.cta.1': `To upgrade your plan or your active workflow quota, <a ${MAILTO}>contact us</a>. You can view all plans <a href="/">here</a> `,
	'management.cta.2': 'To cancel your plan and lose access to paid features,',
	'management.cta.3': 'click here.',
	'management.startup': 'Startup plan:',
	'management.business': 'Business plan:',
	'error.somethingWentWrong': 'Something went wrong',
};
