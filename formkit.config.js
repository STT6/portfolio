import { generateClasses } from '@formkit/themes'
import { en, sl } from '@formkit/i18n'
// import { clone } from '@formkit/utils'

/**
 * Plugin for floating labels where the label is placed after the input. To use add .form-floating inner class to text, email, textarea and select elements.
 * Source: https://github.com/formkit/formkit/issues/174
 *
 * @param node
 */
// const useFloatingLabels = function (node) {
// 	node.on('created', () => {
// 		const inputDefinition = clone(node.props.definition)
// 		if (['radio', 'checkbox', 'button', 'submit'].includes(node.props.type)) { return }
// 		const originalSchema = inputDefinition.schema
// 		const higherOrderSchema = (extensions) => {
// 			// This kills the original label
// 			extensions.label = { $el: null, children: null }
// 			extensions.suffix = {
// 				$el: 'label',
// 				children: '$label',
// 				attrs: {
// 					'data-has-value': '$_value !== "" && $_value !== undefined',
// 					class: '$classes.floating',
// 					for: '$id'
// 				}
// 			}
// 			return originalSchema(extensions)
// 		}
// 		// Set placeholder as Bootstrap requires it
// 		node.props.attrs.placeholder = node.props.attrs.placeholder || node.props.label
// 		node.props.innerClass = [node.props.innerClass, 'form-floating'].join(' ')
// 		inputDefinition.schema = higherOrderSchema
// 		node.props.definition = inputDefinition
// 	})
// }

const config = {
	locales: { en, sl },
	locale: 'sl',
	plugins: [
		// useFloatingLabels  // Floating labels
	],
	config: {
		classes: generateClasses({
			global: { // applies to all input types
				outer: '$reset form-group',
				input: 'form-control',
				label: 'form-label',
				messages: 'list-unstyled small mb-0',
				message: 'is-invalid',
				help: 'form-text'
			},
			checkbox: {
				label: 'form-check-label',
				wrapper: 'checkbox-wrapper',
				inner: 'form-check',
				input: '$reset form-check-input',
				legend: '$reset form-check-label'
			},
			select: {
				input: '$reset form-select'
			},
			radio: {
				label: 'form-check-label',
				wrapper: 'radio-wrapper',
				inner: 'form-check',
				input: '$reset form-check-input',
				legend: '$reset form-check-label'
			},
			submit: {
				outer: '$reset mt-3',
				input: '$reset btn btn-primary'
			}
		})
	}
}

export default config
