import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button} from 'react-native';

const Welcome = ({navigation}) => {
    return (
        <View>
            <StatusBar translucent={false}/>
            <Text>Welcome to the Green Habit Tracker</Text>
            <Text>Track your daily habits, build a better you and help the environment!</Text>

            <Text>Description</Text>
            
            <Button 
                title='Get Started' 
                onPress={() => {navigation.navigate("Home")}}
            />
        </View>
    );
};

export default Welcome;