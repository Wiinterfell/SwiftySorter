import React from "react";
import { loadSaveData, mergeSortInit, mergeSortOneStep } from "../sorter";
import { getOrderedAlbums } from "../albumRanker";
import { sorterTruth } from "../sorterTruth";

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
      iteration: undefined, 
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
      dispatch({ type: "showNewSortingStep", payload: { progress: result.currentSortingStep[2], iteration: result.currentSortingStep[3], left, right, saveData: result.saveData } });
    } else {
      const albums = getOrderedAlbums(result.finalResult, state.songList);
      dispatch({ type: "finalStep", payload: { finalResult: result.finalResult, albums, saveData: result.saveData } });
    }
  };

  const restoreProgress = (saveData) => {
    if (saveData.finalResult) {
      const albums = getOrderedAlbums(saveData.finalResult, state.songList);
      dispatch({ type: "finalStep", payload: { finalResult: saveData.finalResult, albums, saveData: undefined } });
    } else {
      const { currentSortingStep } = loadSaveData(saveData);
      const [leftSong, rightSong] = currentSortingStep.slice(0,2);
      let  left = state.songList.songs.find((item) => item.title === leftSong);
      let right = state.songList.songs.find((item) => item.title === rightSong);
      left.img = state.songList.albums.find((a) => a.albumId === left.album).img;
      right.img = state.songList.albums.find((a) => a.albumId === right.album).img;
      dispatch({ type: "showNewSortingStep", payload: { progress: currentSortingStep[2], iteration: currentSortingStep[3], left, right, saveData: undefined } });
    }
  };

  const setLoadedSongList = (songList) => {
    const songTitles = songList.songs.map(item => item.title)

    // Useful when needing to debug sorting algorithm
    // const truth = sorterTruth(songTitles);

    const values = mergeSortInit(songTitles).currentSortingStep;
    let  left = songList.songs.find((item) => item.title === values[0]);
    let right = songList.songs.find((item) => item.title === values[1]);
    left.img = songList.albums.find((a) => a.albumId === left.album).img;
    right.img = songList.albums.find((a) => a.albumId === right.album).img;
    dispatch({ type: "setLoadedSongList", payload: { progress: values[2], iteration: values[3], left, right, songList }  })
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
        iteration: action.payload.iteration,
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
        iteration: 0,
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
        iteration: action.payload.iteration,
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