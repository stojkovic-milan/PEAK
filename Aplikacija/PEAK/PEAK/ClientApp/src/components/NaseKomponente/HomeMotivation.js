import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

function HomeMotivation() {
  return (
    <div>
      <section className="w3l-bottom py-5">
        <div className="container py-md-4 py-3 text-center">
          <div className="row my-lg-4 mt-4">
            <div className="col-lg-9 col-md-10 ml-auto">
              <div className="bottom-info ml-auto">
                <div className="header-section text-left">
                  <h3 className="hny-title two profKor">
                    Planinarenje opusta coveka, ali takodje jaca njegov duh.
                  </h3>
                  {/* <p class="mt-3 pr-lg-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Velit beatae laudantium voluptate rem ullam dolore nisi
                    voluptatibus esse quasi. Integer sit amet .Lorem ipsum dolor
                    sit amet adipisicing elit.
                  </p> */}
                  <NavItem>
                    <NavLink tag={Link} to="/oNama"  >
                      {/* <a  className="btn btn-style btn-secondary mt-5">
                        Procitaj vise
                      </a> */}
                      <button className="btn btn-style btn-secondary mt-5">Procitaj vise</button>
                    </NavLink>
                  </NavItem>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeMotivation;