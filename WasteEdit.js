import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const API_BASE_URL = "https://c346-ca2-webservice-y4j8.onrender.com/";

export default function WasteEdit({ route, navigation }) {
    const userId = route?.params?.userId;
    const habit = route?.params?.habit;

    if (!habit) {
        Alert.alert("Error", "No habit data provided");
        navigation.goBack();
        return null;
    }

    const [name, setName] = useState(habit?.name || "");
    const [completedDate, setCompletedDate] = useState(habit?.completedDate || "");
    const [loading, setLoading] = useState(false);

    const onUpdate = async () => {
        if (!userId) return Alert.alert("Error", "Missing userId");
        if (!habit?.id) return Alert.alert("Error", "Missing habit id");
        if (!name.trim()) return Alert.alert("Error", "Action name is required");

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/habits/${habit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    completedDate: completedDate.trim() || null,
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                return Alert.alert("Failed", data?.message || "Could not update action");
            }

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
                Edit Waste Action
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

            <Button
                title={loading ? "Updating..." : "Update"}
                onPress={onUpdate}
                disabled={loading}
            />
        </View>
    );
}
