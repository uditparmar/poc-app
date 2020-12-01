import Head from "next/head";

import { Navbar, Nav, NavDropdown, Button, Badge } from "react-bootstrap";
import Avatar from "react-avatar";

const Header = () => (
  <div>
    <Head>
      <title>News App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar
      className="pr-0"
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
    >
      <Navbar.Brand className="text-primary" href="/">
        <strong>HEALTH EXPLORE</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto text-center">
          <Nav.Link href="#link">
            &nbsp;&nbsp;<b>PROFILE</b>
          </Nav.Link>
          <Nav.Link href="#link">
            &nbsp;&nbsp;<b>JOBS</b>
          </Nav.Link>
          <Nav.Link href="#home">
            &nbsp;&nbsp;<b>PROFESSIONAL NETWORK</b>
          </Nav.Link>
          <Nav.Link href="#lounge">
            &nbsp;&nbsp;<b>LOUNGE</b>
          </Nav.Link>
          <Nav.Link href="#salary">
            &nbsp;&nbsp;<b>SALARY</b>
          </Nav.Link>
        </Nav>
        <Navbar className="ml-auto" bg="white">
          <Button className="mr-3 ml-3" variant="outline-primary">
            CREATE JOB
          </Button>
          <div className="notification">
            <span className="badge">2</span>
            <Avatar
              name="Jack op"
              maxInitials={2}
              color="#007bff"
              size={38}
              round="50px"
              textSizeRatio={2}
            />
          </div>
          <Button
            className="pr-0 pl-0 mr-2 ml-2 bg-white border-0"
            variant="light"
          >
            LOGOUT
          </Button>
        </Navbar>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
