import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './Drawer.css';
import Backdrop from "../../UI/Backdrop";


const links = [
  {to: '/', label: 'List', exact: true},
  {to: '/auth', label: 'Authorization', exact: false},
  {to: '/quiz-creator', label: 'Create Quiz', exact: false},
];

export default class Drawer extends Component {
  renderLinks() {
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

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
};
