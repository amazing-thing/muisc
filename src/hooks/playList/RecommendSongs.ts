import { ref } from "vue";
import model from "../../page/home/model/index";

//每日推荐歌曲
export default function RecommendSongs() {
  const list = ref([]);

  // const clickBtn = () => {
  //   //右侧按钮
  //   console.log(1);
  // };

  // const click = (item) => {
  //   //点击图片
  //   console.log(item.id);
  // };

  model.recommendSongs().then((res: any) => {
    //数据获取
    list.value = res.data.result;
    console.log(res);
  });
  return {
    list,
    // clickBtn,
    // click,
  };
}
