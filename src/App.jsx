import {
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";
import { SongRanker } from "./components/SongRanker";
import taylor from './taylorswift.json';
import { ClientContext } from "./contexts/clientContext";
import { supabaseClient } from "./clients/supabaseClient";
import { Nav } from "./components/AccountDetails";
import React from "react"
import { SupabaseErrorBoundary } from "./components/SupaBaseErrorBoundary";

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
        <SupabaseErrorBoundary>
          <Nav/>
          <header>
            <h1 className={classes.title}>
              Taylor Swift song ranker
            </h1>
          </header>
          <SongRanker songList={taylor} />
        </SupabaseErrorBoundary>
      </ClientContext.Provider>
    </FluentProvider>
  );
}

export default App;
