const Option = require('./option');
const OptionList = require('./optionList');
import _ from 'underscore';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text
} from 'react-native';

import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs';

const window = Dimensions.get('window');

const SELECT = 'SELECT';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent : "center",
    alignItems: 'flex-start',
  },
  optionContainer: {
    alignSelf: 'flex-start',
    justifyContent : "center",
    alignItems : "center"
  }
});

class Select extends Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;

    let defaultValue = props.defaultValue;
    let checkedItems = props.defaultCheckedItems;

    let checkedKeys = [];

    if (!defaultValue) {
      if (Array.isArray(props.children)) {
        defaultValue = props.children[0].props.children;

      } else {
        defaultValue = props.children.props.children;
      }
    }

    if( checkedItems ){
      for( var inx in props.children ){
        var value = props.children[inx].props.children;
        if( checkedItems.indexOf( value ) > - 1 ){
          checkedKeys.push( props.children[inx].props.value || props.children[inx].props.children );
        }
      }
    } else {
      checkedItems = []; 
    }

    this.state = {
      value: defaultValue,
      opened: false,
      checkedKeys:checkedKeys,
      checkedItems:checkedItems,
      checkedKeys:checkedKeys
    }

    this._renderIcon = this._renderIcon.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }

  componentDidMount() {

    const { children, onSelect, width, height, checkable, viewCount, defaultValue, emptyMessage } = this.props;

    this.refs['OPTIONLIST']._init(children, this.pageX, this.pageY, width, height, checkable, viewCount, (item, value=item, checked) => {

      var checkedItems = this.state.checkedItems;
      var checkedKeys = this.state.checkedKeys;

      if (item) {
        var val = item;
        if( checkable ){
          const { onSelect } = this.props;
          if( checked ){
            if( checkedItems.indexOf( item ) < 0 ){
              checkedItems.push( item );
            }

            if( checkedKeys.indexOf( value ) < 0 ){
              checkedKeys.push( value );
            }
          } else {
            if( checkedItems.indexOf( item ) > -1 ){
              checkedItems.splice( checkedItems.indexOf( item ), 1 );

            }

            if( checkedKeys.indexOf( value ) > -1 ){
               checkedKeys.splice( checkedKeys.indexOf( value ), 1 );
            }            
          }

          val = checkedItems.join(",");
          if( val == "" ) val = emptyMessage;
          onSelect(item, value, checkedItems, checkedKeys );
        } else {

          this.setState({
            opened: false
          });

          onSelect(item, value);
        }

        this.setState({
          value: val,
          checkedItems:checkedItems,
          checkedKeys:checkedKeys
        });
      }
    });
  }

  _renderIcon(){
    const { opened} = this.state;
    const { checkboxStyles, width, height } = this.props;

    var topMargin = height / 4;

    var leftMargin = width - ( height );

    var iconColor = (checkboxStyles && checkboxStyles.color ) ? checkboxStyles.color : "black";

    if( opened ){
      return (
        <View style={{'position':'absolute', 'top': topMargin,'left':leftMargin}}>
          <TouchableWithoutFeedback onPress={this._onToggle} >
            <View style={{justifyContent: 'center', alignSelf: 'center' }}>
              <SvgIcon name="chevron-up" height={height/2} width={height/2} stroke={iconColor} svgs={svgs} strokeWidth={2} fill={"transparent"}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    } else {
      return (
        <View style={{'position':'absolute', 'top': topMargin,'left':leftMargin}}>
          <TouchableWithoutFeedback onPress={this._onToggle} >
            <View style={{justifyContent: 'center', alignSelf: 'center' }}>
              <SvgIcon name="chevron-down" height={height/2} width={height/2} stroke={iconColor} svgs={svgs} strokeWidth={2} fill={"transparent"}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  reset() {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
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

  _renderLeftIcon =()=> {
    if( this.props.renderLeftIcon ){
      return this.props.renderLeftIcon();
    }
  }

  blur() {
    this.refs['OPTIONLIST']._blur();
  }

  render() {
    const { width, height, children, defaultValue, style, checkboxStyles, optionStyles, overlayStyles, itemsStyles, styleText, checkable, renderFooter } = this.props;
    const dimensions = { width, height };
    const { opened, checkedItems } = this.state;

    var marginLeft = 0;
    var backgroundColor = "white";
    if( style !== undefined ){
      marginLeft = style.marginLeft;
      backgroundColor = style.backgroundColor;
    }

    var twidth =  width - marginLeft;

    var mergeStyle = {};
    _.extend(mergeStyle, overlayStyles );
    _.extend(mergeStyle, dimensions );

    var mergeOptionStyle = {};
    _.extend(mergeOptionStyle, {backgroundColor:backgroundColor} );

    if( checkable ) {
      return (
        <View>
          <View style={{'position':'absolute'}}>
           {this._renderLeftIcon()}
          </View>
          <View ref={SELECT} style={[styles.container, {width:twidth,height:height}, style ]}>
            <View style={[styles.optionContainer,mergeOptionStyle]}>
              <Text style={ styleText }>{this.state.value}</Text>
            </View>
          </View>
          <OptionList ref="OPTIONLIST" 
            styleText={styleText}
            height={height} opened={opened} checkable={checkable} overlayStyles={mergeStyle} itemsStyles={itemsStyles} checkboxStyles={checkboxStyles} checkedItems={checkedItems}
            renderFooter={renderFooter}
          />
          {this._renderIcon()}
        </View>
      );
    } else {
      return (
        <View>
          <View ref={SELECT} style={[styles.container, dimensions, style ]}>
            <View style={[styles.optionContainer,optionStyles]}>
              <Text style={ styleText }>{this.state.value}</Text>
            </View>
          </View>
          <OptionList ref="OPTIONLIST" height={height}  opened={opened} checkable={checkable} overlayStyles={mergeStyle} itemsStyles={itemsStyles} 
            styleText={styleText}
            renderFooter={renderFooter}
          />
          {this._renderIcon()}
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
