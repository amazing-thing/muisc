import type { App } from "vue";
import WyComment from "./index.vue";

(WyComment as any).install = (app: App) => {
  app.component(WyComment.name, WyComment);
};

export default WyComment;
