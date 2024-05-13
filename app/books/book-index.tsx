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
                  <a target="_blank" href={book.purchase_url}>
                    {book.title}
                  </a>
                  <div>
                    <img src={book.image_url} />
                  </div>
                  <div>{book.comment}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BookIndex;
