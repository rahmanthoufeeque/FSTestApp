import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class screen2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    const pd = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text>2nd Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
