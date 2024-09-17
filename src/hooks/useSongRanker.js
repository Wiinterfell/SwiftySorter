import React from "react";
import { mergeSortInit, mergeSortOneStep } from "../sorter";

/*
  state:

  {
    currentSortingStep: [Song, Song]
  }

  songList: [Song, Song, Song, ...]

*/

export function useSongRanker(songList) {
  const [state, dispatch] = React.useReducer(reducer, null, () => ({
    currentSortingStep: mergeSortInit(songList), // TODO these are the first two songs shown in the UX
  }));

  const pickBestSong = (pickedSong) => {
    const nextSongs = mergeSortOneStep(pickedSong);

    dispatch({ type: "showNewSortingStep", payload: nextSongs });
  };

  return {
    ...state,
    pickBestSong,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'showNewSortingStep': {
      return {
        ...state,
        currentSortingStep: action.payload,
      };
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}