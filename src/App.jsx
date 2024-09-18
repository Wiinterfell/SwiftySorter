import {
  FluentProvider,
  makeStyles,
  Toaster,
  webLightTheme,
} from "@fluentui/react-components";
import { SongRanker } from "./components/SongRanker";
import taylor from './taylorswift.json';
import { ClientContext } from "./contexts/clientContext";
import { supabaseClient } from "./clients/supabaseClient";
import { Nav } from "./components/AccountDetails";
import React from "react"
import { SupabaseErrorBoundary } from "./components/SupaBaseErrorBoundary";
import { SessionProvider } from "./components/SessionProvider";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontSize: "4.5rem",
    lineHeight: "normal",
    marginTop: 0,
  },
});

export const toasterId = "toaster";

function App() {
  const classes = useStyles();

  return (
      <FluentProvider theme={webLightTheme}>
        <ClientContext.Provider value={{ supabaseClient }}>
          <SessionProvider>
            <SupabaseErrorBoundary>
              <Nav/>
              <header>
                <h1 className={classes.title}>
                  Taylor Swift song ranker
                </h1>
              </header>
              <SongRanker songList={taylor} />
              <Toaster toasterId={toasterId} />
            </SupabaseErrorBoundary>
          </SessionProvider>
        </ClientContext.Provider>
      </FluentProvider>
  );
}

export default App;
