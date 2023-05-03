import { ProductWithCount } from "@/pages";
import useSWR from "swr";
import Layout from "./layout";
import Item from "./item";

interface ProductListProps {
  kind: "Favorite" | "Sale" | "Purchase";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/records?kind=${kind}`
  );

  return data ? (
    <>
      {data?.records.map((record) => (
        <Item
          key={record?.id}
          id={record?.product.id}
          title={record?.product.name}
          brand={record?.product.brand}
          price={record?.product.price}
          comments={12}
          favorite={record?.product._count.favorite}
        />
      ))}
    </>
  ) : null;
}
