import { Button, makeStyles, MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle, ProgressBar } from "@fluentui/react-components";
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
  },
  restoreProgressMessageBar: {
    margin: 'auto',
    width: '80%',
    maxWidth: '1000px',
  }
});

export function SongRanker({ songList }) {
  const { pickBestSong, currentSortingStep, finalResult, saveData, restoreProgress } = useSongRanker(songList);
  const [leftSong, rightSong] = currentSortingStep ? currentSortingStep.slice(0,2) : [undefined, undefined];
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
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
        <Button size="large" appearance="primary" shape="circular" className={classes.button} onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
      </div> : 
      <FinalTable songList={finalResult}/> }
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