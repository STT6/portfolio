import { defineComponent, mergeProps, useSSRContext } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/index.mjs';
import { ssrRenderAttrs } from 'file://C:/Programming/Projects/LearningGSAP/portfolio/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "scene" }, _attrs))}><div class="cube1"><div class="face front"> We are innovators in creating and maximizing investments through a 360 investment ecosystem approach. </div><div class="face left"> 360 </div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-68bdeaa2.mjs.map
