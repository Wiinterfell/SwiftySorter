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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontSize: "4.5rem",
    lineHeight: "normal",
    marginTop: 0,
    marginBottom: "1rem"
  },
  description: {
    textAlign: "center",
    color: "grey",
    fontSize: "0.7rem",
    lineHeight: "normal",
    marginBottom: "2rem"
  }
});

const queryClient = new QueryClient()
export const toasterId = "toaster";

function App() {
  const classes = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={webLightTheme}>
        <ClientContext.Provider value={{ supabaseClient }}>
          <SessionProvider>
            <SupabaseErrorBoundary>
              <Nav />
              <header>
                <h1 className={classes.title}>
                  Taylor Swift song ranker
                </h1>
                <p className={classes.description}>
                  Choose your favourite song from the two options to create the ultimate playlist of her entire discography, tailored just for you!
                  <br/>
                  Please note, this app isn't affiliated with or endorsed by Taylor Swift, and is not responsible for any inaccuracies.
                </p>
              </header>
              <SongRanker songList={taylor} />
              <Toaster toasterId={toasterId} />
            </SupabaseErrorBoundary>
          </SessionProvider>
        </ClientContext.Provider>
      </FluentProvider>
    </QueryClientProvider>
  );
}

export default App;
