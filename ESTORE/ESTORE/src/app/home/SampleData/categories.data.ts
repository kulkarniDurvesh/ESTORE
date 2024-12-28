import { Category } from "../types/category.types";

export const categories:Category[] = [
    {
        ID:1,
        CATEGORY:"Men"
    },
    {
        ID:2,
        CATEGORY:"Women"
    },
    {
        ID:3,
        CATEGORY:"KIDs"
    },
    {
        ID:4,
        CATEGORY:"Casual Wear",
        PARENT_CATEGORY_ID:1
    },
    {
        ID:5,
        CATEGORY:"Party Wear",
        PARENT_CATEGORY_ID:2
    },
    {
        ID:6,
        CATEGORY:"Foot Wear",
        PARENT_CATEGORY_ID:2
    },
    {
        ID:7,
        CATEGORY:"Accessories",
        PARENT_CATEGORY_ID:3
    }
]