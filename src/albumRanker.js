export function getOrderedAlbums(orderedSongs, fullData) {
    const size = orderedSongs.length;
    var albums = new Map(fullData.albums.map((item) => [item.title, {items: 0, score: 0}]));
    for (let i = 0; i < orderedSongs.length; i++) {
        const song = fullData.songs.find((item) => item.title === orderedSongs[i]);
        const album = fullData.albums.find((a) => a.title === song.album).title;
        if (albums.get(album).items <= 13) {
            albums.get(album).score += size - i;
            albums.get(album).items++;
        }
    }
    const orderedAlbums = Array.from(albums).sort((a, b) => b[1].score - a[1].score);
    return orderedAlbums;
}