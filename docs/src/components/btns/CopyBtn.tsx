import { useState } from 'react'
import styles from './CopyBtn.module.css'
import clsx from 'clsx'

interface CopyBtnProps {
  children: React.ReactNode
  copy: string
  className?: string
}

export default ({ children, className, copy }: CopyBtnProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const useCopy = async () => {
    await navigator.clipboard.writeText(copy)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <button
      className={clsx(
        styles['copy-btn'],
        className,
        'text-gray-200 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-300'
      )}
      type="button"
      onClick={useCopy}
    >
      {children}
      <div className="relative ml-2 h-4 w-4">
        <svg
          className={clsx('absolute-fill transition-opacity duration-200', {
            'opacity-0': isCopied
          })}
          fill="none"
          height="24"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z"></path>
        </svg>
        <svg
          className={clsx('absolute-fill transition-opacity duration-200', {
            'opacity-0': !isCopied
          })}
          fill="none"
          height="24"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </div>
    </button>
  )
}
