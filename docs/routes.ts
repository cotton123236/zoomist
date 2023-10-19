import { t } from 'i18next'

export interface Route {
  name: string
  path: string | null
  trans?: string
  children?: Route[]
}

export type Routes = Route[]

export const docsRoutes: Routes = [
  {
    name: 'getting-started',
    path: '/getting-started',
    trans: 'sidebar.getting-started',
    children: [
      {
        name: 'installation',
        path: '/installation',
        trans: 'sidebar.installation'
      }
    ]
  }
]

export const useRouteTrans = (route: Route): string => {
  return route.trans ? t(route.trans) : route.name
}
