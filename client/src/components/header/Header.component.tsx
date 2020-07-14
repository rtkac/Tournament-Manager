import React from 'react';
import { connect } from 'react-redux';
import T from 'i18n/translationsKeyMapping';
import i18n from 'i18n/i18n_config';
import { appConfig } from 'config/appConfig';

import { logout } from 'actions/login.actions';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink as Link } from 'baseui/link';
import { ButtonGroup, SIZE } from "baseui/button-group";
import { Button } from "baseui/button";

import Dropdown from 'components/dropdown/Dropdown.component';


const Header = (props: HeaderProps) => {
  const { t, logout, user } = props;

  const dropDownItems = [
    {
      label: t(T.HEADER.LOGOUT),
      onClick: () => logout()
    },
  ];

  const getLanguage = i18n.language || window.localStorage.i18nextLng;
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const langs = Object.values(appConfig.LANGS).map(lang => ({
    label: lang,
    onClick: () => changeLanguage(lang.toLowerCase()),
    isSelected: getLanguage === lang.toLowerCase(),
  }));
  
  return (
    <HeaderNavigation>

      <NavigationList $align={ALIGN.left}>
        <NavigationItem>Tournament Manager</NavigationItem>
      </NavigationList>

      <NavigationList $align={ALIGN.center} />
      
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Link href="#basic-link1">Tab Link One</Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="#basic-link2">Tab Link Two</Link>
        </NavigationItem>
      </NavigationList>

      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <Dropdown size={SIZE.compact} items={dropDownItems}>{user.name || t(T.HEADER.USER.LABEL)}</Dropdown>
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
  logout: () => void;
  user: {
    name: string;
  };
};

export default connect(null, {
  logout,
})(Header);