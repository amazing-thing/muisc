import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      snackbarShow: false,
      snackbarTitle: "",
      uid: 0,
    };
  },
  mutations: {
    showSnackbar(state: any, payload?: string) {
      let timer: any = null;
      state.snackbarShow = true;
      state.snackbarTitle = payload;
      timer = setTimeout(() => {
        store.commit("hideSnackbar");
        clearTimeout(timer);
      }, 2000);
    },
    hideSnackbar(state: any) {
      state.snackbarShow = false;
    },
    configUserId(state: any, payload: string) {
      state.uid = payload;
    },
  },
});

export default store;
