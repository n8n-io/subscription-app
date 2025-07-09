<template>
	<div v-if="isVisible" :class="$style.overlay" @click="closeModal">
		<div :class="$style.modal" @click.stop>
			<button :class="$style.closeButton" @click="closeModal">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M18 6L6 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						d="M6 6L18 18"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
			<div :class="$style.content">
				<h2 :class="$style.title">Complete Your Information</h2>
				<p :class="$style.subtitle">
					Please fill in your details to start your 14-day trial
				</p>
				<form @submit.prevent="handleSubmit" :class="$style.form">
					<div :class="$style.section">
						<h3 :class="$style.sectionTitle">
							Contact Information
						</h3>
						<div :class="$style.formGroup">
							<label :class="$style.label">Email *</label>
							<input
								v-model="formData.email"
								type="email"
								:class="$style.input"
								placeholder="your@email.com"
								required
							/>
						</div>
					</div>

					<div :class="$style.section">
						<h3 :class="$style.sectionTitle">
							Business Information
						</h3>
						<div :class="$style.formGroup">
							<label :class="$style.label">Company Name</label>
							<input
								v-model="formData.business.name"
								type="text"
								:class="$style.input"
								placeholder="Your Company Name"
							/>
						</div>
						<div :class="$style.formGroup">
							<label :class="$style.label">Tax ID</label>
							<input
								v-model="formData.business.taxIdentifier"
								type="text"
								:class="$style.input"
								placeholder="Tax Identification Number"
							/>
						</div>
					</div>

					<div :class="$style.section">
						<h3 :class="$style.sectionTitle">Address</h3>
						<div :class="$style.formGroup">
							<label :class="$style.label">Address Line *</label>
							<input
								v-model="formData.address.firstLine"
								type="text"
								:class="$style.input"
								placeholder="Street address"
								required
							/>
						</div>
						<div :class="$style.formRow">
							<div :class="$style.formGroup">
								<label :class="$style.label"
									>State/Region</label
								>
								<input
									v-model="formData.address.region"
									type="text"
									:class="$style.input"
									placeholder="State or Region"
								/>
							</div>
							<div :class="$style.formGroup">
								<label :class="$style.label">City *</label>
								<input
									v-model="formData.address.city"
									type="text"
									:class="$style.input"
									placeholder="City"
									required
								/>
							</div>
						</div>
						<div :class="$style.formRow">
							<div :class="$style.formGroup">
								<label :class="$style.label"
									>Postal Code *</label
								>
								<input
									v-model="formData.address.postalCode"
									type="text"
									:class="$style.input"
									placeholder="Postal Code"
									required
								/>
							</div>
							<div :class="$style.formGroup">
								<label :class="$style.label"
									>Country Code *</label
								>
								<select
									v-model="formData.address.countryCode"
									:class="$style.input"
									required
								>
									<option value="" disabled selected>
										Select a country
									</option>
									<option value="AX">Aland Islands</option>
									<option value="AL">Albania</option>
									<option value="DZ">Algeria</option>
									<option value="AS">American Samoa</option>
									<option value="AD">Andorra</option>
									<option value="AO">Angola</option>
									<option value="AI">Anguilla</option>
									<option value="AG">
										Antigua and Barbuda
									</option>
									<option value="AR">Argentina</option>
									<option value="AM">Armenia</option>
									<option value="AW">Aruba</option>
									<option value="AU">Australia</option>
									<option value="AT">Austria</option>
									<option value="AZ">Azerbaijan</option>
									<option value="BS">Bahamas</option>
									<option value="BH">Bahrain</option>
									<option value="BD">Bangladesh</option>
									<option value="BB">Barbados</option>
									<option value="BE">Belgium</option>
									<option value="BZ">Belize</option>
									<option value="BJ">Benin</option>
									<option value="BM">Bermuda</option>
									<option value="BT">Bhutan</option>
									<option value="BO">Bolivia</option>
									<option value="BQ">
										Bonaire, Sint Eustatius and Saba
									</option>
									<option value="BA">
										Bosnia and Herzegovina
									</option>
									<option value="BW">Botswana</option>
									<option value="BV">Bouvet Island</option>
									<option value="BR">Brazil</option>
									<option value="IO">
										Brit. Indian Ocean
									</option>
									<option value="VG">
										British Virgin Islands
									</option>
									<option value="BN">
										Brunei Darussalam
									</option>
									<option value="BG">Bulgaria</option>
									<option value="BF">Burkina Faso</option>
									<option value="BI">Burundi</option>
									<option value="KH">Cambodia</option>
									<option value="CM">Cameroon</option>
									<option value="CA">Canada</option>
									<option value="CV">Cape Verde</option>
									<option value="KY">Cayman Islands</option>
									<option value="TD">Chad</option>
									<option value="CL">Chile</option>
									<option value="CN">China</option>
									<option value="CX">Christmas Island</option>
									<option value="CC">Cocos Islands</option>
									<option value="CO">Colombia</option>
									<option value="KM">Comoros</option>
									<option value="CK">Cook Islands</option>
									<option value="CR">Costa Rica</option>
									<option value="CI">Cote D'Ivoire</option>
									<option value="HR">Croatia</option>
									<option value="CW">Curaçao</option>
									<option value="CY">Cyprus</option>
									<option value="CZ">Czech Republic</option>
									<option value="DK">Denmark</option>
									<option value="DJ">Djibouti</option>
									<option value="DM">Dominica</option>
									<option value="DO">
										Dominican Republic
									</option>
									<option value="EC">Ecuador</option>
									<option value="EG">Egypt</option>
									<option value="SV">El Salvador</option>
									<option value="GQ">
										Equatorial Guinea
									</option>
									<option value="ER">Eritrea</option>
									<option value="EE">Estonia</option>
									<option value="ET">Ethiopia</option>
									<option value="FK">Falkland Islands</option>
									<option value="FO">Faroe Islands</option>
									<option value="FJ">Fiji</option>
									<option value="FI">Finland</option>
									<option value="FR">France</option>
									<option value="GF">French Guiana</option>
									<option value="PF">French Polynesia</option>
									<option value="TF">
										French Southern Terr.
									</option>
									<option value="GA">Gabon</option>
									<option value="GM">Gambia</option>
									<option value="GE">Georgia</option>
									<option value="DE">Germany</option>
									<option value="GH">Ghana</option>
									<option value="GI">Gibraltar</option>
									<option value="GR">Greece</option>
									<option value="GL">Greenland</option>
									<option value="GD">Grenada</option>
									<option value="GP">Guadeloupe</option>
									<option value="GU">Guam</option>
									<option value="GT">Guatemala</option>
									<option value="GG">Guernsey</option>
									<option value="GN">Guinea</option>
									<option value="GW">Guinea-Bissau</option>
									<option value="GY">Guyana</option>
									<option value="HM">
										Heard/ Mcdonald Islands
									</option>
									<option value="VA">
										Holy See/ Vatican City
									</option>
									<option value="HN">Honduras</option>
									<option value="HK">Hong Kong</option>
									<option value="HU">Hungary</option>
									<option value="IS">Iceland</option>
									<option value="IN">India</option>
									<option value="ID">Indonesia</option>
									<option value="IQ">Iraq</option>
									<option value="IE">Ireland</option>
									<option value="IM">Isle of Man</option>
									<option value="IL">Israel</option>
									<option value="IT">Italy</option>
									<option value="JM">Jamaica</option>
									<option value="JP">Japan</option>
									<option value="JE">Jersey</option>
									<option value="JO">Jordan</option>
									<option value="KZ">Kazakhstan</option>
									<option value="KE">Kenya</option>
									<option value="KI">Kiribati</option>
									<option value="XK">Kosovo</option>
									<option value="KW">Kuwait</option>
									<option value="KG">Kyrgyzstan</option>
									<option value="LA">Lao People's DR</option>
									<option value="LV">Latvia</option>
									<option value="LB">Lebanon</option>
									<option value="LS">Lesotho</option>
									<option value="LR">Liberia</option>
									<option value="LI">Liechtenstein</option>
									<option value="LT">Lithuania</option>
									<option value="LU">Luxembourg</option>
									<option value="MO">Macao</option>
									<option value="MK">Macedonia</option>
									<option value="MG">Madagascar</option>
									<option value="MW">Malawi</option>
									<option value="MY">Malaysia</option>
									<option value="MV">Maldives</option>
									<option value="MT">Malta</option>
									<option value="MH">Marshall Islands</option>
									<option value="MQ">Martinique</option>
									<option value="MR">Mauritania</option>
									<option value="MU">Mauritius</option>
									<option value="YT">Mayotte</option>
									<option value="MX">Mexico</option>
									<option value="FM">Micronesia</option>
									<option value="MD">Moldova</option>
									<option value="MC">Monaco</option>
									<option value="MN">Mongolia</option>
									<option value="ME">Montenegro</option>
									<option value="MS">Montserrat</option>
									<option value="MA">Morocco</option>
									<option value="MZ">Mozambique</option>
									<option value="MM">Myanmar</option>
									<option value="NA">Namibia</option>
									<option value="NR">Nauru</option>
									<option value="NP">Nepal</option>
									<option value="NL">Netherlands</option>
									<option value="NC">New Caledonia</option>
									<option value="NZ">New Zealand</option>
									<option value="NE">Niger</option>
									<option value="NG">Nigeria</option>
									<option value="NU">Niue</option>
									<option value="NF">Norfolk Island</option>
									<option value="MP">
										Northern Mariana Islands
									</option>
									<option value="NO">Norway</option>
									<option value="OM">Oman</option>
									<option value="PK">Pakistan</option>
									<option value="PW">Palau</option>
									<option value="PS">
										Palestinian Territory
									</option>
									<option value="PA">Panama</option>
									<option value="PG">Papua New Guinea</option>
									<option value="PY">Paraguay</option>
									<option value="PE">Peru</option>
									<option value="PH">Philippines</option>
									<option value="PN">Pitcairn</option>
									<option value="PL">Poland</option>
									<option value="PT">Portugal</option>
									<option value="PR">Puerto Rico</option>
									<option value="QA">Qatar</option>
									<option value="RS">
										Republic of Serbia
									</option>
									<option value="RE">Reunion</option>
									<option value="RO">Romania</option>
									<option value="RW">Rwanda</option>
									<option value="GS">
										S. Georgia/ Sandwich Islands
									</option>
									<option value="BL">Saint Barthelemy</option>
									<option value="SH">Saint Helena</option>
									<option value="KN">
										Saint Kitts and Nevis
									</option>
									<option value="LC">Saint Lucia</option>
									<option value="MF">Saint Martin</option>
									<option value="PM">
										Saint Pierre and Miquelon
									</option>
									<option value="VC">
										Saint Vincent/ Grenadines
									</option>
									<option value="WS">Samoa</option>
									<option value="SM">San Marino</option>
									<option value="ST">
										Sao Tome and Principe
									</option>
									<option value="SA">Saudi Arabia</option>
									<option value="SN">Senegal</option>
									<option value="SC">Seychelles</option>
									<option value="SL">Sierra Leone</option>
									<option value="SG">Singapore</option>
									<option value="SX">Sint Maarten</option>
									<option value="SK">Slovakia</option>
									<option value="SI">Slovenia</option>
									<option value="SB">Solomon Islands</option>
									<option value="ZA">South Africa</option>
									<option value="KR">South Korea</option>
									<option value="ES">Spain</option>
									<option value="LK">Sri Lanka</option>
									<option value="SR">Suriname</option>
									<option value="SJ">
										Svalbard and Jan Mayen
									</option>
									<option value="SZ">Swaziland</option>
									<option value="SE">Sweden</option>
									<option value="CH">Switzerland</option>
									<option value="TW">Taiwan</option>
									<option value="TJ">Tajikistan</option>
									<option value="TZ">Tanzania</option>
									<option value="TH">Thailand</option>
									<option value="TL">Timor-Leste</option>
									<option value="TG">Togo</option>
									<option value="TK">Tokelau</option>
									<option value="TO">Tonga</option>
									<option value="TT">
										Trinidad and Tobago
									</option>
									<option value="TN">Tunisia</option>
									<option value="TR">Turkey</option>
									<option value="TM">Turkmenistan</option>
									<option value="TC">
										Turks and Caicos Islands
									</option>
									<option value="TV">Tuvalu</option>
									<option value="VI">
										U.S. Virgin Islands
									</option>
									<option value="UG">Uganda</option>
									<option value="UA">Ukraine</option>
									<option value="AE">
										United Arab Emirates
									</option>
									<option value="GB">United Kingdom</option>
									<option value="US">United States</option>
									<option value="UM">
										United States (M.O.I.)
									</option>
									<option value="UY">Uruguay</option>
									<option value="UZ">Uzbekistan</option>
									<option value="VU">Vanuatu</option>
									<option value="VN">Viet Nam</option>
									<option value="WF">
										Wallis and Futuna
									</option>
									<option value="EH">Western Sahara</option>
									<option value="ZM">Zambia</option>
								</select>
							</div>
						</div>
					</div>

					<div :class="$style.footer">
						<VButton
							type="button"
							variant="secondary"
							@click="closeModal"
						>
							Cancel
						</VButton>
						<VButton
							type="submit"
							variant="primary"
							:disabled="isSubmitting"
						>
							{{
								isSubmitting
									? 'Processing...'
									: 'Start 14 day trial'
							}}
						</VButton>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import VButton from './VButton.vue';

