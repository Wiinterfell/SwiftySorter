export async function loadProgressData(supabaseClient) {
  return await supabaseClient
    .from('SortingSaveData')
    .select('*')
    .eq('artistId', 'taytay')
}