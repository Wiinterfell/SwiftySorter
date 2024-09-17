import { Card, CardHeader, CardPreview, makeStyles, ProgressBar, Text } from "@fluentui/react-components";
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
  card: {
    lineHeight: "normal",
    height: "25rem",
    width: "20rem",
    //flexBasis: 0,
    //flexGrow: 1,
  },
  album: {
    width: "10rem",
    height: "100%"
  },
  title: {
    fontSize: "1.3rem",
    lineHeight: "normal"
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
  const { pickBestSong, currentSortingStep, finalResult, saveData } = useSongRanker(songList.songs.map(item => item.title));
  var leftSong = undefined;
  var rightSong = undefined;
  var leftImage = undefined;
  var rightImage = undefined;
  if (!finalResult) {
    [leftSong, rightSong] = currentSortingStep ? currentSortingStep.slice(0,2) : [undefined, undefined];
    var left = songList.songs.find((item) => item.title === leftSong);
    var right = songList.songs.find((item) => item.title === rightSong);
    leftImage = songList.albums.find((a) => a.title === left.album).img;
    rightImage = songList.albums.find((a) => a.title === right.album).img;
  }
  const classes = useStyles();

  return (
    <>
      {!finalResult ? 
      <div className={classes.root}>
        <Card className={classes.card} onClick={() => pickBestSong(leftSong)}> 
          <CardPreview> 
            <img src={leftImage} className={classes.album} alt="Album cover"/>
          </CardPreview>
          <CardHeader header={<Text weight="semibold" className={classes.title}>{leftSong}</Text>}/>
        </Card>
        <Card className={classes.card} onClick={() => pickBestSong(rightSong)}> 
          <CardPreview> 
            <img src={rightImage} className={classes.album} alt="Album cover"/>
          </CardPreview>
          <CardHeader header={<Text weight="semibold" className={classes.title}>{rightSong}</Text>}/>
        </Card>
      </div> : 
      <FinalTable songTable={finalResult}/> }
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