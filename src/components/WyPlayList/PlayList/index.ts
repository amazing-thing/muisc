import type { App } from "vue";
import PlayList from "./index.vue";

(PlayList as any).install = (app: App) => {
  app.component(PlayList.name, PlayList);
};

export default PlayList;
