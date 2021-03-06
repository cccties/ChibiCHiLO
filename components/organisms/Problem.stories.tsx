export default { title: "organisms/Problem" };

import Link from "@material-ui/core/Link";
import Problem from "./Problem";

export const Default = () => (
  <Problem title="ブックが存在していません">
    担当教員にお問い合わせください。
    <p>
      <Link href="#">LMSに戻る</Link>
    </p>
  </Problem>
);

import UnlinkedProblem from "./UnlinkedProblem";
export const Unlinked = UnlinkedProblem;

import BookNotFoundProblem from "./BookNotFoundProblem";
export const BookNotFound = BookNotFoundProblem;

import TopicNotFoundProblem from "./TopicNotFoundProblem";
export const TopicNotFound = TopicNotFoundProblem;

import EmbedProblem from "./EmbedProblem";
export const Embed = EmbedProblem;
