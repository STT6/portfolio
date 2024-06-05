import { defineComponent, createVNode } from "vue";
import { c as createError } from "../server.mjs";
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
import "vue/server-renderer";
import "defu";
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
export {
  islandRenderer as default
};
//# sourceMappingURL=island-renderer-30b82b6e.js.map
