import React from 'react';

import Home from './home/home';
import { Container, Button } from 'react-materialize';

const Layout = () => (
  <main>
    <Container>
      <Home />
    </Container>
    <div className="fixed-action-btn horizontal">
    <Button floating large className='purple darken-4' waves='light' icon='add' class="floating" />
    </div>
  </main>
);

export default Layout;
