import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const API_BASE_URL = "https://c346-ca2-webservice-y4j8.onrender.com/";
const CATEGORY = "Energy";

export default function EnergyAdd({ route, navigation }) {
    const userId = route?.params?.userId;
    const [name, setName] = useState("");
    const [completedDate, setCompletedDate] = useState(""); // "YYYY-MM-DD" or empty
    const [loading, setLoading] = useState(false);

    const onSave = async () => {
        if (!userId) return Alert.alert("Error", "Missing userId");
        if (!name.trim()) return Alert.alert("Error", "Action name is required");

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/habits`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    category: CATEGORY,
                    name: name.trim(),
                    completedDate: completedDate.trim() || null,
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) return Alert.alert("Failed", data?.message || "Could not add action");

            // Go back to list screen (group mate handles list refresh)
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", e?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                Add Energy Action
            </Text>

            <TextInput
                placeholder="Action name"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />

            <TextInput
                placeholder="Completed Date (YYYY-MM-DD) or leave blank"
                value={completedDate}
                onChangeText={setCompletedDate}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />

            <Button title={loading ? "Saving..." : "Save"} onPress={onSave} disabled={loading} />
        </View>
    );
}
