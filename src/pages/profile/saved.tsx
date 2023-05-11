import Item from "@/components/item";
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

const FavoriteList: NextPage = () => {
  return (
    <Layout title="Saved Items" hasTabBar canGoBack seoTitle="Saved Items">
      <div className="flex flex-col space-y-5 py-5">
        <ProductList kind="Favorite" />
      </div>
    </Layout>
  );
};

export default FavoriteList;
