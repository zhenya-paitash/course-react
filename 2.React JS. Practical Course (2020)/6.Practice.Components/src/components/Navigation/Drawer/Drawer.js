import React, {Component} from "react";
import './Drawer.css';
import Backdrop from "../../UI/Backdrop";


const links = [1,2,3];

export default class Drawer extends Component {
  renderLinks() {
    return links.map((i, idx) => {
      return (
        <li key={idx}>
          <a>Link {i}</a>
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
