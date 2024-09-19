import { Button, Toast, ToastBody, ToastTitle, useToastController } from "@fluentui/react-components";
import { CheckmarkCircleRegular, EditRegular, PersonPasskeyRegular } from "@fluentui/react-icons";
import React from "react";
import { useSession } from "./SessionProvider";
import { toasterId } from "../App";
import { sdk } from "../clients/spotifyClient";

export function CreatePlaylist({ finalResult, songList }) {
  const [connected, setConnected] = React.useState(sdk.currentUser);
  const [created, setCreated] = React.useState(false);
  const { dispatchToast } = useToastController(toasterId);
  const session = useSession();
  
  const create = async () => {
    try {
      await sdk.currentUser.profile().then(async function(data) {
        await sdk.playlists.createPlaylist(data.id, {
              name: "My Taylor Swift sorted songs",
              public: true,
              collaborative: false,
              description: "Thanks for using my sorter! You can follow me on Instagram: @_curiousfox ✨"
          }).then((playlist) => {
            //sdk.playlists.addCustomPlaylistCoverImage(playlist.id, "bufferimage");
            let uris = [];
            for (let i = 0; i < finalResult.length; i++) {
              const id = songList.songs.find((a) => a.title === finalResult[i]).spotifyId;
              uris.push("spotify:track:" + id);
            }
            sdk.playlists.addItemsToPlaylist(playlist.id, uris);
          });
      });
    } catch (error) {
      console.error('Error saving playlist', error);
      throw error;
    } finally {
      notifyCreated();
    setCreated(true);
    }
  }

  const connect = async () => {
    await sdk.currentUser.profile().then(function(data) {
      //console.log(data.id);
    });
    setConnected(true);
  }

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