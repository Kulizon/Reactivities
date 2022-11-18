import { makeAutoObservable } from "mobx";

export default class CommonStore {
  serverErrorStackTrace: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError = (err: string) => {
    this.serverErrorStackTrace = err;
  };
}
