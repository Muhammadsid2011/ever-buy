import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    getMyProducts,
    updateProduct,
} from "../lib/api"

export const useProducts = () => {
    const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts })
    return result;
}

export const useCreateProducts = () => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: createProduct, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["myProducts"] })
        },
        onError: (error) => {
            console.error("Create product error:", error);
        }
    })
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
    const result = useMutation({
        mutationFn: deleteProduct, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["myProducts"] })
        },
        onError: (error) => {
            console.error("Delete product error:", error);
        }
    });
    return result;
}

export const useMyProducts = () => {
    const result = useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts })
    return result;
}
    ;
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: updateProduct,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["product", variables.id] })
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["myProducts"] })
        },
        onError: (error) => {
            console.error("Update product error:", error);
        }
    })
    return result;
}