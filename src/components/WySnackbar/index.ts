import type { App } from "vue";
import WySnackbar from "./index.vue";

(WySnackbar as any).install = (app: App) => {
  app.component(WySnackbar.name, WySnackbar);
};

export default WySnackbar;
