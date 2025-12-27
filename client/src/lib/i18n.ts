// i18n.ts
// NOTE: This file contains ONLY system/error messages that are hardcoded.
// All UI labels, buttons, blog interface text, and content come from Strapi CMS.
// 
// HARDCODED (in this file):
//   - System messages: loading, error, retry
//   - Action verbs: search, cancel, close
//   - Error states: unauthorized, serverError, notFound
//   - Language names for language selector
//
// FETCHED FROM STRAPI (getUITranslations API):
//   - Buttons: submit, save, edit, delete, login, register, etc.
//   - Labels: home, settings, profile, language, etc.
//   - Blog interface: categories, tags, comments, subscribe, etc.
//   - Form labels: yourName, yourEmail, placeholders, etc.
//   - Content-specific text: featuredPosts, latestPosts, aboutAuthor, etc.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setCurrentLanguage } from './strapi';

// ONLY system/error messages - everything else from Strapi
const resources = {
  en: {
    translation: {
      // Language names for selector (minimal hardcoded)
      language: {
        en: 'English',
        'yo': 'Yorùbá',
        'yo-NG': 'Yorùbá',
        'ig': 'Igbo',
        'ig-NG': 'Igbo',
        'ha': 'Hausa',
        'ha-Latn-NG': 'Hausa',
        fr: 'French',
        es: 'Spanish',
        sw: 'Swahili',
      },
      // System messages ONLY (not fetched from CMS)
      system: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Retry',
        cancel: 'Cancel',
        close: 'Close',
        search: 'Search',
        clear: 'Clear',
        // Error states
        notFound: 'Not Found',
        pageNotFound: 'Page Not Found',
        unauthorized: 'Unauthorized',
        forbidden: 'Forbidden',
        serverError: 'Server Error',
        // Generic error messages
        errorMessage: 'Failed to load data. Please try again.',
        connectionError: 'Connection failed. Please check your internet.',
        timeoutError: 'Request timed out. Please try again.',
      },
    },
  },
  yo: {
    translation: {
      language: {
        en: 'Gẹ̀ẹ́sì',
        yo: 'Yorùbá',
        ig: 'Ìgbò',
        ha: 'Hausa',
        fr: 'Faransé',
        es: 'Sipanisi',
        sw: 'Swahili',
      },
      system: {
        loading: 'Ìkó...',
        error: 'Aṣiṣe kan ṣẹlẹ',
        retry: 'Tun gbìyànjú',
        cancel: 'Fagilé',
        close: 'Pa',
        search: 'Wá',
        clear: 'Ko',
        notFound: 'Kò rí',
        pageNotFound: 'Ojú-ìwé Kò rí',
        unauthorized: 'Aìforúkọsílẹ̀',
        forbidden: 'Ẹ̀kọ́wọ̀',
        serverError: 'Aṣiṣe Olùṣàkóso',
        errorMessage: 'Kùnà láti mú dátà wá. Jọ̀ọ́ gbìyànjú lẹ́ẹ̀kan si.',
        connectionError: 'Ìsopọ̀ kùnà. Jọ̀ọ́ ṣàyẹ̀wò ìsopọ̀ íńtánẹ́ẹ̀tì rẹ.',
        timeoutError: 'Àkókò ti kọjá. Jọ̀ọ́ gbìyànjú lẹ́ẹ̀kan si.',
      },
    },
  },
  ig: {
    translation: {
      language: {
        en: 'Bekee',
        yo: 'Yorùbá',
        ig: 'Igbo',
        ha: 'Hausa',
        fr: 'Fụrench',
        es: 'Spanish',
        sw: 'Swahili',
      },
      system: {
        loading: 'Ị na-ebudata...',
        error: 'Mehiere mere',
        retry: 'Gbalịkwuo',
        cancel: 'Kagbuo',
        close: 'Mechie',
        search: 'Chọọ',
        clear: 'Hichapụ',
        notFound: 'Enweghị',
        pageNotFound: 'Enweghị ibe',
        unauthorized: 'Enweghị ikike',
        forbidden: 'Emegidere',
        serverError: 'Njehie sava',
        errorMessage: 'Ọdịda ibudata dátà. Biko gbalịkwuo.',
        connectionError: 'Njikọ dara. Biko lelee njikọ ịntanetị gị.',
        timeoutError: 'Oge agwụla. Biko gbalịkwuo.',
      },
    },
  },
  ha: {
    translation: {
      language: {
        en: 'Turanci',
        yo: 'Yorùbá',
        ig: 'Igbo',
        ha: 'Hausa',
        fr: 'Faransanci',
        es: 'Sifaniyanci',
        sw: 'Swahili',
      },
      system: {
        loading: 'Ana lodawa...',
        error: 'An sami kuskure',
        retry: 'Sake gwadawa',
        cancel: 'Soke',
        close: 'Rufe',
        search: 'Nema',
        clear: 'Share',
        notFound: 'Ba a samu ba',
        pageNotFound: 'Ba a sami shafi ba',
        unauthorized: 'Babu izini',
        forbidden: 'An hana',
        serverError: 'Kuskuren uwar garke',
        errorMessage: 'Kuskure a lodar da bayanai. Don Allah sake gwadawa.',
        connectionError: 'Haɗin ya gaza. Don Allah duba haɗin intanet ɗinku.',
        timeoutError: 'Lokaci ya ƙare. Don Allah sake gwadawa.',
      },
    },
  },
  fr: {
    translation: {
      language: {
        en: 'Anglais',
        yo: 'Yoruba',
        ig: 'Igbo',
        ha: 'Haoussa',
        fr: 'Français',
        es: 'Espagnol',
        sw: 'Swahili',
      },
      system: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        retry: 'Réessayer',
        cancel: 'Annuler',
        close: 'Fermer',
        search: 'Rechercher',
        clear: 'Effacer',
        notFound: 'Non trouvé',
        pageNotFound: 'Page non trouvée',
        unauthorized: 'Non autorisé',
        forbidden: 'Interdit',
        serverError: 'Erreur du serveur',
        errorMessage: 'Échec du chargement des données. Veuillez réessayer.',
        connectionError: 'Échec de la connexion. Veuillez vérifier votre connexion internet.',
        timeoutError: 'Délai d\'attente expiré. Veuillez réessayer.',
      },
    },
  },
  es: {
    translation: {
      language: {
        en: 'Inglés',
        yo: 'Yoruba',
        ig: 'Igbo',
        ha: 'Hausa',
        fr: 'Francés',
        es: 'Español',
        sw: 'Swahili',
      },
      system: {
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        retry: 'Reintentar',
        cancel: 'Cancelar',
        close: 'Cerrar',
        search: 'Buscar',
        clear: 'Limpiar',
        notFound: 'No encontrado',
        pageNotFound: 'Página no encontrada',
        unauthorized: 'No autorizado',
        forbidden: 'Prohibido',
        serverError: 'Error del servidor',
        errorMessage: 'Error al cargar los datos. Por favor, inténtalo de nuevo.',
        connectionError: 'Fallo de conexión. Por favor verifica tu conexión a internet.',
        timeoutError: 'Tiempo de espera agotado. Por favor, inténtalo de nuevo.',
      },
    },
  },
  sw: {
    translation: {
      language: {
        en: 'Kiingereza',
        yo: 'Yoruba',
        ig: 'Igbo',
        ha: 'Hausa',
        fr: 'Kifaransa',
        es: 'Kihispania',
        sw: 'Kiswahili',
      },
      system: {
        loading: 'Inapakia...',
        error: 'Kumetokea hitilafu',
        retry: 'Jaribu tena',
        cancel: 'Ghairi',
        close: 'Funga',
        search: 'Tafuta',
        clear: 'Futa',
        notFound: 'Haikupatikana',
        pageNotFound: 'Ukurasa haukupatikana',
        unauthorized: 'Hauruhusiwi',
        forbidden: 'Imepigwa marufuku',
        serverError: 'Hitilafu ya seva',
        errorMessage: 'Imeshindwa kupakia data. Tafadhali jaribu tena.',
        connectionError: 'Muunganisho umeshindwa. Tafadhali angalia muunganisho wako wa mtandao.',
        timeoutError: 'Muda umeisha. Tafadhali jaribu tena.',
      },
    },
  },
  // Map Strapi locale codes to their base language resources
  'yo-NG': {
    translation: {
      language: {
        en: 'Gẹ̀ẹ́sì',
        'yo': 'Yorùbá',
        'yo-NG': 'Yorùbá',
        'ig': 'Ìgbò',
        'ig-NG': 'Ìgbò',
        'ha': 'Hausa',
        'ha-Latn-NG': 'Hausa',
        fr: 'Faransé',
        es: 'Sipanisi',
        sw: 'Swahili',
      },
      system: {
        loading: 'Ìkó...',
        error: 'Aṣiṣe kan ṣẹlẹ',
        retry: 'Tun gbìyànjú',
        cancel: 'Fagilé',
        close: 'Pa',
        search: 'Wá',
        clear: 'Ko',
        notFound: 'Kò rí',
        pageNotFound: 'Ojú-ìwé Kò rí',
        unauthorized: 'Aìforúkọsílẹ̀',
        forbidden: 'Ẹ̀kọ́wọ̀',
        serverError: 'Aṣiṣe Olùṣàkóso',
        errorMessage: 'Kùnà láti mú dátà wá. Jọ̀ọ́ gbìyànjú lẹ́ẹ̀kan si.',
        connectionError: 'Ìsopọ̀ kùnà. Jọ̀ọ́ ṣàyẹ̀wò ìsopọ̀ íńtánẹ́ẹ̀tì rẹ.',
        timeoutError: 'Àkókò ti kọjá. Jọ̀ọ́ gbìyànjú lẹ́ẹ̀kan si.',
      },
    },
  },
  'ig-NG': {
    translation: {
      language: {
        en: 'Bekee',
        'yo': 'Yorùbá',
        'yo-NG': 'Yorùbá',
        'ig': 'Igbo',
        'ig-NG': 'Igbo',
        'ha': 'Hausa',
        'ha-Latn-NG': 'Hausa',
        fr: 'Fụrench',
        es: 'Spanish',
        sw: 'Swahili',
      },
      system: {
        loading: 'Na-ebu...',
        error: 'Njehie mere',
        retry: 'Nwalee ọzọ',
        cancel: 'Kagbuo',
        close: 'Mechie',
        search: 'Chọọ',
        clear: 'Hichapụ',
        notFound: 'Achọtaghị',
        pageNotFound: 'Achọtaghị peeji',
        unauthorized: 'Enyeghị ikike',
        forbidden: 'Amachibidoro',
        serverError: 'Njehie sava',
        errorMessage: 'Ọ dịghị mma ibubata data. Biko nwaa ọzọ.',
        connectionError: 'Njikọ dara ada. Biko lelee njikọ ịntanetị gị.',
        timeoutError: 'Oge agwụla. Biko nwaa ọzọ.',
      },
    },
  },
  'ha-Latn-NG': {
    translation: {
      language: {
        en: 'Turanci',
        'yo': 'Yorùbá',
        'yo-NG': 'Yorùbá',
        'ig': 'Igbo',
        'ig-NG': 'Igbo',
        'ha': 'Hausa',
        'ha-Latn-NG': 'Hausa',
        fr: 'Faransanci',
        es: 'Sifen',
        sw: 'Swahili',
      },
      system: {
        loading: 'Ana lodi...',
        error: 'An sami kuskure',
        retry: 'Sake gwadawa',
        cancel: 'Soke',
        close: 'Rufe',
        search: 'Bincika',
        clear: 'Share',
        notFound: 'Ba a samo ba',
        pageNotFound: 'Ba a sami shafi ba',
        unauthorized: 'Ba a ba da izini ba',
        forbidden: 'An hana',
        serverError: 'Kuskuren sabar',
        errorMessage: 'An kasa loda bayanai. Don Allah sake gwadawa.',
        connectionError: 'Haɗin ya gaza. Don Allah duba haɗin intanet ɗinka.',
        timeoutError: 'Lokaci ya ƙare. Don Allah sake gwadawa.',
      },
    },
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // Support both base codes and Strapi locale codes
    supportedLngs: ['en', 'yo', 'yo-NG', 'ig', 'ig-NG', 'ha', 'ha-Latn-NG', 'fr', 'es', 'sw'],
    // Map Strapi locale codes to base language resources
    load: 'currentOnly', // Don't load region-specific variants automatically
    nonExplicitSupportedLngs: true, // Allow fallback to base language
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    // Return key when translation is missing, but we handle this in components
    // with fallback chain: t('ui.key') || uiLabels.fallback
    returnNull: false,
    returnEmptyString: false,
    saveMissing: false,
    // This prevents console warnings for missing keys
    missingKeyHandler: false,
  });

