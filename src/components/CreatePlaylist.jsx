import { Button, Toast, ToastBody, ToastTitle, useToastController } from "@fluentui/react-components";
import { CheckmarkCircleRegular, EditRegular, PersonPasskeyRegular } from "@fluentui/react-icons";
import React from "react";
import { useSession } from "./SessionProvider";
import { toasterId } from "../App";
import { saveProgressData } from "../queries/progressData";
import { useClientContext } from "../contexts/clientContext";
import { useCreatePlaylist } from "../hooks/createPlaylist.hook";
import { sdk } from "../clients/spotifyClient";

export function CreatePlaylist({ finalResult, songList, saveData }) {
  const [connected, setConnected] = React.useState(sdk.currentUser);
  const [created, setCreated] = React.useState(false);
  const [autoCreated, setAutoCreated] = React.useState(false);
  const { dispatchToast } = useToastController(toasterId);
  const session = useSession();
  const { supabaseClient } = useClientContext();
  const { mutateAsync: createPlaylist } = useCreatePlaylist('taytay', finalResult, songList);
  
  const create = async () => {
    try {
      await createPlaylist();
    } catch (error) {
      console.error('Error saving playlist', error);
      throw error;
    } finally {
      notifyCreated();
      setCreated(true);
    }
  }

  const connect = async () => {
    // If we are authenticated and have dirty progress data, first Save progress
    if (session && saveData) {
      await saveProgressData(supabaseClient, 'taytay', saveData);
    }
    await sdk.currentUser.profile().then(function(data) {
      //console.log(data.id);
    });
    setConnected(true);
  }

  React.useEffect(() => {
    if (location.search.includes("createPlaylist=true") && !created && !autoCreated) {
      setAutoCreated(true);
      create();
    }
  }, [])

  const notifyCreated = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Playlist Created!</ToastTitle>
        <ToastBody>Go to your Spotify account and check it out 🎶</ToastBody>
      </Toast>,
      { intent: "success" }
    );

  return connected ? (
    <Button appearance="transparent" icon={!created ? <EditRegular /> : <CheckmarkCircleRegular />} onClick={create} disabled={created}>
      {created ? "Playlist saved on your Spotify account" : "Create Spotify playlist"}
    </Button>
  ) : <Button appearance="transparent" icon={<PersonPasskeyRegular/>} onClick={connect}>Sign in to Spotify to create a playlist</Button>
}