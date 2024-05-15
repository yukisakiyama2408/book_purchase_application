const ApiBookInput = (bookData: any) => {
  console.log(bookData.bookData);
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
                </div>
              </div>
            );
          })
        ) : (
          <>結果がありません</>
        )}
      </div>
    </>
  );
};

export default ApiBookInput;
