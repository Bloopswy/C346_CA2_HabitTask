import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button,StyleSheet} from 'react-native';

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.box}>
                <Text style={styles.title}>Welcome to the Green Habit Tracker</Text>
                <Text style={styles.text}>Live Green, One Step at a Time</Text>
                <Text style={styles.text}>Track your daily habits, build a better you and help the environment!</Text>            
                <Button 
                    title='Get Started'
                    onPress={() => {navigation.navigate("Home")}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    box: {
        borderWidth: 3,
        borderColor:'',
        borderRadius:15,
        padding:30,
    },
    title: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,

    },
    text: {
        textAlign:'center',
        fontSize:15,
        marginTop: 25,
        marginBottom:20,
    },
})

export default Welcome;