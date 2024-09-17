import { Button, makeStyles, ProgressBar } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    padding: "3rem",
    flexWrap: "wrap",
  },
  button: {
    fontSize: "2.5rem",
    padding: "3rem",
    width: "50%",
    lineHeight: "normal",
    minWidth: "350px"
  },
  progressBar: {
    position: "fixed",
    bottom: "0",
    height: "1rem",
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep, finalResult } = useSongRanker(songList);
  const [leftSong, rightSong] = currentSortingStep ? currentSortingStep.slice(0,2) : [undefined, undefined];
  const classes = useStyles();

  return (
    <>
      {!finalResult ? 
      <div className={classes.root}>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
      </div> : undefined }
      <ProgressBar
        className={classes.progressBar}
        thickness="large"
        value={currentSortingStep ? currentSortingStep[2] : 1}
        shape="square"
      />
    </>
  );
}