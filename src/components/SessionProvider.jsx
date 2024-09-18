import React from "react";
import { useClientContext } from "../contexts/clientContext";

const sessionContext = React.createContext();

export function SessionProvider({children}) {
  const [session, setSession] = React.useState(null)
  const { supabaseClient } = useClientContext()

  React.useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, []);

  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export function useSession() {
  return React.useContext(sessionContext);
}