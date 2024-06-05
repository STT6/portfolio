import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><section><div class="container mt-5"><div class="row justify-content-center"><div class="col-8"><div class="main-text text-center"><h3 class="main-text title"> Hi! I&#39;m Miha, a passionate front-end developer dedicated to creating engaging and user-friendly websites. </h3></div></div></div></div></section><section id="#about-us"><div class="container"><div class="row"><h5 id="about-us" class="col-12 col-lg-5 text-paragraph"> I am an intermediate Vue Developer with a strong frontend development background and a good grasp of React. Proficient in Vue.js and its ecosystem, including state management, component-based architecture, and RESTful API integration. Skilled in creating dynamic, user-friendly web applications, enhancing user experiences, and optimizing performance. Experienced with GitHub, GitLab, and Figma. </h5></div></div></section><section class="pb-5"><div class="container"><div class="row logos-1"><div class="text-above-logos"> Skills </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 0.6493px, 0px)", "opacity": "0.9935" })}"> JAVASCRIPT </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 2.178px, 0px)", "opacity": "0.9782" })}"> TYPESCRIPT </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 5.7663px, 0px)", "opacity": "0.9423" })}"> HTML </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 13.0215px, 0px)", "opacity": "0.8698" })}"> CSS </div></div><div class="line"></div><div class="row logos-2"><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 2.178px, 0px)", "opacity": "0.9782" })}"> C++ </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 5.7663px, 0px)", "opacity": "0.9423" })}"> C# </div><div class="col-6 col-lg-3 d-flex justify-content-center align-items-center text-paragraph" style="${ssrRenderStyle({ "translate": "none", "rotate": "none", "scale": "none", "transform": "translate3d(0px, 13.0215px, 0px)", "opacity": "0.8698" })}"> PYTHON </div></div></div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-c3249381.js.map
