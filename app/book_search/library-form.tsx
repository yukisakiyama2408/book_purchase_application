import { useState } from "react";
import ApiBookInput from "./libray-api";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
const LibrayForm = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [apiBook, setApiBook] = useState([]);
  const convert = require("xml-js");

  const getData = async (e: any) => {
    e.preventDefault();
    await axios
      .get(`https://ndlsearch.ndl.go.jp/api/opensearch?title=${bookTitle}`)
      .then((res) => setApiBook(res.data));
  };
  const convertedApiBook = convert.xml2json(apiBook, {
    compact: true,
    spaces: 2,
  });
  const apiBookJson = JSON.parse(convertedApiBook);
  const apiBookData = apiBookJson.rss && apiBookJson.rss.channel.item;
  //   console.log(apiBookData);

  //   console.log(apiBook);
  return (
    <>
      {" "}
      <Container component="main" maxWidth="xs">
        <Typography variant="h4" gutterBottom>
          本を検索
        </Typography>
        <Box component="form">
          <Grid item xs={12}>
            <TextField
              label="タイトル"
              fullWidth
              type="text"
              name="title"
              margin="normal"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </Grid>
          <div>
            {" "}
            <Button variant="contained" type="submit" onClick={getData}>
              検索
            </Button>
          </div>
        </Box>
      </Container>
      <div>
        {apiBook ? (
          <ApiBookInput bookData={apiBookData} />
        ) : (
          <>結果がありません</>
        )}
      </div>
    </>
  );
};

export default LibrayForm;
