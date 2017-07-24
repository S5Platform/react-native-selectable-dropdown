const Overlay = require('./overlay');
const Items = require('./items');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';

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
  }

  _init(items, positionX, positionY, width, height, checkable, viewCount, onSelect) {
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
      checkable, checkable,
      viewCount: viewCount
    });
  }

  _changeItems(items) {
    this.setState({
      ...this.state,
      items,
    });
  }

  _onOverlayPress() {
    const { onSelect, checkable } = this.state;
    if( !checkable ){
      onSelect(null, null);
    }
  }

  _onItemPress(item, value) {
    const { onSelect, checkable } = this.state;
    if( !checkable ){
      onSelect(item, value);
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
      viewCount,
      onSelect
    } = this.state;

    const {
      overlayStyles,
      itemsStyles,
      checkboxStyles,
      onToggle,
      opened,
      checkedItems,
      renderFooter,
      styleText
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
        onToggle={onToggle}
        onSelect={onSelect}
        checkedItems={checkedItems}
        itemsStyles = {itemsStyles}
        checkboxStyles={checkboxStyles}
        styleText={styleText}
        viewCount={viewCount}
        />
        {renderFooter&&renderFooter()}
      </Overlay>
    );
  }
}

OptionList.propTypes = {

};

OptionList.defaultProps = {

};

module.exports = OptionList;
