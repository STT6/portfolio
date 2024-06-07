# Proper Nuxt 3 Template

### Plugins
- dayjs (date formatting)
- mitt (bus events)
- pinia
- i18n
- gtm
- klaro
- formkit

### Custom components
- `$locale()` is used to display locale strings from backend.
- `useApiFetch()` is used for API calls, it's a wrapper around useFetch() axios-ish way

We're using a propercore module with core store (using pinia) and core components like useApiFetch() and $locale().

Using **typescript** is recommended!

### Other packages we use in general
- Splide for sliders
- vuejs-paginate-next for pagination

# General rules
- everything that can be set with bootstrap variables must be set with variables, put into some variables/_bootstrap.scss. This goes especialy for tyopgraphy, grid, forms, ... More: https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss
- scss imports from bootstrap that are not needed should be commented, so css file is smaller
- use scss files in assets map, not inline (s)css in components, it's easier to maintain
- Bootstrap's classes like .container, .col-* etc. must never be directly overrided. Also for containers - there are settings about container widths, usually they don't even need to be changed
- Bootstrap classes must be used at least for general grid (containers, css, ...) which means gutters set in variables files
- don't try to break up everything into Vue components, don't try to generalize too much - overriding components and accessing their inner workings is a pain if they're too atomized (eg: a button doesn't need to be it's own component if the only thing you're adding is a special class)
- go over bootstrap's mixins. bootstrap has a lot of builtin mixins that you can use so that you don't have to invent your own (@include make-row(), @include make-col-ready(), @include-make-col(), @include make-col-offset(), etc). More: https://github.com/twbs/bootstrap/blob/main/scss/_mixins.scss. But most of these can be used using classes already available in bootstrap
- for font sizes use responsive font-size mixin provided by bootstrap
- avoid using utility classes like d-flex, mb-2 etc. this should be done using scss
- all units for fonts, padding etc. must be in rem! All units for fonts, padding etc. must be in rem! If some padding/margin in design is for example 31px use 2rem.
- class names must use BEM naming. Do not use abbreviations like req (for request) etc., use normal, readable names that clearly say what they are for
- use commenting the code wherever see fit
- using https://google-webfonts-helper.herokuapp.com/fonts for google fonts
- no v-html on `<p>`
- pages must use Nuxt's useHead for title, description etc.
- code/css must be clear and readable
- do NOT use object-fit: cover on images unless with those that are behaving like backgrounds, using .img-fluid for responsive image is recommended
- vector images should be svg, optimized with https://jakearchibald.github.io/svgomg/ or other similar tool
- html must be of course w3c valid

## Also:
- use latest Nuxt
- using eslinter is a MUST
- using of stylelint is a MUST
- project MUST use TAB indenting, tab width equals 4 spaces. Using .editorconfig file is required
- must be pushed to repository daily

# One last thing...
ANY comments and suggestions are very welcome :)
s