import { queryClient } from './queryClient';
import { getUITranslations } from './strapi';

// Update Strapi language when i18n language changes
i18n.on('languageChanged', async (lng) => {
  console.log('🔄 i18n languageChanged event:', lng);

  // Set the current language for Strapi API calls
  setCurrentLanguage(lng);
  console.log('✓ Updated Strapi currentLanguage to:', lng);

  // Load UI translations from Strapi (buttons, labels, content-specific text)
  try {
    const strapiTranslations = await getUITranslations(lng);

    if (strapiTranslations && Object.keys(strapiTranslations).length > 0) {
      // Get current translations (includes hardcoded system messages)
      const currentTranslations = i18n.getResourceBundle(lng, 'translation') || {};

      // Merge strategy:
      // - Keep hardcoded: language names, system messages (loading, error, etc.)
      // - Override with Strapi: all UI labels, buttons, content text
      const mergedTranslations = {
        // Preserve hardcoded language names
        language: currentTranslations.language || resources[lng as keyof typeof resources]?.translation?.language,

        // Preserve hardcoded system messages (loading, error, cancel, etc.)
        system: currentTranslations.system || resources[lng as keyof typeof resources]?.translation?.system,

        // Add all Strapi UI translations (buttons, labels, blog interface, etc.)
        ...strapiTranslations,
      };

      // Add the merged translations to i18n
      i18n.addResourceBundle(lng, 'translation', mergedTranslations, true, true);

      console.log(`✓ Loaded Strapi UI translations for ${lng}`);
    } else {
      // Silent fallback - ui-translations collection is optional
      console.debug(`No Strapi UI translations for ${lng}, using system defaults`);
    }
  } catch (error) {
    // Silent fallback
    console.debug(`Strapi translations unavailable for ${lng}, using defaults`);
  }

  // Invalidate all queries to force refetch with new language
  console.log('🔄 Invalidating all React Query caches for language change');
  queryClient.invalidateQueries();
  console.log('✓ Query invalidation complete');
});

