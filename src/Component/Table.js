import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker, Space, Popover } from 'antd';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 400
  },
  actions: {
    justifyContent: "flex-end"
  },
}));

const TableComponent = () => {
  const classes = useStyles();

 // Static data array
 const orders = [
  {
    agentname: "Jane Smith",
    agentid: "5678",
    extension: "1002",
    date: "2024-08-27 11:15",
    dialednum: "0722334455",
    duration: "00:03:45",
    holdtime: "00:00:30",
    ucid: "23456789012345678901",
    callid: "5678",
    trunkgroup: "Group2",
    split: "2",
    transferred: "Yes"
  },
  {
    agentname: "Mike Johnson",
    agentid: "9101",
    extension: "1003",
    date: "2024-08-27 12:00",
    dialednum: "0711223344",
    duration: "00:07:15",
    holdtime: "00:02:00",
    ucid: "34567890123456789012",
    callid: "9012",
    trunkgroup: "Group3",
    split: "1",
    transferred: "No"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Jane Smith",
    agentid: "5678",
    extension: "1002",
    date: "2024-08-27 11:15",
    dialednum: "0722334455",
    duration: "00:03:45",
    holdtime: "00:00:30",
    ucid: "23456789012345678901",
    callid: "5678",
    trunkgroup: "Group2",
    split: "2",
    transferred: "Yes"
  },
  {
    agentname: "Mike Johnson",
    agentid: "9101",
    extension: "1003",
    date: "2024-08-27 12:00",
    dialednum: "0711223344",
    duration: "00:07:15",
    holdtime: "00:02:00",
    ucid: "34567890123456789012",
    callid: "9012",
    trunkgroup: "Group3",
    split: "1",
    transferred: "No"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Jane Smith",
    agentid: "5678",
    extension: "1002",
    date: "2024-08-27 11:15",
    dialednum: "0722334455",
    duration: "00:03:45",
    holdtime: "00:00:30",
    ucid: "23456789012345678901",
    callid: "5678",
    trunkgroup: "Group2",
    split: "2",
    transferred: "Yes"
  },
  {
    agentname: "Mike Johnson",
    agentid: "9101",
    extension: "1003",
    date: "2024-08-27 12:00",
    dialednum: "0711223344",
    duration: "00:07:15",
    holdtime: "00:02:00",
    ucid: "34567890123456789012",
    callid: "9012",
    trunkgroup: "Group3",
    split: "1",
    transferred: "No"
  },
  {
    agentname: "Sarah Brown",
    agentid: "1122",
    extension: "1004",
    date: "2024-08-27 13:45",
    dialednum: "0700334455",
    duration: "00:04:20",
    holdtime: "00:01:30",
    ucid: "45678901234567890123",
    callid: "1234",
    trunkgroup: "Group1",
    split: "3",
    transferred: "Yes"
  },
  {
    agentname: "David Lee",
    agentid: "3344",
    extension: "1005",
    date: "2024-08-27 14:10",
    dialednum: "0799445566",
    duration: "00:02:50",
    holdtime: "00:00:45",
    ucid: "56789012345678901234",
    callid: "3456",
    trunkgroup: "Group2",
    split: "2",
    transferred: "No"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  {
    agentname: "Emily Davis",
    agentid: "5566",
    extension: "1006",
    date: "2024-08-27 15:25",
    dialednum: "0733221100",
    duration: "00:06:40",
    holdtime: "00:01:15",
    ucid: "67890123456789012345",
    callid: "5678",
    trunkgroup: "Group3",
    split: "1",
    transferred: "Yes"
  },
  // Add more orders as needed
];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const tableHeaders = [
    { text: "Agent Name", value: "agentname" },
    { text: "Agent ID", value: "agentid" },
    { text: "Extension", value: "extension" },
    { text: "Date", value: "date"},
    { text: "Dialed Num", value: "dialednum" },
    { text: "UCID", value: "ucid" },
    { text: "Call ID", value: "callid" },
    { text: "Trunk Group", value: "trunkgroup" },
    { text: "Split", value: "split" },
    { text: "Duration", value: "duration" },
    { text: "Hold Time", value: "holdtime" },
    { text: "Transferred", value: "transferred"}
  ];

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const { RangePicker } = DatePicker;
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().subtract(7, 'd').startOf('day'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().subtract(14, 'd').startOf('day'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().subtract(30, 'd').startOf('day'), dayjs()],
    }
  ];

  const fields = [
    { id: "agent-id", label: "Agent ID" },
    { id: "extension", label: "Extension" },
    { id: "dialed-num", label: "Dialed Num" },
    { id: "ucid", label: "UCID" },
    { id: "trunk", label: "Trunk" },
    { id: "split", label: "Split" },
  ];

  const defaultRange = [dayjs().subtract(0, 'd').startOf('day'), dayjs()];

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const handleSort = (columnValue) => {
    let direction = 'ascending';
    if (sortConfig.key === columnValue && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: columnValue, direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredOrders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredOrders;
  }, [filteredOrders, sortConfig]);

  const handleSearch = () => {
    // Implement search/filter logic here
    setFilteredOrders(orders); // Placeholder: replace with actual filtered data
    hide();
  };

  const handleClear = () => {
    setFilteredOrders(orders);
    // Reset date range and other filters
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              {/* Filter */}
              <TableHead>
                <TableRow>
                  <TableCell colSpan={1}>
                    <Popover
                      content={
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          {fields.map((field) => (
                            <TextField
                              key={field.id}
                              id={field.id}
                              label={field.label}
                              variant="outlined"
                              size="small"
                              style={{ width: "200px", marginBottom: "10px", fontSize: "14px" }}
                              InputProps={{
                                style: { fontSize: "14px" },
                              }}
                              InputLabelProps={{
                                style: { fontSize: "12px" },
                              }}
                            />
                          ))}
                          <Button size="small" variant="contained" onClick={handleSearch}>
                            Search
                          </Button>
                        </div>
                      }
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                      placement="bottomRight"
                    >
                      <Button size="medium" variant="contained">Filter</Button>
                    </Popover>
                  </TableCell>

                  {/* TIME */}
                  <TableCell colSpan={10}>
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        presets={[
                          {
                            label: <span aria-label="End of Day to Current Time">Last day</span>,
                            value: () => [dayjs().subtract(1, 'd').startOf('day'), dayjs().subtract(1, 'd').endOf('day')],
                          },
                          ...rangePresets,
                        ]}
                        showTime={{
                          format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        value={defaultRange}
                        onChange={(value, dateString) => {
                          console.log('Selected Time: ', value);
                          console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                      />
                    </Space>
                  </TableCell>

                  {/* Clear Button */}
                  <TableCell colSpan={1}>
                    <Button size="medium" variant="contained" onClick={handleClear}>Clear</Button>
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Head */}
              <TableHead>
                <TableRow>
                  {tableHeaders.map(item => (
                    <TableCell
                      key={item.value}
                      style={{ padding: '14px 8px', cursor: 'pointer' }}
                      onClick={() => handleSort(item.value)}
                    >
                      <span>{item.text}</span>
                      {sortConfig.key === item.value && (
                        <span>{sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Body */}
              <TableBody>
                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow hover key={row.id}>
                    {tableHeaders.map(header => (
                      <TableCell style={{ fontSize: '12px' }} key={header.value} align="left">{row[header.value]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>

      <CardActions className={classes.actions} style={{ height:'55px' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </CardActions>
    </Card>
  );
};

export default TableComponent;
