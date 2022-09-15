const initLMSData = (tools, categories, translations, options) => {
  let parsedTools = tools;
  let parsedCategories = categories;
  let parsedTranslations = translations;
  let parsedOptions = options;

  if (typeof tools === "string") {
    if (tools) {
      parsedTools = JSON.parse(tools);
    } else {
      parsedTools = [];
    }
  }

  if (typeof parsedTools !== "object" || !parsedTools) {
    parsedTools = [];
  }

  if (typeof categories === "string") {
    if (categories) {
      parsedCategories = JSON.parse(categories);
    } else {
      parsedCategories = [];
    }
  }

  if (typeof parsedCategories !== "object" || !categories) {
    parsedCategories = [];
  }

  if (typeof translations === "string") {
    parsedTranslations = JSON.parse(translations);
  }

  parsedTranslations = replaceSpecialCharsRecursive(parsedTranslations);

  if (typeof options === "string") {
    parsedOptions = JSON.parse(options);
  }

  return { parsedTools, parsedCategories, parsedTranslations, parsedOptions };
};

const replaceSpecialCharsRecursive = (translations) => {
  let keys = Object.keys(translations);
  for (const key of keys) {
    let val = translations[key];
    if (typeof val === "string") {
      val = val.replaceAll("(?<!({'))@(?<!('}))", "");
      // Alternative falls RegExp test nicht besteht.
      //  val = val.replaceAll("{'@'}", "@");
      //  val = val.replaceAll("@", "{'@'}");
      translations[key] = val;
    }

    if (typeof val === "object") {
      val = replaceSpecialCharsRecursive(val);
    }
  }

  return translations;
};
export default initLMSData;
