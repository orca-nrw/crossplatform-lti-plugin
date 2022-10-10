import "core-js/stable";
import "regenerator-runtime/runtime";
import { createApp } from "vue";
import App from "@/app/main";
import initI18n from "@/app/utils/init-i18n";
import initLMSData from "@/app/utils/init-lms-data";
import buildTreeArray from "@/app/utils/build-tree-array";

const init = (tools, categories, translations, options, error) => {
  const { parsedTools, parsedCategories, parsedTranslations, parsedOptions } =
    initLMSData(tools, categories, translations, options);
  const i18n = initI18n(parsedTranslations);
  const preparedCategories = buildTreeArray(
    parsedCategories,
    "id",
    "parentCategory"
  );

  const app = createApp(App, {
    orcaContent: parsedTools,
    orcaCategories: parsedCategories,
    preparedOrcaCategories: preparedCategories,
    orcaOptions: parsedOptions,
    error: error,
  });

  const rootId = `#${parsedOptions.root_id}`;

  app.use(i18n);
  app.mount(rootId);
};

export { init };
