export interface OpenApiError {
	code: number;
	message: string;
	errors?: {}[];
}

export interface OptionBase {
	value: string;
}

export interface LabelOption extends OptionBase {
	labelKey: string;
}

export interface CountOption extends OptionBase {
	count: number;
}

export interface Feature {
	labelKey: string;
}

export interface PlanBase {
	id: string;
	name: string;
	description: string;
	features: Feature[];
	primaryCTA?: 'email' | 'start-trial';
	secondaryCTA?: 'email';
}

export interface LimitedPlan extends PlanBase {
	unlimited: false;
	options: (CountOption | LabelOption)[];
}

export interface UnlimitedPlan extends PlanBase {
	unlimited: true;
}

export type Plan = LimitedPlan | UnlimitedPlan;
