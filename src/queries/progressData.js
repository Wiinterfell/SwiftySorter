export async function loadProgressData(supabaseClient, artistId) {
  return await supabaseClient
    .from('SortingSaveData')
    .select('*')
    .eq('artistId', artistId)
}