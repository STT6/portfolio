import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './AppFooter-0c42f584.mjs';
import { useSSRContext } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';
import './nuxt-link-dcdeaa20.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/ufo/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/hookable/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unctx/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/unhead/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/h3/dist/index.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-55454485.mjs.map
