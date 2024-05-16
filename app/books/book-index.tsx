"use client";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const BookIndex = () => {
  const [books, setBooks] = useState<Array<any> | undefined>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const query = supabase
        .from("books")
        .select("id,created_at,title,author,image_url,purchase_url,comment");
      const { data: books } = await query;
      if (books) {
        setBooks(books);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableBody>
              {books &&
                books.map((book: any) => {
                  return (
                    <TableRow
                      key={book.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left" className="book-table">
                        {" "}
                        <div>
                          <img src={book.image_url} alt="本の表紙" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <a target="_blank" href={book.purchase_url}>
                          {book.title}
                        </a>
                        <div>{book.comment}</div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BookIndex;
