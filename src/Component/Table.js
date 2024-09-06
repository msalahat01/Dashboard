import React, { useState , useEffect} from "react";
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
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

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
    date: "2024-07-27 11:15",
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
    agentname: "ALi",
    agentid: "4444",
    extension: "109",
    date: "2024-08-28 11:15",
    dialednum: "0788899",
    duration: "00:03:45",
    holdtime: "00:00:30",
    ucid: "23456789012345678901",
    callid: "5678",
    trunkgroup: "Group2",
    split: "2",
    transferred: "Yes"
  }
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

  const headerWidths = {
    agentname: '150px',
    agentid: '120px',
    extension: '100px',
    date: '200px',
    dialednum: '150px',
    ucid: '120px',
    callid: '120px',
    trunkgroup: '130px',
    split: '100px',
    duration: '120px',
    holdtime: '110px',
    transferred: '120px'
  };


  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const fields = [
    { id: "agent-id", label: "Agent ID" },
    { id: "extension", label: "Extension" },
    { id: "dialed-num", label: "Dialed Num" },
    { id: "ucid", label: "UCID" },
    { id: "trunk", label: "Trunk" },
    { id: "split", label: "Split" },
  ];

  const [selectedRange, setSelectedRange] = useState([dayjs().subtract(0, 'd').startOf('day'), dayjs()]);

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

  //open Fillter button
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  //Fillter Data when click on cell 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const handleSort = (columnValue) => {
    let direction = 'ascending';
    if (sortConfig.key === columnValue && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: columnValue, direction });
  };

  //Data sorted
  const sortedData = React.useMemo(() => {
    if (!selectedRange) return filteredOrders;
  
    const startDate = selectedRange[0];
    const endDate = selectedRange[1];
  
    // Filter by date range
    const dateFilteredOrders = filteredOrders.filter(order => {
      const orderDate = dayjs(order.date); // Assuming 'order.date' contains the date you want to filter
      return orderDate.isBetween(startDate, endDate, null, '[]'); // Inclusive filter
    });
  
    // Sort the filtered data
    if (sortConfig.key) {
      return [...dateFilteredOrders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  
    return dateFilteredOrders;
  }, [filteredOrders, sortConfig, selectedRange]);

  const handleClear = () => {
    setFilteredOrders(orders);      // Reset filtered orders to the default orders
    setSelectedRange([dayjs().subtract(0, 'd').startOf('day'), dayjs()]); // Reset the date range to the default (today)
    setSortConfig({ key: '', direction: '' }); // Reset the sorting configuration
  };

  useEffect(() => {
   
  }, []);

  return (
    
    <Card className={clsx(classes.root)} >  
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
                          <Button size="small" variant="contained">
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
                          value: () => [dayjs().subtract(1, 'd').startOf('day'), dayjs()],
                        },
                        ...rangePresets,
                      ]}
                      showTime={{
                        format: 'HH:mm',
                      }}
                      format="YYYY-MM-DD HH:mm"
                      value={selectedRange}
                      onChange={(value, dateString) => {
                        setSelectedRange(value); // Set the selected range to the state
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
                      style={{ padding: '14px 8px',fontWeight: "600" ,cursor: 'pointer', width: headerWidths[item.value],fontSize:'13px' }}
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
