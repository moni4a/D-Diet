import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/components/navigators/MainNavigator";
import DoctorNavigator from './src/components/navigators/DoctorMainNavigator';
import { RoleProvider, RoleContext } from './src/provider/RoleProvider';
import LoginNavigator from "./src/components/navigators/LoginNavigator";

export default function App() {
  return (
    <RoleProvider>
      <RoleContext.Consumer>
        {({ user }) => {
          const role = user.role;
          if (!!role)
            return (
              <NavigationContainer>
                {
                  !!role && role === 'PATIENT'
                    ? <MainNavigator />
                    : !!role && role === 'DOCTOR'
                      ? <DoctorNavigator />
                      : null
                }
              </NavigationContainer>
            )
          else
            return (
              <NavigationContainer>
                <LoginNavigator />
              </NavigationContainer>
            )
        }}
      </RoleContext.Consumer>
    </RoleProvider>
  );
}