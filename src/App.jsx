import {
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";
import { SongRanker } from "./components/SongRanker";
import taylor from './taylorswift.json';
import { ClientContext } from "./contexts/clientContext";
import { supabaseClient } from "./clients/supabaseClient";
import { Nav } from "./components/Nav";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontSize: "5rem",
    lineHeight: "normal",
  },
});

function App() {
  const classes = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <ClientContext.Provider value={{ supabaseClient }}>
      <Nav />
      <header>
        <h1 className={classes.title}>
          The Era-nker
        </h1>
      </header>
      <SongRanker songList={taylor.songs} />
      </ClientContext.Provider>
    </FluentProvider>
  );
}

export default App;
