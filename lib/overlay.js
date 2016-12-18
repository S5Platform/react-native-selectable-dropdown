import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    position: 'absolute',
    width: window.width,
    height: window.height,
    flex : 1,
    alignItems : "center",
    backgroundColor : "transparent"
  }
});

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { pageX, pageY, show, onPress, overlayStyles, opened, checkable, height } = this.props;
    if (!opened) {
      return null;
    }

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <View style={[styles.overlay, { top: 0, left: -pageX }, overlayStyles]}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Overlay.propTypes = {
  pageX: React.PropTypes.number,
  pageY: React.PropTypes.number,
  show: React.PropTypes.bool,
  overlayStyles : React.PropTypes.object
};

Overlay.defaultProps = {
  pageX: 0,
  pageY: 0,
  show: false,
  overlayStyles : {}
};

module.exports = Overlay;
