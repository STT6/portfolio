import { _ as __nuxt_component_0$1 } from './nuxt-link-dcdeaa20.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed-header" }, _attrs))}><div class="page-header"><div class="container-fluid"><div class="row"><div class="col text-header">`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text mt-1 mb-1 mr-5 btn btn-primary"${_scopeId}> Home </div>`);
      } else {
        return [
          createVNode("div", { class: "text mt-1 mb-1 mr-5 btn btn-primary" }, " Home ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/projects" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text mt-1 mb-1 btn btn-primary"${_scopeId}> Projects1 </div>`);
      } else {
        return [
          createVNode("div", { class: "text mt-1 mb-1 btn btn-primary" }, " Projects1 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></header>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(_attrs)}><div class="footer mt-5"><div class="container"><div class="row justify-content-between"><div class="col-auto"><div class="footer-line"> Miha Cimerman </div><div class="footer-line"> Podpec, 1312 Videm-Dobrepolje </div></div><div class="col-auto footer-link"><div class="footer-line"> tel: 031 241 151 </div><div class="footer-line"></div></div><div class="col-auto footer-link"></div></div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=AppFooter-0c42f584.mjs.map