export interface CustomerData {
	email: string;
	address: {
		countryCode: string;
		postalCode: string;
		region?: string;
		city: string;
		firstLine: string;
	};
	business: {
		name: string;
		taxIdentifier?: string;
	};
}

interface Props {
	isVisible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(event: 'close'): void;
	(event: 'submit', data: CustomerData): void;
}>();

const isSubmitting = ref(false);

const formData = reactive<CustomerData>({
	email: '',
	address: {
		countryCode: 'US',
		postalCode: '',
		region: '',
		city: '',
		firstLine: '',
	},
	business: {
		name: '',
		taxIdentifier: '',
	},
});

function closeModal() {
	emit('close');
}

function resetForm() {
	formData.email = '';
	formData.address.countryCode = 'US';
	formData.address.postalCode = '';
	formData.address.region = '';
	formData.address.city = '';
	formData.address.firstLine = '';
	formData.business.name = '';
	formData.business.taxIdentifier = '';
}

async function handleSubmit() {
	isSubmitting.value = true;

	// Create a clean copy of the data, removing empty optional fields
	const customerData: CustomerData = {
		email: formData.email,
		address: {
			countryCode: formData.address.countryCode,
			postalCode: formData.address.postalCode,
			city: formData.address.city,
			firstLine: formData.address.firstLine,
		},
		business: {
			name: formData.business.name,
		},
	};

	// Add optional fields only if they have values
	if (formData.address.region) {
		customerData.address.region = formData.address.region;
	}
	if (formData.business.taxIdentifier) {
		customerData.business.taxIdentifier = formData.business.taxIdentifier;
	}

	emit('submit', customerData);
	isSubmitting.value = false;
}

