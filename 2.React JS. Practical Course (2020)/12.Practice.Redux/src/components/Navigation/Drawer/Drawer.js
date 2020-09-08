import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './Drawer.css';
import Backdrop from "../../UI/Backdrop";


export default class Drawer extends Component {
  renderLinks(links) {
    return links.map((i, idx) => {
      return (
        <li key={idx}>
          <NavLink to={i.to} exact={i.exact} onClick={() => this.props.onClose()}>{i.label}</NavLink>
        </li>
      );
    });
  }


  render() {
    const cls = ['Drawer'];
    if (!this.props.isOpen) cls.push('close');

    const links = [
      {to: '/', label: 'List', exact: true}
    ];

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create Quiz', exact: false});
      links.push({to: '/logout', label: 'Logout', exact: false});
    } else {
      links.push({to: '/auth', label: 'Authorization', exact: false});
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
};
