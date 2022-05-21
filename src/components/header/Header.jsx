import React from 'react';
import { Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';

const Header = () => (
  <Navbar className={styles.header}>
    <Navbar.Brand>Historical Fx Data</Navbar.Brand>
  </Navbar>
);

export default Header;
