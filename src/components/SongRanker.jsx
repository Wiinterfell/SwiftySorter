import { Button, makeStyles, MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle, ProgressBar, Card, CardHeader, CardPreview, Text } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";
import React from "react";
import { FinalTable } from "./FinalTable";
import { SaveProgress } from "./SaveProgress";
import { useClientContext } from "../contexts/clientContext";
import { DismissRegular } from "@fluentui/react-icons";
import { loadProgressData } from "../queries/progressData";

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
    marginBottom: "1rem"
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
  },
  restoreProgressMessageBar: {
    margin: 'auto',
    width: '80%',
    maxWidth: '1000px',
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep, finalResult, saveData, restoreProgress } = useSongRanker(songList.songs.map(item => item.title));
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
  const { supabaseClient } = useClientContext();
  const [restoreProgressData, setRestoreProgressData] = React.useState(null);

  React.useEffect(() => {
    supabaseClient.auth.getSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        // Load existing saved data
        const { data } = await loadProgressData(supabaseClient);
        setRestoreProgressData(data ? data[0] : undefined);
      }
    })

    return () => subscription.unsubscribe()
  }, []);

  const onRestoreProgressClick = () => {
    restoreProgress(restoreProgressData.save_data);
    setRestoreProgressData(undefined);
  }
  

  return (
    <>
      { !!restoreProgressData && (
        <MessageBar intent="info" className={classes.restoreProgressMessageBar}>
        <MessageBarBody>
          <MessageBarTitle>Welcome back! 🎵</MessageBarTitle>
          We saved your progress. Want to pick up where you left off?
        </MessageBarBody>
        <MessageBarActions
          containerAction={
            <Button
              aria-label="dismiss"
              appearance="transparent"
              icon={<DismissRegular />}
            />
          }
        >
         <Button onClick={onRestoreProgressClick}>Resume ranking</Button>
        </MessageBarActions>
      </MessageBar>
      )}
      {!finalResult ? 
      <div className={classes.root}>
        <div>
          <Card className={classes.card} onClick={() => pickBestSong(leftSong)}> 
            <CardPreview> 
              <img src={leftImage} className={classes.album} alt="Album cover"/>
            </CardPreview>
            <CardHeader header={<Text weight="semibold" className={classes.title}>{leftSong}</Text>}/>
          </Card>
          <iframe 
            style={{borderRadius:12}} 
            src={"https://open.spotify.com/embed/track/" + left.spotify + "?utm_source=generator"} 
            width="100%" 
            height="100" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="left">
          </iframe>
        </div>
        <div>
          <Card className={classes.card} onClick={() => pickBestSong(rightSong)}> 
            <CardPreview> 
              <img src={rightImage} className={classes.album} alt="Album cover"/>
            </CardPreview>
            <CardHeader header={<Text weight="semibold" className={classes.title}>{rightSong}</Text>}/>
          </Card>
          <iframe 
            style={{borderRadius:12}} 
            src={"https://open.spotify.com/embed/track/" + right.spotify + "?utm_source=generator"} 
            width="100%" 
            height="100" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="right">
          </iframe>
        </div>   
      </div> : 
      <FinalTable songTable={finalResult}/> }
      { saveData && (<div className={classes.progressButton}>
        <SaveProgress saveData={saveData} />
      </div>
      )}
      <ProgressBar
        className={classes.progressBar}
        thickness="large"
        value={currentSortingStep ? currentSortingStep[2] : 1}
        shape="square"
      />
    </>
  );
}