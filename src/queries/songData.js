export async function loadSongData(supabaseClient, songDbName) {
  var taylor = await supabaseClient
    .from('Artists')
    .select('*')
    .eq('artistId', 1);
  var songs = await supabaseClient
    .from(songDbName)
    .select('*') 
    .eq('artist', 1);
  var albums = await supabaseClient
    .from('Albums')
    .select('*')
    .eq('artist', 1);
  let suffledSongs = [...shuffle(songs.data)]
  var json = { artist: taylor.data[0].artistName, songs: suffledSongs, albums: albums.data};
  console.log(json);
  return json;
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}