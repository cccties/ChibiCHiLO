import { MouseEvent, useCallback } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import { Column } from "material-table";
import { useSnackbar } from "material-ui-snackbar-provider";
import { registContents, SessionResponse } from "./api";
import { useRouter } from "./router";
import { Table } from "./Table";
import { ContentsIndex, destroyContents } from "./contents";
import { useLmsInstructor } from "./session";

type ContentsRow = {
  id: number;
  title: string;
  creator: string;
};

function editable(row: ContentsRow, session?: SessionResponse) {
  return (
    session && (session.role === "administrator" || row.creator === session.id)
  );
}

export function ContentsTable(props: ContentsIndex) {
  const session = useLmsInstructor();
  const router = useRouter();
  const showHandler = useCallback(
    (event?: MouseEvent, row?: ContentsRow | ContentsRow[]) => {
      const contents = Array.isArray(row) ? row[0] : row;
      if (contents == null) return;
      router.push({
        pathname: "/contents",
        query: {
          id: contents.id,
          action: "show",
        },
      });
      event?.preventDefault();
    },
    [router]
  );
  const newHandler = useCallback(() => {
    router.push({
      pathname: "/contents",
      query: {
        action: "new",
      },
    });
  }, [router]);
  const editHandler = useCallback(
    (event: MouseEvent, row: ContentsRow | ContentsRow[]) => {
      event.preventDefault();
      if (!row) return;
      if (Array.isArray(row)) return;
      router.push({
        pathname: "/contents",
        query: { id: row.id, action: "edit" },
      });
    },
    [router]
  );
  const { showMessage } = useSnackbar();
  const destroyHandler = useCallback(
    async (event: MouseEvent, row: ContentsRow | ContentsRow[]) => {
      event.preventDefault();
      const contents = Array.isArray(row) ? row[0] : row;
      const res = confirm(`「${contents.title}」を削除しますか？`);
      if (!res) return;
      await destroyContents(contents.id);
      showMessage(`「${contents.title}」を削除しました`);
    },
    [showMessage]
  );

  const editAction = useCallback(
    (row: ContentsRow) => {
      const disabled = !editable(row, session);
      return {
        tooltip: disabled ? "権限がありません" : "編集する",
        icon: EditIcon,
        disabled,
        onClick: editHandler,
      };
    },
    [editHandler, session]
  );
  const destroyAction = useCallback(
    (row: ContentsRow) => {
      const disabled = !editable(row, session);
      return {
        tooltip: disabled ? "権限がありません" : "削除する",
        icon: DeleteIcon,
        disabled,
        onClick: destroyHandler,
      };
    },
    [destroyHandler, session]
  );

  const data = props.contents;

  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "id", width: "4rem" },
          {
            title: "名称",
            field: "title",
          },
        ] as Column<ContentsRow>[]
      }
      actions={[
        {
          icon: PlayArrowIcon,
          tooltip: "再生する",
          onClick: showHandler,
        },
        editAction,
        destroyAction,
        {
          icon: LibraryAdd,
          tooltip: "学習コンテンツを作成する",
          isFreeAction: true,
          onClick: newHandler,
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      data={data}
    />
  );
}

export function ContentsSelectorTable(props: ContentsIndex) {
  const router = useRouter();
  const showHandler = useCallback(
    async (event?: MouseEvent, row?: ContentsRow | ContentsRow[]) => {
      const contents = Array.isArray(row) ? row[0] : row;
      if (contents == null) return;
      await registContents(contents.id, contents.title);
      router.push({
        pathname: "/contents",
        query: {
          id: contents.id,
          action: "show",
        },
      });
      event?.preventDefault();
    },
    [router]
  );

  const session = useLmsInstructor();
  const linkAction = useCallback(
    (row: ContentsRow) => {
      return {
        icon: row.id === session?.contents ? LinkIcon : LinkOffIcon,
        tooltip: "学習管理システムに紐付ける",
        onClick: showHandler,
      };
    },
    [router, showHandler, session]
  );

  const data = props.contents;
  return (
    <Table
      title="学習コンテンツ一覧"
      columns={
        [
          { title: "#", field: "id", width: "calc(4rem - 48px)" },
          {
            title: "名称",
            field: "title",
          },
        ] as Column<ContentsRow>[]
      }
      actions={[
        linkAction,
        {
          icon: LibraryAdd,
          tooltip: "学習コンテンツを作成する",
          isFreeAction: true,
          onClick: () =>
            router.push({
              pathname: "/contents",
              query: {
                action: "new",
              },
            }),
        },
      ]}
      options={{
        actionsColumnIndex: 1,
      }}
      data={data}
    />
  );
}
