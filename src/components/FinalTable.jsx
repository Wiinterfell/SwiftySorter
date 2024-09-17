import { Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";

export function FinalTable({songTable}) {
    const columns = [
        { columnKey: "rank", label: "Rank" },
        { columnKey: "song", label: "Song" }
      ];
      
      const items = songTable.map((item, index) => ({ rank: index + 1, song: item }));

    return <div>
    <Table arial-label="Default table" style={{ minWidth: "510px" }}>
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