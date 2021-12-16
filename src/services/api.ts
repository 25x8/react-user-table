import {IPosition, IUser} from "../types/types";

async function getData<T>(fn: any, timeout: number): Promise<T> {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            const data = fn();
            resolve(data);
        }, timeout)

    });
}

export async function getPositions(): Promise<IPosition[]> {
     return  await getData<IPosition[]>(() => {
            return JSON.parse(localStorage.getItem('positions') || '[]');
        }, 1000);
}

export async function getUsers(): Promise<IUser[]> {
    return await getData<IUser[]>(() =>{
            return JSON.parse(localStorage.getItem('users') || '[]');
    }, 1000)
}