const Option = require('./option');
const OptionList = require('./optionList');

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const window = Dimensions.get('window');

const SELECT = 'SELECT';

const styles = StyleSheet.create({
  container: {
    borderColor: '#BDBDC1',
    borderWidth: 2 / window.scale
  }
});

class Select extends Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;

    let defaultValue = props.defaultValue;

    if (!defaultValue) {
      if (Array.isArray(props.children)) {
        defaultValue = props.children[0].props.children;
      } else {
        defaultValue = props.children.props.children;
      }
    }

    this.state = {
      value: defaultValue
    }
  }

  reset() {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  }

  _onPress() {
    const { children, onSelect, width, height, checkable } = this.props;

    if (!children.length) {
      return false;
    }

    this.refs['OPTIONLIST']._show(children, this.pageX, this.pageY, width, height, checkable, (item, value=item) => {
      if (item) {
        onSelect(value);
        this.setState({
          value: item
        });
      }
    });
  } 
  blur() {
    this.refs['OPTIONLIST']._blur();
  }
  render() {
    const { width, height, children, defaultValue, style, styleOption, styleText, checkable } = this.props;
    const dimensions = { width, height };

    return (
      <View>
        <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
          <View ref={SELECT} style={[styles.container, dimensions, style ]}>
            <Option checkable={checkable} style={ styleOption } styleText={ styleText }>{this.state.value}</Option>
          </View>
        </TouchableWithoutFeedback>
        <OptionList ref="OPTIONLIST" overlayStyles={{width:250,height:40}}/>
      </View>
    );
  }
}

Select.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  onSelect: React.PropTypes.func
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: () => { },
  checkable: false
};

module.exports = Select;
