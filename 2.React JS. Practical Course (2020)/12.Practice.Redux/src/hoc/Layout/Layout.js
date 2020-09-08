import React, {Component} from 'react';
import './Layout.css';
import MenuToggle from "../../components/Navigation/MenuToggle";
import Drawer from "../../components/Navigation/Drawer";
import {connect} from "react-redux";


class Layout extends Component {
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
          isAuthenticated={this.props.isAuthenticated}
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
}


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout);
