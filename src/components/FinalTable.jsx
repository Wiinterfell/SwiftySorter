import { makeStyles, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "3rem",
    marginTop: "2rem",
    marginBottom: "5rem",
    marginLeft: "4rem",
    marginRight: "4rem",
  },
  songList: {
    flexGrow: 2,
    maxWidth: "800px",
    flexBasis: 0,
    minWidth: "300px"
  },
  albumList: {
    flexGrow: 1,
    maxWidth: "600px",
    flexBasis: 0,
    minWidth: "300px"
  },
  album: {
    width: "2rem",
    height: "100%"
  },
});

export function FinalTable({songTable, orderedAlbums}) {
    const classes = useStyles();
    const columns = [
      { columnKey: "rank", label: "Rank" },
      { columnKey: "song", label: "Song" }
      ];
    const columnsAlb = [
        { columnKey: "rank", label: "Rank" },
        { columnKey: "album", label: "Album" },
        { columnKey: "score", label: "Score" }
      ];
      
    const items = songTable.map((item, index) => ({ rank: index + 1, song: item }));
    const itemsAlb = orderedAlbums.map((item, index) => ({ rank: index + 1, album: item, score: item[1].score }));

    return (
      <div className={classes.root}>
        <div className={classes.songList}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell key={column.columnKey}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.song}>
                <TableCell>
                  <TableCellLayout>
                    {item.rank}
                  </TableCellLayout>
                </TableCell>
                <TableCell>{item.song}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        <div className={classes.albumList}>
        <Table>
          <TableHeader>
            <TableRow>
              {columnsAlb.map((column) => (
                <TableHeaderCell key={column.columnKey}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsAlb.map((item) => (
              <TableRow key={item.album}>
                <TableCell>
                  <TableCellLayout>
                    {item.rank}
                  </TableCellLayout>
                </TableCell>
                <TableCell> 
                  <TableCellLayout media={<img src={item.album[1].img} className={classes.album} alt="Album cover"/>}>
                    {item.album[0]}
                  </TableCellLayout>
                </TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
    </div>
  );
}