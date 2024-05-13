"use client";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

const BookIndex = () => {
  const [books, setBooks] = useState<Array<any> | undefined>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const query = supabase
        .from("books")
        .select("id,created_at,title,image_url,purchase_url,comment");
      const { data: books } = await query;
      if (books) {
        setBooks(books);
      }
    };
    fetchBooks();
  }, []);
  console.log(books && books);

  return (
    <>
      <div>
        {" "}
        <div>aaa</div>
        <div>
          {books &&
            books.map((book: any) => {
              return (
                <div key={book.id}>
                  <div>{book.title}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BookIndex;
