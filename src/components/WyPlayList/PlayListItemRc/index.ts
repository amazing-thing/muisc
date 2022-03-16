import type { App } from "vue";
import PlayListItemRc from "./index.vue";

(PlayListItemRc as any).install = (app: App) => {
  app.component(PlayListItemRc.name, PlayListItemRc);
};

export default PlayListItemRc;
