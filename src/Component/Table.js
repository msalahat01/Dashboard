import React, { useState, useEffect, useMemo } from "react";
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
} from "@mui/material"; // Use @mui/material consistently
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker, Space, Popover } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { orders } from './Const'; // Ensure this import is correct

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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const tableHeaders = [
    { text: "Agent Name", value: "agentname" },
    { text: "Agent ID", value: "agentid" },
    { text: "Extension", value: "extension" },
    { text: "Date", value: "date" },
    { text: "Dialed Num", value: "dialednum" },
    { text: "UCID", value: "ucid" },
    { text: "Call ID", value: "callid" },
    { text: "Trunk Group", value: "trunkgroup" },
    { text: "Split", value: "split" },
    { text: "Duration", value: "duration" },
    { text: "Hold Time", value: "holdtime" },
    { text: "Transferred", value: "transferred" }
  ];

  const headerWidths = {
    agentname: '15%',
    agentid: '10%',
    extension: '10%',
    date: '20%',
    dialednum: '15%',
    ucid: '10%',
    callid: '10%',
    trunkgroup: '15%',
    split: '10%',
    duration: '10%',
    holdtime: '10%',
    transferred: '10%'
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

  const [filterValues, setFilterValues] = useState({
    'agent-id': '',
    'extension': '',
    'dialed-num': '',
    'ucid': '',
    'trunk': '',
    'split': '',
  });

  const [searchFilters, setSearchFilters] = useState({
    'agent-id': '',
    'extension': '',
    'dialed-num': '',
    'ucid': '',
    'trunk': '',
    'split': '',
  });

  const handleSearch = () => {
    setSearchFilters(filterValues);
    setOpen(false); // Close the popover
  };

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

  const [open, setOpen] = useState(false);
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

  const sortedData = useMemo(() => {
    let dateFilteredOrders = filteredOrders;

    if (selectedRange && selectedRange.length === 2) {
      const [startDate, endDate] = selectedRange;

      // Filter by date range
      dateFilteredOrders = filteredOrders.filter(order => {
        const orderDate = dayjs(order.date); // Assuming 'order.date' contains the date you want to filter
        return orderDate.isBetween(startDate, endDate, null, '[]'); // Inclusive filter
      });
    }

    // Filter by search form values
    Object.keys(searchFilters).forEach(key => {
      const value = searchFilters[key];
      if (value) {
        dateFilteredOrders = dateFilteredOrders.filter(order => order[key.replace('-', '')].includes(value));
      }
    });

    // Sort the filtered data
    if (sortConfig.key) {
      dateFilteredOrders = [...dateFilteredOrders].sort((a, b) => {
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
  }, [filteredOrders, sortConfig, selectedRange, searchFilters]);

  const handleClear = () => {
    // Reset search filters to default
    setSearchFilters({
      'agent-id': '',
      'extension': '',
      'dialed-num': '',
      'ucid': '',
      'trunk': '',
      'split': '',
    });
  
    // Reset filter values to default
    setFilterValues({
      'agent-id': '',
      'extension': '',
      'dialed-num': '',
      'ucid': '',
      'trunk': '',
      'split': '',
    });
  
    // Reset the date range to the default (last 30 days)
    setSelectedRange([dayjs().subtract(0, 'd').startOf('day'), dayjs()]);
  
    // Reset filtered orders to include all orders
    setFilteredOrders(orders);
  
    // Reset the sorting configuration
    setSortConfig({ key: '', direction: '' });
  
    // Optionally, close the filter popover if open
    setOpen(false);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = orders;

      // Apply filters from the search fields
      Object.keys(searchFilters).forEach(key => {
        const value = searchFilters[key];
        if (value) {
          filteredData = filteredData.filter(order => order[key.replace('-', '')].includes(value));
        }
      });

      setFilteredOrders(filteredData);
    };

    applyFilters();
  }, [searchFilters]);

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              {/* Filter */}
              <TableHead>
                <TableRow>
                  {/* Filter button */}
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
                              value={filterValues[field.id]} // Bind value to state
                              onChange={(e) => setFilterValues({ ...filterValues, [field.id]: e.target.value })} // Update state on change
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
                      style={{ padding: '14px 8px', fontWeight: "600", cursor: 'pointer', width: headerWidths[item.value], fontSize: '13px' }}
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

      <CardActions className={classes.actions} style={{ height: '55px' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
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
