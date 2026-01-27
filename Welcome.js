import React,{useState} from 'react';
import { StatusBar, Text,  View,  StyleSheet, TouchableOpacity} from 'react-native';

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Live Green, One Step at a Time</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}
export default Welcome;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "blue"
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius:3
    }
})