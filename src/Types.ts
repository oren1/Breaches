export type Breach = {
    title: string;
    addedDate: string;
    logoPath: string;
}

export interface Dictionary {
    [index: string]: any
}

export enum Theme {
    Light = "Light",
    Dark = "Dark",
    Auto = "Auto"
}