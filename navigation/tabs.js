import React from "react";
import {  Text, Platform,  View } from 'react-native';
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/";
import { icons, COLORS } from "../constants";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "8%",
                    backgroundColor: COLORS.lightBlue
                },

                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Homes":
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Image
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                                <Text style={{fontSize: 4, color: "#FFFFFF"}}>Home</Text>
                          </View>
                            
                            )

                    }
                }
            })}
        >
            <Tab.Screen
                name="Homes"
                component={Home}
            />
          
        </Tab.Navigator>
    )
}

export default Tabs;