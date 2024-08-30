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
import { DatePicker, Space } from 'antd';
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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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
  
  return (
    
    <Card className={clsx(classes.root)} >
      <CardContent className={classes.content} >
        <PerfectScrollbar >
          <div className={classes.inner} >
        
            <Table>
{/* Fillter */}
            <TableHead >
            <TableRow>

              <TableCell colSpan={1}>
                <Button size="medium" variant="contained">Fillter</Button>
              </TableCell>

{/* TIME */}
              <TableCell colSpan={10}>
              <Space direction="vertical" size={12}>
               
                    <RangePicker  presets={[
                    {
                      label: <span aria-label="End of Day to Current Time">The day</span>,
                      value: () => [dayjs().subtract(0, 'd').startOf('day'), dayjs()], // End of day to current time

                    },
                    ...rangePresets,
                  ]}
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
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
                <Button size="medium" variant="contained">Clear</Button>
              </TableCell>

            </TableRow>
          </TableHead>

  {/* Head */}
              <TableHead>
                <TableRow >
                  {tableHeaders.map(item => (
                    <TableCell key={item.value} >
                      <span>{item.text}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

          
     {/* Data */}
              <TableBody >
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(obj => (
                  <TableRow hover key={obj.id}>
                    <TableCell>{obj.agentname}</TableCell>
                    <TableCell>{obj.agentid}</TableCell>
                    <TableCell>{obj.extension}</TableCell>
                    <TableCell>{obj.date}</TableCell>
                    <TableCell>{obj.dialednum}</TableCell>
                    <TableCell>{obj.ucid}</TableCell>
                    <TableCell>{obj.callid}</TableCell>
                    <TableCell>{obj.trunkgroup}</TableCell>
                    <TableCell>{obj.split}</TableCell>
                    <TableCell>{obj.duration}</TableCell>
                    <TableCell>{obj.holdtime}</TableCell>
                    <TableCell>{obj.transferred}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </CardActions>
    </Card>
  );
};

export default TableComponent;
