import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegación',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'page-layouts',
        title: 'Users',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'register',
            title: 'Create new user',
            type: 'item',
            url: '/dashboard/user/register',
            target: false
          },
          {
            id: 'index',
            title: 'User list',
            type: 'item',
            url: '/dashboard/user/index',
            target: false
          },
        ]
      },
      {
        id: 'Estantes',
        title: 'Stores',
        type: 'collapse',
        icon: 'fa fa-store',
        children: [
          {
            id: 'register',
            title: 'Create new store',
            type: 'item',
            url: '/dashboard/store/resource/register',
            target: false
          },
          {
            id: 'register',
            title: 'Store list',
            type: 'item',
            url: '/dashboard/store/resource/index',
            target: false
          }
        ]
      },
      {
        id: 'Elementos',
        title: 'Items',
        type: 'collapse',
        icon: 'feather icon-tag',
        children: [
          {
            id: 'register',
            title: 'Create new item',
            type: 'item',
            url: '/dashboard/elements/resource-element/register',
            target: false
          },
          {
            id: 'register',
            title: 'Item list',
            type: 'item',
            url: '/dashboard/elements/resource-element/index',
            target: false
          }
        ]
      },
      {
        id: 'Inventory',
        title: 'Daily report',
        type: 'collapse',
        icon: 'feather icon-layers',
        children: [
          {
            id: 'register',
            title: 'Scan',
            type: 'item',
            url: '/dashboard/inventories/resource-inventory/register',
            target: false
          },
          {
            id: 'index',
            title: 'Report list',
            type: 'item',
            url: '/dashboard/inventories/resource-inventory/alls',
            target: false
          },
          {
            id: 'myowners',
            title: 'By user',
            type: 'item',
            hidden: true,
            exactMatch: false,
            url: "/dashboard/inventories/resource-inventory/myowners/:id",
          },
          {
            id: 'my_owners',
            title: 'By user last',
            type: 'item',
            hidden: true,
            exactMatch: false,
            url: "/dashboard/inventories/resource-inventory/index/:id",
          },
          {
            id: 'my_auth_owners',
            title: 'By user ',
            type: 'item',
            exactMatch: false,
            url: "/dashboard/inventories/resource-inventory/myauthowners",
          }
        ]
      }
    ]
  },
  // {
  //   id: 'ui-element',
  //   title: 'UI Element',
  //   type: 'group',
  //   icon: 'feather icon-layers',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Basic',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'alert',
  //           title: 'Alert',
  //           type: 'item',
  //           url: '/basic/alert'
  //         },
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumbs & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'cards',
  //           title: 'Cards',
  //           type: 'item',
  //           url: '/basic/cards'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'carousel',
  //           title: 'Carousel',
  //           type: 'item',
  //           url: '/basic/carousel'
  //         },
  //         {
  //           id: 'grid-system',
  //           title: 'Grid System',
  //           type: 'item',
  //           url: '/basic/grid-system'
  //         },
  //         {
  //           id: 'progress',
  //           title: 'Progress',
  //           type: 'item',
  //           url: '/basic/progress'
  //         },
  //         {
  //           id: 'modal',
  //           title: 'Modal',
  //           type: 'item',
  //           url: '/basic/modal'
  //         },
  //         {
  //           id: 'spinner',
  //           title: 'Spinner',
  //           type: 'item',
  //           url: '/basic/spinner'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         },
  //         {
  //           id: 'tooltip-popovers',
  //           title: 'Tooltip & Popovers',
  //           type: 'item',
  //           url: '/basic/tooltip-popovers'
  //         },
  //         {
  //           id: 'toasts',
  //           title: 'Toasts',
  //           type: 'item',
  //           url: '/basic/toasts'
  //         },
  //         {
  //           id: 'other',
  //           title: 'Other',
  //           type: 'item',
  //           url: '/basic/other'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & TAbles',
  //   type: 'group',
  //   icon: 'feather icon-layout',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Forms',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text'
  //     },
  //     {
  //       id: 'bootstrap',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tbl-bootstrap/bt-basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server'
  //     }
  //   ]
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart & Maps',
  //   type: 'group',
  //   icon: 'feather icon-pie-chart',
  //   children: [
  //     {
  //       id: 'charts',
  //       title: 'Charts',
  //       type: 'item',
  //       url: '/charts/apex',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart'
  //     },
  //     {
  //       id: 'maps',
  //       title: 'Maps',
  //       type: 'item',
  //       url: '/maps/google',
  //       classes: 'nav-item',
  //       icon: 'feather icon-map'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'feather icon-file-text',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     }
  //   ]
  // }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