// Handle ESC key
function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape' && props.isVisible) {
		closeModal();
	}
}

// Watch for visibility changes
watch(
	() => props.isVisible,
	(newValue) => {
		if (newValue) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeydown);
		} else {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleKeydown);
			// Reset form when modal closes
			setTimeout(resetForm, 300);
		}
	}
);
</script>

<style lang="scss" module>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(4px);
	transition: opacity 0.25s ease-in-out;
	z-index: 10001;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal {
	position: relative;
	width: 90%;
	max-width: 600px;
	max-height: 90vh;
	background: #1a1a1a;
	border-radius: var(--border-radius-base);
	overflow: hidden;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.closeButton {
	position: absolute;
	top: 16px;
	right: 16px;
	background: rgba(255, 255, 255, 0.1);
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 10002;
	transition: all 0.2s;
	color: #fff;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}

	svg {
		width: 20px;
		height: 20px;
	}
}

.content {
	padding: var(--spacing-2xl);
	overflow-y: auto;
}

.title {
	font-size: var(--font-size-xxl);
	font-weight: 600;
	color: var(--color-white);
	margin-bottom: var(--spacing-xs);
	text-align: center;
}

.subtitle {
	font-size: var(--font-size-base);
	color: var(--color-paragraphs);
	text-align: center;
	margin-bottom: var(--spacing-2xl);
}

.form {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xl);
}

