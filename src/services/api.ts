import {IPosition} from "../types/types";

async function getData<T>(fn: any, timeout: number): Promise<T> {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            const data = fn();
            resolve(data);
        }, timeout)

    });
}

export async function getPositions() {
     return  await getData<IPosition[]>(() => {
            return JSON.parse(localStorage.getItem('positions') || '[]');
        }, 1000);
}