import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Feed} from './src/screens/feed';
import {NewsDetails} from './src/screens/NewsDetails';
import {HomeScreen} from './src/screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const HomeStack = createSharedElementStackNavigator();
const ArticleStack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigation = () => {
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Top Headlines" component={HomeScreen} />
        <HomeStack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
            headerShown: false,
          }}
        />
      </HomeStack.Navigator>
    );
  }
  function ArticleStackScreen() {
    return (
      <ArticleStack.Navigator>
        <ArticleStack.Screen name="Articles" component={Feed} />
        <ArticleStack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
            headerShown: false,
          }}
        />
      </ArticleStack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Feed" component={ArticleStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