.section {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-m);
}

.sectionTitle {
	font-size: var(--font-size-md);
	font-weight: 500;
	color: var(--color-white);
}

.formGroup {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
	flex: 1;
}

.formRow .formGroup:first-child {
	flex: 0 0 40%;
}

.formRow {
	display: flex;
	gap: var(--spacing-m);

	@media (max-width: 480px) {
		flex-direction: column;
	}
}

.label {
	font-size: var(--font-size-sm);
	color: var(--color-paragraphs);
	font-weight: 400;
}

.input {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: var(--border-radius-sm);
	padding: var(--spacing-s);
	font-size: var(--font-size-base);
	color: var(--color-white);
	transition: all 0.2s;

	&::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	&:focus {
		outline: none;
		border-color: #077ac7;
		background: rgba(255, 255, 255, 0.15);
	}

	&:hover {
		border-color: rgba(7, 122, 199, 0.5);
	}
}

select.input {
	appearance: none;
	background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right var(--spacing-s) center rgba(255, 255, 255, 0.1);
	background-size: 20px;
	padding-right: calc(var(--spacing-s) + 24px);
	
	&:focus {
		background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right var(--spacing-s) center rgba(255, 255, 255, 0.15);
		background-size: 20px;
	}
}

.footer {
	display: flex;
	gap: var(--spacing-m);
	margin-top: var(--spacing-xl);
	justify-content: flex-end;
}

@media (max-width: 768px) {
	.modal {
		width: calc(100% - 40px);
		margin: 20px;
	}

	.content {
		padding: var(--spacing-xl);
	}

	.closeButton {
		top: 12px;
		right: 12px;
		width: 36px;
		height: 36px;

		svg {
			width: 18px;
			height: 18px;
		}
	}
}
</style>
