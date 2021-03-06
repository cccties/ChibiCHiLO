import type { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

type Props = { title: ReactNode; children?: ReactNode };

export default function Problem(props: Props) {
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const { title, children } = props;
  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography variant="h4" gutterBottom={true}>
        {title}
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </Container>
  );
}
