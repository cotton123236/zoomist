import clsx from 'clsx'
import astroI18nextConfig, { type I18nLocales } from 'astro-i18next.config'
import styles from './LangSelect.module.css'

interface LangSelectProps {
  className?: string
  children?: React.ReactNode
}

export default ({ className, children }: LangSelectProps) => {
  const { meta, locales } = astroI18nextConfig

  // const

  return (
    <div className="relative h-5">
      <button className={clsx('nav-tool-link', styles['lang-btn'], className)} type="button">
        {children}
      </button>
      <div className={styles['lang-droplist']}>
        {locales.map((item) => (
          <a href="/">{meta[item as I18nLocales].name}</a>
        ))}
      </div>
    </div>
  )
}
