import React, { useState } from 'react';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';
import i18n from 'i18n/i18n_config';
import { LANGS, THEME } from 'config/enums';
import { ROUTES } from 'router/routes';

import { logout } from 'actions/login.actions';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { Button } from 'baseui/button';

import Dropdown from 'components/dropdown/Dropdown.component';
import Spinner from 'components/spinner/Spinner.component';

import { HeaderLinkButton } from './Header.component.style';


const Header = (props: HeaderProps) => {
  const { t, push, logout, user, isAuthenticated, isAuthenticating } = props;

  const [isDropdownLoading, setIsDropdownLoading] = useState(false);

  console.log('-----------------');
  console.log(props);

  const dropdownItems = isAuthenticated ? [
    {
      label: t(T.HEADER.PROFILE),
      onClick: () => push(ROUTES.PROFILE),
    },
    {
      label: t(T.HEADER.LOGOUT),
      onClick: () => Promise.resolve(setIsDropdownLoading(true)).then(() => logout().then(() => setIsDropdownLoading(false))),
    },
  ] : [
    {
      label: t(T.HEADER.LOGIN),
      onClick: () => push(ROUTES.LOGIN),
    },
    {
      label: t(T.HEADER.SIGNUP),
      onClick: () => push(ROUTES.SIGNUP),
    },
  ];

  const getLanguage = i18n.language || window.localStorage.i18nextLng;
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const langs = Object.values(LANGS).map(lang => ({
    label: lang,
    onClick: () => changeLanguage(lang.toLowerCase()),
    isSelected: getLanguage === lang.toLowerCase(),
  }));

  const headerItems = [
    {
      label: t(T.HEADER.TOURNAMENT.CREATE),
      onClick: () => push(ROUTES.TOURNAMENT_CREATE),
      isVisible: true,
    },
    {
      label: t(T.HEADER.TOURNAMENT.LIST),
      onClick: () => push(ROUTES.TOURNAMENT_LIST),
      isVisible: isAuthenticated,
    },
  ];
  
  return (
    <HeaderNavigation>

      <NavigationList $align={ALIGN.left}>
        <NavigationItem>
          <HeaderLinkButton onClick={() => push(ROUTES.DASHBOARD)}>{t(T.HEADER.TITLE.LABEL)}</HeaderLinkButton>
        </NavigationItem>
      </NavigationList>

      <NavigationList $align={ALIGN.center} />
      
      <NavigationList $align={ALIGN.right}>
        {headerItems.map((item, index) => item.isVisible && (
          <NavigationItem key={`link-${index}`}>
            <HeaderLinkButton onClick={item.onClick}>{item.label}</HeaderLinkButton>
          </NavigationItem>
        ))}
      </NavigationList>

      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Dropdown size={SIZE.compact} items={dropdownItems}>{isAuthenticating || isDropdownLoading ? (
            <Spinner size={15} theme={THEME.LIGHT} />
          ) : (
            user.name || t(T.HEADER.USER.LABEL)
          )}</Dropdown>
        </NavigationItem>
        <ButtonGroup size={SIZE.compact} selected={[langs.findIndex(lang => lang.isSelected)]}>
          {langs.map((lang, index) => (
            <Button key={`lang-${index}`} onClick={lang.isSelected ? () => null : lang.onClick}>{lang.label}</Button>
          ))}
        </ButtonGroup>
      </NavigationList>

    </HeaderNavigation>
  )
};

interface HeaderProps {
  t: any;
  push: any;
  logout: () => any;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  user: {
    name: string;
  };
};

export default connect(null, {
  logout,
})(Header);