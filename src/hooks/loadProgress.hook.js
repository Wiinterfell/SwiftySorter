import { useQuery } from "@tanstack/react-query";
import { useClientContext } from "../contexts/clientContext";
import { loadProgressData } from "../queries/progressData";
import { useSession } from "../components/SessionProvider";

export function useLoadProgress(artistId, disabled) {
  const { supabaseClient } = useClientContext();
  const session = useSession();

  return useQuery({
    queryKey: ['progress', artistId],
    queryFn: () => loadProgressData(supabaseClient, artistId),
    enabled: !!session && !disabled,
    select: (data) => data.data ? data.data[0] : undefined
  })
}