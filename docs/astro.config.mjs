import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import astroI18next from 'astro-i18next'
// markdown
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkSmartypants from 'remark-smartypants'
import config from './config'
import { astroExpressiveCode } from './integrations/expressive-code-config'
import { autolinkConfig } from './plugins/rehype-autolink-config'

// https://astro.build/config
export default defineConfig({
  site: config.site,
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    astroExpressiveCode(),
    // codeblocks(),
    mdx(),
    astroI18next()
  ],
  scopedStyleStrategy: 'where',
  compressHTML: false,
  markdown: {
    remarkPlugins: [
      [
        remarkSmartypants,
        {
          dashes: false
        }
      ]
    ],
    rehypePlugins: [
      rehypeSlug,
      // This adds links to headings
      [rehypeAutolinkHeadings, autolinkConfig]
    ]
  }
})
