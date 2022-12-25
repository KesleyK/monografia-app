import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import config from "./config/bottomTabNavigator";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={config.navigator.screenOptions}>
            {config.screens.map((screen) => (
                <Tab.Screen
                    key={screen.name}
                    options={{
                        ...screen.options,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name={screen.icon} color={color} size={size} />
                        )
                    }}
                    name={screen.name}
                    component={screen.component}
                />
            ))}
        </Tab.Navigator>
    );
}
