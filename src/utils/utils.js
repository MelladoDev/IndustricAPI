//Archivo para funciones de utilidad globales
import { ProductModel } from "../models/ProductsModel";

export const getProducts = async () => {
    const products = await ProductModel.GetAllProducts();
    console.log(products);
    return products;
}