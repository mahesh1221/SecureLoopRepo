import { useEffect } from 'react';

const PRECONNECT_HREF = 'https://fonts.googleapis.com';
const PRECONNECT_CROSS_HREF = 'https://fonts.gstatic.com';
const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap';

/**
 * Injects Google Fonts link tags for Space Grotesk, IBM Plex Sans, and
 * JetBrains Mono. Renders null — side-effect only.
 * Place once at the app root (inside ThemeProvider).
 */
export function FontLoader() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;

    const preconnect = Object.assign(document.createElement('link'), {
      rel: 'preconnect',
      href: PRECONNECT_HREF,
    });
    const preconnectCross = Object.assign(document.createElement('link'), {
      rel: 'preconnect',
      href: PRECONNECT_CROSS_HREF,
      crossOrigin: 'anonymous',
    });
    const stylesheet = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: FONTS_HREF,
    });

    document.head.append(preconnect, preconnectCross, stylesheet);

    return () => {
      preconnect.remove();
      preconnectCross.remove();
      stylesheet.remove();
    };
  }, []);

  return null;
}

FontLoader.displayName = 'FontLoader';
