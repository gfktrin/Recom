import React from 'react';

import { Navbar, NavItem, Row } from 'react-materialize';

const Header = () => (
  <Row>
    <Navbar brand='Recom' right className='purple darken-4'>
      <NavItem href='/'>Movies</NavItem>
      <NavItem href='/'>Series</NavItem>
      <NavItem href='/'>Music</NavItem>
      <NavItem href='/'>Books</NavItem>
    </Navbar>
  </Row>
);

export default Header;
