import React from "react";
import { mergeSortInit, mergeSortOneStep } from "../sorter";

/*
  state:

  {
    currentSortingStep: [Song, Song],
    finalResult: [Song, Song, Song, ...]
  }

  songList: [Song, Song, Song, ...]

*/

export function useSongRanker(songList) {
  const [state, dispatch] = React.useReducer(reducer, null, () => ({
    currentSortingStep: mergeSortInit(songList).currentSortingStep, 
    finalResult: undefined
  }));

  const pickBestSong = (pickedSong) => {
    var result = mergeSortOneStep(pickedSong)
    if (result.currentSortingStep) {
      dispatch({ type: "showNewSortingStep", payload: result.currentSortingStep });
    } else {
      dispatch({ type: "finalStep", payload: result.finalResult });
    }
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
    case 'finalStep': {
      return {
        ...state,
        currentSortingStep: undefined,
        finalResult: action.payload,
      };
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}