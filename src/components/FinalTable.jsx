import { makeStyles, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    maxWidth: '600px',
    minWidth: "510px",
    marginBottom: "5rem"
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
    const itemsAlb = orderedAlbums.map((item, index) => ({ rank: index + 1, album: item[0], score: item[1].score }));

    return <div>
    <div>
      <Table className={classes.root}>
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
    <div>
      <Table className={classes.root}>
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
              <TableCell>{item.album}</TableCell>
              <TableCell>{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
}