import outdent from "outdent";
import resource from "./resource";
import user from "./user";

const topic = {
  id: 1,
  resourceId: 1,
  name: "リンゴに夢中のレッサーパンダ",
  description: outdent`円山動物園のレッサーパンダ

  2行目

  空行挟んで 4 行目

  空行 2 つ挟んで 7 行目

  半角空白文字だけの行を挟んで 9 行目

  　　　　

  全角空白文字だけの行を挟んで 11 行目

  実体参照テスト: &nbsp; てすと`,
  timeRequired: 60,
  createdAt: new Date(),
  updatedAt: new Date(),
  details: {},
  creator: user,
  shared: true,
  language: "ja",
  license: "",
  resource,
};

export default topic;
