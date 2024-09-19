import { makeStyles, ProgressBar, Card, CardHeader, CardPreview, Text, Spinner, Field } from "@fluentui/react-components";
import { useSongRanker } from "../hooks/useSongRanker";
import React from "react";
import { FinalTable } from "./FinalTable";
import { SaveProgress } from "./SaveProgress";
import { useClientContext } from "../contexts/clientContext";
import { loadSongData } from "../queries/songData";
import { RestoreProgressMessage } from "./RestoreProgressMessage";
import { CreatePlaylist } from "./CreatePlaylist";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    padding: "2rem",
    flexWrap: "wrap",
  },
  card: {
    lineHeight: "normal",
    height: "25rem",
    width: "20rem",
    marginBottom: "1rem",
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
  step: {
    textAlign: "left",
    fontSize: "0.8rem",
    lineHeight: "normal",
    marginBottom: 0,
    bottom: "1.3rem",
    position: "fixed",
    color: "grey",
    fontWeight: "normal",
    paddingLeft: "0.5rem"
  },
  signature: {
    right: "0.5rem",
    alignContent: "right",
    fontSize: "0.8rem",
    lineHeight: "normal",
    marginBottom: 0,
    bottom: "1.3rem",
    position: "fixed",
    color: "grey",
    fontWeight: "normal",
    "& a": { "&:visited": { "color": "grey" }, "color": "grey" }
  },
});

export function SongRanker() {
  const { pickBestSong, progress, iteration, left, right, albums, finalResult, saveData, restoreProgress, setLoadedSongList, songList } = useSongRanker();
  
  const classes = useStyles();
  const { supabaseClient } = useClientContext();
  
  React.useEffect(() => {
    const dbName = (location.hostname === "localhost") ? "SmallSongs" : "Songs";
    loadSongData(supabaseClient, dbName).then((songlist) => { 
      setLoadedSongList(songlist);
    });
  }, []);

  const onRestoreProgressClick = (saveData) => {
    restoreProgress(saveData);
  }

  if (!left && !finalResult) {
    return <Spinner/>;
  }

  return (
    <> 
      <RestoreProgressMessage onRestoreClicked={onRestoreProgressClick} />
      {!finalResult ? 
      <div>
        <div className={classes.root}>
          <div>
            <Card className={classes.card} onClick={() => pickBestSong(left.title)}> 
              <CardPreview> 
                <img src={left.img} className={classes.album} alt="Album cover"/>
              </CardPreview>
              <CardHeader header={<Text weight="semibold" className={classes.title}>{left.title}</Text>}/>
            </Card>
            <iframe 
              style={{borderRadius:12}} 
              src={"https://open.spotify.com/embed/track/" + left.spotifyId + "?utm_source=generator"} 
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
            <Card className={classes.card} onClick={() => pickBestSong(right.title)}> 
              <CardPreview> 
                <img src={right.img} className={classes.album} alt="Album cover"/>
              </CardPreview>
              <CardHeader header={<Text weight="semibold" className={classes.title}>{right.title}</Text>}/>
            </Card>
            <iframe 
              style={{borderRadius:12}} 
              src={"https://open.spotify.com/embed/track/" + right.spotifyId + "?utm_source=generator"} 
              width="100%" 
              height="100" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="right">
            </iframe>
          </div>
        </div>
        <div className={classes.progressButton}>
          { saveData && (<SaveProgress saveData={saveData} />)}
        </div>   
      </div> : 
      <div>
        <div className={classes.progressButton}>
          { saveData && (<SaveProgress saveData={saveData} />)}
          <CreatePlaylist finalResult={finalResult} songList={songList}/> 
        </div>
        <FinalTable songTable={finalResult} orderedAlbums={albums}/>
      </div> }
      <div>
        {!finalResult ? 
          <h2 class={classes.step}>{"Battle " + (iteration + 1)}</h2> : <div/>
        } 
        <h2 class={classes.signature}>Made with ♥ by <a href="https://instagram.com/_CuriousFox" target="_blank">_CuriousFox</a></h2>
        <ProgressBar
            className={classes.progressBar}
            thickness="large"
            value={progress}
            shape="square" />
      </div>
    </>
  );
}