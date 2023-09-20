import React, { useEffect, useState } from "react";
import { callApi } from "./services";
import { PRODUCT_API_URL } from "./endpoints";
import { useLocation } from "react-router-dom";

const DeatailPage = () => {
  const location = useLocation();
  const [detailData, setDetailData] = useState([]);
  useEffect(() => {
    // console.log("location", location.search.split("=")[1]);
    let getIndex = location?.search?.split("=")[1];

    async function detail() {
      try {
        const responseData = await callApi(PRODUCT_API_URL, "GET");
        const filterData = responseData?.items?.find(
          (item, index) => index == getIndex
        );
        // console.log("API response:", responseData?.items?.find((item, index) => index == getIndex));
        setDetailData([filterData]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    detail();
  }, []);
  
  // Sorry, this store is currently unavailable.
  return (
    <>
      <div>
        {detailData?.length > 0 ? (
          <div>
            <div class="product" style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
              <img
                className="imageclass"
                src={detailData[0]?.image_url}
                alt="product image"
              />
              <h5 className="producttitle">{detailData[0]?.title}</h5>
              <h5 className="productprice">$ {detailData[0]?.price[0]}</h5>
            </div>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </>
  );
};

export default DeatailPage;
