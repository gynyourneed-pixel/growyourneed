
import { useState, useEffect } from 'react';
import { RightNavItemId, NavItem } from '../types';
import { NAVIGATION_MAP } from '../lib/constants';

const useNavigationState = (isMobile: boolean) => {
  const [navigation, setNavigation] = useState({
    activeRightNav: 'dashboard' as RightNavItemId,
    headerItems: [] as NavItem[],
    activeHeaderNav: '',
    subnavItems: [] as NavItem[],
    activeSubnav: '',
  });

  const [sidebars, setSidebars] = useState({
    isLeftSidebarCollapsed: false,
    isRightSidebarCollapsed: true,
  });
  
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  // Effect to update Header items when Right Nav changes
  useEffect(() => {
    const navConfig = NAVIGATION_MAP[navigation.activeRightNav];
    const newHeaderItems = navConfig?.header || [];
    const newActiveHeaderNav = newHeaderItems[0]?.id || '';
    
    setNavigation(prev => ({
      ...prev,
      headerItems: newHeaderItems,
      activeHeaderNav: newActiveHeaderNav,
    }));
  }, [navigation.activeRightNav]);

  // Effect to update Sub-nav items when Header Nav changes
  useEffect(() => {
    const navConfig = NAVIGATION_MAP[navigation.activeRightNav];
    const newSubnavItems = navConfig?.subnav?.[navigation.activeHeaderNav] || [];
    const newActiveSubnav = newSubnavItems[0]?.id || '';

    setNavigation(prev => ({
      ...prev,
      subnavItems: newSubnavItems,
      activeSubnav: newActiveSubnav,
    }));
  }, [navigation.activeRightNav, navigation.activeHeaderNav]);

  // Effect to manage sidebar collapsed state on mobile changes
  useEffect(() => {
    setSidebars(prev => ({
        ...prev,
        isLeftSidebarCollapsed: isMobile,
    }));
  }, [isMobile]);

  return {
    navigation,
    setNavigation,
    sidebars,
    setSidebars,
    isMobileSearchVisible,
    setIsMobileSearchVisible,
  };
};

export default useNavigationState;
