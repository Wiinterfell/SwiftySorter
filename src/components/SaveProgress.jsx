import { Button, Toast, ToastBody, ToastTitle, useToastController } from "@fluentui/react-components";
import { LockClosedRegular, SaveRegular } from "@fluentui/react-icons";
import React from "react";
import { useClientContext } from "../contexts/clientContext";
import { useSession } from "./SessionProvider";
import { toasterId } from "../App";

export function SaveProgress({ saveData }) {
  const { supabaseClient } = useClientContext();
  const [saving, setSaving] = React.useState(false);
  const { dispatchToast } = useToastController(toasterId);
  const session = useSession();
  
  const save = async () => {
    setSaving(true);
    try {
      await supabaseClient
        .from('SortingSaveData')
        .upsert({ artistId: 'taytay', save_data: saveData });
      notifySaved();
    } catch (error) {
      console.error('Error saving progress', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }

  const notifySaved = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Progress saved!</ToastTitle>
        <ToastBody>You will be able to restore your progress next time!</ToastBody>
      </Toast>,
      { intent: "success" }
    );

  return session ? (
    <Button appearance="transparent" icon={<SaveRegular />} onClick={save} disabled={saving}>
      {saving ? "Saving…" : "Save current progress"}
    </Button>
  ) : <Button appearance="transparent" icon={<LockClosedRegular />} disabled>Sign in to save your progress</Button>
}