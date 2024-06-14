'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link href={"/"} className='navbar-brand'>First Project</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={"/client"} className='nav-link'>Client</Link>
            <Link href={"/server"} className='nav-link'>Server</Link>
            <Link href={"/wagmi"} className='nav-link'>Connect Wallet with Wagmi</Link>
            <Link href={"/ethers"} className='nav-link'>Connect Wallet with Ether</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;