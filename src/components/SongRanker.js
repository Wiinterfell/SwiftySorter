import { Button, makeStyles } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  button: {
    fontSize: "3rem",
    padding: "3rem"
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep } = useSongRanker(songList);
  const [leftSong, rightSong] = currentSortingStep;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
      <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
    </div>
  );
}