export async function loadProgressData(supabaseClient, artistId) {
  return await supabaseClient
    .from('SortingSaveData')
    .select('*')
    .eq('artistId', artistId)
}

export function saveProgressData(supabaseClient, artistId, saveData) {
  return supabaseClient
  .from('SortingSaveData')
  .upsert({ artistId, save_data: saveData });
}