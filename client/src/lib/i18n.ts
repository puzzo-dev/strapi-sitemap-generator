// i18n.ts
// NOTE: All content (page/section titles, nav, button text, etc.) is fetched from Strapi (with fallback logic).
// This file now contains UI/UX/system messages and serves as fallback for when Strapi is unavailable.
// Dynamic content is managed through Strapi CMS with translationKey as identifiers.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setCurrentLanguage } from './strapi';

// Import translations
const resources = {
  en: {
    translation: {
      language: {
        en: 'English',
        yo: 'Yorùbá',
        ig: 'Igbo',
        ha: 'Hausa',
        fr: 'French',
        es: 'Spanish',
        sw: 'Swahili',
      },
      ui: {
        selectLanguage: 'Select Language',
        loading: 'Loading...',
        error: 'An error occurred',
        submit: 'Submit',
        cancel: 'Cancel',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        yes: 'Yes',
        no: 'No',
        confirm: 'Confirm',
        search: 'Search',
        clear: 'Clear',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        retry: 'Retry',
        success: 'Success',
        failed: 'Failed',
        notFound: 'Not Found',
        pageNotFound: 'Page Not Found',
        unauthorized: 'Unauthorized',
        forbidden: 'Forbidden',
        serverError: 'Server Error',
        required: 'Required',
        optional: 'Optional',
        copy: 'Copy',
        copied: 'Copied!',
        paste: 'Paste',
        download: 'Download',
        upload: 'Upload',
        settings: 'Settings',
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        home: 'Home',
        language: 'Language',
        // Blog filters
        searchPlaceholder: 'Search articles...',
        selectCategory: 'Select Category',
        allCategories: 'All Categories',
        selectTag: 'Select Tag',
        allTags: 'All Tags',
        // Blog posts
        errorMessage: 'Failed to load blog posts. Please try again.',
        noResults: 'No posts found matching your criteria.',
        showingResults: 'Showing {{count}} posts',
        featuredPosts: 'Featured Posts',
        latestPosts: 'Latest Posts',
        noPosts: 'No posts found',
        clearFilters: 'Clear Filters',
        // Blog sidebar
        categories: 'Categories',
        popularTags: 'Popular Tags',
        subscribe: 'Subscribe to Newsletter',
        subscribeText: 'Stay updated with our latest insights and articles.',
        // Blog actions
        readMore: 'Read More',
        sharePost: 'Share Post',
        // Blog comments
        comments: 'Comments',
        readComments: 'Read Comments',
        writeComment: 'Write Comment',
        noComments: 'No comments yet',
        beFirstToComment: 'Be the first to comment',
        leaveComment: 'Leave a Comment',
        commentPolicy: 'Your comment will be published after moderation.',
        yourName: 'Your Name',
        namePlaceholder: 'Enter your name',
        yourEmail: 'Your Email',
        emailPlaceholder: 'Enter your email',
        yourComment: 'Your Comment',
        commentPlaceholder: 'Share your thoughts...',
        submitComment: 'Submit Comment',
        submittingComment: 'Submitting...',
        commentError: 'Failed to submit comment. Please try again.',
        // Blog related
        relatedPosts: 'Related Posts',
        tags: 'Tags',
        // Blog author
        aboutAuthor: 'About Author',
        // Blog navigation
        backToBlog: 'Back to Blog',
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
      ui: {
        selectLanguage: 'Yan Èdè',
        loading: 'Ìkó...',
        error: 'Aṣiṣe kan ṣẹlẹ',
        submit: 'Firanṣẹ',
        cancel: 'Fagilé',
        close: 'Pa',
        back: 'Pada',
        next: 'Tẹ̀síwájú',
        previous: 'Tẹ́lẹ̀',
        yes: 'Bẹ́ẹ̀ni',
        no: 'Rárá',
        confirm: 'Jẹ́risi',
        search: 'Wá',
        clear: 'Ko',
        save: 'Fipamọ́',
        edit: 'Ṣatúnṣe',
        delete: 'Pa',
        retry: 'Tun gbìyànjú',
        success: 'Aṣeyọrí',
        failed: 'Kùnà',
        notFound: 'Kò rí',
        pageNotFound: 'Ojú-ìwé Kò rí',
        unauthorized: 'Aìforúkọsílẹ̀',
        forbidden: 'Ẹ̀kọ́wọ̀',
        serverError: 'Aṣiṣe Olùṣàkóso',
        required: 'Dandan',
        optional: 'Yàn',
        copy: 'Daakọ',
        copied: 'Ti Daakọ!',
        paste: 'Lẹ',
        download: 'Gba lati ayelujara',
        upload: 'Po si ori ayelujara',
        settings: 'Ètò',
        profile: 'Profaili',
        logout: 'Jade',
        login: 'Wọlé',
        register: 'Forúkọsílẹ̀',
        home: 'Ilé',
        language: 'Èdè',
        // Blog filters
        searchPlaceholder: 'Wá ìwé ìròyìn...',
        selectCategory: 'Yan Ìdílé',
        allCategories: 'Gbogbo Ìdílé',
        selectTag: 'Yan Àmì',
        allTags: 'Gbogbo Àmì',
        // Blog posts
        errorMessage: 'Kùnà láti mú ìwé ìròyìn wá. Jọ̀ọ́ gbìyànjú lẹ́ẹ̀kan si.',
        noResults: 'Kò sí ìwé ìròyìn tí ó bá àwọn ìbéèrè rẹ.',
        showingResults: 'N fi {{count}} ìwé ìròyìn hàn',
        featuredPosts: 'Ìwé Ìròyìn Tí A Yàn',
        latestPosts: 'Ìwé Ìròyìn Tuntun',
        noPosts: 'Kò sí ìwé ìròyìn',
        clearFilters: 'Ko Àwọn Ìṣọ̀',
        // Blog sidebar
        categories: 'Ìdílé',
        popularTags: 'Àwọn Àmì Tí A Mọ̀',
        subscribe: 'Forúkọsílẹ̀ fún Ìwé Ìròyìn',
        subscribeText: 'Túnmọ̀ sí àwọn ìmọ̀ àti ìwé ìròyìn tuntun wa.',
        // Blog actions
        readMore: 'Kà Sí',
        sharePost: 'Pín Ìwé Ìròyìn',
        // Blog comments
        comments: 'Àwọn Ìdáhùn',
        readComments: 'Kà Àwọn Ìdáhùn',
        writeComment: 'Kọ Ìdáhùn',
        noComments: 'Kò sí Ìdáhùn sibẹ̀',
        beFirstToComment: 'Jẹ́ ẹni àkọ́kọ́ láti dáhùn',
        leaveComment: 'Fi Ìdáhùn Sílẹ̀',
        commentPolicy: 'Ìdáhùn rẹ yóò tẹ̀jáde lẹ́yìn ìṣàkóso.',
        yourName: 'Orúkọ Rẹ',
        namePlaceholder: 'Tẹ orúkọ rẹ sí',
        yourEmail: 'Ìmèèlì Rẹ',
        emailPlaceholder: 'Tẹ ìmèèlì rẹ sí',
        yourComment: 'Ìdáhùn Rẹ',
        commentPlaceholder: 'Pín ìròyìn rẹ...',
        submitComment: 'Firanṣẹ Ìdáhùn',
        submittingComment: 'N firanṣẹ...',
        commentError: 'Failed to submit comment. Please try again.',
        // Blog related
        relatedPosts: 'Àwọn Ìwé Ìròyìn Tó Ráńpẹ̀',
        tags: 'Àwọn Àmì',
        // Blog author
        aboutAuthor: 'Nípa Olùkọ̀wé',
        // Blog navigation
        backToBlog: 'Pada sí Ìwé Ìròyìn',
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
      ui: {
        selectLanguage: 'Họrọ Asụsụ',
        loading: 'Ị na-ebudata...',
        error: 'Mehiere mere',
        submit: 'Zipu',
        cancel: 'Kagbuo',
        close: 'Mechie',
        back: 'Laghachi',
        next: 'Osote',
        previous: 'Gafee gara aga',
        yes: 'Ee',
        no: 'Mba',
        confirm: 'Kwenye',
        search: 'Chọọ',
        clear: 'Hichapụ',
        save: 'Chekwa',
        edit: 'Dezie',
        delete: 'Hichapụ',
        retry: 'Gbalịkwuo',
        success: 'Ịga nke ọma',
        failed: 'Adaala',
        notFound: 'Enweghị',
        pageNotFound: 'Enweghị ibe',
        unauthorized: 'Enweghị ikike',
        forbidden: 'Emegidere',
        serverError: 'Njehie sava',
        required: 'Chọrọ',
        optional: 'Nhọrọ',
        copy: 'Detuo',
        copied: 'E detugo!',
        paste: 'Tinye',
        download: 'Budata',
        upload: 'Bulite',
        settings: 'Ntọala',
        profile: 'Nkọwa',
        logout: 'Pụọ',
        login: 'Banye',
        register: 'Debanye',
        home: 'Ụlọ',
        language: 'Asụsụ',
        // Blog filters
        searchPlaceholder: 'Chọọ edemede...',
        selectCategory: 'Họrọ Ụdị',
        allCategories: 'Ụdị Niile',
        selectTag: 'Họrọ Akara',
        allTags: 'Akara Niile',
        // Blog posts
        errorMessage: 'Ọdịda ibudata edemede. Biko gbalịkwuo.',
        noResults: 'Enweghị edemede dabara na njirisi gị.',
        showingResults: 'Na-egosi {{count}} edemede',
        featuredPosts: 'Edemede Pụrụ Iche',
        latestPosts: 'Edemede Kachasị Ọhụrụ',
        noPosts: 'Enweghị edemede',
        clearFilters: 'Hichapụ Ihe Nzacha',
        // Blog sidebar
        categories: 'Ụdị',
        popularTags: 'Akara Ndị A Ma Ama',
        subscribe: 'Debanye aha maka Akwụkwọ Ozi',
        subscribeText: 'Nọrọ na-amata ọhụụ na edemede ọhụrụ anyị.',
        // Blog actions
        readMore: 'Gụọkwuo',
        sharePost: 'Kekọrịta Edemede',
        // Blog comments
        comments: 'Nkwupụta',
        readComments: 'Gụọ Nkwupụta',
        writeComment: 'Dee Nkwupụta',
        noComments: 'Enweghị nkwupụta ọ bụla',
        beFirstToComment: 'Bụrụ onye mbụ kwuo okwu',
        leaveComment: 'Hapụ Nkwupụta',
        commentPolicy: 'Nkwupụta gị ga-ebipụta mgbe a nyochachara ya.',
        yourName: 'Aha Gị',
        namePlaceholder: 'Tinye aha gị',
        yourEmail: 'Email Gị',
        emailPlaceholder: 'Tinye email gị',
        yourComment: 'Nkwupụta Gị',
        commentPlaceholder: 'Kekọrịta echiche gị...',
        submitComment: 'Zipu Nkwupụta',
        submittingComment: 'Na-ezipu...',
        commentError: 'Ọdịda izipu nkwupụta. Biko gbalịkwuo.',
        // Blog related
        relatedPosts: 'Edemede Metụtara',
        tags: 'Akara',
        // Blog author
        aboutAuthor: 'Banyere Onye Odee',
        // Blog navigation
        backToBlog: 'Laghachi na Blog',
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
      ui: {
        selectLanguage: 'Zaɓi Harshe',
        loading: 'Ana lodawa...',
        error: 'An sami kuskure',
        submit: 'Aika',
        cancel: 'Soke',
        close: 'Rufe',
        back: 'Koma baya',
        next: 'Gaba',
        previous: 'Baya',
        yes: 'Eh',
        no: 'A\'a',
        confirm: 'Tabbatar',
        search: 'Nema',
        clear: 'Share',
        save: 'Ajiye',
        edit: 'Gyara',
        delete: 'Goge',
        retry: 'Sake gwadawa',
        success: 'Nasara',
        failed: 'Kuskure',
        notFound: 'Ba a samu ba',
        pageNotFound: 'Ba a sami shafi ba',
        unauthorized: 'Babu izini',
        forbidden: 'An hana',
        serverError: 'Kuskuren uwar garke',
        required: 'Dole',
        optional: 'Zabi',
        copy: 'Kwafi',
        copied: 'An kwafi!',
        paste: 'Manna',
        download: 'Zazzage',
        upload: 'Loda',
        settings: 'Saituna',
        profile: 'Bayanan martaba',
        logout: 'Fita',
        login: 'Shiga',
        register: 'Rajista',
        home: 'Gida',
        language: 'Harshe',
        // Blog filters
        searchPlaceholder: 'Nemi labarai...',
        selectCategory: 'Zaɓi Rukuni',
        allCategories: 'Dukkan Rukunoni',
        selectTag: 'Zaɓi Alama',
        allTags: 'Dukkan Alamomi',
        // Blog posts
        errorMessage: 'Kuskure a lodar da labarai. Don Allah sake gwadawa.',
        noResults: 'Ba a sami labarai da suka dace da ka\'idojinku.',
        showingResults: 'Ana nuna {{count}} labarai',
        featuredPosts: 'Labarai Masu Muhimmanci',
        latestPosts: 'Labarai Sababbi',
        noPosts: 'Ba a sami labarai',
        clearFilters: 'Share Masu Tacewa',
        // Blog sidebar
        categories: 'Rukunoni',
        popularTags: 'Alamomi Masu Shahararri',
        subscribe: 'Rajista don Jaridar Labarai',
        subscribeText: 'Kasance tare da sababbin fahimtarmu da labarai.',
        // Blog actions
        readMore: 'Kara Karantawa',
        sharePost: 'Raba Labari',
        // Blog comments
        comments: 'Sharhi',
        readComments: 'Kara Karantawa Sharhi',
        writeComment: 'Rubuta Sharhi',
        noComments: 'Babu sharhi tukuna',
        beFirstToComment: 'Ka zama na farko don yin sharhi',
        leaveComment: 'Bar Sharhi',
        commentPolicy: 'Sharhin ka zai buga bayan an duba shi.',
        yourName: 'Sunanka',
        namePlaceholder: 'Shigar da sunanka',
        yourEmail: 'Imelinka',
        emailPlaceholder: 'Shigar da imelinka',
        yourComment: 'Sharhinka',
        commentPlaceholder: 'Raba ra\'ayinka...',
        submitComment: 'Aika Sharhi',
        submittingComment: 'Ana aikawa...',
        commentError: 'Kuskure a aika sharhi. Don Allah sake gwadawa.',
        // Blog related
        relatedPosts: 'Labarai Masu Alaka',
        tags: 'Alamomi',
        // Blog author
        aboutAuthor: 'Game da Marubuci',
        // Blog navigation
        backToBlog: 'Koma zuwa Blog',
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
      ui: {
        selectLanguage: 'Choisir la langue',
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        submit: 'Soumettre',
        cancel: 'Annuler',
        close: 'Fermer',
        back: 'Retour',
        next: 'Suivant',
        previous: 'Précédent',
        yes: 'Oui',
        no: 'Non',
        confirm: 'Confirmer',
        search: 'Rechercher',
        clear: 'Effacer',
        save: 'Enregistrer',
        edit: 'Éditer',
        delete: 'Supprimer',
        retry: 'Réessayer',
        success: 'Succès',
        failed: 'Échec',
        notFound: 'Non trouvé',
        pageNotFound: 'Page non trouvée',
        unauthorized: 'Non autorisé',
        forbidden: 'Interdit',
        serverError: 'Erreur du serveur',
        required: 'Obligatoire',
        optional: 'Optionnel',
        copy: 'Copier',
        copied: 'Copié!',
        paste: 'Coller',
        download: 'Télécharger',
        upload: 'Téléverser',
        settings: 'Paramètres',
        profile: 'Profil',
        logout: 'Déconnexion',
        login: 'Connexion',
        register: 'S\'inscrire',
        home: 'Accueil',
        language: 'Langue',
        // Blog filters
        searchPlaceholder: 'Rechercher des articles...',
        selectCategory: 'Sélectionner une catégorie',
        allCategories: 'Toutes les catégories',
        selectTag: 'Sélectionner un tag',
        allTags: 'Tous les tags',
        // Blog posts
        errorMessage: 'Échec du chargement des articles. Veuillez réessayer.',
        noResults: 'Aucun article trouvé correspondant à vos critères.',
        showingResults: 'Affichage de {{count}} articles',
        featuredPosts: 'Articles en Vedette',
        latestPosts: 'Derniers Articles',
        noPosts: 'Aucun article trouvé',
        clearFilters: 'Effacer les Filtres',
        // Blog sidebar
        categories: 'Catégories',
        popularTags: 'Tags Populaires',
        subscribe: 'S\'abonner à la Newsletter',
        subscribeText: 'Restez informé de nos dernières analyses et articles.',
        // Blog actions
        readMore: 'Lire Plus',
        sharePost: 'Partager l\'Article',
        // Blog comments
        comments: 'Commentaires',
        readComments: 'Lire les Commentaires',
        writeComment: 'Écrire un Commentaire',
        noComments: 'Aucun commentaire pour le moment',
        beFirstToComment: 'Soyez le premier à commenter',
        leaveComment: 'Laisser un Commentaire',
        commentPolicy: 'Votre commentaire sera publié après modération.',
        yourName: 'Votre Nom',
        namePlaceholder: 'Entrez votre nom',
        yourEmail: 'Votre Email',
        emailPlaceholder: 'Entrez votre email',
        yourComment: 'Votre Commentaire',
        commentPlaceholder: 'Partagez vos pensées...',
        submitComment: 'Soumettre le Commentaire',
        submittingComment: 'Soumission...',
        commentError: 'Échec de la soumission du commentaire. Veuillez réessayer.',
        // Blog related
        relatedPosts: 'Articles Connexes',
        tags: 'Tags',
        // Blog author
        aboutAuthor: 'À Propos de l\'Auteur',
        // Blog navigation
        backToBlog: 'Retour au Blog',
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
      ui: {
        selectLanguage: 'Seleccionar idioma',
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        submit: 'Enviar',
        cancel: 'Cancelar',
        close: 'Cerrar',
        back: 'Atrás',
        next: 'Siguiente',
        previous: 'Anterior',
        yes: 'Sí',
        no: 'No',
        confirm: 'Confirmar',
        search: 'Buscar',
        clear: 'Limpiar',
        save: 'Guardar',
        edit: 'Editar',
        delete: 'Eliminar',
        retry: 'Reintentar',
        success: 'Éxito',
        failed: 'Fallido',
        notFound: 'No encontrado',
        pageNotFound: 'Página no encontrada',
        unauthorized: 'No autorizado',
        forbidden: 'Prohibido',
        serverError: 'Error del servidor',
        required: 'Requerido',
        optional: 'Opcional',
        copy: 'Copiar',
        copied: '¡Copiado!',
        paste: 'Pegar',
        download: 'Descargar',
        upload: 'Subir',
        settings: 'Configuración',
        profile: 'Perfil',
        logout: 'Cerrar sesión',
        login: 'Iniciar sesión',
        register: 'Registrarse',
        home: 'Inicio',
        language: 'Idioma',
        // Blog filters
        searchPlaceholder: 'Buscar artículos...',
        selectCategory: 'Seleccionar categoría',
        allCategories: 'Todas las categorías',
        selectTag: 'Seleccionar etiqueta',
        allTags: 'Todas las etiquetas',
        // Blog posts
        errorMessage: 'Error al cargar los artículos. Por favor, inténtalo de nuevo.',
        noResults: 'No se encontraron artículos que coincidan con tus criterios.',
        showingResults: 'Mostrando {{count}} artículos',
        featuredPosts: 'Artículos Destacados',
        latestPosts: 'Últimos Artículos',
        noPosts: 'No se encontraron artículos',
        clearFilters: 'Limpiar Filtros',
        // Blog sidebar
        categories: 'Categorías',
        popularTags: 'Etiquetas Populares',
        subscribe: 'Suscribirse al Boletín',
        subscribeText: 'Mantente actualizado con nuestros últimos análisis y artículos.',
        // Blog actions
        readMore: 'Leer Más',
        sharePost: 'Compartir Artículo',
        // Blog comments
        comments: 'Comentarios',
        readComments: 'Leer Comentarios',
        writeComment: 'Escribir Comentario',
        noComments: 'Aún no hay comentarios',
        beFirstToComment: 'Sé el primero en comentar',
        leaveComment: 'Dejar un Comentario',
        commentPolicy: 'Tu comentario será publicado después de la moderación.',
        yourName: 'Tu Nombre',
        namePlaceholder: 'Ingresa tu nombre',
        yourEmail: 'Tu Email',
        emailPlaceholder: 'Ingresa tu email',
        yourComment: 'Tu Comentario',
        commentPlaceholder: 'Comparte tus pensamientos...',
        submitComment: 'Enviar Comentario',
        submittingComment: 'Enviando...',
        commentError: 'Error al enviar el comentario. Por favor, inténtalo de nuevo.',
        // Blog related
        relatedPosts: 'Artículos Relacionados',
        tags: 'Etiquetas',
        // Blog author
        aboutAuthor: 'Sobre el Autor',
        // Blog navigation
        backToBlog: 'Volver al Blog',
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
      ui: {
        selectLanguage: 'Chagua Lugha',
        loading: 'Inapakia...',
        error: 'Kumetokea hitilafu',
        submit: 'Tuma',
        cancel: 'Ghairi',
        close: 'Funga',
        back: 'Rudi',
        next: 'Ifuatayo',
        previous: 'Iliyopita',
        yes: 'Ndiyo',
        no: 'Hapana',
        confirm: 'Thibitisha',
        search: 'Tafuta',
        clear: 'Futa',
        save: 'Hifadhi',
        edit: 'Hariri',
        delete: 'Futa',
        retry: 'Jaribu tena',
        success: 'Mafanikio',
        failed: 'Imeshindikana',
        notFound: 'Haikupatikana',
        pageNotFound: 'Ukurasa haukupatikana',
        unauthorized: 'Hauruhusiwi',
        forbidden: 'Imepigwa marufuku',
        serverError: 'Hitilafu ya seva',
        required: 'Inahitajika',
        optional: 'Hiari',
        copy: 'Nakili',
        copied: 'Imenakiliwa!',
        paste: 'Bandika',
        download: 'Pakua',
        upload: 'Pakia',
        settings: 'Mipangilio',
        profile: 'Wasifu',
        logout: 'Ondoka',
        login: 'Ingia',
        register: 'Jisajili',
        home: 'Nyumbani',
        language: 'Lugha',
        // Blog filters
        searchPlaceholder: 'Tafuta makala...',
        selectCategory: 'Chagua Kategoria',
        allCategories: 'Kategoria Zote',
        selectTag: 'Chagua Lebo',
        allTags: 'Lebo Zote',
        // Blog posts
        errorMessage: 'Imeshindwa kupakia makala. Tafadhali jaribu tena.',
        noResults: 'Hakuna makala zilizopatikana zinazofanana na vigezo vyako.',
        showingResults: 'Inaonyesha {{count}} makala',
        featuredPosts: 'Makala Maalum',
        latestPosts: 'Makala Mpya',
        noPosts: 'Hakuna makala zilizopatikana',
        clearFilters: 'Futa Vichujio',
        // Blog sidebar
        categories: 'Kategoria',
        popularTags: 'Lebo Maarufu',
        subscribe: 'Jisajili kwa Jarida',
        subscribeText: 'Endelea kupata habari mpya na makala zetu.',
        // Blog actions
        readMore: 'Soma Zaidi',
        sharePost: 'Shiriki Makala',
        // Blog comments
        comments: 'Maoni',
        readComments: 'Soma Maoni',
        writeComment: 'Andika Maoni',
        noComments: 'Hakuna maoni bado',
        beFirstToComment: 'Kuwa wa kwanza kutoa maoni',
        leaveComment: 'Acha Maoni',
        commentPolicy: 'Maoni yako yatachapishwa baada ya ukaguzi.',
        yourName: 'Jina Lako',
        namePlaceholder: 'Weka jina lako',
        yourEmail: 'Barua Pepe Yako',
        emailPlaceholder: 'Weka barua pepe yako',
        yourComment: 'Maoni Yako',
        commentPlaceholder: 'Shiriki mawazo yako...',
        submitComment: 'Tuma Maoni',
        submittingComment: 'Inatumwa...',
        commentError: 'Imeshindwa kutuma maoni. Tafadhali jaribu tena.',
        // Blog related
        relatedPosts: 'Makala Zinazohusiana',
        tags: 'Lebo',
        // Blog author
        aboutAuthor: 'Kuhusu Mwandishi',
        // Blog navigation
        backToBlog: 'Rudi kwenye Blog',
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
    supportedLngs: Object.keys(resources),
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

import { queryClient } from './queryClient';
import { getUITranslations } from './strapi';

// Update Strapi language when i18n language changes
i18n.on('languageChanged', async (lng) => {
  // Set the current language for Strapi API calls
  setCurrentLanguage(lng);
  
  // Load translations from Strapi and merge with local fallbacks
  try {
    const strapiTranslations = await getUITranslations(lng);
    
    if (strapiTranslations && Object.keys(strapiTranslations).length > 0) {
      // Merge Strapi translations with existing translations
      const currentTranslations = i18n.getResourceBundle(lng, 'translation') || {};
      const mergedTranslations = {
        ...currentTranslations,
        ...strapiTranslations,
        // Ensure language names and UI elements are preserved
        language: currentTranslations.language || resources[lng as keyof typeof resources]?.translation?.language,
        ui: {
          ...currentTranslations.ui,
          ...strapiTranslations.ui
        }
      };
      
      // Add the merged translations to i18n
      i18n.addResourceBundle(lng, 'translation', mergedTranslations, true, true);
    }
  } catch (error) {
    console.warn(`Failed to load Strapi translations for ${lng}:`, error);
  }
  
  // Invalidate all queries to force refetch with new language
  queryClient.invalidateQueries();
});

/**
 * Load and merge Strapi translations with local fallbacks
 */
export async function loadStrapiTranslations(language: string): Promise<void> {
  try {
    const strapiTranslations = await getUITranslations(language);
    
    if (strapiTranslations && Object.keys(strapiTranslations).length > 0) {
      const currentTranslations = i18n.getResourceBundle(language, 'translation') || {};
      const mergedTranslations = {
        ...currentTranslations,
        ...strapiTranslations,
        // Preserve local language names and UI
        language: currentTranslations.language || resources[language as keyof typeof resources]?.translation?.language,
        ui: {
          ...currentTranslations.ui,
          ...strapiTranslations.ui
        }
      };
      
      i18n.addResourceBundle(language, 'translation', mergedTranslations, true, true);
      console.log(`Loaded Strapi translations for ${language}`);
    }
  } catch (error) {
    console.warn(`Failed to load Strapi translations for ${language}:`, error);
  }
}

export default i18n;