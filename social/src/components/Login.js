//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../actions';
import Colors from '../constants/Colors';


// create a component
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            this.props.navigation.navigate('Home')
        }
    }

    showErrorMessage() {
        if (this.props.error) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <Text style={{ color: Colors.redColor, fontSize: 16 }}>{this.props.error}</Text>
                </View>
            );
        }
    }

    onLogin() {
        const  { email, password } = this.state;
        this.props.login({ email, password });
    }

    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput 
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus
                    keyboardType='email-address'
                    onChangeText={(email) => this.setState({ email })}
                />

                <FormLabel>Password</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry
                    onChangeText={(password) => this.setState({ password })}
                />
                
                {this.showErrorMessage()}

                <Button 
                    title='Login'
                    backgroundColor={Colors.blue}
                    buttonStyle={{ marginTop: 20 }}
                    disabled={this.props.loading}
                    onPress={this.onLogin.bind(this)}
                />

                <Button
                    title='No Account ? Sign up now'
                    backgroundColor={Colors.redColor}
                    buttonStyle={{ marginTop: 30 }}
                    onPress={() => this.props.navigation.navigate('Signup')}
                    disabled={this.props.loading}
                />
            </View>
        );
    }
}



const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        profile: state.auth.profile,
    }
};
//make this component available to the app
export default connect(mapStateToProps, { login })(Login);