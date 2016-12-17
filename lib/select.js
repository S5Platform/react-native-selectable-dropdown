const Option = require('./option');
const OptionList = require('./optionList');
import _ from 'underscore';

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

  componentDidMount() {

    const { children, onSelect, width, height, checkable, viewCount } = this.props;

    if( checkable ){
      this.refs['OPTIONLIST']._show(children, this.pageX, this.pageY, width, height, checkable, viewCount, (item, value=item) => {
        
        if (item) {
          onSelect(value);
          this.setState({
            value: item
          });
        }
      });
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
    const { width, height, children, defaultValue, style, checkboxStyles, optionStyles, overlayStyles, itemsStyles, styleText, checkable, onSelect } = this.props;
    const dimensions = { width, height };

    var mergeStyle = {};
    _.extend(mergeStyle, overlayStyles );
    _.extend(mergeStyle, {width:width,height:height} );

    if( checkable ) {
      return (
        <View>
          <OptionList ref="OPTIONLIST" checkable={checkable} overlayStyles={mergeStyle} itemsStyles={itemsStyles} checkboxStyles={checkboxStyles} onSelect={onSelect}/>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
            <View ref={SELECT} style={[styles.container, dimensions, style ]}>
              <Option checkable={checkable} style={ optionStyles } styleText={ styleText }>{this.state.value}</Option>
            </View>
          </TouchableWithoutFeedback>
          <OptionList ref="OPTIONLIST" overlayStyles={mergeStyle}/>
        </View>
      );      
    }
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
