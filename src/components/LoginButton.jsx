import { Auth } from "@supabase/auth-ui-react";
import { useClientContext } from "../contexts/clientContext";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import React from "react";

export function LoginButton() {
  const { supabaseClient } = useClientContext();

  return (<Dialog>
    <DialogTrigger disableButtonEnhancement>
      <Button>Sign in</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} providers={[]} />
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  </Dialog>
  )
}