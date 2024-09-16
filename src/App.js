import {
  Button,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import { useSongRanker } from "./hooks/useSongRanker";

function App() {
  const { pickBestSong, currentSortingStep } = useSongRanker(['song1', 'song2', 'song3', 'song4']);
  const [leftSong, rightSong] = currentSortingStep;

  return (
    <FluentProvider theme={webLightTheme}>
      <header>
        <h1>
          The Era-nker
        </h1>
      </header>
      <Button size="large" onClick={() => pickBestSong(leftSong)}>{leftSong}</Button>
      <Button size="large" onClick={() => pickBestSong(rightSong)}>{rightSong}</Button>
    </FluentProvider>
  );
}

export default App;
