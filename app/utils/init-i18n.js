import { createI18n } from "vue-i18n";

const initI18n = (messages) => {
  return createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: "de", // set locale
    fallbackLocale: "en", // set fallback locale
    globalInjection: true,
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
  });
};

export default initI18n;
