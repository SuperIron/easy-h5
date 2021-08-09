import {
    VuexModule,
    Module,
    Mutation,
    getModule,
    Action
} from "vuex-module-decorators";
import store from "@/store";

export interface AppState {}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements AppState {}

export const AppModule = getModule(App);
