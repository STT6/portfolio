import { reactive, hasInjectionContext, getCurrentInstance, version, unref, inject, toRef, isRef, nextTick, shallowRef, shallowReactive, isReadonly, effectScope, ref, markRaw, watch, isReactive, toRaw, computed, getCurrentScope, onScopeDispose, toRefs, isShallow, defineComponent, h, onUnmounted, Fragment, createVNode, Text, triggerRef, watchEffect, provide, createTextVNode, resolveComponent, Suspense, mergeProps, Transition, withCtx, useSSRContext, defineAsyncComponent, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, createApp } from "vue";
import { $fetch } from "ofetch";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import "destr";
import "devalue";
import "klona";
import { getActiveHead, CapoPlugin } from "unhead";
import { defineHeadPlugin } from "@unhead/shared";
import { createMemoryHistory, createRouter, START_LOCATION, useRouter as useRouter$1, useRoute as useRoute$1, RouterView } from "vue-router";
import { sanitizeStatusCode, createError as createError$1, getRequestHeaders } from "h3";
import { withQuery, hasProtocol, parseURL, isScriptProtocol, joinURL, isEqual } from "ufo";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { CoreWarnCodes, CoreErrorCodes, registerMessageCompiler, compile, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE as DEFAULT_LOCALE$1, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, isTranslateFallbackWarn, isTranslateMissingWarn, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number, isMessageAST } from "@intlify/core-base";
import { VueDevToolsLabels, VueDevToolsPlaceholders, VueDevToolsTimelineColors } from "@intlify/vue-devtools";
import { parse, serialize } from "cookie-es";
import "js-cookie";
import isHTTPS from "is-https";
import { createConfig, getNode, clearErrors, setErrors, submitForm, reset, createClasses, generateClassList, createMessage, error, createNode, warn as warn$2, watchRegistry, isNode, sugar, isDOM, isComponent, isConditional, compile as compile$1, resetCount } from "@formkit/core";
import { extend, empty, has, eq, cloneAny, shallowClone, undefine, camel, kebab, nodeProps, only, except, oncePerTick, slugify, isObject as isObject$2, token, isPojo } from "@formkit/utils";
import { createSection, createLibraryPlugin, inputs, runtimeProps } from "@formkit/inputs";
import * as defaultRules from "@formkit/rules";
import { createValidationPlugin } from "@formkit/validation";
import { createI18nPlugin, en, sl } from "@formkit/i18n";
import { createThemePlugin, generateClasses } from "@formkit/themes";
import { createObserver } from "@formkit/observer";
import "@formkit/dev";
import dayjs from "dayjs";
import sl$1 from "dayjs/locale/sl.js";
import { createGtm } from "@gtm-support/vue-gtm";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import { defu } from "defu";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: true
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.7.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    const promise = applyPlugin(nuxtApp, plugin2);
    if (plugin2.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxt = /* @__PURE__ */ useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestHeaders(include) {
  var _a;
  const event = (_a = (/* @__PURE__ */ useNuxtApp()).ssrContext) == null ? void 0 : _a.event;
  const headers = event ? getRequestHeaders(event) : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  const event = (_a = (/* @__PURE__ */ useNuxtApp()).ssrContext) == null ? void 0 : _a.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error2) => {
      restore();
      throw error2;
    });
  }
  return [awaitable, restore];
}
const _routes = [
  {
    name: "index___sl",
    path: "/sl",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/index-c3249381.js").then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/index-c3249381.js").then((m) => m.default || m)
  },
  {
    name: "index___en",
    path: "/en",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/index-c3249381.js").then((m) => m.default || m)
  },
  {
    name: "projects___sl",
    path: "/sl/projects",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/projects-25d0c077.js").then((m) => m.default || m)
  },
  {
    name: "projects",
    path: "/projects",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/projects-25d0c077.js").then((m) => m.default || m)
  },
  {
    name: "projects___en",
    path: "/en/projects",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/projects-25d0c077.js").then((m) => m.default || m)
  },
  {
    name: "test___sl",
    path: "/sl/test",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/test-68bdeaa2.js").then((m) => m.default || m)
  },
  {
    name: "test",
    path: "/test",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/test-68bdeaa2.js").then((m) => m.default || m)
  },
  {
    name: "test___en",
    path: "/en/test",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/test-68bdeaa2.js").then((m) => m.default || m)
  },
  {
    name: "propercore-page___sl",
    path: "/sl/page/:slug",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/_slug_-6784b317.js").then((m) => m.default || m)
  },
  {
    name: "propercore-page",
    path: "/page/:slug",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/_slug_-6784b317.js").then((m) => m.default || m)
  },
  {
    name: "propercore-page___en",
    path: "/en/page/:slug",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import("./_nuxt/_slug_-6784b317.js").then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior: (to, _, savedPosition) => {
    return new Promise((resolve2) => {
      setTimeout(() => {
        var _a, _b;
        if (!to.hash) {
          resolve2({
            left: (savedPosition == null ? void 0 : savedPosition.left) || 0,
            top: (savedPosition == null ? void 0 : savedPosition.top) || 0
          });
        } else {
          const top = window.pageYOffset + ((_b = (_a = document == null ? void 0 : document.getElementById(to.hash.substring(1))) == null ? void 0 : _a.getBoundingClientRect()) == null ? void 0 : _b.top) || 0;
          resolve2({
            left: 0,
            top: top || 0
          });
        }
      }, 500);
    });
  }
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(from, to) {
  return to.path !== from.path || JSON.stringify(from.params) !== JSON.stringify(to.params);
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a2;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
const isVue2 = false;
const isVue3 = true;
/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = false;
const USE_DEVTOOLS = (process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT;
const saveAs = () => {
};
function toastMessage(message, type) {
  const piniaMessage = "🍍 " + message;
  if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === "error") {
    console.error(piniaMessage);
  } else if (type === "warn") {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return "_a" in o && "install" in o;
}
function checkClipboardAccess() {
  if (!("clipboard" in navigator)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, "error");
    return true;
  }
}
function checkNotFocusedError(error2) {
  if (error2 instanceof Error && error2.message.toLowerCase().includes("document is not focused")) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
    return true;
  }
  return false;
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
    toastMessage("Global state copied to clipboard.");
  } catch (error2) {
    if (checkNotFocusedError(error2))
      return;
    toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
    console.error(error2);
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
    toastMessage("Global state pasted from clipboard.");
  } catch (error2) {
    if (checkNotFocusedError(error2))
      return;
    toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
    console.error(error2);
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(new Blob([JSON.stringify(pinia.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (error2) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error2);
  }
}
let fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  }
  function openFile() {
    return new Promise((resolve2, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files)
          return resolve2(null);
        const file = files.item(0);
        if (!file)
          return resolve2(null);
        return resolve2({ text: await file.text(), file });
      };
      fileInput.oncancel = () => resolve2(null);
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open = getFileOpener();
    const result = await open();
    if (!result)
      return;
    const { text, file } = result;
    loadStoresState(pinia, JSON.parse(text));
    toastMessage(`Global state imported from "${file.name}".`);
  } catch (error2) {
    toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
    console.error(error2);
  }
}
function loadStoresState(pinia, state) {
  for (const key in state) {
    const storeState = pinia.state.value[key];
    if (storeState) {
      Object.assign(storeState, state[key]);
    }
  }
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
const PINIA_ROOT_ID = "_root";
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys());
    const storeMap = store._s;
    const state2 = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId]
      })),
      getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
        const store2 = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store2._getters.reduce((getters, key) => {
            getters[key] = store2[key];
            return getters;
          }, {})
        };
      })
    };
    return state2;
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key]
    }))
  };
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName]
    }));
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key]
    }));
  }
  return state;
}
function formatEventData(events) {
  if (!events)
    return {};
  if (Array.isArray(events)) {
    return events.reduce((data, event) => {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return "mutation";
    case MutationType.patchFunction:
      return "$patch";
    case MutationType.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = "pinia:mutations";
const INSPECTOR_ID = "pinia";
const { assign: assign$1$1 } = Object;
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: `Pinia 🍍`,
      color: 15064968
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            actionGlobalCopyState(pinia);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await actionGlobalPasteState(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            actionGlobalSaveState(pinia);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await actionGlobalOpenStateFile(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (nodeId) => {
            const store = pinia._s.get(nodeId);
            if (!store) {
              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
            } else if (typeof store.$reset !== "function") {
              toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
            } else {
              store.$reset();
              toastMessage(`Store "${nodeId}" reset.`);
            }
          }
        }
      ]
    });
    api.on.inspectComponent((payload, ctx) => {
      const proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        const piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach((store) => {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: "state",
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: toRaw(store.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => store.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            )
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "getters",
              editable: false,
              value: store._getters.reduce((getters, key) => {
                try {
                  getters[key] = store[key];
                } catch (error2) {
                  getters[key] = error2;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        let stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return;
        }
        if (inspectedStore) {
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState((payload, ctx) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage(`store "${payload.nodeId}" not found`, "error");
        }
        const { path } = payload;
        if (!isPinia(inspectedStore)) {
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift("$state");
          }
        } else {
          path.unshift("state");
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState((payload) => {
      if (payload.type.startsWith("🍍")) {
        const storeId = payload.type.replace(/^🍍\s*/, "");
        const store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage(`store "${storeId}" not found`, "error");
        }
        const { path } = payload;
        if (path[0] !== "state") {
          return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
        }
        path[0] = "$state";
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (api) => {
    const now = typeof api.now === "function" ? api.now.bind(api) : Date.now;
    store.$onAction(({ after, onError, name, args }) => {
      const groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: "🛫 " + name,
          subtitle: "start",
          data: {
            store: formatDisplay(store.$id),
            action: formatDisplay(name),
            args
          },
          groupId
        }
      });
      after((result) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: "🛬 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              result
            },
            groupId
          }
        });
      });
      onError((error2) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            logType: "error",
            title: "💥 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              error: error2
            },
            groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach((name) => {
      watch(() => unref(store[name]), (newValue, oldValue) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              title: "Change",
              subtitle: name,
              data: {
                newValue,
                oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, { deep: true });
    });
    store.$subscribe(({ events, type }, state) => {
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive)
        return;
      const eventData = {
        time: now(),
        title: formatMutationType(type),
        data: assign$1$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
        groupId: activeAction
      };
      if (type === MutationType.patchFunction) {
        eventData.subtitle = "⤵️";
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = "🧩";
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, { detached: true, flush: "sync" });
    const hotUpdate = store._hotUpdate;
    store._hotUpdate = markRaw((newStore) => {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now(),
          title: "🔥 " + store.$id,
          subtitle: "HMR update",
          data: {
            store: formatDisplay(store.$id),
            info: formatDisplay(`HMR update`)
          }
        }
      });
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    const { $dispose } = store;
    store.$dispose = () => {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
    };
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
  });
}
let runningActionId = 0;
let activeAction;
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const _actionId = runningActionId;
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          activeAction = _actionId;
          return Reflect.get(...args);
        },
        set(...args) {
          activeAction = _actionId;
          return Reflect.set(...args);
        }
      }) : store;
      activeAction = _actionId;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      activeAction = void 0;
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
  const originalHotUpdate = store._hotUpdate;
  toRaw(store)._hotUpdate = function(newStore) {
    originalHotUpdate.apply(this, arguments);
    patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
  };
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = process.env.NODE_ENV !== "production" && hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (process.env.NODE_ENV !== "production" && name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  if (process.env.NODE_ENV !== "production" && !pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  if (process.env.NODE_ENV !== "production" && !isVue2) {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (process.env.NODE_ENV !== "production") {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } : noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error2) {
        triggerSubscriptions(onErrorCallbackList, error2);
        throw error2;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error2) => {
          triggerSubscriptions(onErrorCallbackList, error2);
          return Promise.reject(error2);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(process.env.NODE_ENV !== "production" || USE_DEVTOOLS ? assign$2(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) : partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return runWithContext(() => scope.run(setup));
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (process.env.NODE_ENV !== "production" && hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = process.env.NODE_ENV !== "production" && hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else if (process.env.NODE_ENV !== "production") {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
      }
    }
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => process.env.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (process.env.NODE_ENV !== "production" && hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign$2({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign$2(store, extensions);
    } else {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (process.env.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (process.env.NODE_ENV !== "production" && typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (process.env.NODE_ENV !== "production" && !activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      if (process.env.NODE_ENV !== "production") {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (process.env.NODE_ENV !== "production" && hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$2({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (process.env.NODE_ENV !== "production" && IS_CLIENT) {
      const currentInstance = getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const composition_sLxaNGmlSL = /* @__PURE__ */ defineNuxtPlugin(() => {
});
/*!
  * shared v9.3.0-beta.27
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = false;
if (process.env.NODE_ENV !== "production")
  ;
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format(message, ...args) {
  if (args.length === 1 && isObject$1(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const makeSymbol$1 = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign$1 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {});
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray$1 = Array.isArray;
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn$1(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * vue-i18n v9.3.0-beta.27
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.3.0-beta.27";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
const I18nWarnCodes = {
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1()
  // 17
};
const warnMessages = {
  [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE]: `Not supported 'preserve'.`,
  [I18nWarnCodes.NOT_SUPPORTED_FORMATTER]: `Not supported 'formatter'.`,
  [I18nWarnCodes.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: `Not supported 'preserveDirectiveContent'.`,
  [I18nWarnCodes.NOT_SUPPORTED_GET_CHOICE_INDEX]: `Not supported 'getChoiceIndex'.`,
  [I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`,
  [I18nWarnCodes.IGNORE_OBJ_FLATTEN]: `Ignore object flatten: '{key}' key has an string value`,
  [I18nWarnCodes.NOTICE_DROP_ALLOW_COMPOSITION]: `'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze`
};
function getWarnMessage(code2, ...args) {
  return format(warnMessages[code2], ...args);
}
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 37
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, process.env.NODE_ENV !== "production" ? { messages: errorMessages, args } : void 0);
}
const errorMessages = {
  [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [I18nErrorCodes.INVALID_ARGUMENT]: "Invalid argument",
  [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [I18nErrorCodes.NOT_INSTALLED]: "Need to install with `app.use` function",
  [I18nErrorCodes.UNEXPECTED_ERROR]: "Unexpected error",
  [I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
  [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
  [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
  [I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [I18nErrorCodes.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
};
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol$1("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol$1("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol$1("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol$1("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol$1("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol$1("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol$1("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol$1("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          process.env.NODE_ENV !== "production" && warn$1(getWarnMessage(I18nWarnCodes.IGNORE_OBJ_FLATTEN, {
            key: subKeys[i]
          }));
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray$1(__i18n) ? {} : { [locale]: {} };
  if (isArray$1(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy$1(resource, ret[locale2]);
        } else {
          deepCopy$1(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy$1(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
function deepCopy$1(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy$1(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction$1(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction$1(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    if (process.env.NODE_ENV !== "production") {
      ctxOptions.__v_emitter = isPlainObject(_context) ? _context.__v_emitter : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction$1(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !arg.resolvedMessage;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      if (process.env.NODE_ENV !== "production" && __root && isString$1(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn$1(getWarnMessage(I18nWarnCodes.FALLBACK_TO_ROOT, {
            key,
            type: warnType
          }));
        }
        if (process.env.NODE_ENV !== "production") {
          const { __v_emitter: emitter } = _context;
          if (emitter && _fallbackRoot) {
            emitter.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray$1(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray$1(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray$1(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy$1(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  if (process.env.NODE_ENV !== "production") {
    composer[EnableEmitter] = (emitter) => {
      _context.__v_emitter = emitter;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$1({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray$1(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray$1(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$1({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    if (process.env.NODE_ENV !== "production" && modifiers.preserve) {
      warn$1(getWarnMessage(I18nWarnCodes.NOT_SUPPORTED_PRESERVE));
    }
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (process.env.NODE_ENV !== "production" && globalInstall && useI18nComponentName) {
    warn$1(getWarnMessage(I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE, {
      name: Translation.name
    }));
  }
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n) {
  return new Promise((resolve2, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels[
          "vue-devtools-plugin-vue-i18n"
          /* VueDevToolsIDs.PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: VueDevToolsTimelineColors[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ]
        });
        resolve2(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key) => {
    const v = messages[key];
    if (isFunction$1(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer = i18n.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n) {
  if (nodeId === "global") {
    return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  } else {
    const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray$1(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol$1("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol$1(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  if (process.env.NODE_ENV !== "production")
    ;
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        if ((process.env.NODE_ENV !== "production" || false) && true) {
          app.__VUE_I18N__ = i18n;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n.dispose();
          unmountApp();
        };
        if ((process.env.NODE_ENV !== "production" || false) && true) {
          const ret = await enableDevTools(app, i18n);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer$3(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      if (process.env.NODE_ENV !== "production") {
        warn$1(getWarnMessage(I18nWarnCodes.NOT_FOUND_PARENT_SCOPE));
      }
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$1({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$3(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n, target, composer) {
  {
    onUnmounted(() => {
      const _composer = composer;
      if ((process.env.NODE_ENV !== "production" || false) && true && target.vnode.el && target.vnode.el.__VUE_I18N__) {
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  initFeatureFlags();
}
{
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if (process.env.NODE_ENV !== "production")
  ;
const STRATEGIES = {
  PREFIX: "prefix",
  PREFIX_EXCEPT_DEFAULT: "prefix_except_default",
  PREFIX_AND_DEFAULT: "prefix_and_default",
  NO_PREFIX: "no_prefix"
};
const DEFAULT_LOCALE = "";
const DEFAULT_STRATEGY = STRATEGIES.PREFIX_EXCEPT_DEFAULT;
const DEFAULT_TRAILING_SLASH = false;
const DEFAULT_ROUTES_NAME_SEPARATOR = "___";
const DEFAULT_LOCALE_ROUTE_NAME_SUFFIX = "default";
const DEFAULT_DETECTION_DIRECTION = "ltr";
const DEFAULT_BASE_URL = "";
const DEFAULT_DYNAMIC_PARAMS_KEY = "";
/*!
  * shared v9.3.0-beta.26
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const assign = Object.assign;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[vue-i18n-routing] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function isExportedGlobalComposer(target) {
  return target != null && !("__composer" in target) && !isRef(target.locale);
}
function isLegacyVueI18n$1(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function getComposer(i18n) {
  return isI18nInstance(i18n) ? isComposer(i18n.global) ? i18n.global : i18n.global.__composer : isVueI18n(i18n) ? i18n.__composer : i18n;
}
function getLocale(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locale.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locale : target.locale;
}
function getLocales(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locales.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locales : target.locales;
}
function getLocaleCodes(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.localeCodes.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.localeCodes : target.localeCodes;
}
function setLocale(i18n, locale) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  if (isComposer(target)) {
    {
      target.locale.value = locale;
    }
  } else if (isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target)) {
    target.locale = locale;
  } else {
    throw new Error("TODO:");
  }
}
function getRouteName(routeName) {
  return isString(routeName) ? routeName : isSymbol(routeName) ? routeName.toString() : "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix
}) {
  let name = getRouteName(routeName) + (strategy === "no_prefix" ? "" : routesNameSeparator + locale);
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.iso.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.iso.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales = [];
  for (const l of locales) {
    const { code: code2 } = l;
    const iso = l.iso || code2;
    normalizedLocales.push({ code: code2, iso });
  }
  const matchedLocales = matcher(normalizedLocales, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function proxyVueInstance(target) {
  return function() {
    return Reflect.apply(
      target,
      {
        getRouteBaseName: this.getRouteBaseName,
        localePath: this.localePath,
        localeRoute: this.localeRoute,
        localeLocation: this.localeLocation,
        resolveRoute: this.resolveRoute,
        switchLocalePath: this.switchLocalePath,
        localeHead: this.localeHead,
        i18n: this.$i18n,
        route: this.$route,
        router: this.$router
      },
      // eslint-disable-next-line prefer-rest-params
      arguments
    );
  };
}
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = DEFAULT_BASE_URL,
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (localComposer) => {
      const globalComposer2 = getComposer(i18n);
      localComposer.locales = computed(() => globalComposer2.locales.value);
      localComposer.localeCodes = computed(() => globalComposer2.localeCodes.value);
      localComposer.baseUrl = computed(() => globalComposer2.baseUrl.value);
      let orgComposerDispose;
      if (isFunction(orgComposerExtend)) {
        orgComposerDispose = Reflect.apply(orgComposerExtend, pluginOptions, [localComposer]);
      }
      return () => {
        orgComposerDispose && orgComposerDispose();
      };
    };
    if (i18n.mode === "legacy") {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        let orgVueI18nDispose;
        if (isFunction(orgVueI18nExtend)) {
          orgVueI18nDispose = Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
        return () => {
          orgVueI18nDispose && orgVueI18nDispose();
        };
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const globalComposer = getComposer(i18n);
    scope.run(() => {
      extendComposer(globalComposer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context });
      if (i18n.mode === "legacy" && isVueI18n(i18n.global)) {
        extendVueI18n(i18n.global, hooks.onExtendVueI18n);
      }
    });
    const app = vue;
    const exported = i18n.mode === "composition" ? app.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, globalComposer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      vue.mixin({
        methods: {
          resolveRoute: proxyVueInstance(resolveRoute),
          localePath: proxyVueInstance(localePath),
          localeRoute: proxyVueInstance(localeRoute),
          localeLocation: proxyVueInstance(localeLocation),
          switchLocalePath: proxyVueInstance(switchLocalePath),
          getRouteBaseName: proxyVueInstance(getRouteBaseName),
          localeHead: proxyVueInstance(localeHead)
        }
      });
    }
    if (app.unmount) {
      const unmountApp = app.unmount;
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendProperyDescripters(composer, exported, hook) {
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendExportedGlobal(exported, g, hook) {
  extendProperyDescripters(g, exported, hook);
}
function extendVueI18n(vueI18n, hook) {
  const c = getComposer(vueI18n);
  extendProperyDescripters(c, vueI18n, hook);
}
function isPluginOptions(options) {
  return isObject(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}
const GlobalOptionsRegistory = makeSymbol("vue-i18n-routing-gor");
function registerGlobalOptions(router, options) {
  const _options = router[GlobalOptionsRegistory];
  if (_options) {
    warn("already registered global options");
  } else {
    router[GlobalOptionsRegistory] = options;
  }
}
function getGlobalOptions(router) {
  return router[GlobalOptionsRegistory] ?? {};
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
function createLocaleFromRouteGetter(localeCodes2, routesNameSeparator, defaultLocaleRouteNameSuffix) {
  const localesPattern = `(${localeCodes2.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes2);
  const getLocaleFromRoute = (route) => {
    if (isObject(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
function getI18nRoutingOptions(router, proxy, {
  defaultLocale = DEFAULT_LOCALE,
  defaultDirection = DEFAULT_DETECTION_DIRECTION,
  defaultLocaleRouteNameSuffix = DEFAULT_LOCALE_ROUTE_NAME_SUFFIX,
  routesNameSeparator = DEFAULT_ROUTES_NAME_SEPARATOR,
  strategy = DEFAULT_STRATEGY,
  trailingSlash = DEFAULT_TRAILING_SLASH,
  localeCodes: localeCodes2 = [],
  prefixable: prefixable2 = DefaultPrefixable,
  switchLocalePathIntercepter = DefaultSwitchLocalePathIntercepter,
  dynamicRouteParamsKey = DEFAULT_DYNAMIC_PARAMS_KEY
} = {}) {
  const options = getGlobalOptions(router);
  return {
    defaultLocale: proxy.defaultLocale || options.defaultLocale || defaultLocale,
    defaultDirection: proxy.defaultDirection || options.defaultDirection || defaultDirection,
    defaultLocaleRouteNameSuffix: proxy.defaultLocaleRouteNameSuffix || options.defaultLocaleRouteNameSuffix || defaultLocaleRouteNameSuffix,
    routesNameSeparator: proxy.routesNameSeparator || options.routesNameSeparator || routesNameSeparator,
    strategy: proxy.strategy || options.strategy || strategy,
    trailingSlash: proxy.trailingSlash || options.trailingSlash || trailingSlash,
    localeCodes: proxy.localeCodes || options.localeCodes || localeCodes2,
    prefixable: proxy.prefixable || options.prefixable || prefixable2,
    switchLocalePathIntercepter: proxy.switchLocalePathIntercepter || options.switchLocalePathIntercepter || switchLocalePathIntercepter,
    dynamicRouteParamsKey: proxy.dynamicRouteParamsKey || options.dynamicRouteParamsKey || dynamicRouteParamsKey
  };
}
function split(str, index) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}
function resolve(router, route, strategy, locale) {
  if (strategy === "prefix") {
    if (isArray(route.matched) && route.matched.length > 0) {
      return route.matched[0];
    }
    const [rootSlash, restPath] = split(route.path, 1);
    const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
    const _route = router.options.routes.find((r) => r.path === targetPath);
    if (_route == null) {
      return route;
    } else {
      const _resolvableRoute = assign({}, route, _route);
      _resolvableRoute.path = targetPath;
      return router.resolve(_resolvableRoute);
    }
  } else {
    return router.resolve(route);
  }
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(optons) {
  const { currentLocale, defaultLocale, strategy } = optons;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && // no prefix for any language
  !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(givenRoute) {
  const router = this.router;
  const { routesNameSeparator } = getI18nRoutingOptions(router, this);
  const route = givenRoute != null ? isRef(givenRoute) ? unref(givenRoute) : givenRoute : this.route;
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(route, locale) {
  const localizedRoute = resolveRoute.call(this, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom || localizedRoute.fullPath;
}
function localeRoute(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function localeLocation(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function resolveRoute(route, locale) {
  const router = this.router;
  const i18n = this.i18n;
  const _locale = locale || getLocale(i18n);
  const { routesNameSeparator, defaultLocale, defaultLocaleRouteNameSuffix, strategy, trailingSlash, prefixable: prefixable2 } = getI18nRoutingOptions(router, this);
  let _route = route;
  if (isString(route)) {
    if (_route[0] === "/") {
      const [path, search] = route.split("?");
      const query = Object.fromEntries(new URLSearchParams(search));
      _route = { path, query };
    } else {
      _route = { name: route };
    }
  }
  let localizedRoute = assign({}, _route);
  if (localizedRoute.path && !localizedRoute.name) {
    let _resolvedRoute = null;
    try {
      _resolvedRoute = resolve(router, localizedRoute, strategy, _locale);
    } catch {
    }
    const resolvedRoute = _resolvedRoute;
    const resolvedRouteName = getRouteBaseName.call(this, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, {
          defaultLocale,
          strategy,
          routesNameSeparator,
          defaultLocaleRouteNameSuffix
        }),
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      {
        localizedRoute.state = resolvedRoute.state;
      }
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !localizedRoute.path) {
      localizedRoute.name = getRouteBaseName.call(this, this.route);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, {
      defaultLocale,
      strategy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    });
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (isVue3 ? resolvedRoute.name : resolvedRoute.route.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(route, key) {
  const metaDefault = {};
  if (key === DEFAULT_DYNAMIC_PARAMS_KEY) {
    return metaDefault;
  }
  const meta = route.meta;
  if (isRef(meta)) {
    return meta.value[key] || metaDefault;
  } else {
    return meta[key] || metaDefault;
  }
}
function switchLocalePath(locale) {
  const route = this.route;
  const name = getRouteBaseName.call(this, route);
  if (!name) {
    return "";
  }
  const { switchLocalePathIntercepter, dynamicRouteParamsKey } = getI18nRoutingOptions(this.router, this);
  const { params, ...routeCopy } = route;
  const langSwitchParams = getLocalizableMetaFromDynamicParams(route, dynamicRouteParamsKey)[locale] || {};
  const _baseRoute = {
    name,
    params: {
      ...params,
      ...langSwitchParams
    }
  };
  const baseRoute = assign({}, routeCopy, _baseRoute);
  let path = localePath.call(this, baseRoute, locale);
  path = switchLocalePathIntercepter(path, locale);
  return path;
}
function localeHead({ addDirAttribute = false, addSeoAttributes = false, identifierAttribute = "hid" } = {}) {
  const router = this.router;
  const i18n = this.i18n;
  const { defaultDirection } = getI18nRoutingOptions(router, this);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (i18n.locales == null || i18n.baseUrl == null) {
    return metaObject;
  }
  const locale = getLocale(i18n);
  const locales = getLocales(i18n);
  const currentLocale = getNormalizedLocales(locales).find((l) => l.code === locale) || {
    code: locale
  };
  const currentLocaleIso = currentLocale.iso;
  const currentLocaleDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentLocaleDir;
  }
  if (addSeoAttributes && locale && i18n.locales) {
    if (currentLocaleIso) {
      metaObject.htmlAttrs.lang = currentLocaleIso;
    }
    addHreflangLinks.call(this, locales, unref(i18n.baseUrl), metaObject.link, identifierAttribute);
    addCanonicalLinksAndOgUrl.call(
      this,
      unref(i18n.baseUrl),
      metaObject.link,
      metaObject.meta,
      identifierAttribute,
      addSeoAttributes
    );
    addCurrentOgLocale(currentLocale, currentLocaleIso, metaObject.meta, identifierAttribute);
    addAlternateOgLocales(locales, currentLocaleIso, metaObject.meta, identifierAttribute);
  }
  return metaObject;
}
function addHreflangLinks(locales, baseUrl, link, identifierAttribute) {
  const router = this.router;
  const { defaultLocale, strategy } = getI18nRoutingOptions(router, this);
  if (strategy === STRATEGIES.NO_PREFIX) {
    return;
  }
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeIso = locale.iso;
    if (!localeIso) {
      warn("Locale ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeIso.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeIso, locale);
  }
  for (const [iso, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath.call(this, mapLocale.code);
    if (localePath2) {
      link.push({
        [identifierAttribute]: `i18n-alt-${iso}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: iso
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath.call(this, defaultLocale);
    if (localePath2) {
      link.push({
        [identifierAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
}
function addCanonicalLinksAndOgUrl(baseUrl, link, meta, identifierAttribute, seoAttributesOptions) {
  const route = this.route;
  const currentRoute = localeRoute.call(this, {
    ...route,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    name: getRouteBaseName.call(this, route)
  });
  if (currentRoute) {
    let href = toAbsoluteUrl(currentRoute.path, baseUrl);
    const canonicalQueries = isObject(seoAttributesOptions) && seoAttributesOptions.canonicalQueries || [];
    if (canonicalQueries.length) {
      const currentRouteQueryParams = currentRoute.query;
      const params = new URLSearchParams();
      for (const queryParamName of canonicalQueries) {
        if (queryParamName in currentRouteQueryParams) {
          const queryParamValue = currentRouteQueryParams[queryParamName];
          if (isArray(queryParamValue)) {
            queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
          } else {
            params.append(queryParamName, queryParamValue || "");
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        href = `${href}?${queryString}`;
      }
    }
    link.push({
      [identifierAttribute]: "i18n-can",
      rel: "canonical",
      href
    });
    meta.push({
      [identifierAttribute]: "i18n-og-url",
      property: "og:url",
      content: href
    });
  }
}
function addCurrentOgLocale(currentLocale, currentLocaleIso, meta, identifierAttribute) {
  const hasCurrentLocaleAndIso = currentLocale && currentLocaleIso;
  if (!hasCurrentLocaleAndIso) {
    return;
  }
  meta.push({
    [identifierAttribute]: "i18n-og",
    property: "og:locale",
    // Replace dash with underscore as defined in spec: language_TERRITORY
    content: hypenToUnderscore(currentLocaleIso)
  });
}
function addAlternateOgLocales(locales, currentLocaleIso, meta, identifierAttribute) {
  const localesWithoutCurrent = locales.filter((locale) => {
    const localeIso = locale.iso;
    return localeIso && localeIso !== currentLocaleIso;
  });
  if (localesWithoutCurrent.length) {
    const alternateLocales = localesWithoutCurrent.map((locale) => ({
      [identifierAttribute]: `i18n-og-alt-${locale.iso}`,
      property: "og:locale:alternate",
      content: hypenToUnderscore(locale.iso)
    }));
    meta.push(...alternateLocales);
  }
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//)) {
    return urlOrPath;
  }
  return baseUrl + urlOrPath;
}
function proxyForComposable(options, target) {
  const {
    router,
    route,
    i18n,
    defaultLocale,
    strategy,
    defaultLocaleRouteNameSuffix,
    trailingSlash,
    routesNameSeparator
  } = options;
  return function(...args) {
    return Reflect.apply(
      target,
      {
        router,
        route,
        i18n,
        defaultLocale,
        strategy,
        defaultLocaleRouteNameSuffix,
        trailingSlash,
        routesNameSeparator
      },
      args
    );
  };
}
function useSwitchLocalePath({
  router = useRouter$1(),
  route = useRoute$1(),
  i18n = useI18n(),
  defaultLocale = void 0,
  defaultLocaleRouteNameSuffix = void 0,
  routesNameSeparator = void 0,
  strategy = void 0,
  trailingSlash = void 0
} = {}) {
  return proxyForComposable(
    {
      router,
      route,
      i18n,
      defaultLocale,
      defaultLocaleRouteNameSuffix,
      routesNameSeparator,
      strategy,
      trailingSlash
    },
    switchLocalePath
  );
}
const localeCodes = ["sl", "en"];
const localeMessages = {
  "sl": [],
  "en": []
};
const resolveNuxtI18nOptions = async (context) => {
  var _a;
  const nuxtI18nOptions = Object({});
  nuxtI18nOptions.experimental = Object({ "jsTsFormatResource": false });
  nuxtI18nOptions.bundle = Object({ "compositionOnly": true, "runtimeOnly": false, "fullInstall": true, "dropMessageCompiler": false });
  nuxtI18nOptions.compilation = Object({ "jit": true, "strictMessage": true, "escapeHtml": false });
  nuxtI18nOptions.customBlocks = Object({ "defaultSFCLang": "json", "globalSFCScope": false });
  const vueI18nConfigLoader = async (loader) => {
    const config2 = await loader().then((r) => r.default || r);
    return typeof config2 === "object" ? config2 : typeof config2 === "function" ? await config2() : {};
  };
  const vueI18n = await vueI18nConfigLoader(() => import(
    "./_nuxt/i18n.config-d8e94c29.js"
    /* webpackChunkName: "__i18n_config_ts_98563ad1" */
  ));
  nuxtI18nOptions.vueI18n = vueI18n;
  (_a = nuxtI18nOptions.vueI18n).messages ?? (_a.messages = {});
  nuxtI18nOptions.locales = [Object({ "code": "sl", "name": "Slovenščina", "iso": "sl_SI", "files": [], "hashes": [], "types": [] }), Object({ "code": "en", "name": "English", "iso": "en_EN", "files": [], "hashes": [], "types": [] })];
  nuxtI18nOptions.defaultLocale = "en";
  nuxtI18nOptions.defaultDirection = "ltr";
  nuxtI18nOptions.routesNameSeparator = "___";
  nuxtI18nOptions.trailingSlash = false;
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default";
  nuxtI18nOptions.strategy = "prefix";
  nuxtI18nOptions.lazy = false;
  nuxtI18nOptions.langDir = null;
  nuxtI18nOptions.rootRedirect = null;
  nuxtI18nOptions.detectBrowserLanguage = false;
  nuxtI18nOptions.differentDomains = false;
  nuxtI18nOptions.baseUrl = "";
  nuxtI18nOptions.dynamicRouteParams = false;
  nuxtI18nOptions.customRoutes = "page";
  nuxtI18nOptions.pages = Object({});
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false;
  nuxtI18nOptions.types = "composition";
  nuxtI18nOptions.debug = false;
  nuxtI18nOptions.parallelPlugin = false;
  nuxtI18nOptions.i18nModules = [];
  return nuxtI18nOptions;
};
const nuxtI18nOptionsDefault = Object({ experimental: Object({ "jsTsFormatResource": false }), bundle: Object({ "compositionOnly": true, "runtimeOnly": false, "fullInstall": true, "dropMessageCompiler": false }), compilation: Object({ "jit": true, "strictMessage": true, "escapeHtml": false }), customBlocks: Object({ "defaultSFCLang": "json", "globalSFCScope": false }), vueI18n: "", locales: [], defaultLocale: "", defaultDirection: "ltr", routesNameSeparator: "___", trailingSlash: false, defaultLocaleRouteNameSuffix: "default", strategy: "prefix_except_default", lazy: false, langDir: null, rootRedirect: null, detectBrowserLanguage: Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true }), differentDomains: false, baseUrl: "", dynamicRouteParams: false, customRoutes: "page", pages: Object({}), skipSettingLocaleOnNavigate: false, types: "composition", debug: false, parallelPlugin: false });
const nuxtI18nInternalOptions = Object({ __normalizedLocales: [Object({ "code": "sl", "name": "Slovenščina", "iso": "sl_SI", "files": [], "hashes": [], "types": [] }), Object({ "code": "en", "name": "English", "iso": "en_EN", "files": [], "hashes": [], "types": [] })] });
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const parallelPlugin = false;
function formatMessage(message) {
  return NUXT_I18N_MODULE_ID + " " + message;
}
function isLegacyVueI18n(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const ret = isComposer(target) ? target[name].value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n(target) ? target[name] : target[name];
  return ret;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function proxyNuxt(nuxt, target) {
  return function() {
    return Reflect.apply(
      target,
      {
        i18n: nuxt.$i18n,
        getRouteBaseName: nuxt.$getRouteBaseName,
        localePath: nuxt.$localePath,
        localeRoute: nuxt.$localeRoute,
        switchLocalePath: nuxt.$switchLocalePath,
        localeHead: nuxt.$localeHead,
        route: nuxt.$router.currentRoute.value,
        router: nuxt.$router
      },
      // eslint-disable-next-line prefer-rest-params
      arguments
    );
  };
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function deepCopy(src, des, predicate) {
  for (const key in src) {
    if (isArray$1(src[key])) {
      if (!isArray$1(des[key])) {
        des[key] = [];
      }
      src[key].forEach((item, index) => {
        if (!des[key][index]) {
          const desItem = {};
          deepCopy(item, desItem, predicate);
          des[key].push(desItem);
        }
      });
    } else if (isObject$1(src[key])) {
      if (!isObject$1(des[key])) {
        des[key] = {};
      }
      deepCopy(src[key], des[key], predicate);
    } else {
      if (predicate) {
        if (predicate(src[key], des[key])) {
          des[key] = src[key];
        }
      } else {
        des[key] = src[key];
      }
    }
  }
}
const loadedMessages = /* @__PURE__ */ new Map();
async function loadMessage(context, { key, load }, locale) {
  var _a, _b;
  const i18nConfig = (_a = context.$config.public) == null ? void 0 : _a.i18n;
  let message = null;
  try {
    const getter = await load().then((r) => r.default || r);
    if (isFunction$1(getter)) {
      if ((_b = i18nConfig.experimental) == null ? void 0 : _b.jsTsFormatResource) {
        message = await getter(locale);
      } else {
        console.warn(
          formatMessage(
            "JS / TS extension format is not supported by default. This can be enabled by setting `i18n.experimental.jsTsFormatResource: true` (experimental)"
          )
        );
      }
    } else {
      message = getter;
      if (message != null) {
        loadedMessages.set(key, message);
      }
    }
  } catch (e) {
    console.error(formatMessage("Failed locale loading: " + e.message));
  }
  return message;
}
async function loadLocale(context, locale, setter) {
  const loaders = localeMessages[locale];
  if (loaders == null) {
    console.warn(formatMessage("Could not find messages for locale code" + locale));
    return;
  }
  const targetMessage = {};
  for (const loader of loaders) {
    let message = null;
    if (loadedMessages.has(loader.key)) {
      message = loadedMessages.get(loader.key);
    } else {
      message = await loadMessage(context, loader, locale);
    }
    if (message != null) {
      deepCopy(message, targetMessage);
    }
  }
  setter(locale, targetMessage);
}
function getBrowserLocale(options, context) {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(options.__normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getLocaleCookie(context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  localeCodes: localeCodes2 = []
} = {}) {
  if (useCookie) {
    let localeCode;
    {
      const cookie = useRequestHeaders(["cookie"]);
      if ("cookie" in cookie) {
        const parsedCookie = parse(cookie["cookie"]);
        localeCode = parsedCookie[cookieKey];
      }
    }
    if (localeCode && localeCodes2.includes(localeCode)) {
      return localeCode;
    }
  }
}
function setLocaleCookie(locale, context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  cookieDomain = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieDomain,
  cookieSecure = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieSecure,
  cookieCrossOrigin = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieCrossOrigin
} = {}) {
  if (!useCookie) {
    return;
  }
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: cookieCrossOrigin ? "none" : "lax",
    secure: cookieCrossOrigin || cookieSecure
  };
  if (cookieDomain) {
    cookieOptions.domain = cookieDomain;
  }
  {
    if (context.res) {
      const { res } = context;
      let headers = res.getHeader("Set-Cookie") || [];
      if (!isArray$1(headers)) {
        headers = [String(headers)];
      }
      const redirectCookie = serialize(cookieKey, locale, cookieOptions);
      headers.push(redirectCookie);
      res.setHeader("Set-Cookie", headers);
    }
  }
}
const DefaultDetectBrowserLanguageFromResult = {
  locale: "",
  stat: false,
  reason: "unknown",
  from: "unknown"
};
function detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions2, detectLocaleContext, localeCodes2 = [], locale = "") {
  const { strategy } = nuxtI18nOptions;
  const { ssg, callType, firstAccess } = detectLocaleContext;
  if (strategy === "no_prefix" && true) {
    return { locale: "", stat: true, reason: "detect_ignore_on_ssg" };
  }
  if (!firstAccess) {
    return { locale: "", stat: false, reason: "first_access_only" };
  }
  const { redirectOn, alwaysRedirect, useCookie, fallbackLocale } = nuxtI18nOptions.detectBrowserLanguage;
  const path = isString$1(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root") {
      if (path !== "/") {
        return { locale: "", stat: false, reason: "not_redirect_on_root" };
      }
    } else if (redirectOn === "no prefix") {
      if (!alwaysRedirect && path.match(getLocalesRegex(localeCodes2))) {
        return { locale: "", stat: false, reason: "not_redirect_on_no_prefix" };
      }
    }
  }
  let localeFrom = "unknown";
  let cookieLocale;
  let matchedLocale;
  if (useCookie) {
    matchedLocale = cookieLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
    localeFrom = "cookie";
  }
  if (!matchedLocale) {
    matchedLocale = getBrowserLocale(nuxtI18nInternalOptions2);
    localeFrom = "navigator_or_header";
  }
  const finalLocale = matchedLocale || fallbackLocale;
  if (!matchedLocale && fallbackLocale) {
    localeFrom = "fallback";
  }
  const vueI18nLocale = locale || nuxtI18nOptions.vueI18n.locale;
  if (finalLocale && (!useCookie || alwaysRedirect || !cookieLocale)) {
    if (strategy === "no_prefix") {
      return { locale: finalLocale, stat: true, from: localeFrom };
    } else {
      if (callType === "setup") {
        if (finalLocale !== vueI18nLocale) {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
      if (alwaysRedirect) {
        const redirectOnRoot = path === "/";
        const redirectOnAll = redirectOn === "all";
        const redirectOnNoPrefix = redirectOn === "no prefix" && !path.match(getLocalesRegex(localeCodes2));
        if (redirectOnRoot || redirectOnAll || redirectOnNoPrefix) {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
    }
  }
  if (ssg === "ssg_setup" && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  if ((localeFrom === "navigator_or_header" || localeFrom === "cookie") && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  return { locale: "", stat: false, reason: "not_found_match" };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = isArray$1(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales) {
  let host = getHost() || "";
  if (host) {
    const matchingLocale = locales.find((locale) => locale.domain === host);
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode, locales, nuxt) {
  const lang = locales.find((locale) => locale.code === localeCode);
  if (lang && lang.domain) {
    if (hasProtocol(lang.domain)) {
      return lang.domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxt);
      protocol = req && isHTTPS(req) ? "https" : "http";
    }
    return protocol + "://" + lang.domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
function _setLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocale", locale);
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (isArray$1(fallback)) {
    fallbackLocales = fallback;
  } else if (isObject$1(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (isString$1(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(context, messages, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, lazy } = options;
  const setter = (locale, message) => {
    const base = messages[locale] || {};
    messages[locale] = { ...base, ...message };
  };
  if (lazy && fallbackLocale) {
    const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
    await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
  }
  const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
  await Promise.all(locales.map((locale) => loadLocale(context, locale, setter)));
  return messages;
}
async function loadAndSetLocale(newLocale, context, i18n, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  initial = false,
  lazy = false
} = {}) {
  let ret = false;
  const oldLocale = getLocale(i18n);
  if (!newLocale) {
    return [ret, oldLocale];
  }
  if (!initial && differentDomains) {
    return [ret, oldLocale];
  }
  if (oldLocale === newLocale) {
    return [ret, oldLocale];
  }
  const localeOverride = await onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context);
  const localeCodes2 = getLocaleCodes(i18n);
  if (localeOverride && localeCodes2 && localeCodes2.includes(localeOverride)) {
    if (localeOverride === oldLocale) {
      return [ret, oldLocale];
    }
    newLocale = localeOverride;
  }
  const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
  if (lazy) {
    const setter = (locale, message) => mergeLocaleMessage(i18n, locale, message);
    if (i18nFallbackLocales) {
      const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
    }
    await loadLocale(context, newLocale, setter);
  }
  if (skipSettingLocaleOnNavigate) {
    return [ret, oldLocale];
  }
  if (useCookie) {
    setCookieLocale(i18n, newLocale);
  }
  setLocale(i18n, newLocale);
  await onLanguageSwitched(i18n, oldLocale, newLocale);
  ret = true;
  return [ret, oldLocale];
}
function detectLocale(route, context, routeLocaleGetter, nuxtI18nOptions, initialLocaleLoader, detectLocaleContext, normalizedLocales, localeCodes2 = []) {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  const initialLocale = isFunction$1(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const { locale: browserLocale, stat, reason, from } = nuxtI18nOptions.detectBrowserLanguage ? detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions, detectLocaleContext, localeCodes2, initialLocale) : DefaultDetectBrowserLanguageFromResult;
  if (reason === "detect_ignore_on_ssg") {
    return initialLocale;
  }
  if ((from === "navigator_or_header" || from === "cookie" || from === "fallback") && browserLocale) {
    return browserLocale;
  }
  let finalLocale = browserLocale;
  if (!finalLocale) {
    if (differentDomains) {
      finalLocale = getLocaleDomain(normalizedLocales);
    } else if (strategy !== "no_prefix") {
      finalLocale = routeLocaleGetter(route);
    } else {
      if (!nuxtI18nOptions.detectBrowserLanguage) {
        finalLocale = initialLocale;
      }
    }
  }
  if (!finalLocale && nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie) {
    finalLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 }) || "";
  }
  if (!finalLocale) {
    finalLocale = defaultLocale || "";
  }
  return finalLocale;
}
function detectRedirect({
  route,
  context,
  targetLocale,
  routeLocaleGetter,
  nuxtI18nOptions,
  calledWithRouting = false
}) {
  const { strategy, differentDomains } = nuxtI18nOptions;
  let redirectPath = "";
  const { fullPath: toFullPath } = route.to;
  if ((differentDomains || false) && routeLocaleGetter(route.to) !== targetLocale) {
    const switchLocalePath2 = useSwitchLocalePath({
      i18n: getComposer(context.$i18n),
      route: route.to,
      router: context.$router
    });
    const routePath = switchLocalePath2(targetLocale);
    if (isString$1(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return isObject$1(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  return navigateTo(redirectPath, { redirectCode: status });
}
async function navigate(args, {
  status = 302,
  rootRedirect = nuxtI18nOptionsDefault.rootRedirect,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate,
  enableNavigate = false
} = {}) {
  const { i18n, locale, route } = args;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (isString$1(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    return _navigate(redirectPath, status);
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    {
      state.value = redirectPath;
    }
  }
}
function injectNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", i18n.global);
  for (const pair of [
    ["getRouteBaseName", getRouteBaseName],
    ["localePath", localePath],
    ["localeRoute", localeRoute],
    ["switchLocalePath", switchLocalePath],
    ["localeHead", localeHead]
  ]) {
    defineGetter(nuxt, "$" + pair[0], proxyNuxt(nuxt, pair[1]));
  }
}
function extendPrefixable(differentDomains) {
  return (opts) => {
    return DefaultPrefixable(opts) && !differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxt) {
  return (path, locale) => {
    if (differentDomains) {
      const domain = getDomainFromLocale(locale, normalizedLocales, nuxt);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl(baseUrl, options) {
  return (context) => {
    var _a, _b;
    if (isFunction$1(baseUrl)) {
      const baseUrlResult = baseUrl(context);
      return baseUrlResult;
    }
    const { differentDomains, localeCodeLoader, normalizedLocales } = options;
    const localeCode = isFunction$1(localeCodeLoader) ? localeCodeLoader() : localeCodeLoader;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode, normalizedLocales, options.nuxt);
      if (domain) {
        return domain;
      }
    }
    const config2 = (_b = (_a = context.$config) == null ? void 0 : _a.public) == null ? void 0 : _b.i18n;
    if (config2 == null ? void 0 : config2.baseUrl) {
      return config2.baseUrl;
    }
    return baseUrl;
  };
}
const i18n_yfWm7jX06p = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: parallelPlugin,
  async setup(nuxt) {
    let __temp, __restore;
    const router = useRouter();
    const route = useRoute();
    const { vueApp: app } = nuxt;
    const nuxtContext = nuxt;
    const nuxtI18nOptions = ([__temp, __restore] = executeAsync(() => resolveNuxtI18nOptions()), __temp = await __temp, __restore(), __temp);
    const useCookie = nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie;
    const { __normalizedLocales: normalizedLocales } = nuxtI18nInternalOptions;
    const {
      defaultLocale,
      differentDomains,
      skipSettingLocaleOnNavigate,
      lazy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix,
      strategy,
      rootRedirect
    } = nuxtI18nOptions;
    nuxtI18nOptions.baseUrl = extendBaseUrl(nuxtI18nOptions.baseUrl, {
      differentDomains,
      nuxt: nuxtContext,
      localeCodeLoader: defaultLocale,
      normalizedLocales
    });
    const getLocaleFromRoute = createLocaleFromRouteGetter(
      localeCodes,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    );
    const vueI18nOptions = nuxtI18nOptions.vueI18n;
    vueI18nOptions.messages = vueI18nOptions.messages || {};
    vueI18nOptions.fallbackLocale = vueI18nOptions.fallbackLocale ?? false;
    registerGlobalOptions(router, {
      ...nuxtI18nOptions,
      dynamicRouteParamsKey: "nuxtI18n",
      switchLocalePathIntercepter: extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxtContext),
      prefixable: extendPrefixable(differentDomains)
    });
    const getDefaultLocale = (defaultLocale2) => defaultLocale2 || vueI18nOptions.locale || "en-US";
    let initialLocale = detectLocale(
      route,
      nuxt.ssrContext,
      getLocaleFromRoute,
      nuxtI18nOptions,
      getDefaultLocale(defaultLocale),
      { ssg: strategy === "no_prefix" ? "ssg_ignore" : "normal", callType: "setup", firstAccess: true },
      normalizedLocales,
      localeCodes
    );
    vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(nuxtContext, vueI18nOptions.messages, {
      ...nuxtI18nOptions,
      initialLocale,
      fallbackLocale: vueI18nOptions.fallbackLocale,
      localeCodes
    })), __temp = await __temp, __restore(), __temp);
    initialLocale = getDefaultLocale(initialLocale);
    const i18n = createI18n({
      ...vueI18nOptions,
      locale: initialLocale
    });
    let notInitialSetup = true;
    const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
    let ssgModeInitialSetup = true;
    const isSSGModeInitialSetup = () => ssgModeInitialSetup;
    if (isSSGModeInitialSetup() && strategy === "no_prefix" && false) {
      nuxt.hook("app:mounted", async () => {
        const {
          locale: browserLocale,
          stat,
          reason,
          from
        } = nuxtI18nOptions.detectBrowserLanguage ? detectBrowserLanguage(
          route,
          nuxtContext,
          nuxtI18nOptions,
          nuxtI18nInternalOptions,
          { ssg: "ssg_setup", callType: "setup", firstAccess: true },
          localeCodes,
          initialLocale
        ) : DefaultDetectBrowserLanguageFromResult;
        _setLocale(i18n, browserLocale);
        ssgModeInitialSetup = false;
      });
    }
    extendI18n(i18n, {
      locales: nuxtI18nOptions.locales,
      localeCodes,
      baseUrl: nuxtI18nOptions.baseUrl,
      context: nuxtContext,
      hooks: {
        onExtendComposer(composer) {
          composer.strategy = strategy;
          composer.localeProperties = computed(() => {
            return normalizedLocales.find((l) => l.code === composer.locale.value) || {
              code: composer.locale.value
            };
          });
          composer.setLocale = async (locale) => {
            const localeSetup = isInitialLocaleSetup(locale);
            const [modified] = await loadAndSetLocale(locale, nuxtContext, i18n, {
              useCookie,
              differentDomains,
              initial: localeSetup,
              skipSettingLocaleOnNavigate,
              lazy
            });
            if (modified && localeSetup) {
              notInitialSetup = false;
            }
            const redirectPath = detectRedirect({
              route: { to: route },
              context: nuxtContext,
              targetLocale: locale,
              routeLocaleGetter: getLocaleFromRoute,
              nuxtI18nOptions
            });
            await navigate(
              {
                i18n,
                redirectPath,
                locale,
                route
              },
              {
                differentDomains,
                skipSettingLocaleOnNavigate,
                rootRedirect,
                enableNavigate: true
              }
            );
          };
          composer.differentDomains = differentDomains;
          composer.defaultLocale = defaultLocale;
          composer.getBrowserLocale = () => getBrowserLocale(nuxtI18nInternalOptions, nuxt.ssrContext);
          composer.getLocaleCookie = () => getLocaleCookie(nuxt.ssrContext, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes });
          composer.setLocaleCookie = (locale) => setLocaleCookie(locale, nuxt.ssrContext, nuxtI18nOptions.detectBrowserLanguage || void 0);
          composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", { oldLocale, newLocale, initialSetup, context });
          composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
          composer.finalizePendingLocaleChange = async () => {
            if (!i18n.__pendingLocale) {
              return;
            }
            setLocale(i18n, i18n.__pendingLocale);
            if (i18n.__resolvePendingLocalePromise) {
              await i18n.__resolvePendingLocalePromise();
            }
            i18n.__pendingLocale = void 0;
          };
          composer.waitForPendingLocaleChange = async () => {
            if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
              await i18n.__pendingLocalePromise;
            }
          };
        },
        onExtendExportedGlobal(g) {
          return {
            strategy: {
              get() {
                return g.strategy;
              }
            },
            localeProperties: {
              get() {
                return g.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(g.setLocale, g, [locale]);
              }
            },
            differentDomains: {
              get() {
                return g.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return g.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(g.getBrowserLocale, g, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(g.getLocaleCookie, g, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(g.setLocaleCookie, g, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g.onBeforeLanguageSwitch, g, [oldLocale, newLocale, initialSetup, context]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(g.onLanguageSwitched, g, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.finalizePendingLocaleChange, g, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(g.waitForPendingLocaleChange, g, []);
              }
            }
          };
        },
        onExtendVueI18n(composer) {
          return {
            strategy: {
              get() {
                return composer.strategy;
              }
            },
            localeProperties: {
              get() {
                return composer.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
              }
            },
            differentDomains: {
              get() {
                return composer.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return composer.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(composer.getBrowserLocale, composer, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(composer.getLocaleCookie, composer, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [
                  oldLocale,
                  newLocale,
                  initialSetup,
                  context
                ]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
              }
            }
          };
        }
      }
    });
    const pluginOptions = {
      __composerExtend: (c) => {
        const g = getComposer(i18n);
        c.strategy = g.strategy;
        c.localeProperties = computed(() => g.localeProperties.value);
        c.setLocale = g.setLocale;
        c.differentDomains = g.differentDomains;
        c.getBrowserLocale = g.getBrowserLocale;
        c.getLocaleCookie = g.getLocaleCookie;
        c.setLocaleCookie = g.setLocaleCookie;
        c.onBeforeLanguageSwitch = g.onBeforeLanguageSwitch;
        c.onLanguageSwitched = g.onLanguageSwitched;
        c.finalizePendingLocaleChange = g.finalizePendingLocaleChange;
        c.waitForPendingLocaleChange = g.waitForPendingLocaleChange;
        return () => {
        };
      }
    };
    app.use(i18n, pluginOptions);
    injectNuxtHelpers(nuxtContext, i18n);
    let routeChangeCount = 0;
    addRouteMiddleware(
      "locale-changing",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
        let __temp2, __restore2;
        const locale = detectLocale(
          to,
          nuxt.ssrContext,
          getLocaleFromRoute,
          nuxtI18nOptions,
          () => {
            return getLocale(i18n) || getDefaultLocale(defaultLocale);
          },
          {
            ssg: isSSGModeInitialSetup() && strategy === "no_prefix" ? "ssg_ignore" : "normal",
            callType: "routing",
            firstAccess: routeChangeCount === 0
          },
          normalizedLocales,
          localeCodes
        );
        const localeSetup = isInitialLocaleSetup(locale);
        const [modified] = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, nuxtContext, i18n, {
          useCookie,
          differentDomains,
          initial: localeSetup,
          skipSettingLocaleOnNavigate,
          lazy
        })), __temp2 = await __temp2, __restore2(), __temp2);
        if (modified && localeSetup) {
          notInitialSetup = false;
        }
        const redirectPath = detectRedirect({
          route: { to, from },
          context: nuxtContext,
          targetLocale: locale,
          routeLocaleGetter: getLocaleFromRoute,
          nuxtI18nOptions,
          calledWithRouting: true
        });
        routeChangeCount++;
        return navigate(
          {
            i18n,
            redirectPath,
            locale,
            route: to
          },
          {
            differentDomains,
            skipSettingLocaleOnNavigate,
            rootRedirect
          }
        );
      }),
      { global: true }
    );
  }
});
const ssrCompleteRegistry = /* @__PURE__ */ new Map();
function ssrComplete(app) {
  const callbacks = ssrCompleteRegistry.get(app);
  if (!callbacks)
    return;
  for (const callback of callbacks) {
    callback();
  }
  callbacks.clear();
  ssrCompleteRegistry.delete(app);
}
function onSSRComplete(app, callback) {
  var _a;
  if (!app)
    return;
  if (!ssrCompleteRegistry.has(app))
    ssrCompleteRegistry.set(app, /* @__PURE__ */ new Set());
  (_a = ssrCompleteRegistry.get(app)) === null || _a === void 0 ? void 0 : _a.add(callback);
}
const memo = {};
const memoKeys = {};
let instanceKey;
const instanceScopes = /* @__PURE__ */ new WeakMap();
const raw = "__raw__";
const isClassProp = /[a-zA-Z0-9\-][cC]lass$/;
function getRef(token2, data) {
  const value = ref(null);
  if (token2 === "get") {
    const nodeRefs = {};
    value.value = get.bind(null, nodeRefs);
    return value;
  }
  const path = token2.split(".");
  watchEffect(() => {
    value.value = getValue(isRef(data) ? data.value : data, path);
  });
  return value;
}
function getValue(set2, path) {
  if (Array.isArray(set2)) {
    for (const subset of set2) {
      const value = subset !== false && getValue(subset, path);
      if (value !== void 0)
        return value;
    }
    return void 0;
  }
  let foundValue = void 0;
  let obj = set2;
  for (const i in path) {
    const key = path[i];
    if (typeof obj !== "object" || obj === null) {
      foundValue = void 0;
      break;
    }
    const currentValue = obj[key];
    if (Number(i) === path.length - 1 && currentValue !== void 0) {
      foundValue = typeof currentValue === "function" ? currentValue.bind(obj) : currentValue;
      break;
    }
    obj = currentValue;
  }
  return foundValue;
}
function get(nodeRefs, id) {
  if (typeof id !== "string")
    return warn$2(650);
  if (!(id in nodeRefs))
    nodeRefs[id] = ref(void 0);
  if (nodeRefs[id].value === void 0) {
    nodeRefs[id].value = null;
    const root = getNode(id);
    if (root)
      nodeRefs[id].value = root.context;
    watchRegistry(id, ({ payload: node }) => {
      nodeRefs[id].value = isNode(node) ? node.context : node;
    });
  }
  return nodeRefs[id].value;
}
function parseSchema(library, schema, memoKey) {
  function parseCondition(library2, node) {
    const condition = provider(compile$1(node.if), { if: true });
    const children = createElements(library2, node.then);
    const alternate = node.else ? createElements(library2, node.else) : null;
    return [condition, children, alternate];
  }
  function parseConditionAttr(attr, _default) {
    var _a, _b;
    const condition = provider(compile$1(attr.if));
    let b = () => _default;
    let a = () => _default;
    if (typeof attr.then === "object") {
      a = parseAttrs(attr.then, void 0);
    } else if (typeof attr.then === "string" && ((_a = attr.then) === null || _a === void 0 ? void 0 : _a.startsWith("$"))) {
      a = provider(compile$1(attr.then));
    } else {
      a = () => attr.then;
    }
    if (has(attr, "else")) {
      if (typeof attr.else === "object") {
        b = parseAttrs(attr.else);
      } else if (typeof attr.else === "string" && ((_b = attr.else) === null || _b === void 0 ? void 0 : _b.startsWith("$"))) {
        b = provider(compile$1(attr.else));
      } else {
        b = () => attr.else;
      }
    }
    return () => condition() ? a() : b();
  }
  function parseAttrs(unparsedAttrs, bindExp, _default = {}) {
    const explicitAttrs = new Set(Object.keys(unparsedAttrs || {}));
    const boundAttrs = bindExp ? provider(compile$1(bindExp)) : () => ({});
    const setters = [
      (attrs) => {
        const bound = boundAttrs();
        for (const attr in bound) {
          if (!explicitAttrs.has(attr)) {
            attrs[attr] = bound[attr];
          }
        }
      }
    ];
    if (unparsedAttrs) {
      if (isConditional(unparsedAttrs)) {
        const condition = parseConditionAttr(unparsedAttrs, _default);
        return condition;
      }
      for (let attr in unparsedAttrs) {
        const value = unparsedAttrs[attr];
        let getValue2;
        const isStr = typeof value === "string";
        if (attr.startsWith(raw)) {
          attr = attr.substring(7);
          getValue2 = () => value;
        } else if (isStr && value.startsWith("$") && value.length > 1 && !(value.startsWith("$reset") && isClassProp.test(attr))) {
          getValue2 = provider(compile$1(value));
        } else if (typeof value === "object" && isConditional(value)) {
          getValue2 = parseConditionAttr(value, void 0);
        } else if (typeof value === "object" && isPojo(value)) {
          getValue2 = parseAttrs(value);
        } else {
          getValue2 = () => value;
        }
        setters.push((attrs) => {
          attrs[attr] = getValue2();
        });
      }
    }
    return () => {
      const attrs = Array.isArray(unparsedAttrs) ? [] : {};
      setters.forEach((setter) => setter(attrs));
      return attrs;
    };
  }
  function parseNode(library2, _node) {
    let element = null;
    let attrs = () => null;
    let condition = false;
    let children = null;
    let alternate = null;
    let iterator = null;
    let resolve2 = false;
    const node = sugar(_node);
    if (isDOM(node)) {
      element = node.$el;
      attrs = node.$el !== "text" ? parseAttrs(node.attrs, node.bind) : () => null;
    } else if (isComponent(node)) {
      if (typeof node.$cmp === "string") {
        if (has(library2, node.$cmp)) {
          element = library2[node.$cmp];
        } else {
          element = node.$cmp;
          resolve2 = true;
        }
      } else {
        element = node.$cmp;
      }
      attrs = parseAttrs(node.props, node.bind);
    } else if (isConditional(node)) {
      [condition, children, alternate] = parseCondition(library2, node);
    }
    if (!isConditional(node) && "if" in node) {
      condition = provider(compile$1(node.if));
    } else if (!isConditional(node) && element === null) {
      condition = () => true;
    }
    if ("children" in node && node.children) {
      if (typeof node.children === "string") {
        if (node.children.startsWith("$slots.")) {
          element = element === "text" ? "slot" : element;
          children = provider(compile$1(node.children));
        } else if (node.children.startsWith("$") && node.children.length > 1) {
          const value = provider(compile$1(node.children));
          children = () => String(value());
        } else {
          children = () => String(node.children);
        }
      } else if (Array.isArray(node.children)) {
        children = createElements(library2, node.children);
      } else {
        const [childCondition, c, a] = parseCondition(library2, node.children);
        children = (iterationData) => childCondition && childCondition() ? c && c(iterationData) : a && a(iterationData);
      }
    }
    if (isComponent(node)) {
      if (children) {
        const produceChildren = children;
        children = (iterationData) => {
          return {
            default(slotData2, key) {
              var _a, _b, _c, _d;
              const currentKey = instanceKey;
              if (key)
                instanceKey = key;
              if (slotData2)
                (_a = instanceScopes.get(instanceKey)) === null || _a === void 0 ? void 0 : _a.unshift(slotData2);
              if (iterationData)
                (_b = instanceScopes.get(instanceKey)) === null || _b === void 0 ? void 0 : _b.unshift(iterationData);
              const c = produceChildren(iterationData);
              if (slotData2)
                (_c = instanceScopes.get(instanceKey)) === null || _c === void 0 ? void 0 : _c.shift();
              if (iterationData)
                (_d = instanceScopes.get(instanceKey)) === null || _d === void 0 ? void 0 : _d.shift();
              instanceKey = currentKey;
              return c;
            }
          };
        };
        children.slot = true;
      } else {
        children = () => ({});
      }
    }
    if ("for" in node && node.for) {
      const values = node.for.length === 3 ? node.for[2] : node.for[1];
      const getValues = typeof values === "string" && values.startsWith("$") ? provider(compile$1(values)) : () => values;
      iterator = [
        getValues,
        node.for[0],
        node.for.length === 3 ? String(node.for[1]) : null
      ];
    }
    return [condition, element, attrs, children, alternate, iterator, resolve2];
  }
  function createSlots(children, iterationData) {
    const slots = children(iterationData);
    const currentKey = instanceKey;
    return Object.keys(slots).reduce((allSlots, slotName) => {
      const slotFn = slots && slots[slotName];
      allSlots[slotName] = (data) => {
        return slotFn && slotFn(data, currentKey) || null;
      };
      return allSlots;
    }, {});
  }
  function createElement(library2, node) {
    const [condition, element, attrs, children, alternate, iterator, resolve2] = parseNode(library2, node);
    let createNodes = (iterationData) => {
      if (condition && element === null && children) {
        return condition() ? children(iterationData) : alternate && alternate(iterationData);
      }
      if (element && (!condition || condition())) {
        if (element === "text" && children) {
          return createTextVNode(String(children()));
        }
        if (element === "slot" && children)
          return children(iterationData);
        const el = resolve2 ? resolveComponent(element) : element;
        const slots = (children === null || children === void 0 ? void 0 : children.slot) ? createSlots(children, iterationData) : null;
        return h(el, attrs(), slots || (children ? children(iterationData) : []));
      }
      return typeof alternate === "function" ? alternate(iterationData) : alternate;
    };
    if (iterator) {
      const repeatedNode = createNodes;
      const [getValues, valueName, keyName] = iterator;
      createNodes = () => {
        const _v = getValues();
        const values = Number.isFinite(_v) ? Array(Number(_v)).fill(0).map((_, i) => i) : _v;
        const fragment = [];
        if (typeof values !== "object")
          return null;
        const instanceScope = instanceScopes.get(instanceKey) || [];
        const isArray2 = Array.isArray(values);
        for (const key in values) {
          if (isArray2 && key in Array.prototype)
            continue;
          const iterationData = Object.defineProperty({
            ...instanceScope.reduce((previousIterationData, scopedData) => {
              if (previousIterationData.__idata) {
                return { ...previousIterationData, ...scopedData };
              }
              return scopedData;
            }, {}),
            [valueName]: values[key],
            ...keyName !== null ? { [keyName]: isArray2 ? Number(key) : key } : {}
          }, "__idata", { enumerable: false, value: true });
          instanceScope.unshift(iterationData);
          fragment.push(repeatedNode.bind(null, iterationData)());
          instanceScope.shift();
        }
        return fragment;
      };
    }
    return createNodes;
  }
  function createElements(library2, schema2) {
    if (Array.isArray(schema2)) {
      const els = schema2.map(createElement.bind(null, library2));
      return (iterationData) => els.map((element2) => element2(iterationData));
    }
    const element = createElement(library2, schema2);
    return (iterationData) => element(iterationData);
  }
  const providers = [];
  function provider(compiled, hints = {}) {
    const compiledFns = /* @__PURE__ */ new WeakMap();
    providers.push((callback, key) => {
      compiledFns.set(key, compiled.provide((tokens) => callback(tokens, hints)));
    });
    return () => compiledFns.get(instanceKey)();
  }
  function createInstance(providerCallback, key) {
    memoKey !== null && memoKey !== void 0 ? memoKey : memoKey = JSON.stringify(schema);
    const [render, compiledProviders] = has(memo, memoKey) ? memo[memoKey] : [createElements(library, schema), providers];
    compiledProviders.forEach((compiledProvider) => {
      compiledProvider(providerCallback, key);
    });
    return () => {
      instanceKey = key;
      return render();
    };
  }
  return createInstance;
}
function useScope(token2, defaultValue) {
  const scopedData = instanceScopes.get(instanceKey) || [];
  let scopedValue = void 0;
  if (scopedData.length) {
    scopedValue = getValue(scopedData, token2.split("."));
  }
  return scopedValue === void 0 ? defaultValue : scopedValue;
}
function slotData(data, key) {
  return new Proxy(data, {
    get(...args) {
      let data2 = void 0;
      const property = args[1];
      if (typeof property === "string") {
        const prevKey = instanceKey;
        instanceKey = key;
        data2 = useScope(property, void 0);
        instanceKey = prevKey;
      }
      return data2 !== void 0 ? data2 : Reflect.get(...args);
    }
  });
}
function createRenderFn(instanceCreator, data, instanceKey2) {
  return instanceCreator((requirements, hints = {}) => {
    return requirements.reduce((tokens, token2) => {
      if (token2.startsWith("slots.")) {
        const slot = token2.substring(6);
        const hasSlot = () => data.slots && has(data.slots, slot) && typeof data.slots[slot] === "function";
        if (hints.if) {
          tokens[token2] = hasSlot;
        } else if (data.slots) {
          const scopedData = slotData(data, instanceKey2);
          tokens[token2] = () => hasSlot() ? data.slots[slot](scopedData) : null;
        }
      } else {
        const value = getRef(token2, data);
        tokens[token2] = () => useScope(token2, value.value);
      }
      return tokens;
    }, {});
  }, instanceKey2);
}
function clean(schema, memoKey, instanceKey2) {
  memoKey !== null && memoKey !== void 0 ? memoKey : memoKey = JSON.stringify(schema);
  memoKeys[memoKey]--;
  if (memoKeys[memoKey] === 0) {
    delete memoKeys[memoKey];
    const [, providers] = memo[memoKey];
    delete memo[memoKey];
    providers.length = 0;
  }
  instanceScopes.delete(instanceKey2);
}
const FormKitSchema = /* @__PURE__ */ defineComponent({
  name: "FormKitSchema",
  props: {
    schema: {
      type: [Array, Object],
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    library: {
      type: Object,
      default: () => ({})
    },
    memoKey: {
      type: String,
      required: false
    }
  },
  setup(props, context) {
    var _a;
    getCurrentInstance();
    let instanceKey2 = {};
    instanceScopes.set(instanceKey2, []);
    let provider = parseSchema(props.library, props.schema, props.memoKey);
    let render;
    let data;
    watchEffect(() => {
      var _a2;
      data = Object.assign(reactive((_a2 = props.data) !== null && _a2 !== void 0 ? _a2 : {}), {
        slots: context.slots
      });
      context.slots;
      render = createRenderFn(provider, data, instanceKey2);
    });
    function cleanUp() {
      clean(props.schema, props.memoKey, instanceKey2);
      if (data.node)
        data.node.destroy();
      data.slots = null;
      data = null;
      render = null;
    }
    onUnmounted(cleanUp);
    onSSRComplete((_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.appContext.app, cleanUp);
    return () => render ? render() : null;
  }
});
const parentSymbol = Symbol("FormKitParent");
function FormKit(props, context) {
  const node = useInput(props, context);
  if (!node.props.definition)
    error(600, node);
  if (node.props.definition.component) {
    return () => {
      var _a;
      return h((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.component, {
        context: node.context
      }, { ...context.slots });
    };
  }
  const schema = ref([]);
  let memoKey = node.props.definition.schemaMemoKey;
  const generateSchema = () => {
    var _a, _b;
    const schemaDefinition = (_b = (_a = node.props) === null || _a === void 0 ? void 0 : _a.definition) === null || _b === void 0 ? void 0 : _b.schema;
    if (!schemaDefinition)
      error(601, node);
    if (typeof schemaDefinition === "function") {
      schema.value = schemaDefinition({ ...props.sectionsSchema });
      if (memoKey && props.sectionsSchema || "memoKey" in schemaDefinition && typeof schemaDefinition.memoKey === "string") {
        memoKey = (memoKey !== null && memoKey !== void 0 ? memoKey : schemaDefinition === null || schemaDefinition === void 0 ? void 0 : schemaDefinition.memoKey) + JSON.stringify(props.sectionsSchema);
      }
    } else {
      schema.value = schemaDefinition;
    }
  };
  generateSchema();
  context.emit("node", node);
  const definitionLibrary = node.props.definition.library;
  const library = {
    FormKit: markRaw(formkitComponent),
    ...definitionLibrary
  };
  context.expose({ node });
  return () => h(FormKitSchema, { schema: schema.value, data: node.context, library, memoKey }, { ...context.slots });
}
const formkitComponent = /* @__PURE__ */ defineComponent(FormKit, {
  props: runtimeProps,
  inheritAttrs: false
});
const rootSymbol = Symbol();
function createPlugin(app, options) {
  app.component(options.alias || "FormKit", formkitComponent).component(options.schemaAlias || "FormKitSchema", FormKitSchema);
  return {
    get: getNode,
    setLocale: (locale) => {
      var _a;
      if ((_a = options.config) === null || _a === void 0 ? void 0 : _a.rootConfig) {
        options.config.rootConfig.locale = locale;
      }
    },
    clearErrors,
    setErrors,
    submit: submitForm,
    reset
  };
}
const optionsSymbol = Symbol.for("FormKitOptions");
const configSymbol = Symbol.for("FormKitConfig");
const plugin = {
  install(app, _options) {
    const options = Object.assign({
      alias: "FormKit",
      schemaAlias: "FormKitSchema"
    }, typeof _options === "function" ? _options() : _options);
    const rootConfig = createConfig(options.config || {});
    options.config = { rootConfig };
    app.config.globalProperties.$formkit = createPlugin(app, options);
    app.provide(optionsSymbol, options);
    app.provide(configSymbol, rootConfig);
  }
};
const pseudoProps = [
  "help",
  "label",
  "ignore",
  "disabled",
  "preserve",
  /^preserve(-e|E)rrors/,
  /^[a-z]+(?:-visibility|Visibility|-behavior|Behavior)$/,
  /^[a-zA-Z-]+(?:-class|Class)$/,
  "prefixIcon",
  "suffixIcon",
  /^[a-zA-Z-]+(?:-icon|Icon)$/
];
function classesToNodeProps(node, props) {
  if (props.classes) {
    Object.keys(props.classes).forEach((key) => {
      if (typeof key === "string") {
        node.props[`_${key}Class`] = props.classes[key];
        if (isObject$2(props.classes[key]) && key === "inner")
          Object.values(props.classes[key]);
      }
    });
  }
}
function onlyListeners(props) {
  if (!props)
    return {};
  const knownListeners = ["Submit", "SubmitRaw", "SubmitInvalid"].reduce((listeners, listener) => {
    const name = `on${listener}`;
    if (name in props) {
      if (typeof props[name] === "function") {
        listeners[name] = props[name];
      }
    }
    return listeners;
  }, {});
  return knownListeners;
}
function useInput(props, context, options = {}) {
  var _a;
  const config2 = Object.assign({}, inject(optionsSymbol) || {}, options);
  const __root = inject(rootSymbol, ref(void 0));
  const instance = getCurrentInstance();
  const listeners = onlyListeners(instance === null || instance === void 0 ? void 0 : instance.vnode.props);
  const isVModeled = ["modelValue", "model-value"].some((prop) => {
    var _a2;
    return prop in ((_a2 = instance === null || instance === void 0 ? void 0 : instance.vnode.props) !== null && _a2 !== void 0 ? _a2 : {});
  });
  const value = props.modelValue !== void 0 ? props.modelValue : cloneAny(context.attrs.value);
  function createInitialProps() {
    var _a2;
    const initialProps2 = {
      ...nodeProps(props),
      ...listeners,
      type: (_a2 = props.type) !== null && _a2 !== void 0 ? _a2 : "text",
      __root: __root.value,
      __slots: context.slots
    };
    const attrs = except(nodeProps(context.attrs), pseudoProps);
    if (!attrs.key)
      attrs.key = token();
    initialProps2.attrs = attrs;
    const propValues = only(nodeProps(context.attrs), pseudoProps);
    for (const propName in propValues) {
      initialProps2[camel(propName)] = propValues[propName];
    }
    const classesProps = { props: {} };
    classesToNodeProps(classesProps, props);
    Object.assign(initialProps2, classesProps.props);
    if (typeof initialProps2.type !== "string") {
      initialProps2.definition = initialProps2.type;
      delete initialProps2.type;
    }
    return initialProps2;
  }
  const initialProps = createInitialProps();
  const parent = initialProps.ignore ? null : props.parent || inject(parentSymbol, null);
  const node = createNode(extend(config2 || {}, {
    name: props.name || void 0,
    value,
    parent,
    plugins: (config2.plugins || []).concat((_a = props.plugins) !== null && _a !== void 0 ? _a : []),
    config: props.config || {},
    props: initialProps,
    index: props.index,
    sync: !!undefine(context.attrs.sync || context.attrs.dynamic)
  }, false, true));
  if (!node.props.definition)
    error(600, node);
  const lateBoundProps = ref(new Set(node.props.definition.props || []));
  node.on("added-props", ({ payload: lateProps }) => {
    if (Array.isArray(lateProps))
      lateProps.forEach((newProp) => lateBoundProps.value.add(newProp));
  });
  const pseudoPropNames = computed(() => pseudoProps.concat([...lateBoundProps.value]).reduce((names, prop) => {
    if (typeof prop === "string") {
      names.push(camel(prop));
      names.push(kebab(prop));
    } else {
      names.push(prop);
    }
    return names;
  }, []));
  watchEffect(() => classesToNodeProps(node, props));
  const passThrough = nodeProps(props);
  for (const prop in passThrough) {
    watch(() => props[prop], () => {
      if (props[prop] !== void 0) {
        node.props[prop] = props[prop];
      }
    });
  }
  watchEffect(() => {
    node.props.__root = __root.value;
  });
  const attributeWatchers = /* @__PURE__ */ new Set();
  const possibleProps = nodeProps(context.attrs);
  watchEffect(() => {
    watchAttributes(only(possibleProps, pseudoPropNames.value));
  });
  function watchAttributes(attrProps) {
    attributeWatchers.forEach((stop) => {
      stop();
      attributeWatchers.delete(stop);
    });
    for (const prop in attrProps) {
      const camelName = camel(prop);
      attributeWatchers.add(watch(() => context.attrs[prop], () => {
        node.props[camelName] = context.attrs[prop];
      }));
    }
  }
  watchEffect(() => {
    const attrs = except(nodeProps(context.attrs), pseudoPropNames.value);
    if ("multiple" in attrs)
      attrs.multiple = undefine(attrs.multiple);
    if (typeof attrs.onBlur === "function") {
      attrs.onBlur = oncePerTick(attrs.onBlur);
    }
    node.props.attrs = Object.assign({}, node.props.attrs || {}, attrs);
  });
  watchEffect(() => {
    var _a2;
    const messages = ((_a2 = props.errors) !== null && _a2 !== void 0 ? _a2 : []).map((error2) => createMessage({
      key: slugify(error2),
      type: "error",
      value: error2,
      meta: { source: "prop" }
    }));
    node.store.apply(messages, (message) => message.type === "error" && message.meta.source === "prop");
  });
  if (node.type !== "input") {
    const sourceKey = `${node.name}-prop`;
    watchEffect(() => {
      var _a2;
      const inputErrors = (_a2 = props.inputErrors) !== null && _a2 !== void 0 ? _a2 : {};
      const keys = Object.keys(inputErrors);
      if (!keys.length)
        node.clearErrors(true, sourceKey);
      const messages = keys.reduce((messages2, key) => {
        let value2 = inputErrors[key];
        if (typeof value2 === "string")
          value2 = [value2];
        if (Array.isArray(value2)) {
          messages2[key] = value2.map((error2) => createMessage({
            key: error2,
            type: "error",
            value: error2,
            meta: { source: sourceKey }
          }));
        }
        return messages2;
      }, {});
      node.store.apply(messages, (message) => message.type === "error" && message.meta.source === sourceKey);
    });
  }
  watchEffect(() => Object.assign(node.config, props.config));
  if (node.type !== "input") {
    provide(parentSymbol, node);
  }
  let clonedValueBeforeVmodel = void 0;
  node.on("modelUpdated", () => {
    var _a2;
    context.emit("inputRaw", (_a2 = node.context) === null || _a2 === void 0 ? void 0 : _a2.value, node);
    if (isVModeled && node.context) {
      clonedValueBeforeVmodel = cloneAny(node.value);
      context.emit("update:modelValue", shallowClone(node.value));
    }
  });
  if (isVModeled) {
    watch(toRef(props, "modelValue"), (value2) => {
      if (!eq(clonedValueBeforeVmodel, value2)) {
        node.input(value2, false);
      }
    }, { deep: true });
    if (node.value !== value) {
      node.emit("modelUpdated");
    }
  }
  return node;
}
createSection("messages", () => ({
  $el: "ul",
  if: "$fns.length($messages)"
}));
createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
createSection("summary", () => ({
  $el: "div",
  attrs: {
    "aria-live": "polite"
  }
}));
createSection("summaryInner", () => ({
  $el: "div",
  if: "$summaries.length && $showSummaries"
}));
createSection("messages", () => ({
  $el: "ul",
  if: "$summaries.length && $showSummaries"
}));
createSection("message", () => ({
  $el: "li",
  for: ["summary", "$summaries"],
  attrs: {
    key: "$summary.key",
    "data-message-type": "$summary.type"
  }
}));
createSection("summaryHeader", () => ({
  $el: "h2",
  attrs: {
    id: "$id"
  }
}));
createSection("messageLink", () => ({
  $el: "a",
  attrs: {
    id: "$summary.key",
    href: '$: "#" + $summary.id',
    onClick: "$jumpLink"
  }
}));
const vueBindings = function vueBindings2(node) {
  node.ledger.count("blocking", (m) => m.blocking);
  const isValid = ref(!node.ledger.value("blocking"));
  node.ledger.count("errors", (m) => m.type === "error");
  const hasErrors = ref(!!node.ledger.value("errors"));
  let hasTicked = false;
  nextTick(() => {
    hasTicked = true;
  });
  const availableMessages = reactive(node.store.reduce((store, message) => {
    if (message.visible) {
      store[message.key] = message;
    }
    return store;
  }, {}));
  const validationVisibility = ref(node.props.validationVisibility || (node.props.type === "checkbox" ? "dirty" : "blur"));
  node.on("prop:validationVisibility", ({ payload }) => {
    validationVisibility.value = payload;
  });
  const hasShownErrors = ref(validationVisibility.value === "live");
  const items = ref(node.children.map((child) => child.uid));
  const validationVisible = computed(() => {
    if (!context.state)
      return false;
    if (context.state.submitted)
      return true;
    if (!hasShownErrors.value && !context.state.settled) {
      return false;
    }
    switch (validationVisibility.value) {
      case "live":
        return true;
      case "blur":
        return context.state.blurred;
      case "dirty":
        return context.state.dirty;
      default:
        return false;
    }
  });
  const isComplete = computed(() => {
    return context && hasValidation.value ? isValid.value && !hasErrors.value : context.state.dirty && !empty(context.value);
  });
  const hasValidation = ref(Array.isArray(node.props.parsedRules) && node.props.parsedRules.length > 0);
  node.on("prop:parsedRules", ({ payload: rules }) => {
    hasValidation.value = Array.isArray(rules) && rules.length > 0;
  });
  const messages = computed(() => {
    const visibleMessages = {};
    for (const key in availableMessages) {
      const message = availableMessages[key];
      if (message.type !== "validation" || validationVisible.value) {
        visibleMessages[key] = message;
      }
    }
    return visibleMessages;
  });
  const ui = reactive(node.store.reduce((messages2, message) => {
    if (message.type === "ui" && message.visible)
      messages2[message.key] = message;
    return messages2;
  }, {}));
  const cachedClasses = reactive({});
  const classes = new Proxy(cachedClasses, {
    get(...args) {
      const [target, property] = args;
      let className = Reflect.get(...args);
      if (!className && typeof property === "string") {
        if (!has(target, property) && !property.startsWith("__v")) {
          const observedNode = createObserver(node);
          observedNode.watch((node2) => {
            const rootClasses = typeof node2.config.rootClasses === "function" ? node2.config.rootClasses(property, node2) : {};
            const globalConfigClasses = node2.config.classes ? createClasses(property, node2, node2.config.classes[property]) : {};
            const classesPropClasses = createClasses(property, node2, node2.props[`_${property}Class`]);
            const sectionPropClasses = createClasses(property, node2, node2.props[`${property}Class`]);
            className = generateClassList(node2, property, rootClasses, globalConfigClasses, classesPropClasses, sectionPropClasses);
            target[property] = className !== null && className !== void 0 ? className : "";
          });
        }
      }
      return className;
    }
  });
  const describedBy = computed(() => {
    const describers = [];
    if (context.help) {
      describers.push(`help-${node.props.id}`);
    }
    for (const key in messages.value) {
      describers.push(`${node.props.id}-${key}`);
    }
    return describers.length ? describers.join(" ") : void 0;
  });
  const value = ref(node.value);
  const _value = ref(node.value);
  const context = reactive({
    _value,
    attrs: node.props.attrs,
    disabled: node.props.disabled,
    describedBy,
    fns: {
      length: (obj) => Object.keys(obj).length,
      number: (value2) => Number(value2),
      string: (value2) => String(value2),
      json: (value2) => JSON.stringify(value2),
      eq
    },
    handlers: {
      blur: (e) => {
        if (!node)
          return;
        node.store.set(createMessage({ key: "blurred", visible: false, value: true }));
        if (typeof node.props.attrs.onBlur === "function") {
          node.props.attrs.onBlur(e);
        }
      },
      touch: () => {
        var _a;
        const doCompare = context.dirtyBehavior === "compare";
        if (((_a = node.store.dirty) === null || _a === void 0 ? void 0 : _a.value) && !doCompare)
          return;
        const isDirty = !eq(node.props._init, node._value);
        if (!isDirty && !doCompare)
          return;
        node.store.set(createMessage({ key: "dirty", visible: false, value: isDirty }));
      },
      DOMInput: (e) => {
        node.input(e.target.value);
        node.emit("dom-input-event", e);
      }
    },
    help: node.props.help,
    id: node.props.id,
    items,
    label: node.props.label,
    messages,
    node: markRaw(node),
    options: node.props.options,
    defaultMessagePlacement: true,
    slots: node.props.__slots,
    state: {
      blurred: false,
      complete: isComplete,
      dirty: false,
      empty: empty(value),
      submitted: false,
      settled: node.isSettled,
      valid: isValid,
      errors: hasErrors,
      rules: hasValidation,
      validationVisible
    },
    type: node.props.type,
    family: node.props.family,
    ui,
    value,
    classes
  });
  node.on("created", () => {
    if (!eq(context.value, node.value)) {
      _value.value = node.value;
      value.value = node.value;
      triggerRef(value);
      triggerRef(_value);
    }
    (async () => {
      await node.settled;
      if (node)
        node.props._init = cloneAny(node.value);
    })();
  });
  node.on("settled", ({ payload: isSettled }) => {
    context.state.settled = isSettled;
  });
  function observeProps(observe) {
    observe.forEach((prop) => {
      prop = camel(prop);
      if (!has(context, prop)) {
        context[prop] = node.props[prop];
      }
      node.on(`prop:${prop}`, ({ payload }) => {
        context[prop] = payload;
      });
    });
  }
  const rootProps = () => {
    const props = [
      "__root",
      "help",
      "label",
      "disabled",
      "options",
      "type",
      "attrs",
      "preserve",
      "preserveErrors",
      "id",
      "dirtyBehavior"
    ];
    const iconPattern = /^[a-zA-Z-]+(?:-icon|Icon)$/;
    const matchingProps = Object.keys(node.props).filter((prop) => {
      return iconPattern.test(prop);
    });
    return props.concat(matchingProps);
  };
  observeProps(rootProps());
  function definedAs(definition) {
    if (definition.props)
      observeProps(definition.props);
  }
  node.props.definition && definedAs(node.props.definition);
  node.on("added-props", ({ payload }) => observeProps(payload));
  node.on("input", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      _value.value = shallowClone(payload);
    } else {
      _value.value = payload;
      triggerRef(_value);
    }
  });
  node.on("commitRaw", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      value.value = _value.value = shallowClone(payload);
    } else {
      value.value = _value.value = payload;
      triggerRef(value);
    }
    node.emit("modelUpdated");
  });
  node.on("commit", ({ payload }) => {
    if ((!context.state.dirty || context.dirtyBehavior === "compare") && node.isCreated && hasTicked) {
      context.handlers.touch();
    }
    if (isComplete && node.type === "input" && hasErrors.value && !undefine(node.props.preserveErrors)) {
      node.store.filter((message) => {
        var _a;
        return !(message.type === "error" && ((_a = message.meta) === null || _a === void 0 ? void 0 : _a.autoClear) === true);
      });
    }
    if (node.type === "list" && node.sync) {
      items.value = node.children.map((child) => child.uid);
    }
    context.state.empty = empty(payload);
  });
  const updateState = async (message) => {
    if (message.type === "ui" && message.visible && !message.meta.showAsMessage) {
      ui[message.key] = message;
    } else if (message.visible) {
      availableMessages[message.key] = message;
    } else if (message.type === "state") {
      context.state[message.key] = !!message.value;
    }
  };
  node.on("message-added", (e) => updateState(e.payload));
  node.on("message-updated", (e) => updateState(e.payload));
  node.on("message-removed", ({ payload: message }) => {
    delete ui[message.key];
    delete availableMessages[message.key];
    delete context.state[message.key];
  });
  node.on("settled:blocking", () => {
    isValid.value = true;
  });
  node.on("unsettled:blocking", () => {
    isValid.value = false;
  });
  node.on("settled:errors", () => {
    hasErrors.value = false;
  });
  node.on("unsettled:errors", () => {
    hasErrors.value = true;
  });
  watch(validationVisible, (value2) => {
    if (value2) {
      hasShownErrors.value = true;
    }
  });
  node.context = context;
  node.emit("context", node, false);
  node.on("destroyed", () => {
    node.context = void 0;
    node = null;
  });
};
const defaultConfig = (options = {}) => {
  const { rules = {}, locales = {}, inputs: inputs$1 = {}, messages = {}, locale = void 0, theme = void 0, iconLoaderUrl = void 0, iconLoader = void 0, icons = {}, ...nodeOptions } = options;
  const validation = createValidationPlugin({
    ...defaultRules,
    ...rules || {}
  });
  const i18n = createI18nPlugin(extend({ en, ...locales || {} }, messages));
  const library = createLibraryPlugin(inputs, inputs$1);
  const themePlugin = createThemePlugin(theme, icons, iconLoaderUrl, iconLoader);
  return extend({
    plugins: [library, themePlugin, vueBindings, i18n, validation],
    ...!locale ? {} : { config: { locale } }
  }, nodeOptions || {}, true);
};
const config = {
  locales: { en, sl },
  locale: "sl",
  plugins: [
    // useFloatingLabels  // Floating labels
  ],
  config: {
    classes: generateClasses({
      global: {
        // applies to all input types
        outer: "$reset form-group",
        input: "form-control",
        label: "form-label",
        messages: "list-unstyled small mb-0",
        message: "is-invalid",
        help: "form-text"
      },
      checkbox: {
        label: "form-check-label",
        wrapper: "checkbox-wrapper",
        inner: "form-check",
        input: "$reset form-check-input",
        legend: "$reset form-check-label"
      },
      select: {
        input: "$reset form-select"
      },
      radio: {
        label: "form-check-label",
        wrapper: "radio-wrapper",
        inner: "form-check",
        input: "$reset form-check-input",
        legend: "$reset form-check-label"
      },
      submit: {
        outer: "$reset mt-3",
        input: "$reset btn btn-primary"
      }
    })
  }
};
const formkitPlugin_pZqjah0RUG = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const config$1 = defaultConfig(typeof config === "function" ? config() : config);
  nuxtApp.hook("app:rendered", (renderContext) => {
    resetCount();
    ssrComplete(nuxtApp.vueApp);
  });
  nuxtApp.vueApp.use(plugin, config$1);
});
const dayjs_pGiXRjcsJO = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  dayjs.locale(sl$1);
  nuxtApp.provide("dayjs", dayjs);
});
const useCoreStore = defineStore({
  id: "propercore-store",
  state: () => ({
    locales: [],
    settings: [],
    menus: [],
    languages: []
  }),
  actions: {
    async initApp() {
    }
  },
  getters: {
    getLocales: (state) => state.locales,
    getSettings: (state) => state.settings,
    getMenus: (state) => state.menus,
    getLanguages: (state) => state.languages
  }
});
const init_server_p4TXvyjLiW = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  const coreStore = useCoreStore();
  [__temp, __restore] = executeAsync(() => coreStore.initApp()), await __temp, __restore();
});
const vue_gtm_yUJQMSAo2j = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  if ((/* @__PURE__ */ useRuntimeConfig()).public.GOOGLE_TAG_MANAGER_ID) {
    nuxtApp.vueApp.use(
      createGtm({
        id: (/* @__PURE__ */ useRuntimeConfig()).public.GOOGLE_TAG_MANAGER_ID,
        defer: true,
        // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
        compatibility: false,
        // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
        // nonce: '2726c7f26c', // Will add `nonce` to the script tag
        enabled: true,
        // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
        debug: true,
        // Whether or not display console logs debugs (optional)
        loadScript: true,
        // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
        trackOnNextTick: false
        // Whether or not call trackView in Vue.nextTick
      })
    );
  }
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$2,
  plugin$1,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  composition_sLxaNGmlSL,
  i18n_yfWm7jX06p,
  formkitPlugin_pZqjah0RUG,
  dayjs_pGiXRjcsJO,
  init_server_p4TXvyjLiW,
  vue_gtm_yUJQMSAo2j
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const layouts = {
  default: () => import("./_nuxt/default-55454485.js").then((m) => m.default || m),
  mobile: () => import("./_nuxt/mobile-3dc97073.js").then((m) => m.default || m)
};
const LayoutLoader = /* @__PURE__ */ defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            // @ts-expect-error seems to be an issue in vue types
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = /* @__PURE__ */ defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        // @ts-expect-error seems to be an issue in vue types
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, {
                // @ts-expect-error seems to be an issue in vue types
                default: () => h(RouteProvider, {
                  key,
                  vnode: routeProps.Component,
                  route: routeProps.route,
                  renderKey: key,
                  trackRootNodes: hasTransition,
                  vnodeRef: pageRef
                })
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_NuxtLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/error-404-65532e2f.js").then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/error-500-a9ce9040.js").then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import("./_nuxt/island-renderer-30b82b6e.js").then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error2 = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error2)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error2) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
export {
  _export_sfc as _,
  useRequestFetch as a,
  useRuntimeConfig as b,
  createError as c,
  useRoute as d,
  entry$1 as default,
  useRouter as e,
  injectHead as i,
  navigateTo as n,
  resolveUnrefHeadInput as r,
  useNuxtApp as u
};
//# sourceMappingURL=server.mjs.map
