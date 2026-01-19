import { getAllProduct } from "@/services/product/product";
import RecommendSurprises from "./RecommendSurprises";

export default async function SurpriseDetailsRecommendation({
    categoryName,
}: {
    categoryName: string;
}) {
    const { data: surprises } = await getAllProduct(`category=${categoryName}`);

    if (!surprises || surprises.length === 0) {
        return null;
    }

    return <RecommendSurprises surprises={surprises} />;
}
