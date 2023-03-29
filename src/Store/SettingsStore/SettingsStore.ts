import {makeAutoObservable} from 'mobx';
import { Theme } from '../../Types';
import {
    useColorScheme,
  } from 'react-native';
export default class SettingsStore {
    theme = "Auto"
    constructor() {
      makeAutoObservable(this);
    }

    setTheme(theme: string) {
        this.theme = theme
    }
    
}

  