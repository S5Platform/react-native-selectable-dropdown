const Overlay = require('./overlay');
const Items = require('./items');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');

class OptionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,

      width: 0,
      height: 0,

      pageX: 0,
      pageY: 0,

      positionX: 0,
      positionY: 0,

      checkable: false,
      items: [],
      onSelect: () => { }
    };

    this._renderIcon = this._renderIcon.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }

  _show(items, positionX, positionY, width, height, checkable, viewCount, onSelect) {
    positionX = positionX - this.state.pageX;
    positionY = positionY - this.state.pageY;

    this.setState({
      ...this.state,
      positionX,
      positionY,
      width,
      height,
      items,
      onSelect,
      show: true,
      opened: false,
      checkable, checkable,
      viewCount: viewCount
    });
  }

  _onOverlayPress() {
    const { onSelect, checkable } = this.state;
    onSelect(null, null);

    if( !checkable ){
      this.setState({
        ...this.state,
        show: false
      });     
    }
  }

  _onToggle(){
    if( !this.state.opened ){
      this.setState({
        ...this.state,
        opened: true
      });
    } else {
       this.setState({
        ...this.state,
        opened: false
      });     
    }    
  }

  _onItemPress(item, value) {
    const { onSelect, checkable } = this.state;
    if( !checkable ){
      onSelect(null, null);

      this.setState({
        ...this.state,
        show: false
      });
    }
  }

  _blur() {
    this.setState({
      ...this.state,
      show : false
    });
  }

  _renderIcon(){
    const { width, opened } = this.state;

    const {
      overlayStyles,
      checkboxStyles
    } = this.props;


    var height = overlayStyles.height;

    var topMargin = height / 4;

    var leftMargin = width - ( height );

    var iconColor = (checkboxStyles && checkboxStyles.color ) ? checkboxStyles.color : "black";

    if( opened ){
      return (
        <View style={{'position':'absolute', 'top': topMargin,'left':leftMargin}}>
          <TouchableWithoutFeedback onPress={this._onToggle} >
            <View style={{justifyContent: 'center', alignSelf: 'center' }}>
              <Icon name='chevron-up' size={ height / 2 } color={iconColor}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    } else {
      return (
        <View style={{'position':'absolute', 'top': topMargin,'left':leftMargin}}>
          <TouchableWithoutFeedback onPress={this._onToggle} >
            <View style={{justifyContent: 'center', alignSelf: 'center' }}>
              <Icon name='chevron-down' size={ height / 2 } color={iconColor}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )        
    }

  }

  render() {
    const {
      items,
      pageX,
      pageY,
      positionX,
      positionY,
      width,
      height,
      show,
      checkable,
      opened,
      viewCount
    } = this.state;

    const {
      overlayStyles,
      itemsStyles,
      checkboxStyles,
      onSelect
    } = this.props;

    return (
        <Overlay
          pageX={pageX}
          pageY={pageY}
          show={show}
          opened={opened}
          checkable={checkable}
          onPress={ this._onOverlayPress.bind(this) }
          overlayStyles = {overlayStyles}
          height={height}>
        <Items
          items={items}
          positionX={positionX}
          positionY={positionY}
          width={width}
          height={height}
          show={show}
          opened={opened}
          checkable={checkable}
          onPress={ this._onItemPress.bind(this) }
          onToggle={ this._onToggle.bind(this) }
          onSelect={onSelect}
          itemsStyles = {itemsStyles}
          checkboxStyles={checkboxStyles}
          viewCount={viewCount} 
          />
          {this._renderIcon()}
        </Overlay>
    );
  }
}

OptionList.propTypes = {

};

OptionList.defaultProps = {

};

module.exports = OptionList;
