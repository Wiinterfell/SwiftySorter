import { Button, makeStyles, ProgressBar } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
  },
  button: {
    fontSize: "3rem",
    padding: "3rem"
  },
  progressBar: {
    position: "absolute",
    bottom: "0",
    height: "1rem",
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep } = useSongRanker(songList);
  const [leftSong, rightSong] = currentSortingStep.slice(0,2);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
      </div>
      <ProgressBar
        className={classes.progressBar}
        thickness="large"
        value={currentSortingStep[2]}
        shape="square"
      />
    </>
  );
}