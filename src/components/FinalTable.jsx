import { makeStyles, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    maxWidth: '900px',
    minWidth: "510px"
  },
});

export function FinalTable({songTable}) {
    const classes = useStyles();
    const columns = [
        { columnKey: "rank", label: "Rank" },
        { columnKey: "song", label: "Song" }
      ];
      
      const items = songTable.map((item, index) => ({ rank: index + 1, song: item }));

    return <div>
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
}