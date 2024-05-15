"use client";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { purple } from "@mui/material/colors";
const BookForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [image_url, setImage_Url] = useState<string>("");
  const [purchase_url, setPurchased_Url] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const publishBookComment = async (
    title: string,
    author: string,
    image_url: string,
    purchase_url: string,
    comment: string
  ) => {
    await supabase.from("books").insert({
      title: title,
      author: author,
      image_url: image_url,
      purchase_url: purchase_url,
      comment: comment,
    });
  };
  const handlePublishBookComment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await publishBookComment(title, author, image_url, purchase_url, comment);
    router.push("/");
  };

  return (
    <>
      <div>
        <Container component="main" maxWidth="xs">
          <Typography variant="h4" gutterBottom>
            イベント登録{" "}
          </Typography>
          <Box component="form" onSubmit={(e) => handlePublishBookComment(e)}>
            <Grid item xs={12}>
              <TextField
                label="タイトル"
                fullWidth
                type="text"
                name="title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="authort"
                label="著者"
                fullWidth
                multiline
                margin="normal"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="image_url"
                label="表紙URL"
                fullWidth
                margin="normal"
                value={image_url}
                onChange={(e) => setImage_Url(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="purchased_url"
                label="購入用URL"
                fullWidth
                margin="normal"
                value={purchase_url}
                onChange={(e) => setPurchased_Url(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="comment"
                label="コメント"
                fullWidth
                margin="normal"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Grid>
            <div>
              <div>
                <Button variant="contained" type="submit">
                  登録
                </Button>
              </div>
              <div>
                <Button variant="text">
                  <Link href="/event">戻る</Link>
                </Button>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};
export default BookForm;
