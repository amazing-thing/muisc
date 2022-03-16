import type { App } from "vue";
import Row from "./index.vue";

(Row as any).install = (app: App) => {
  app.component(Row.name, Row);
};

export default Row;
