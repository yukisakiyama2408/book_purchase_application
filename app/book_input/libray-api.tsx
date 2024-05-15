import { useState, useEffect } from "react";
import axios from "axios";

const BookInput = () => {
  const [apiBook, setApiBook] = useState([]);
  const [bookTitle, setBookTitle] = useState("起業の科学");
  const convert = require("xml-js");
  const getData = async () => {
    const res = await axios.get(
      `https://ndlsearch.ndl.go.jp/api/opensearch?title=${bookTitle}`
    );
    setApiBook(res.data);
  };

  useEffect(() => {
    getData();
  }, [bookTitle]);
  const convertedApiBook = convert.xml2json(apiBook, {
    compact: true,
    spaces: 2,
  });
  const apiBookJson = JSON.parse(convertedApiBook);

  console.log(apiBookJson.rss && apiBookJson.rss.channel.item);
  const filterapiBookJson =
    apiBookJson.rss &&
    apiBookJson.rss.channel.item.filter((val: any) => {
      return val["dc:title"]._text.includes(bookTitle);
    });
  console.log(filterapiBookJson);

  const RemovedLineIsbn = (isbn: any) => {
    const replacedIsbn = isbn && isbn.replace(/-/, "");
    return replacedIsbn;
  };
  return (
    <>
      <div>
        {filterapiBookJson &&
          filterapiBookJson.map((filterbook: any, index: number) => {
            return (
              <>
                <div key={filterbook["dc:title"]._text}>
                  <div>{filterbook["dc:title"]._text}</div>
                  <div>{filterbook.author._text}</div>
                  {filterbook["dc:identifier"] &&
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
                  )}
                  {/* <div>
                    {filterbook["dc:identifier"] && (
                      <img
                        src={`https://ndlsearch.ndl.go.jp/thumbnail/${filterbook[
                          "dc:identifier"
                        ][0]._text.replace(/-/g, "")}.jpg`}
                      />
                    )}
                  </div> */}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default BookInput;
