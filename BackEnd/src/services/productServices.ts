import { ProductModel } from "../models/ProductsModel";

export const GetAllProducts = async()=>{
    return await ProductModel.find();
}

export const seedInitialProducts = async () => {
      const products = [
        {
          title: "Dell Laptop",
          image:
            "https://www.hp.com/gb-en/shop/Html/Merch/Images/c06723377_1750x1285.jpg",
          price: 15000,
          stock: 10,
        },
        {
          title: "Asus Laptop",
          image:
            "https://www.hp.com/gb-en/shop/Html/Merch/Images/c06723377_1750x1285.jpg",
          price: 25000,
          stock: 20,
        },
        {
          title: "HP Laptop",
          image:
            "https://www.hp.com/gb-en/shop/Html/Merch/Images/c06723377_1750x1285.jpg",
          price: 40000,
          stock: 8,
        },
      ];

      const existingPrducts = await GetAllProducts();

      if(existingPrducts.length == 0){
        await ProductModel.insertMany(products)
      }
  };