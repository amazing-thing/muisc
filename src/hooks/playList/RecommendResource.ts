import { ref, ObjectEmitsOptions } from "vue";
import model from "../../page/home/model/index";
import { useRouter } from "vue-router";

//每日推荐歌单
type RecommendResourceType = {
  alg: string;
  createTime: number;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  playcount: number;
  trackCount: number;
  userId: number;
  type: number;
};

export default function RecommendResource(emits: any) {
  const list = ref<RecommendResourceType[]>([]);
  const router = useRouter();

  const clickBtn = () => {
    //右侧按钮
    console.log(1);
  };

  const click = (item: RecommendResourceType) => {
    //点击图片
    router.push({ name: "playlistDetail", params: { id: item.id } });
  };

  model.recommendResource().then((res: any) => {
    //数据获取
    list.value = res.data.recommend;
    list.value = list.value.slice(0, 6);
    emits("playlist");
  });

  return {
    list,
    clickBtn,
    click,
  };
}
