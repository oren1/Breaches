import SettingsStore from "./SettingsStore/SettingsStore";
export class Store {
    settingsStore: SettingsStore;
  
    constructor() {
      this.settingsStore = new SettingsStore();
    }
  }
  
  export default new Store();
  