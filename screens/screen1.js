import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {whileStatement} from '@babel/types';

export default class screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmail = (text) => {
    this.setState({email: text});
    console.log(this.state.email);
  };

  handlePassword = (text) => {
    this.setState({password: text});
    console.log(this.state.password);
  };

  //Alert on submit button
  Alert(title, message) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'ok',
          onPress: () => console.log(message),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  invalidateUI() {
    this.textInput1.clear();
    this.textInput2.clear();
    this.setState({
      email: '',
      password: '',
    });
  }

  //adding user to firestore
  addUser() {
    firestore()
      .collection('Users')
      .add({
        email: this.state.email,
        password: this.state.password,
      })
      .then(() => {
        this.Alert('Success', 'User Added Successfully');
        this.invalidateUI();
      });
  }

  //checking value against database
  checkUserExist() {
    if (this.state.email === '' || this.state.password === '') {
      this.Alert('Error', 'Please enter Email and Passwords');
    } else {
      firestore()
        .collection('Users')
        .where('email', '==', this.state.email)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            this.addUser();
          } else {
            this.Alert('Sorry', 'User Already Exists');
          }
        });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 150,
            }}>
            <TextInput
              style={styles.textbox}
              placeholder="Email"
              onChangeText={this.handleEmail}
              ref={(input) => {
                this.textInput1 = input;
              }}
            />
            <TextInput
              style={styles.textbox}
              placeholder="Password"
              onChangeText={this.handlePassword}
              secureTextEntry={true}
              ref={(input) => {
                this.textInput2 = input;
              }}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.checkUserExist.bind(this)}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    marginTop: -40,
  },
  textbox: {
    paddingStart: 15,
    height: 50,
    borderColor: '#5a4aae',
    borderWidth: 2,
    borderRadius: 16,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  submitButton: {
    backgroundColor: '#5a4aae',
    padding: 10,
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    height: 50,
    borderColor: '#5a4aae',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
