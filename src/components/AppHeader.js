import React ,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilApplicationsSettings, cilMenu, cilMoon, cilSun } from '@coreui/icons'
import { useTranslation } from 'react-i18next'
import { AppBreadcrumb } from './index'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'

import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
 const [selectedLanguage, setSelectedLanguage] = useState("es");
  const theme = useSelector((state) => state.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const asideShow = useSelector((state) => state.asideShow)
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setSelectedLanguage(lng);
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        
        </CHeaderNav>
      
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CButton
              color="primary"
              active={selectedLanguage === "es"}
              onClick={() => changeLanguage("es")}
            >
              portuguese
            </CButton>
            <CButton
              color="primary"
              onClick={() => changeLanguage("en")}
              active={selectedLanguage === "en"}
            >
              English
            </CButton>
          </CButtonGroup>
        </CHeaderNav>

        <CHeaderNav>
          <AppHeaderDropdownNotif />
          {/* <AppHeaderDropdownTasks /> */}
          <AppHeaderDropdownMssg />
        </CHeaderNav>
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
    
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
}

export default AppHeader
