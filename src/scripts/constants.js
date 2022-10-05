import { isDev } from './helpers';

export default {
    THEME_DARK: 'THEME_DARK',
    THEME_LIGHT: 'THEME_LIGHT',

    COLOR_WHITE: '#f2f2eb',
    COLOR_BLACK: '#1c1c1c',
    COLOR_YELLOW: '#e4b704',
    COLOR_RED: '#e92c20',
    COLOR_BLUE: '#84c8ed',
    COLOR_GREEN: '#069d24',
    COLOR_ORANGE: '#fc6b08',
    COLOR_PINK: '#f4b9cb',

    CURRENT_SLIDE_INDEX: 'CURRENT_SLIDE_INDEX',
    MAIN_CAROUSEL: 'MAIN_CAROUSEL',
    SMALL_CAROUSEL: 'SMALL_CAROUSEL',
    MAIN_CAROUSEL_HAS_CHANGED: 'MAIN_CAROUSEL_HAS_CHANGED',
    HIDE_INTERFACE: 'HIDE_INTERFACE',

    DEFAULT_URL: isDev
        ? 'http://localhost:3000'
        : 'https://main.daiajseb9ftwt.amplifyapp.com',
};
