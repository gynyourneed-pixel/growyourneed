import { AppHeaderItem, AppNavItem } from '../../../types';
import { 
  ShoppingCartIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ChartBarIcon,
  ListBulletIcon,
  StarIcon,
  TicketIcon,
  TruckIcon,
  UserGroupIcon
} from '../../../icons';

export const MARKET_HEADER_ITEMS: AppHeaderItem[] = [
  { id: 'browse', label: 'Browse' },
  { id: 'my_orders', label: 'My Orders' },
  { id: 'sell', label: 'Sell' },
  { id: 'analytics', label: 'Analytics' },
];

export const MARKET_NAV_MAP: { [key: string]: AppNavItem[] } = {
  browse: [
    { id: 'all_products', label: 'All Products', icon: ListBulletIcon },
    { id: 'categories', label: 'Categories', icon: ShoppingBagIcon },
    { id: 'featured', label: 'Featured', icon: StarIcon },
    { id: 'deals', label: 'Deals', icon: TicketIcon },
  ],
  my_orders: [
    { id: 'active', label: 'Active Orders', icon: ShoppingCartIcon },
    { id: 'completed', label: 'Completed', icon: ListBulletIcon },
    { id: 'returns', label: 'Returns', icon: TruckIcon },
  ],
  sell: [
    { id: 'add_product', label: 'Add Product', icon: ShoppingBagIcon },
    { id: 'my_listings', label: 'My Listings', icon: ListBulletIcon },
    { id: 'sales', label: 'Sales', icon: ChartBarIcon },
  ],
  analytics: [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'customers', label: 'Customers', icon: UserGroupIcon },
    { id: 'products', label: 'Products', icon: ShoppingBagIcon },
  ],
};
