import { Button } from "@fluentui/react-components";
import { LockClosedRegular, SaveRegular } from "@fluentui/react-icons";
import React from "react";
import { useClientContext } from "../contexts/clientContext";

export function SaveProgress({ saveData }) {
  const { supabaseClient } = useClientContext();
  const [saving, setSaving] = React.useState(false);
  const [session, setSession] = React.useState(null)

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
  
  const save = async () => {
    setSaving(true);
    try {
      await supabaseClient
        .from('SortingSaveData')
        .upsert({ artistId: 'taytay', save_data: saveData });
    } catch (error) {
      console.error('Error saving progress', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }
  return session ? (
    <Button appearance="transparent" icon={<SaveRegular />} onClick={save} disabled={saving}>
      {saving ? "Saving…" : "Save current progress"}
    </Button>
  ) : <Button appearance="transparent" icon={<LockClosedRegular />} disabled>Sign in to save your progress</Button>
}