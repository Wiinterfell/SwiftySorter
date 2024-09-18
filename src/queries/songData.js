export async function loadSongData(supabaseClient) {
  var taylor = await supabaseClient
    .from('Artists')
    .select('*')
    .eq('artistId', 1);
  var songs = await supabaseClient
    .from('Songs')
    .select('*')
    .eq('artist', 1);
  var albums = await supabaseClient
    .from('Albums')
    .select('*')
    .eq('artist', 1);
  var json = { artist: taylor.data[0].artistName, songs: songs.data, albums: albums.data};
  console.log(json);
  return json;
}