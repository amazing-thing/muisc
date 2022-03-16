import { ref, defineEmits } from "vue";
import model from "../../page/home/model/index";
import { useRouter } from "vue-router";

//推荐歌单
type PersonalizedType = {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number;
};

export default function Personalized(emits: any) {
  const list = ref<PersonalizedType[]>([]);
  const router = useRouter();

  const clickBtn = () => {
    //右侧按钮
    console.log(1);
    router.push({ name: "" });
  };

  const click = (item: PersonalizedType) => {
    //点击图片
    router.push({ name: "playlistDetail", params: { id: item.id } });
  };

  model.personalized("6").then((res: any) => {
    //数据获取
    list.value = res.data.result;
    emits("playlist");
  });

  return {
    list,
    clickBtn,
    click,
  };
}
