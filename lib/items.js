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
  scrollView: {
    height: 120,
    width: 198 //TODO: this needs to be dynamic
  },
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
      height : new Animated.Value(0),
      checkedList : {}
    };

    this._renderCloseButton = this._renderCloseButton.bind(this)
  }

  componentDidMount() {
    const { height } = this.props;

    Animated.timing(this.state.height, {
      toValue: height * 3,
      duration: 200,
      easing :  Easing.linear
    }).start();
  }

  _onChange(name, checked){
    var checkedList = this.state.checkedList;
    checkedList[name]=checked;
    this.setState( {...this.state,'checkedList':checkedList} );
  }

  _isChecked(props){
    return this.state.checkedList[props.children];
  }

  _renderCloseButton(index){

    const { height } = this.props;

    if(index==0){
      return (
        <View style={{margin: 5, 'flex':0.1, alignItems: 'flex-end', justifyContent: 'center', alignSelf: 'center' }}>
          <Icon name='chevron-up' size={ height / 2 } color='black'/>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    const { items, positionX, positionY, show, onPress, width, height, checkable, onChange } = this.props;

    if (!show) {
      return null;
    }

    const renderedItems = React.Children.map(items, (item, index) => {

      return (
        <View style={{'flexDirection':'row'}}>
          <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
            <View>
              <Option {...item.props} checkable={checkable} onChange={ this._onChange.bind(this) } checked={ this._isChecked(item.props) } />
            </View>
          </TouchableWithoutFeedback>
          {this._renderCloseButton(index)}
        </View>
      );
    });

    return (
      <View style={[styles.container]}>
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
