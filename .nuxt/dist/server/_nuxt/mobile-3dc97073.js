import { _ as __nuxt_component_0, a as __nuxt_component_1 } from "./AppFooter-0c42f584.js";
import { useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-dcdeaa20.js";
import "ufo";
import "hookable";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "destr";
import "devalue";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "@vue/devtools-api";
import "@intlify/core-base";
import "@intlify/vue-devtools";
import "cookie-es";
import "js-cookie";
import "is-https";
import "@formkit/core";
import "@formkit/utils";
import "@formkit/inputs";
import "@formkit/rules";
import "@formkit/validation";
import "@formkit/i18n";
import "@formkit/themes";
import "@formkit/observer";
import "@formkit/dev";
import "dayjs";
import "dayjs/locale/sl.js";
import "@gtm-support/vue-gtm";
import "defu";
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/mobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  mobile as default
};
//# sourceMappingURL=mobile-3dc97073.js.map