/**
 * Load and merge Strapi translations with local fallbacks
 * System messages (loading, error, cancel, search) remain hardcoded
 * All other UI text (buttons, labels, blog interface) fetched from Strapi
 */
export async function loadStrapiTranslations(language: string): Promise<void> {
  try {
    const strapiTranslations = await getUITranslations(language);

    if (strapiTranslations && Object.keys(strapiTranslations).length > 0) {
      const currentTranslations = i18n.getResourceBundle(language, 'translation') || {};

      // Merge: Keep system messages hardcoded, override everything else from Strapi
      const mergedTranslations = {
        // Hardcoded: language names
        language: currentTranslations.language || resources[language as keyof typeof resources]?.translation?.language,

        // Hardcoded: system/error messages
        system: currentTranslations.system || resources[language as keyof typeof resources]?.translation?.system,

        // From Strapi: all UI content (buttons, labels, blog interface, forms, etc.)
        ...strapiTranslations,
      };

      i18n.addResourceBundle(language, 'translation', mergedTranslations, true, true);
      console.log(`✓ Loaded Strapi translations for ${language}`);
    } else {
      console.warn(`⚠ No Strapi translations for ${language}, using system messages only`);
    }
  } catch (error) {
    console.warn(`Failed to load Strapi translations for ${language}:`, error);
  }
}

export default i18n;