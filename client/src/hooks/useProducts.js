import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    getMyProducts
} from "../lib/api"

export const useProducts = () => {
    const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts })
    return result;
}

export const useCreateProducts = () => {
    const queryClient = useQueryClient();
    const result = useMutation({ mutationFn: createProduct, onSuccess: () =>{
        queryClient.invalidateQueries(({queryKey: ["products"]}))
    } })
    return result;
}

export const useProduct = (id) => {
    const result = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id
    })
    return result;
}

export const useDeleteProduct = (id) => {
    const queryClient = useQueryClient();
    const result = useMutation({mutationFn: deleteProduct, onSuccess: () => {
        queryClient.invalidateQueries(({queryKey: ["products"]}))
        queryClient.invalidateQueries(({queryKey: ["myProducts"]}))
    }});
    return result;      
} 

export const useMyProducts = () => {
    const result = useQuery({queryKey: ["myProducts"],queryFn: getMyProducts})
    return result;
}