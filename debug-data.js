const categories = [
  {
    id: 1,
    name: "Oberkategorie",
    description: "Oberkategorie",
    parentCategory: null,
  },
  {
    id: 2,
    name: "Unterkategorie",
    description: "Unterkategorie",
    parentCategory: "1",
  },
];

const translations = {
  en: {
    modal_fullscreen_description: "Choose an ORCA-Activity to embed.",
    modal_close: "Close ORCA-Tool",
    open_category_menu: "MENU",
    orca_logo_alt: "Logo ORCA.nrw",
    website_url_orca: "https://www.orca.nrw/",
    orca_link_title: "To ORCA.nrw",
    categories: "Categories",
    contact: "Contact us",
    email_address_orca: "support{'@'}orca.nrw",
    send_support_request: "Send a support request e-mail to ORCA.nrw",
    input_search_id: "incremental_search_courses",
    input_search_placeholder: "Search for courses",
    searching_in_all_categories: "You are searching in all categories",
    searching_in_category: "You are searching in",
    search_no_content_found: "No results for",
    no_search_no_content_found: "No content found.",
    expand_description: "more",
    collapse_description: "close",
    button_select: "Select",
    pagination_label: "search result pages",
    pagination_next: "Next",
    pagination_prev: "Previous",
  },
  de: {
    modal_fullscreen_description:
      "Wählen Sie einen ORCA-Inhalt zum Einbinden aus.",
    modal_close: "ORCA-Tool schließen",
    open_category_menu: "MENÜ",
    orca_logo_alt: "Logo ORCA.nrw",
    website_url_orca: "https://www.orca.nrw/",
    orca_link_title: "Zu ORCA.nrw",
    categories: "(Fach-)Kategorien",
    contact: "Kontakt",
    email_address_orca: "support{'@'}orca.nrw",
    send_support_request: "Supportanfrage per E-Mail an ORCA.nrw senden",
    input_search_id: "incremental_search_courses",
    input_search_placeholder: "Content suchen ",
    searching_in_all_categories: "Sie suchen in allen (Fach-)Kategorien",
    searching_in_category: "Sie suchen in ",
    search_no_content_found: "Es wurde kein Ergebnis gefunden für ",
    no_search_no_content_found: "Es wurde kein Ergebnis gefunden.",
    expand_description: "weiterlesen",
    collapse_description: "schließen",
    button_select: "Auswählen",
    pagination_label: "Suchergebnisseiten",
    pagination_next: "Weiter",
    pagination_prev: "Zurück",
  },
};

const options = {
  root_id: "orca-lti-root",
  selected_tool_url_field_name: "toolurl",
  selected_tool_id_field_name: "toolid",
};

const tools = [
  {
    name: "Test",
    url: "dummyurl",
    description: "Testbeschreibung",
    category: 1,
    toolid: 1,
  },
];

module.exports = { tools, categories, translations, options };
