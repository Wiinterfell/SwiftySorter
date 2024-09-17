import {
  makeStyles,
  Persona,
} from "@fluentui/react-components";
import React from "react";
import { useClientContext } from "../contexts/clientContext";
import { LoginButton } from "./LoginButton";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    justifyContent: "end",
    padding: "1rem",
  },
});

export function Nav() {
  const [session, setSession] = React.useState(null)
  const { supabaseClient } = useClientContext()
  const classes = useStyles();

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
  }, [])

  return (
    <div className={classes.root}>
      {session ? (
        <Persona name={session.user.email} textPosition="before" size="extra-large" textAlignment="center" />
      ) : <LoginButton />}
    </div>);
}