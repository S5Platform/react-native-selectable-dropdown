import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs';

import _ from 'underscore';

var BACKGROUND_COLOR, BORDER_RADIUS, BORDER_WIDTH, COLOR, MARGIN, SIZE;

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#FFF',
      borderRadius: 0,
      borderWidth: 2,
      checked: this.props.checked,
      color: '#000',
      margin: 2,
      name: '',
      onChange: null,
      size: 20
    };
  }

  componentDidMount() {
    this.setState( {...this.state,'color':this.props.checkboxStyles.color} );
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ checked: nextProps.checked});
  }
  
  render() {
    BACKGROUND_COLOR = this.state.backgroundColor;
    BORDER_RADIUS = this.state.borderRadius;
    BORDER_WIDTH = this.state.borderWidth;
    COLOR = this.state.color;
    MARGIN = this.state.margin;
    SIZE = this.state.size;

    return (
      <TouchableHighlight underlayColor='transparent'
        onPress={() => { this._toggleCheck() }}
        style={{backgroundColor: BACKGROUND_COLOR, borderColor: COLOR,
            borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH,
            height: SIZE, margin: MARGIN, width: SIZE }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          { this.state.checked &&
          <SvgIcon name="checkbox-checked" height={SIZE - 5} width={SIZE - 5} stroke={COLOR} svgs={svgs} strokeWidth={SIZE/10} fill={"transparent"}/>
          }
        </View>
      </TouchableHighlight>
    );
  }

  _toggleCheck() {
    var checked = !this.state.checked;
    this.setState({ checked: checked });
    this.props.onChange && this.props.onChange(this.props.name, checked);
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
}

module.exports = Checkbox;