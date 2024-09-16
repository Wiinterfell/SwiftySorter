import React from "react";

/*
  state:

  {
    currentSortingStep: [Song, Song]
  }

  songList: [Song, Song, Song, ...]

*/

export function useSongRanker(songList) {
  const [state, dispatch] = React.useReducer(reducer, {
    currentSortingStep: [songList[0], songList[1]], // TODO these are the first two songs shown in the UX
  });

  const pickBestSong = (pickedSong) => {    
    // Here we should continue the ranking and then provide the next two songs to compare
    alert('You picked ' + pickedSong);

    dispatch({ type: "showNewSortingStep", payload: ['song1', 'song2'] });
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