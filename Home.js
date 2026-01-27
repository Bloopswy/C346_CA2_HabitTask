import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SectionList, Button, TextInput, TouchableOpacity } from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);

    const myurl = "https://c346-ca2-webservice-y4j8.onrender.com/alltrackers"

    useEffect(() => {
        fetch(myurl)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            // Group data by category for SectionList
            const groupedData = groupByCategory(myJson);
            setMyData(groupedData);
            originalData = myJson;
        })
    }, []);

    // Group habits by category
    const groupByCategory = (data) => {
        const categories = {};
        
        data.forEach(item => {
            const category = item.category || 'Other';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(item);
        });

        // Convert to SectionList format
        return Object.keys(categories).map(category => ({
            title: category,
            data: categories[category]
        }));
    };

    // Filter by habit name OR category
    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase()) ||
                item.category.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(groupByCategory(myFilteredData));
        } else {
            setMyData(groupByCategory(originalData));
        }
    };

    // Navigate to the correct edit page based on category
    const navigateToEditPage = (item) => {
        const category = item.category.toLowerCase();
        
        // Map categories to their respective Edit page names
        const categoryPageMap = {
            'energy': 'EnergyEdit',
            'transport': 'TransportEdit',
            'waste': 'WasteEdit',
        };

        const pageName = categoryPageMap[category] || 'EnergyEdit'; // Default to 'EnergyEdit' if category not found
        
        navigation.navigate(pageName, {
            id: item.id,
            name: item.name,
            category: item.category,
            // Add on more habit details
        });
    };

    // Navigate to the correct add page based on selected category
    const navigateToAddPage = (category) => {
        // Map categories to their respective Add page names
        const categoryAddPageMap = {
            'energy': 'EnergyAdd',
            'transport': 'TransportAdd',
            'waste': 'WasteAdd',
        };

        const pageName = categoryAddPageMap[category.toLowerCase()] || 'EnergyAdd'; // Default to 'EnergyAdd'
        navigation.navigate(pageName);
    };

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateToEditPage(item);
                }}
            >
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.category}</Text>
                    {/* add on items to render when tables updated */}
                </View>
            </TouchableOpacity>
        );
    };

    // Render section header with category name and Add button
    const renderSectionHeader = ({section: {title}}) => (
        <View>
            <Text>{title}</Text>
            <Button 
                title={`Add ${title} Habit`}
                onPress={() => navigateToAddPage(title)}
            />
        </View>
    );

    return (
        <View>
            <StatusBar translucent={false}/>
            <Text>Habit Tracker</Text>
            
            <Text>Search:</Text>
            <TextInput 
                placeholder="Search by habit name or category..."
                onChangeText={(text) => {FilterData(text)}}
            />
            
            <SectionList 
                sections={myData} 
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            />
        </View>
    );
};

export default Home;