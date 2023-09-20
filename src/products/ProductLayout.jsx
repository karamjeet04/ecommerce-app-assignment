import React, { useEffect, useState } from "react";
import { PRODUCT_API_URL } from "./endpoints";
import { callApi } from "./services";
import { Link } from 'react-router-dom';
import './ProductLayout.css';
import { SiderComp } from "./SiderComp";
const ProductLayout = () => {

  const [products, setProducts] = useState([]);
  const [MaterailData, setMaterailData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [materialtoggle, setMaterialToggle]= useState(false);

  const [toggle, setToggle]= useState(false);

  useEffect(() => {
    // Example usage of the reusable function
    async function main() {
      try {
        const responseData = await callApi(PRODUCT_API_URL, "GET");
        console.log("API response:",responseData?.facets, responseData?.items);
        setProducts(responseData?.items);
        setMaterailData(responseData?.facets[0]?.values);
        setColorData(responseData?.facets[1]?.values)
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    main();
  }, []);
  const displayItems = materialtoggle ? MaterailData : MaterailData.slice(0, 5);
  const displayColor = toggle ? colorData : colorData?.slice(7, 12);

  return (
    <>
      <h1 className="heading">PRODUCT SECTION</h1>
     { products?.length > 0 ? <div className="parentDiv">
        <div className="search-section">
          <div className="materialclass">
            <h5>Material</h5>
            <p>-</p>
          </div>
          <div>
            {
           displayItems?.map((item)=>(
            <>
            <div className="materialclass">
              <div style={{ display: "flex", alignItems:"center"}}>
              <input type="checkbox" className="checkboxstyle"/>
              <p className="textname" style={{margin:"0px"}}>{item?.value}</p>
              </div>
              <p style={{margin:"0px", color:"#939393"}}>({item?.count})</p>
            </div>
            </>
          ))
           }
           <div style={{display:"flex", justifyContent:"center"}}>
          <button className="moreclass" onClick={()=> setMaterialToggle((prev)=> !prev)}> { materialtoggle ?   `- Less` : `+ More`}</button>
           </div>
          </div>
          <hr/>
          <div>
          <div className="materialclass">
            <h5>Color</h5>
            <p>-</p>
          </div>
            {
            displayColor?.map((item)=>(
              <>
              <div className="materialclass">
                <div style={{ display: "flex", alignItems:"center"}}>
                <div className="roundcirlce checkboxstyle" style={{background: `${item?.value}`}}>1</div>
                <p className="textname" style={{margin:"0px"}}>{item?.value}</p>
                </div>
                <p style={{margin:"0px", color:"#939393"}}>({item?.count})</p>
              </div>
              </>
            ))
          }
           <div style={{display:"flex", justifyContent:"center"}}>
          <button className="moreclass" onClick={()=> setToggle((prev)=> !prev)}> { toggle ? `- Less` : `+ More`}</button>
          </div>
          </div>
          <hr/>
          <div>
          <div className="materialclass">
            <h5>Price</h5>
            <p>-</p>
          </div>
          <SiderComp/>
          </div>
        </div>
        <div class="product-container">
          {products?.length > 0 && products?.map((item,index) => (
            <>
             <Link to={`/product-url?index=${index}`}>
             {/* <Link to={`${item?.product_url}`} target="_blank"> */}
              <div class="product">
                <img
                  className="imageclass"
                  src={item?.image_url}
                  alt="product image"
                />
                <h5 className="producttitle">{item?.title}</h5>
                <h5 className="productprice">$ {item?.price[0]}</h5>
              </div>
              </Link>
            </>
          ))}
        </div>
      </div>: <div className="loadingclass">
      <h4>Loading....</h4>
      </div>
      }
     <style jsx={true}>
            {
              `
             a {
                text-decoration: none;
                color: black;
            }
            .loadingclass{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              font-size: 30px;  
            }
              `
            }
     </style>
    </>
  );
};

export default ProductLayout;
