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
    finalResult: undefined,
    saveData: undefined,
  }));

  const pickBestSong = (pickedSong) => {
    var result = mergeSortOneStep(pickedSong)
    if (result.currentSortingStep) {
      dispatch({ type: "showNewSortingStep", payload: { currentSortingStep: result.currentSortingStep, saveData: result.saveData } });
    } else {
      dispatch({ type: "finalStep", payload: { finalResult: result.finalResult, saveData: result.saveData } });
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
        currentSortingStep: action.payload.currentSortingStep,
        saveData: action.payload.saveData,
      };
    }
    case 'finalStep': {
      return {
        ...state,
        currentSortingStep: undefined,
        finalResult: action.payload.finalResult,
        saveData: action.payload.saveData,
      };
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}