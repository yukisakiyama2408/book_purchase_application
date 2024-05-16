import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
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
      <div>
        {bookData.bookData ? (
          bookData.bookData.map((filterbook: any, index: number) => {
            return (
              <div key={index}>
                <div key={filterbook["dc:title"]._text}>
                  <div>{filterbook["dc:title"]._text}</div>
                  <div>{filterbook.author._text}</div>
                  <div>
                    {filterbook["dc:identifier"] ? (
                      filterbook["dc:identifier"].length > 0 ? (
                        <img
                          src={`https://ndlsearch.ndl.go.jp/thumbnail/${filterbook[
                            "dc:identifier"
                          ][0]._text.replace(/-/g, "")}.jpg`}
                        />
                      ) : (
                        <img
                          src={`https://ndlsearch.ndl.go.jp/thumbnail/${filterbook[
                            "dc:identifier"
                          ]._text.replace(/-/g, "")}.jpg`}
                        />
                      )
                    ) : (
                      <>画像がありません</>
                    )}
                  </div>
                  <div>
                    <Button onClick={() => handleSelectItem(filterbook)}>
                      選択
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ApiBookInput;
