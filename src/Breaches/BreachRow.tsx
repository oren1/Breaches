import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import FastImage from 'react-native-fast-image';

interface BreachRowProps {
  title: string;
  addedDate: string;
  logoPath: string;
  isDark: boolean;
  onPress: () => void;
}

const BreachRow = ({onPress, title, addedDate, logoPath, isDark}: BreachRowProps) => {
  const BreachView = () => {
    const color = isDark ? 'white' : 'black'
    return (
      <View>
        <View style={styles.coinRowContainer}>
        <FastImage source={{uri: logoPath}} style={styles.fastImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, {color: color}]}>{title}</Text>
          <Text style={[styles.titleText, {marginTop: 4, color: color}]}>{addedDate}</Text>
        </View>
      </View>
      <View style={[styles.line, {backgroundColor: color, opacity: isDark ? 0.3 : 0.2}]}></View>
      </View>

    );
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={isDark ? "gray" : "#DDDDDD"}
      onPress={onPress}>
      <BreachView />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  coinRowContainer: {
    margin: 8,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  fastImage: {
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    marginLeft: 14,
    width: 50,
    height: 50,
    borderRadius: 14
  },
  titleText: {
    flex: 1,
    margin: 8,
    marginBottom: 2,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
  },
  line: {
    flex:1,
    height: 1,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 10,
    backgroundColor: 'black',
    opacity: 0.1
  }
});

export default BreachRow;
