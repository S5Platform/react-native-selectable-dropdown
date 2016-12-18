import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Easing,
  Animated,
} from 'react-native';

const Option = require('./option');

import _ from 'underscore';
import Icon from 'react-native-vector-icons/FontAwesome';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderColor: '#BDBDC1',
    borderWidth: 1,
    backgroundColor : "#ffffff"
  }
});

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height : new Animated.Value(0)
    };

    this._isChecked = this._isChecked.bind(this);
  }

  componentDidMount() {
    const { height, viewCount, checkedItems } = this.props;

    Animated.timing(this.state.height, {
      toValue: height * ( viewCount ? viewCount : 3 ),
      duration: 200,
      easing :  Easing.linear
    }).start();
  }

  _onChange(name,checked){
    const { onSelect } = this.props;
    onSelect(name,null,checked);
  }

  _isChecked(props){
    const { checkable, checkedItems } = this.props;
    if( !checkable ) return false;

    return checkedItems[props.children];
  }

  render() {
    const { items, positionX, positionY, show, onPress, width, height, checkable, opened, onChange , viewCount, itemsStyles, checkboxStyles} = this.props;

    if (!opened) {
      return null;
    }

    const renderedItems = React.Children.map(items, (item, index) => {

      return (
        <View style={{'flexDirection':'row'}}>
          <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
            <View>
              <Option {...item.props} height={height} checkable={checkable} checkboxStyles={checkboxStyles} onChange={ this._onChange.bind(this) } checked={ this._isChecked(item.props) } />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    });

    var itemsHeight = (viewCount > 0 ) ? height * viewCount : height * 3;

    return (
      <View style={[styles.container, itemsStyles, {height:itemsHeight}]}>
        <AnimatedScrollView
          style={{ width: width - 2, height: this.state.height }}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </AnimatedScrollView>
      </View>
    );
  }
}

Items.propTypes = {
  positionX: React.PropTypes.number,
  positionY: React.PropTypes.number,
  show: React.PropTypes.bool,
  onPress: React.PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {},
  checkable: false
};

module.exports = Items;
