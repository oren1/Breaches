import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { Dictionary } from './Types';

/** RootStackParamList
 * maps the screen names and their params for typescript. we pass the 'RootStackParamList' as a generic type
 * to the 'createNativeStackNavigator' function.
 * This will provide type checking and intelliSense for props of the Navigator and Screen components.
 * */
export type RootStackParamList = {
  BreachesList: undefined;
  BreachDetails: Dictionary;
};

/** NativeStackScreenProps
 * let us define the screen props. it gets the param list(RootStackParamList) and the name of the specific screen.
 * and returns a type.
 */

export type BreachesListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'BreachesList'
>;

export type BreacheDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'BreachDetails'
>;
