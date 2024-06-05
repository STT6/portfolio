import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "devalue";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
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
const _imports_0 = "" + __buildAssetsURL("klime1.7a06d59e.png");
const _imports_1 = "" + __buildAssetsURL("klime2.735ba780.png");
const _imports_2 = "" + __buildAssetsURL("klime3.44f94979.png");
const _imports_3 = "" + __buildAssetsURL("klime4.c33e2a56.png");
const _imports_4 = "" + __buildAssetsURL("jub4.61495143.png");
const _imports_5 = "" + __buildAssetsURL("jub2.0adfb245.png");
const _imports_6 = "" + __buildAssetsURL("jub3.06461e1e.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "cookies" }, _attrs))}><div class="container"><div class="row"><h1>My projects</h1><h2> AC Control System for Server Room </h2><div class="col-md-6"><p> This project enables users to control the air conditioning units inside a server control room, ensuring optimal temperature and performance of the servers. </p><h5>My Contributions:</h5><ul><li><strong>Frontend Development:</strong> Designed and developed the entire frontend using Vue.js.</li><li><strong>Functionality:</strong> Implemented key features like adding and managing AC units, user management, and comprehensive user verification.</li><li><strong>API Integration:</strong> Integrated with backend APIs for real-time control and monitoring.</li></ul><h5>Technologies Used:</h5><ul><li><strong>Frontend:</strong> Vue.js</li><li><strong>Backend Integration:</strong> RESTful APIs</li></ul></div><div class="col-6"><div class="row"><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_0)} class="img-fluid" alt=""></div><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_1)} class="img-fluid" alt=""></div><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_2)} class="img-fluid" alt=""></div><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_3)} class="img-fluid" alt=""></div></div></div></div><div class="row mt-5"><h2> Employee insights </h2><div class="col-6"><p> This project allows employees to provide feedback to their boss efficiently and effectively. </p><h5>My Contributions:</h5><ul><li><strong>Frontend Development:</strong> Developed the entire frontend using Vue.js, ensuring a seamless and responsive user experience.</li><li><strong>User Interface Design:</strong> Designed a clean and intuitive UI with Vuetify, enhancing usability and accessibility across all devices.</li><li><strong>Core Functionality:</strong> Implemented features such as feedback submission, user management, and a robust verification system.</li><li><strong>API Integration:</strong> Integrated with backend APIs to enable real-time data processing and feedback management.</li></ul><h5>Technologies Used:</h5><ul><li><strong>Frontend:</strong> Vue.js, Vuetify</li><li><strong>Backend Integration:</strong> RESTful APIs</li></ul></div><div class="col-6"><div class="row"><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_4)} class="img-fluid" alt=""></div><div class="col-6 mb-5"><img${ssrRenderAttr("src", _imports_5)} class="img-fluid" alt=""></div><div class="col-2"></div><div class="col-8 mb-5 align center"><img${ssrRenderAttr("src", _imports_6)} class="img-fluid" alt=""></div></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projects = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  projects as default
};
//# sourceMappingURL=projects-25d0c077.js.map
