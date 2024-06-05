import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["eslint"]?: typeof import("@nuxtjs/eslint-module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["stylelint"]?: typeof import("@nuxtjs/stylelint-module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["formkit"]?: typeof import("@formkit/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/eslint-module", Exclude<NuxtConfig["eslint"], boolean>] | ["@nuxtjs/stylelint-module", Exclude<NuxtConfig["stylelint"], boolean>] | ["@formkit/nuxt", Exclude<NuxtConfig["formkit"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxtjs/i18n", Exclude<NuxtConfig["i18n"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },
  }
  interface PublicRuntimeConfig {
   API_BASE_URL: string,

   GOOGLE_TAG_MANAGER_ID: string,

   i18n: {
      experimental: {
         jsTsFormatResource: boolean,
      },

      baseUrl: string,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }