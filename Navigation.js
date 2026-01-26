import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from "./Welcome.js";
import Home from "./Home.js";
import Add from "./Add.js";
import Summary from "./Summary.js";
import Energy from "./Energy.js";
import EnergyAdd from "./EnergyAdd.js";
import EnergyEdit from "./EnergyEdit.js";
import Transport from "./Transport.js";
import TransportAdd from "./TransportAdd.js";
import TransportEdit from "./TransportEdit.js";
import Waste from "./Waste.js";
import WasteEdit from "./WasteEdit.js";
import WasteAdd from "./WasteAdd.js";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Add' component={Add} />
                <Stack.Screen name='Welcome' component={Welcome} />
                <Stack.Screen name='Summary' component={Summary} />
                <Stack.Screen name='Energy' component={Energy} />
                <Stack.Screen name='EnergyAdd' component={EnergyAdd} />
                <Stack.Screen name='EnergyEdit' component={EnergyEdit} />
                <Stack.Screen name='Transport' component={Transport} />
                <Stack.Screen name='TransportAdd' component={TransportAdd} />
                <Stack.Screen name='TransportEdit' component={TransportEdit} />
                <Stack.Screen name='Waste' component={Waste} />
                <Stack.Screen name='WasteAdd' component={WasteAdd} />
                <Stack.Screen name='WasteEdit' component={WasteEdit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;