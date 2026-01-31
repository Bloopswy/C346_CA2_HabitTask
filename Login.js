import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!userId.trim()) {
            Alert.alert('Error', 'Please enter your User ID');
            return;
        }

        setLoading(true);
        
        try {
            // Check if user exists by fetching their trackers
            const response = await fetch(`https://c346-ca2-webservice-y4j8.onrender.com/trackers/${userId.trim()}`);
            
            if (response.ok) {
                const data = await response.json();
                
                // User exists, navigate to Home with userId
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('Home', { userId: userId.trim() });
            } else {
                Alert.alert('Error', 'User ID not found. Please check your ID or register.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.box}>
                <Text style={styles.title}>Login</Text>
                
                <Text>User ID:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your User ID"
                    value={userId}
                    onChangeText={setUserId}
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Button
                    title={loading ? "Verifying..." : "Login"}
                    onPress={handleLogin}
                    disabled={loading}
                />

                <Button
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                    disabled={loading}
                />

                <Button
                    title="Back"
                    onPress={() => navigation.navigate('Welcome')}
                    disabled={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    box: {
        borderWidth: 3,
        borderColor: '',
        borderRadius: 15,
        padding: 30,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '',
        borderRadius: 15,
        padding: 30,
        marginBottom: 15,
    },
});

export default Login;