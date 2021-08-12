import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from "vuex-module-decorators";
import store from "@/store";
import Cookies from "js-cookie";

export interface UserState {
    /** 用户令牌 */
    token: string;
}

const TOKEN_KEY = "TOKEN";

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserState {
    public token: string = Cookies.get(TOKEN_KEY) || "";

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
        Cookies.set(TOKEN_KEY, token);
    }

    @Action
    public setToken(token: string) {
        this.SET_TOKEN(token);
    }

    @Action
    public resetToken() {
        this.SET_TOKEN("");
        Cookies.remove(TOKEN_KEY);
    }
}

export const UserModule = getModule(User);
