import type { ShikiConfig } from 'astro'
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code'

type ExcludeStringAndUndefined<T> = T extends string | undefined ? never : T
type IShikiTheme = ExcludeStringAndUndefined<ShikiConfig['theme']>

export const astroExpressiveCode = () =>
  expressiveCode({
    theme: 'material-theme-lighter', // min-dark, rose-pine-dawn, vitesse-dark, material-theme-lighter
    customizeTheme(theme) {
      const customizeTheme: Partial<IShikiTheme> = {
        ...theme,
        settings: [
          ...theme.settings
          // {
          //   name: 'Comment',
          //   scope: 'comment',
          //   settings: {
          //     foreground: '#999'
          //   }
          // },
          // {
          //   name: 'String',
          //   scope: 'string',
          //   settings: {
          //     foreground: '#62c073'
          //   }
          // },
          // {
          //   name: 'Entity Name Function',
          //   scope: 'entity.name.function',
          //   settings: {
          //     foreground: '#999'
          //   }
          // }
        ]
      }
      return new ExpressiveCodeTheme(customizeTheme)
    },
    styleOverrides: {
      uiFontSize: 'var(--code-ui-font-size)',
      codeFontSize: 'var(--code-font-size)',
      codeFontFamily: 'var(--code-font-family)',
      codeBackground: 'var(--code-bg-color)',
      borderColor: 'var(--code-border-color)',
      uiPaddingBlock: 'var(--code-tab-bar-padding)',
      borderRadius: 'var(--code-border-radius)'
    },
    frames: {
      styleOverrides: {
        shadowColor: 'var(--code-shadow-color)',
        frameBoxShadowCssValue: '0 0 0.5rem var(--code-shadow-color)',
        editorTabBarBackground: 'var(--code-tab-bar-color)',
        editorActiveTabForeground: 'var(--code-tab-title-color)',
        editorActiveTabBackground: 'var(--code-tab-bg-color)',
        editorActiveTabBorderTop: 'transparent',
        editorActiveTabBorderBottom: 'transparent',
        editorTabBarBorderBottom: 'var(--code-tab-bar-color)',

        terminalTitlebarBackground: 'var(--code-tab-bar-color)',
        terminalTitlebarBorderBottom: 'transparent',
        terminalBackground: 'var(--code-bg-color)'
      }
    },
    textMarkers: {
      styleOverrides: {
        defaultChroma: '55'
      }
    }
  })
