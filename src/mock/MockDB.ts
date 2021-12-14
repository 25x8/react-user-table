import {IUser, IPosition} from "../types/types";

const users: IUser[] = [
    {
        id: 1,
        name: 'Иванов Иван Иваныч',
        position: 1,
        birthdate: new Date(1992, 6, 7).getMilliseconds(),
        sex: 'male',
        fired: false
    },
    {
        id: 2,
        name: 'Петров Петр Петрович',
        position: 2,
        birthdate: new Date(2002, 11, 19).getMilliseconds(),
        sex: 'male',
        fired: false
    },
];

const positions: IPosition[] = [
    {
        id: 1,
        value: 'HR'
    },
    {
        id: 2,
        value: 'Разработчик'
    },
    {
        id: 3,
        value: 'Генеральный'
    }
];

class MockDB {

    constructor() {
        console.log('mock init')
    }

    public initDB() {
        const usersExist = localStorage.getItem('users');
        const positionsExist = localStorage.getItem('positions');

        !usersExist && this._seedUsers();
        !positionsExist && this._seedPositions();

    }

    private _seedUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    private _seedPositions() {
        localStorage.setItem('positions', JSON.stringify(positions));
    }
}

export default new MockDB();

