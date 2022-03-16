import { banner } from "./banner";
import {
  searchDefault,
  searchHotDetail,
  search,
  searchSuggest,
  searcMultimatch,
  searcCloudsearch,
} from "./header";
import { recommendSongs } from "./list";
import {
  recommendResource,
  personalized,
  personalizedSongs,
  playlistDetail,
  playlistTrackAll,
  relatedPlaylist,
  commentPlaylist,
  comment,
  commentFloor,
  commentLike,
} from "./playlist";

const model = {
  banner,
  searchDefault,
  recommendResource,
  recommendSongs,
  personalized,
  personalizedSongs,
  searchHotDetail,
  search,
  searchSuggest,
  searcMultimatch,
  searcCloudsearch,
  playlistDetail,
  playlistTrackAll,
  relatedPlaylist,
  commentPlaylist,
  comment,
  commentFloor,
  commentLike,
};

export default model;
