import IconButton from "@material-ui/core/IconButton";
import TreeItem from "@material-ui/lab/TreeItem";
// TODO: ブック単位でのインポートの実装
// import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import PublicIcon from "@material-ui/icons/Public";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import CourseChip from "$atoms/CourseChip";
import BookChildrenTree from "$molecules/BookChildrenTree";
import useTreeItemStyle from "$styles/treeItem";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { gray } from "$theme/colors";

const useStyles = makeStyles((theme) => ({
  shared: {
    margin: theme.spacing(0, 0.5),
  },
}));

type Props = {
  book: BookSchema;
  onItemClick(index: ItemIndex): void;
  onItemEditClick?(index: ItemIndex): void;
  onTreeChange?(nodeId: string): void;
  onBookInfoClick(book: BookSchema): void;
  onBookEditClick?: ((book: BookSchema) => void) | false | undefined;
  selectedIndexes?: Set<string>;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookTree(props: Props) {
  const {
    book,
    onItemClick,
    onItemEditClick,
    onTreeChange,
    onBookInfoClick,
    onBookEditClick,
    selectedIndexes,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const treeItemClasses = useTreeItemStyle();
  const nodeId = `${book.id}`;
  const handle = (handler?: (book: BookSchema) => void) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    handler?.(book);
  };
  /* TODO: ブック単位でのインポートの実装
  const handleChange = (handler?: (nodeId: string) => void) => () => {
    handler?.(nodeId);
  };
  */
  return (
    <TreeItem
      nodeId={nodeId}
      classes={treeItemClasses}
      label={
        <>
          {/* TODO: ブック単位でのインポートの実装
          onTreeChange && (
          <Checkbox
            checked={selectedIndexes?.has(nodeId)}
            color="primary"
            size="small"
            onChange={handleChange(onTreeChange)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          )*/}
          {book.name}
          {book.shared && (
            <Tooltip title="教員に共有しています">
              <PublicIcon
                className={classes.shared}
                fontSize="small"
                htmlColor={gray[700]}
              />
            </Tooltip>
          )}
          <IconButton size="small" onClick={handle(onBookInfoClick)}>
            <InfoOutlinedIcon />
          </IconButton>
          {onBookEditClick && (
            <IconButton size="small" onClick={handle(onBookEditClick)}>
              <EditOutlinedIcon />
            </IconButton>
          )}
          {book.ltiResourceLinks.map((ltiResourceLink) => (
            <CourseChip
              key={ltiResourceLink.contextId}
              ltiResourceLink={ltiResourceLink}
            />
          ))}
        </>
      }
    >
      <BookChildrenTree
        bookId={book.id}
        sections={book.sections}
        onItemClick={onItemClick}
        onItemEditClick={onItemEditClick}
        onTreeChange={onTreeChange}
        selectedIndexes={selectedIndexes}
        isTopicEditable={isTopicEditable}
      />
    </TreeItem>
  );
}
