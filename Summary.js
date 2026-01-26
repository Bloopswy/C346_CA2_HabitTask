import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Button, Alert } from "react-native";

const API_BASE_URL = "https://YOUR-RENDER-URL.onrender.com";

export default function Summary({ route, navigation }) {
    const userId = route?.params?.userId;
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        if (!userId) return Alert.alert("Error", "Missing userId");

        setLoading(true);
        try {
            // Preferred: one endpoint
            const res = await fetch(`${API_BASE_URL}/habits/all?userId=${encodeURIComponent(userId)}`);
            const data = await res.json().catch(() => ([]));

            if (!res.ok) {
                Alert.alert("Failed", data?.message || "Could not load summary");
                return;
            }

            setHabits(Array.isArray(data) ? data : []);
        } catch (e) {
            Alert.alert("Error", e?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const stats = useMemo(() => {
        const total = habits.length;
        const isCompleted = (h) => !!(h?.completedDate && String(h.completedDate).trim());

        const completed = habits.filter(isCompleted).length;

        const completedByCategory = {
            Energy: habits.filter((h) => h.category === "Energy" && isCompleted(h)).length,
            Waste: habits.filter((h) => h.category === "Waste" && isCompleted(h)).length,
            Transport: habits.filter((h) => h.category === "Transport" && isCompleted(h)).length,
        };

        return { total, completed, completedByCategory };
    }, [habits]);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                Summary
            </Text>

            <Text>Total actions: {stats.total}</Text>
            <Text>Completed actions: {stats.completed}</Text>

            <View style={{ height: 10 }} />

            <Text>Completed by category:</Text>
            <Text>• Energy: {stats.completedByCategory.Energy}</Text>
            <Text>• Waste: {stats.completedByCategory.Waste}</Text>
            <Text>• Transport: {stats.completedByCategory.Transport}</Text>

            <View style={{ height: 12 }} />
            <Button title={loading ? "Refreshing..." : "Refresh"} onPress={fetchAll} disabled={loading} />

            <View style={{ height: 12 }} />
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
    );
}
