import {makeAutoObservable} from "mobx";


class Users {

    users = [];

    constructor() {
        makeAutoObservable(this);
    }
}