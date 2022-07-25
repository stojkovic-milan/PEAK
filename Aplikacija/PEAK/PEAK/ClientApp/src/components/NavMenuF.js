import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LoginMenu } from "./api-authorization/LoginMenu";
import "./NavMenu.css";
import logo from './NaseKomponente/images/Logo_Blue.png'

const NavMenuF = (props) => {
    const [collapsed, setCollapsed] = React.useState(true);
    const[role, setRole] = React.useState("Korisnik");

    React.useEffect(() => {
        const getRole=async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiRoleKorisnika", {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const getdata = await res.json();
            console.log(getdata);
            setRole(getdata);
        }
        getRole();
    },[]);

    if(role=="Korisnik"){
        return (
            <header className="fixed-top">
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-expand-lg stroke"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/" className="navbar-brand mr-lg-5">
              <img src={logo} className="noRadius" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow mr-auto">
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/"
                    >
                      Pocetna
                    </NavLink>
                  </NavItem>
                  
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/dogadjajiStranica"
                    >
                      Dogadjaji
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/planinarskaDrustva"
                    >
                      Planinarska drustva
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link} to="/oNama">
                      O Nama
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/fetch-data"
                    >
                      Kontakt
                    </NavLink>
                  </NavItem>
                </li>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
        )
    }
    else if(role=="Admin"){
        return(
            <header className="fixed-top">
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-expand-lg stroke"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/" className="navbar-brand mr-lg-5">
              <img src={logo} className="noRadius" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow mr-auto">
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/administratorPocetna"
                    >
                      Pocetna
                    </NavLink>
                  </NavItem>
                  
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/administratorDogadjaji"
                    >
                      Dogadjaji
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/planinarskaDrustva"
                    >
                      Planinarska drustva
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link} to="/oNama">
                      O Nama
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/fetch-data"
                    >
                      Kontakt
                    </NavLink>
                  </NavItem>
                </li>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
        )
    }
    else if(role=="PlaninarskoDrustvo"){
        return(
            <header className="fixed-top">
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-expand-lg stroke"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/" className="navbar-brand mr-lg-5">
              <img src={logo} className="noRadius" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow mr-auto">
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/"
                    >
                      Pocetna
                    </NavLink>
                  </NavItem>
                  
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/dogadjajiStranica"
                    >
                      Dogadjaji
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/planinarskaDrustva"
                    >
                      Planinarska drustva
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link} to="/oNama">
                      O Nama
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/fetch-data"
                    >
                      Kontakt
                    </NavLink>
                  </NavItem>
                </li>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
        )
    }
    else{
      <header className="fixed-top">
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar navbar-expand-lg stroke"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/" className="navbar-brand mr-lg-5">
              <img src={logo} className="noRadius" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow mr-auto">
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/"
                    >
                      Pocetna
                    </NavLink>
                  </NavItem>
                  
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/dogadjajiStranica"
                    >
                      Dogadjaji
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/planinarskaDrustva"
                    >
                      Planinarska drustva
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link} to="/oNama">
                      O Nama
                    </NavLink>
                  </NavItem>
                </li>
                <li className="nav-item">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to="/fetch-data"
                    >
                      Kontakt
                    </NavLink>
                  </NavItem>
                </li>
                <LoginMenu></LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    }
    
}

export default NavMenuF;
