import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  Hamburger,
} from "@fluentui/react-nav-preview";
import {
  makeStyles,
  Tooltip,
} from "@fluentui/react-components";
import React from "react";
import { PersonCircle32Regular } from "@fluentui/react-icons";
import { useClientContext } from "../contexts/clientContext";
import { LoginButton } from "./LoginButton";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
});

export function Nav() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [session, setSession] = React.useState(null)
  const { supabaseClient } = useClientContext()
  const classes = useStyles();

  React.useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={classes.root}><NavDrawer
      open={isOpen}
      type={"inline"}
    >
      <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

      <NavDrawerBody>
        {session ? (
          <AppItem
            icon={<PersonCircle32Regular />}
            as="button"
          >
            {session.user.email}
          </AppItem>
        ) : <LoginButton />}
      </NavDrawerBody>
    </NavDrawer></div>);
}