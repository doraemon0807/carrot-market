import Item from "@/components/item";
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

const SaleList: NextPage = () => {
  return (
    <Layout title="Sold Items" hasTabBar canGoBack>
      <div className="flex flex-col space-y-5 py-5">
        <ProductList kind="Sale" />
      </div>
    </Layout>
  );
};

export default SaleList;
