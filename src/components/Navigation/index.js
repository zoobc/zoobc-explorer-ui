import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

export default function NavigationWrapper() {
  return (
    <>
      <div className="fixed-header">
        <Navigation />
      </div>
      <Navigation />
    </>
  )
}

function Navigation() {
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <Navbar id="header" dark expand="md">
      <Container className="navbar-home">
        <NavbarBrand
          onClick={() => {
            isOpen && setOpen(false)
          }}
          tag={Link}
          to="/"
        >
          Spinechain Explorer
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpen(!isOpen)} />
        <Collapse navbar isOpen={isOpen}>
          <Nav navbar color="muted">
            <NavItem>
              <NavLink
                onClick={() => {
                  isOpen && setOpen(false)
                }}
                tag={Link}
                to="/blocks"
              >
                {t('Blocks')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  isOpen && setOpen(false)
                }}
                tag={Link}
                to="/transactions"
              >
                {t('Transactions')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  isOpen && setOpen(false)
                }}
                tag={Link}
                to="/accounts"
              >
                {t('Accounts')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  isOpen && setOpen(false)
                }}
                tag={Link}
                to="/peers"
              >
                {t('Peers')}
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {t('Monitor')}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    isOpen && setOpen(false)
                  }}
                  tag={Link}
                  to="/monitor/map-peers"
                >
                  {t('Map Peers')}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    isOpen && setOpen(false)
                  }}
                  tag={Link}
                  to="/monitor/transaction-amount-stats"
                >
                  {t('Transaction Amount Stats')}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    isOpen && setOpen(false)
                  }}
                  tag={Link}
                  to="/monitor/transaction-type-stats"
                >
                  {t('Transaction Type Stats')}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    isOpen && setOpen(false)
                  }}
                  tag={Link}
                  to="/monitor/block-transaction-period-stats"
                >
                  {t('Block Transaction Period Stats')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}
