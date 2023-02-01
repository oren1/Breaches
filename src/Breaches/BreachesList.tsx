import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import BreachRow from './BreachRow';
import {SafeAreaView} from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {BreachesListScreenNavigationProp} from '../NavigationTypes';
import {Breach, Dictionary, Theme} from '../Types';
import {getBreaches} from '../NetworkManager';
import {NativeSyntheticEvent} from 'react-native';
import {NativeSegmentedControlIOSChangeEvent} from '@react-native-segmented-control/segmented-control';
import store from '../Store';
import {observer} from 'mobx-react-lite';
import {getObject} from '../PersistentStorage';
/**
 * navigation prop
 * the navigation prop is passed in to every screen component in the native stack navigator
 */

const BreachesList = observer(
  ({navigation}: BreachesListScreenNavigationProp) => {
    const isDeviceThemeDark = useColorScheme() === 'dark';
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [breaches, setBreaches] = useState<Breach[]>([]);

    const onThemeSelected = (theme: string) => {
      store.settingsStore.setTheme(theme);
    };

    async function executeGetBreaches() {
      const breachItems = await getBreaches(offset);
      console.log('breachItems', breachItems.items);
      setIsLoading(true);
      setBreaches(oldBreaches => [...oldBreaches, ...breachItems.items]);
      setOffset(offset + 10);
      setIsLoading(false);
    }

    useEffect(() => {
      executeGetBreaches();
      getObject('selected_breach')
      .then(breach => {
        if (breach != null) {
          navigation.navigate('BreachDetails', breach);
        }
      });
    }, []);

    let isDark = store.settingsStore.theme === Theme.Dark;
    if (store.settingsStore.theme === Theme.Auto) {
      isDark = isDeviceThemeDark;
    }

    function showDetails(index: number) {
      return () => {
        /**
         * navigating to a route/component that is defined in the navigator by giving it it's name.
         * if 'navigation.navigate' is replaced with 'navigation.push' then the same screen will be allowed to be
         * opened regardless if it was opened before.
         * */
        const breach = breaches[index];
        navigation.navigate('BreachDetails', breach);
      };
    }

    const renderItem = ({item, index}: {item: Dictionary; index: number}) => {
      return (
        <BreachRow
          title={item.Title}
          addedDate={item.BreachDate}
          logoPath={item.LogoPath}
          isDark={isDark}
          onPress={showDetails(index)}
        />
      );
    };

    return (
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 1, backgroundColor: isDark ? 'black' : 'white'}}>
        <SegmentedControl
          values={[Theme.Light, Theme.Dark, Theme.Auto]}
          selectedIndex={2}
          appearance={isDark ? 'dark' : 'light'}
          onChange={event => {
            onThemeSelected(event.nativeEvent.value);
          }}
        />
        {isLoading && offset === 0 ? (
          <ActivityIndicator
            size="large"
            style={styles.activityIndicatorFullScreen}
          />
        ) : (
          <FlatList
            data={breaches}
            renderItem={renderItem}
            keyExtractor={({title}, index) => index.toString()}
            ListFooterComponent={
              <ActivityIndicator style={styles.activityIndicatorBottom} />
            }
            onEndReachedThreshold={0}
            getItemLayout={(data, index) => ({
              length: 75,
              offset: 75 * index,
              index,
            })}
            maxToRenderPerBatch={20}
            onEndReached={() => {
              void executeGetBreaches();
            }}
          />
        )}
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  activityIndicatorFullScreen: {
    flex: 1,
  },
  activityIndicatorBottom: {
    height: 40,
    // paddingBottom: 30,
  },
});

export default BreachesList;
