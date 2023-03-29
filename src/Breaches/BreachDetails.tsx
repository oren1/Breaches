import React, {useEffect, useCallback} from 'react';
import {View, ScrollView, Text, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BreacheDetailsScreenNavigationProp} from '../NavigationTypes';
import {Theme} from '../Types';
import store from '../Store';
import {observer} from 'mobx-react-lite';
import {storeObject, removeData} from '../PersistentStorage';
import {useFocusEffect} from '@react-navigation/native';
/**
 * navigation prop
 * the navigation prop is passed in to every screen component in the native stack navigator
 */

const BreachDetails = observer(
  ({navigation, route}: BreacheDetailsScreenNavigationProp) => {
    let {
      Domain: domain,
      PwnCount: pwnCount,
      Description: description,
      DataClasses: dataClasses,
    } = route.params;
    const isDeviceThemeDark = useColorScheme() === 'dark';

    let isDark = store.settingsStore.theme === Theme.Dark;
    if (store.settingsStore.theme === Theme.Auto) {
      isDark = isDeviceThemeDark;
    }
    const textColor = isDark ? 'white' : 'black';

    const SpreadText = ({
      leftText,
      rightText,
    }: {
      leftText: string;
      rightText: string;
    }) => {
      return (
        <View style={styles.spreadTextView}>
          <Text style={[styles.spreadText, {color: textColor}]}>
            {leftText}
          </Text>
          <Text style={[styles.spreadText, {color: textColor}]}>
            {rightText}
          </Text>
        </View>
      );
    };
    
    useFocusEffect(
      useCallback(() => {
        // Do something when the screen is focused
        storeObject('selected_breach', route.params);

        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
          removeData('selected_breach');
        };
      }, []),
    );

    useEffect(() => {}, []);

    return (
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 1, backgroundColor: isDark ? 'black' : 'white'}}>
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: isDark ? 'black' : 'white'},
          ]}>
          <Text style={[styles.title, {color: textColor}]}>{domain}</Text>
          <Text style={[styles.description, {color: textColor}]}>
            {description}
          </Text>
          <SpreadText leftText={'PwnCount'} rightText={pwnCount}></SpreadText>
        </ScrollView>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 32,
  },
  description: {
    margin: 18,
    alignSelf: 'center',
    fontSize: 22,
  },
  spreadTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spreadText: {
    marginHorizontal: 18,
    fontSize: 22,
  },
});

export default BreachDetails;
