import { useQuery } from "@tanstack/react-query";
import { useClientContext } from "../contexts/clientContext";
import { useSession } from "../components/SessionProvider";
import { loadSongData } from "../queries/songData";

export function useLoadSongs(songDbName) {
  const { supabaseClient } = useClientContext();
  const session = useSession();

  return useQuery({
    queryKey: ['songData'],
    queryFn: () => loadSongData(supabaseClient, songDbName),
    enabled: !!session,
  })
}