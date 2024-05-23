import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  CircularProgress,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { fetchBooks } from "../../../services/BookApi/api";
import EditDialog from "../../Molecules/DialogBox";
import CustomButton from "../../Atom/Button";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

const columns = [
  { id: "author_names", label: "Author", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "first_publish_year", label: "Year", minWidth: 170 },
  { id: "ratings_average", label: "Ratings", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "author_birth_date", label: "Birth Date", minWidth: 170 },
  { id: "author_top_work", label: "Top Work", minWidth: 170 },
  { id: "edit", label: "Edit" },
];


const BookTable = ({ onLogout }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("author_names");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchBooks(
        page + 1,
        rowsPerPage,
        order,
        orderBy
      );
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    };
    fetchData();
  }, [page, rowsPerPage, order, orderBy]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (data, comparator) => {
    return data.sort(comparator);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveChanges = (editedData) => {
    console.log("Saving changes:", editedData);
  };

  const handleSearch = debounce((e) => {
    setLoading(true);
    const filteredBooks = books.filter((book) =>
      book.author_names.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
    console.log("FilteredBooks:", filteredBooks);
    console.log(author);
    setLoading(false);
  }, 500);

  const handleSearchChange = (e) => {
    setAuthor(e.target.value);
    handleSearch(e);
  };

  const generateCsvData = () => {
    const csvData = filteredBooks.map((row, index) => {
      const rowData = [
        ...columns
          .filter((column) => column.id !== "edit")
          .map((column) => {
            const value =
              column.id === "subject"
                ? row[column.id].join(", ")
                : row[column.id];
            return value !== null ? value : "N/A";
          }),
      ];
      return rowData.join(",");
    });
    return csvData;
  };

  const downloadCsv = () => {
    const csvContent = [
      columns
        .filter((column) => column.id !== "edit")
        .map((column) => column.label)
        .join(","),
    ];
    const dataRows = generateCsvData();
    const csvRows = [...csvContent, ...dataRows];
    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "book_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  sortData(filteredBooks, getComparator(order, orderBy));

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: 1.5,
        }}
      >
        <CustomButton
          sx={{ width: "14.5vw", height: "10.5vh", borderRadius: "10px" }}
          onClick={downloadCsv}
        >
          Download
        </CustomButton>
        <Box
        sx={{
          display: "flex",
          margin: 1.5,
          gap: 1.5,
        }}>
        <TextField
          label="Search by Author"
          value={author}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            height: "10.5vh",
          }}
        />
        <CustomButton
          sx={{ width: "14.5vw", height: "10.5vh", borderRadius: "10px" }}
          onClick={onLogout}
        >
          Logout
        </CustomButton>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{ maxHeight: 600 }}
          style={{ backgroundColor: "#CABECF" }}
        >
          <Table stickyHeader aria-label="book table">
            <TableHead>
              <TableRow sx={{ width: "100%" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: "#999999" }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    if (column.id === "edit") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={{ cursor: "pointer" }}
                          align="center"
                          onClick={() => handleEdit(row)}
                          color="blue"
                        >
                          <CustomButton variant="outlined">
                            Edit
                            </CustomButton>
                        </TableCell>
                      );
                    } else {
                      const value =
                        column.id === "subject"
                          ? row[column.id].join(", ")
                          : row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {value !== null ? value : "N/A"}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={filteredBooks.length * 10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EditDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        rowData={selectedRowData}
        handleSave={handleSaveChanges}
      />
    </>
  );
};
export default BookTable;
