const categories = [
  {
    id: 0,
    name: "Online-Kurse",
    description: "Oberkategorie",
    parentCategory: null,
  },
  {
    id: 1,
    name: "Online-Self-Assessments",
    description: "Oberkategorie II",
    parentCategory: null,
  },
  {
    id: 2,
    name: "Fachübergreifend",
    description: "Oberkategorie III",
    parentCategory: null,
  },
  {
    id: 3,
    name: "Mathematik, Naturwissenschaften allgemein",
    description: "Unterkategorie",
    parentCategory: "0",
  },
  {
    id: 4,
    name: "Mathematische Statistik/Wahrscheinlichkeitsrechnung",
    description: "Unterkategorie",
    parentCategory: "0",
  },
  {
    id: 5,
    name: "Allgemeine Literaturwissenschaft",
    description: "Unterkategorie",
    parentCategory: "1",
  },
  {
    id: 6,
    name: "Psychologie",
    description: "Unterkategorie",
    parentCategory: "1",
  },
  {
    id: 7,
    name: "Mehr Psychologie",
    description: "Unterkategorie",
    parentCategory: "6",
  },
  {
    id: 8,
    name: "Nooch mehr Psychologie",
    description: "Unterkategorie",
    parentCategory: "7",
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
    error: "An error has occurred. Your administrator can help you.",
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
    error: "Ein Fehler ist aufgetreten. Ihr Administrator/in kann Ihnen weiter helfen.",
  },
};

const options = {
  root_id: "orca-lti-root",
  selected_tool_url_field_name: "toolurl",
  selected_tool_id_field_name: "toolid",
};

const tools = [
  {
    name: "Moveo",
    url: "dummyurl",
    description: "Tool zur Reflexion der aktuellen Studiensituation. Der Test ermöglicht Ihnen, sich gezielt Gedanken über die eigene Studienmotivation und das eigene Lernverhalten zu machen. Gewinnen Sie neue Perspektiven auf Ihre aktuelle Studiensituation, indem Sie Ihre Motivation, Ihr Lernverhalten und Ihre Zufriedenheit genauer unter die Lupe nehmen.",
    category: 2,
    toolid: 1,
  },
  {
    name: "WINT-Check",
    url: "dummyurl",
    description: "Mit diesem Test können Sie studienrelevante Mathematikkenntnisse mit einem Schwerpunkt auf den WINT-Fächern überprüfen.",
    category: 3,
    toolid: 1,
  },
  {
    name: "Online Mathematik Brückenkurs OMB+",
    url: "dummyurl",
    description: "Der Online-Kurs ermöglicht es Ihnen, das verständige Rechnen im Übergang von der Schule zur Hochschule zu fördern.",
    category: 4,
    toolid: 1,
  },
  {
    name: "studiVEMINT",
    url: "dummyurl",
    description: "Der Online-Kurs ermöglicht es Ihnen, Ihr mathematisches Verständnis und das verständige Rechnen im Übergang von der Schule zur Hochschule zu fördern.",
    category: 3,
    toolid: 1,
  },
  {
    name: "Wissenstest Sprach- und Textverständnis ",
    url: "dummyurl",
    description: "Von der Rechtschreibung bis hin zum Gebrauch eines angemessenen Sprachstils: Überprüfen Sie, ob Ihr Wissen zu Studienbeginn ausreichend ist.",
    category: 5,
    toolid: 1,
  },
  {
    name: "Kurs Sprach- und Textverständnis",
    url: "dummyurl",
    description: "Der Online-Kurs umfasst nicht nur Materialien zu grundlegenden schriftsprachlichen Fähigkeiten, sondern gewährt auch Einblicke in das wissenschaftliche Arbeiten.",
    category: 5,
    toolid: 1,
  },
  {
    name: "Digital Future Skills in Nursing (DiFuSiN)",
    url: "dummyurl",
    description: "Im Projekt DiFuSiN (Digital Future Skills in Nursing) wurden digitale Fallszenarien rund um das Thema Digitalisierung in der Pflege erstellt. Ursprünglich wurden die Materialien für das selbstgesteuerte, fallbasierte Lernen im 6. Semester eines pflegewissenschaftlichen Bachelorstudiums konzipiert.",
    category: 2,
    toolid: 1,
  },
  {
    name: "Höhere Mathematik 1 HM4MINT",
    url: "dummyurl",
    description: "Der Online-Kurs ist eine Einführung in die Höhere Mathematik 1, mit dem Sie Wissen aufholen und vertiefen können.",
    category: 3,
    toolid: 1,
  },
];

module.exports = { tools, categories, translations, options };
