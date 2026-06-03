import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export async function getAllProducts(_: Request, res: Response) {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products)
    } catch (error) {
        console.error("Error getting all the products: ", error)
        res.status(500).json({ error: "Failed to get products" })
    }
}

export async function getMyproducts(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" })

        const products = await queries.getProductsByUserId(userId);

        res.status(200).json(products)
    } catch (error) {
        console.error("Error getting products by user: ", error);
        res.status(500).json({ error: "Failed to get your products" })
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params as {id: string} as {id: string};
        const product = await queries.getProductById(id);

        if (!product) return res.status(404).json({ error: "Product not found " });

        return res.status(200).json(product)
    } catch (error) {
        console.error("Error getting product by id: ", error);
        res.status(500).json({ error: "Failed to get product" })
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" })

        const { title, description, imageUrl } = req.body;

        if (!title || !description || !imageUrl) {
            return res.status(400).json({ error: "Title, description and imageUrl are required" })
        }

        const product = await queries.createProduct({
            userId,
            title,
            description,
            imageUrl
        })

        res.status(201).json(product)
    } catch (error) {
        console.error("Error creating product: ", error)
        res.status(500).json({ error: "Failed to create the product" })
    }
}

export async function updateProduct(req: Request, res: Response) {
        try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params as { id: string };
        const { title, description, imageUrl } = req.body;

        const exsistingProduct = await queries.getProductById(id);

        if (!exsistingProduct) return res.status(404).json({ error: "product not found" });

        if (exsistingProduct.userId !== userId) {
            return res.status(403).json({ error: "You can only update your own products" });
        }

        const product = await queries.updateProduct(id, { title, description, imageUrl });

        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product: ", error);
        res.status(500).json({ error: "Failed to update the product" });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" })
    
        const { id } = req.params as {id: string};
        const exsistingProduct = await queries.getProductById(id);
    
        if (!exsistingProduct) return res.status(404).json({ error: "Product not found" });
        
        if(exsistingProduct.userId !== userId){
            return res.status(403).json({error: "You can only delete your own products"})
        }
    
        await queries.deleteProduct(id)
        res.status(200).json({message: "product deleted successfully"})
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).json({error: "Failed to delete product"})
    }
}