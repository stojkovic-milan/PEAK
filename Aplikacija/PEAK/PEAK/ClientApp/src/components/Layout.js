import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import NavMenuF from './NavMenuF';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="w-100">
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
