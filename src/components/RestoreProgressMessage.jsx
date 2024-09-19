import { Button, makeStyles, MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle, Text, Toast, ToastBody, ToastTitle, useToastController } from "@fluentui/react-components";
import { useLoadProgress } from "../hooks/loadProgress.hook";
import React from "react";
import { DismissRegular } from "@fluentui/react-icons";
import { toasterId } from "../App";


const useStyles = makeStyles({
  restoreProgressMessageBar: {
    margin: 'auto',
    width: '80%',
    maxWidth: '1000px',
  },
  noSaveFoundMessage: {
    textAlign: 'center',
  }
});


export function RestoreProgressMessage({ onRestoreClicked }) {
  const { data: restoredProgressData, isSuccess } = useLoadProgress('taytay');
  const classes = useStyles();
  const { dispatchToast } = useToastController(toasterId);
  const [hasRestored, setHasRestored] = React.useState(false);

  const onRestoreProgressClick = () => {
    onRestoreClicked(restoredProgressData.save_data);
    setHasRestored(true);
    dispatchToast(
      <Toast>
        <ToastTitle>All set! 🎉</ToastTitle>
        <ToastBody>Your progress has been restored. Ready to keep ranking those tunes?</ToastBody>
      </Toast>,
      { intent: "success" }
    );
  }

  if (!isSuccess || hasRestored) {
    return null;
  }

  if (isSuccess && !restoredProgressData) {
    return (<p className={classes.noSaveFoundMessage}>💡We haven&apos;t found any saved progress, let&apos;s start from scratch!</p>)
  }

  return (
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
  )
}