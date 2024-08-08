import React, { useEffect, useState } from 'react';
import './FreqBought.scss';
import mainProductImage from '../assets/images/saree3.webp';
import addonProductImage from '../assets/images/saree4.webp';
import AxiosInstance from '../helpers/AxiosRequest';
import { toast } from 'react-toastify';

const FreqBought = () => {
  const [mainProductSelected, setMainProductSelected] = useState(true);
  const [addonSelected, setAddonSelected] = useState(true);
  const [topSell, setTopSell] = useState();

  const mainProductPrice = 299;
  const addonPrice = 449;
  const totalPrice = mainProductPrice + addonPrice;

  useEffect(() => {
    const fetchTopSell = async () => {
     
        try {
          const response = await AxiosInstance.get(
            `/order/most-bought-product`
          );
          setTopSell(response?.data?.data);
        } catch (error) {
          toast.error("Failed to load subcategories", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      
    };
    fetchTopSell();
  }, []);

  console.log("fwefe",topSell)

  return (
    <div className="frequently-bought-together mt-5">
      <h2>Top Selling Product</h2>
      <div className="products row g-4">
      {topSell?.length > 0 && 
      topSell.map((items,index) => {
        const {productDetails } =items
        return(
        <div className="product col-lg-3 col-md-4 col-sm-6 col-12"  key={index}>
          {(productDetails && productDetails.images) && productDetails.images.map((imagesrc,index)=> (
            <img key={index} src={imagesrc} alt="Main Product" />
          ))}
          <div className="overlay">
            <span>{productDetails.description}</span>
          </div>
          <p>{productDetails.name}</p>
          <span className="price">{productDetails.price}</span>
          <p className="" style={{color:'green'}}>{productDetails.discountPrice}</p>
        </div>
    )
  })
}
</div>
    </div>
  );
};

export default FreqBought;
