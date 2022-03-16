import type { App } from 'vue';
import PlayListNew from './index.vue'

(PlayListNew as any).install = (app: App) => {
    app.component(PlayListNew.name, PlayListNew);
}

export default PlayListNew;
