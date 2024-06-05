import { u as useNuxtApp, c as createError, a as useRequestFetch, b as useRuntimeConfig, d as useRoute } from "../server.mjs";
import { u as useHead } from "./index-6a088328.js";
import { ref, toRef, getCurrentInstance, onServerPrefetch, unref, computed, reactive, defineComponent, withAsyncContext, mergeProps, useSSRContext } from "vue";
import "destr";
import "devalue";
import "klona";
import { hash } from "ohash";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
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
const getDefault = () => null;
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key] || !options.immediate) {
    nuxt._asyncData[key] = {
      data: ref(getCachedData() ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request2, arg1, arg2) {
  var _a;
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => {
    let r = request2;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const _key = opts.key || hash([autoKey, ((_a = unref(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET", unref(opts.baseURL), typeof _request.value === "string" ? _request.value : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request2) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const request = (url, options) => {
  const { $i18n } = useNuxtApp();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const { params, ...rest } = options || {};
  const key = (options == null ? void 0 : options.key) || `${url}-${JSON.stringify(params)}-${(options == null ? void 0 : options.method) || "GET"}`;
  return useFetch(url, {
    baseURL: config.public.API_BASE_URL,
    params: {
      ...$i18n ? { lang: $i18n.locale } : {},
      ...params
    },
    ...rest,
    key
  }, "$lllauMIXm6");
};
const useApiFetch = function(url, options) {
  return request(url, options);
};
useApiFetch.get = (url, options) => request(url, { ...options, method: "get" });
useApiFetch.post = (url, options) => request(url, { ...options, method: "post" });
useApiFetch.update = (url, options) => request(url, { ...options, method: "put" });
useApiFetch.delete = (url, options) => request(url, { ...options, method: "delete" });
const useApiFetch$1 = useApiFetch;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    return useNuxtApp().runWithContext(async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      let __temp, __restore;
      const { params } = useRoute();
      const url = `page/${params.slug}`;
      const { data: page } = ([__temp, __restore] = withAsyncContext(() => useApiFetch$1.get(url)), __temp = await __temp, __restore(), __temp);
      useHead({
        ...((_a = page.value) == null ? void 0 : _a.title) && { title: (_b = page.value) == null ? void 0 : _b.title },
        meta: [
          ...((_c = page.value) == null ? void 0 : _c.title) ? [{ hid: "title", name: "title", content: (_d = page.value) == null ? void 0 : _d.title }] : [],
          ...((_e = page.value) == null ? void 0 : _e.lead) ? [{ hid: "description", name: "description", content: (_f = page.value) == null ? void 0 : _f.lead }] : [],
          ...((_g = page.value) == null ? void 0 : _g.title) ? [{ hid: "og:title", property: "og:title", content: (_h = page.value) == null ? void 0 : _h.title }] : [],
          ...((_i = page.value) == null ? void 0 : _i.lead) ? [{ hid: "og:description", property: "og:description", content: (_j = page.value) == null ? void 0 : _j.lead }] : [],
          ...((_k = page.value) == null ? void 0 : _k.picture) ? [{ hid: "og:image", property: "og:image", content: (_l = page.value) == null ? void 0 : _l.picture.default }] : []
        ]
      });
      return (_ctx, _push, _parent, _attrs) => {
        if (unref(page)) {
          _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="content-title"><h1>${ssrInterpolate(unref(page).title)}</h1></div><div class="content-container">`);
          if (unref(page).lead) {
            _push(`<p class="lead">${ssrInterpolate(unref(page).lead)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(page).content) {
            _push(`<div class="container-content">${unref(page).content}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
      };
    });
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/propercore/pages/page/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-6784b317.js.map
