import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const API_BASE_URL = "https://YOUR-RENDER-URL.onrender.com";

export default function Welcome({ navigation }) {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!username.trim()) return "Username is required";
        if (password.length < 4) return "Password must be at least 4 characters";
        return null;
    };

    const onSubmit = async message => {
        const err = validate();
        if (err) {
            Alert.alert("Error", err);
            return;
        }

        setLoading(true);
        try {
            const endpoint = mode === "login" ? "/login" : "/register";

            const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                Alert.alert("Failed", data?.message || "Something went wrong");
                return;
            }

            // For register: backend may return { userId } OR might require login after register.
            // If register doesn't return userId, we auto-switch to login.
            if (mode === "register" && !data?.userId) {
                Alert.alert("Success", "Account created! Please login.");
                setMode("login");
                return;
            }

            const userId = data?.userId;
            if (!userId) {
                Alert.alert("Error", "Login succeeded but no userId returned.");
                return;
            }

            // Here we just navigate and pass userId.
            navigation.navigate("Home", { userId });
        } catch (e) {
            Alert.alert("Error", e?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                Sustainability App
            </Text>

            <Text style={{ marginBottom: 10 }}>
                {mode === "login" ? "Login" : "Register"}
            </Text>

            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />

            <Button
                title={loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
                onPress={onSubmit}
                disabled={loading}
            />

            <View style={{ height: 12 }} />

            <Button
                title={mode === "login" ? "New user? Register" : "Have an account? Login"}
                onPress={() => setMode(mode === "login" ? "register" : "login")}
                disabled={loading}
            />
        </View>
    );
}
