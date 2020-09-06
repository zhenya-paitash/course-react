import React, {Component} from 'react';
import './Layout.css';
import MenuToggle from "../../components/Navigation/MenuToggle";
import Drawer from "../../components/Navigation/Drawer";


export default class Layout extends Component {
  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState(state => {
      return {menu: !state.menu}
    })
  };

  menuCloseHandler = () => {
    this.setState({menu: false})
  };

  render() {
    return (
      <div className="Layout">

        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
};
