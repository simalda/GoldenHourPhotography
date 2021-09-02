import * as proxy from "./proxy";
import history from "./history";

export function performLogin(user, password) {
  return proxy.checkUser(user, password).then((loginResponse) => {
    if (loginResponse) {
      history.push("/");
      let state = globalState.LocateState();
      state.setUser(this.state.user);
      Promise.resolve();
    } else {
      Promise.reject();
    }
  });
}
