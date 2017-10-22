import { Injectable } from '@angular/core';

@Injectable()
export class PersistentAPI {
    lStorage = window.localStorage;
    checkAPI () {
        if (this.lStorage !== undefined) {
            return true;
        }
        return false;
    }
    getSessionToken() {
        return this.lStorage.getItem('token');
    }
    setSessionToken(token: string) {
        this.lStorage.setItem('token', token);
    }
    removeSessionToken() {
        console.log("calling me");
        this.lStorage.token = undefined;
    }
};
