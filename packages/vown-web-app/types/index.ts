// https://github.com/cnolimit/veriown-web-app-fire/blob/master/src/lib/constants.js
// ----------------- Route constants ------------------
export enum ROUTES {
  main = '/',
  login = '/login',
  home = '/home',
  help = '/help',
  about = '/about',
  contact = '/contact',
  reviews = '/reviews',
  dashboard = '/dashboard',
  properties = '/property',
  properties_search = '/property/search',
  dashboard_home = '/dashboard/home',
  dashboard_application = '/dashboard/application',
  dashboard_area = '/dashboard/area',
  dashboard_marketplace = '/dashboard/marketplace',
  dashboard_help = '/dashboard/help',
}

export type NAVIGATION_ITEM = {
  link: ROUTES
  text: string
  icon: string
}

export type NAVIGATION = NAVIGATION_ITEM[]

// ----------------- Cookie constants ------------------
export enum COOKIE {
  token = 'token',
  delete_date = '=;expires=Thu, 01 Jan 1970 00:00:00 GMT',
}

// ----------------- JWT Secret constants ------------------
export enum TOKEN {
  secret = 'secret',
}
