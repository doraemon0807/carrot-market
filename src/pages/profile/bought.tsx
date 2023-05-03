import Item from "@/components/item";
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

const PurchaseList: NextPage = () => {
  return (
    <Layout title="Bought Items" hasTabBar canGoBack>
      <div className="flex flex-col space-y-5 py-5">
        <ProductList kind="Purchase" />
      </div>
    </Layout>
  );
};

export default PurchaseList;
