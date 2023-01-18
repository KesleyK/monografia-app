import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import config from "./config/bottomTabNavigator";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator(props) {
    function getScreenOptions(screen) {
        const options = {
            ...screen.options,
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={screen.icon} color={color} size={size} />
        };

        if (screen.hidden) {
            options.tabBarStyle = { display: "none" };
        }

        return options;
    }

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={config.navigator.screenOptions}>
            {config.screens.map((screen) => (
                <Tab.Screen
                    key={screen.name}
                    options={getScreenOptions(screen)}
                    name={screen.name}
                    component={screen.component}
                    initialParams={props.route.params}
                />
            ))}
        </Tab.Navigator>
    );
}
