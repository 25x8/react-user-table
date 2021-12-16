import {makeAutoObservable} from "mobx";
import {IPosition} from "../types/types";
import {getPositions} from "../services/api";

class Positions {

    isLoading: boolean = false;
    list: IPosition[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    *getPositions() {
        this.isLoading = true;
        const response: IPosition[] = yield getPositions();
        this.list = response;
        this.isLoading = false;
    }
}

export const positionsStore = new Positions();