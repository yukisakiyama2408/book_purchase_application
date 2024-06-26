import { useRouter } from "next/navigation";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Link,
} from "@mui/material";
const ApiBookInput = (bookData: any) => {
  const router = useRouter();
  // console.log(bookData.bookData);
  const handleSelectItem = (item: any) => {
    const imageIsbnUrl = item["dc:identifier"]
      ? item["dc:identifier"].length > 0
        ? item["dc:identifier"][0]._text.replace(/-/g, "")
        : item["dc:identifier"]._text.replace(/-/g, "")
      : null;
    router.push(
      `/book_input?title=${item["dc:title"]._text}}&author=${item.author._text}&image_url=https://ndlsearch.ndl.go.jp/thumbnail/${imageIsbnUrl}.jpg`
    );
    // console.log(item["dc:title"]._text);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableBody>
            {bookData.bookData ? (
              bookData.bookData.map((filterbook: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <div>
                        {filterbook["dc:identifier"] ? (
                          filterbook["dc:identifier"].length > 0 ? (
                            <img
                              src={`https://ndlsearch.ndl.go.jp/thumbnail/${filterbook[
                                "dc:identifier"
                              ][0]._text.replace(/-/g, "")}.jpg`}
                              alt="画像無し"
                            />
                          ) : (
                            <img
                              src={`https://ndlsearch.ndl.go.jp/thumbnail/${filterbook[
                                "dc:identifier"
                              ]._text.replace(/-/g, "")}.jpg`}
                              alt="画像無し"
                            />
                          )
                        ) : (
                          <>画像無し</>
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <div>{filterbook["dc:title"]._text}</div>
                      <div>{filterbook.author._text}</div>
                      <div>
                        <Button onClick={() => handleSelectItem(filterbook)}>
                          選択
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ApiBookInput;
