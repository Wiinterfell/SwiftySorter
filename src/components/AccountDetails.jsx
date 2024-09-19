import {
  makeStyles,
  Persona,
} from "@fluentui/react-components";
import React from "react";
import { LoginButton } from "./LoginButton";
import { useSession } from "./SessionProvider";
import gravatar from "gravatar";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    justifyContent: "end",
    padding: "1rem",
  },
});

export function Nav() {
  const classes = useStyles();
  const session = useSession();
  const avatar = session && session.user.email ? gravatar.url(session.user.email) : undefined;

  return (
    <div className={classes.root}>
      {session ? (
        <Persona
          name={session.user.email}
          textPosition="before"
          size="extra-large"
          textAlignment="center"
          avatar={avatar ? {
            image: {
              src: avatar,
            },
          } : undefined}
        />
      ) : <LoginButton />}
    </div>);
}