import {
  FluentProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";
import { SongRanker } from "./components/SongRanker";
import taylor from './taylorswift.json';

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontSize: "5rem",
    lineHeight: "normal",
  },
});

function App() {
  const classes = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <header>
        <h1 className={classes.title}>
          The Era-nker
        </h1>
      </header>
      <SongRanker songList={taylor.songs} />
    </FluentProvider>
  );
}

export default App;
