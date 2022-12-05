export interface OpenApiError {
	code: number;
	message: string;
	errors?: {}[];
}

export interface Option {
	value: string;
	labelKey?: string;
}

export interface Feature {
	labelKey: string;
}

export interface PlanBase {
	id: string;
	nameKey: string;
	descriptionKey: string;
	features: Feature[];
	primaryCTA?: 'email' | 'start-trial';
	secondaryCTA?: 'email';
}

export interface LimitedPlan extends PlanBase {
	unlimited: false;
	options: Option[];
}

export interface UnlimitedPlan extends PlanBase {
	unlimited: true;
}

export interface FreePlan extends UnlimitedPlan {
	free: true;
}

export interface CustomPlan extends UnlimitedPlan {
	custom: true;
}

export type Plan = LimitedPlan | UnlimitedPlan;
