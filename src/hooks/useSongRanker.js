import React from "react";
import { loadSaveData, mergeSortInit, mergeSortOneStep } from "../sorter";
import { getOrderedAlbums } from "../albumRanker";

/*
  state:

  {
    currentSortingStep: [Song, Song],
    finalResult: [Song, Song, Song, ...]
  }

  songList: [Song, Song, Song, ...]

*/

export function useSongRanker(songList) {
  const [state, dispatch] = React.useReducer(reducer, null, () => {
    return {
      progress: undefined, 
      left: undefined,
      right: undefined,
      finalResult: undefined,
      albums: undefined,
      saveData: undefined,
    }});

  const pickBestSong = (pickedSong) => {
    var result = mergeSortOneStep(pickedSong)
    if (result.currentSortingStep) {
      const [leftSong, rightSong] = result.currentSortingStep.slice(0,2);
      let  left = state.songList.songs.find((item) => item.title === leftSong);
      let right = state.songList.songs.find((item) => item.title === rightSong);
      left.img = state.songList.albums.find((a) => a.albumId === left.album).img;
      right.img = state.songList.albums.find((a) => a.albumId === right.album).img;
      dispatch({ type: "showNewSortingStep", payload: { progress: result.currentSortingStep[2], left, right, saveData: result.saveData } });
    } else {
      const albums = getOrderedAlbums(finalResult, songList);
      dispatch({ type: "finalStep", payload: { finalResult: result.finalResult, albums, saveData: result.saveData } });
    }
  };

  const restoreProgress = (saveData) => {
    const { currentSortingStep } = loadSaveData(saveData);
    dispatch({ type: "showNewSortingStep", payload: { currentSortingStep, saveData: undefined } });
  };

  const setLoadedSongList = (songList) => {
    const songTitles = songList.songs.map(item => item.title)
    const values = mergeSortInit(songTitles).currentSortingStep;
    let  left = songList.songs.find((item) => item.title === values[0]);
    let right = songList.songs.find((item) => item.title === values[1]);
    left.img = songList.albums.find((a) => a.albumId === left.album).img;
    right.img = songList.albums.find((a) => a.albumId === right.album).img;
    dispatch({ type: "setLoadedSongList", payload: { progress: values[2], left, right, songList }  })
  };

  return {
    ...state,
    pickBestSong,
    restoreProgress,
    setLoadedSongList
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'showNewSortingStep': {
      return {
        ...state,
        progress: action.payload.progress,
        left: action.payload.left,
        right: action.payload.right,
        albums: undefined,
        saveData: action.payload.saveData,
      };
    }
    case 'finalStep': {
      return {
        ...state,
        progress: 1,
        left: undefined,
        right: undefined,
        albums: action.payload.albums,
        finalResult: action.payload.finalResult,
        saveData: action.payload.saveData,
      };
    }
    case 'setLoadedSongList': {
      return {
        ...state,
        songList: action.payload.songList,
        progress: action.payload.progress,
        left: action.payload.left,
        right: action.payload.right,
        albums: undefined,
        finalResult: undefined,
        saveData: undefined
      }
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}