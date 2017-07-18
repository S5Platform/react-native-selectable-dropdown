import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Checkbox = require('./checkbox');

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: 'flex-start',
    justifyContent : "center",
    alignItems : "center"
  }
});

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, styleText, checkable, checkboxStyles, height, checked, onChange, index } = this.props;

    if( checkable ){
      return (
        <View style={[ styles.container, style, {'flexDirection':'row'}, {height:height}]}>
          <Checkbox style={{backgroundColor: 'white', color:'black', borderRadius: 5}} checkboxStyles={checkboxStyles} checked={checked} name={this.props.children} value={this.props.value} onChange={onChange}/>
          <Text style={ styleText }>{this.props.children}</Text>
        </View>
      );
    } else {
      return (
        <View style={[ styles.container, style, {height:height} ]}>
          <Text style={ styleText }>{this.props.children}</Text>
        </View>
      );
    }
  }
}

Option.propTypes = {
  children: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func
};

module.exports = Option;
