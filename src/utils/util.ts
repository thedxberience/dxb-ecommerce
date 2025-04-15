
import { categoryContainerData } from "../app/(home)/categories/data";

export const getCategoryContainerData = (category: string) => {
    const categoryData = categoryContainerData.filter((data) => data.category.toLowerCase() === category.toLowerCase());
    return categoryData.length > 0 ? categoryData[0] : null;
}