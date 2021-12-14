export interface IColumn {
    id: keyof IUser;
    label: string;
    align?: 'left' | 'right' | 'center';
    minWidth?: number;
}

export interface IUser {
    id: any;
    name: string;
    position: number;
    birthdate: number;
    sex: 'male' | 'female';
    fired: boolean;
    colleagues?: IUser[]
}

export interface IPosition {
    id: number;
    value: string;
}