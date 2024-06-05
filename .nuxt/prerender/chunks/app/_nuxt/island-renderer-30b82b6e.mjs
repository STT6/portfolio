import { defineComponent, createVNode } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/index.mjs';
import { c as createError } from '../server.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/hookable/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unctx/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unhead/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/h3/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/ufo/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue-devtools-stub/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@intlify/core-base/dist/core-base.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@intlify/vue-devtools/dist/vue-devtools.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/is-https/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/core/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/utils/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/inputs/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/rules/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/validation/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/i18n/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/themes/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@formkit/observer/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/dayjs/dayjs.min.js';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/dayjs/locale/sl.js';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@gtm-support/vue-gtm/dist/index.js';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/defu/dist/defu.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/destr/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/scule/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/klona/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/ohash/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unstorage/drivers/fs.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unstorage/drivers/memory.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/radix3/dist/index.mjs';
import 'node:async_hooks';
import 'node:fs';
import 'node:url';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/pathe/dist/index.mjs';

const components_islands = {};
const islandComponents = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: components_islands
});
const islandRenderer = /* @__PURE__ */ defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const component = islandComponents[props.context.name];
    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${props.context.name}`
      });
    }
    return () => createVNode(component || "span", { ...props.context.props, "nuxt-ssr-component-uid": "" });
  }
});

export { islandRenderer as default };
//# sourceMappingURL=island-renderer-30b82b6e.mjs.map
