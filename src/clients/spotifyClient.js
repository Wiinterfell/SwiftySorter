import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const sdk = SpotifyApi.withUserAuthorization("ee9c7a9879ef422fa57741462782e142", window.location.protocol + "//" + window.location.host + window.location.pathname + "?restoreData=true&createPlaylist=true", ["playlist-modify-public", "ugc-image-upload"]);