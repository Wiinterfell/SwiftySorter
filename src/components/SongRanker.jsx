import { Button, makeStyles, ProgressBar } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";
import React from "react";
import { FinalTable } from "./FinalTable";
import { SaveProgress } from "./SaveProgress";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    padding: "3rem",
    flexWrap: "wrap",
  },
  button: {
    fontSize: "2rem",
    padding: "3rem",
    lineHeight: "normal",
    height: "10rem",
    minWidth: "350px",
    flexBasis: 0,
    flexGrow: 1,
  },
  progressBar: {
    position: "fixed",
    bottom: "0",
    height: "1rem",
  },
  progressButton: {
    textAlign: "center",
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep, finalResult, saveData } = useSongRanker(songList);
  const [leftSong, rightSong] = currentSortingStep ? currentSortingStep.slice(0,2) : [undefined, undefined];
  const classes = useStyles();

  return (
    <>
      {!finalResult ? 
      <div className={classes.root}>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
      </div> : 
      <FinalTable songList={finalResult}/> }
      <div className={classes.progressButton}>
        <SaveProgress saveData={saveData} />
      </div>
      <ProgressBar
        className={classes.progressBar}
        thickness="large"
        value={currentSortingStep ? currentSortingStep[2] : 1}
        shape="square"
      />
    </>
  );
}