import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Loved: NextPage = () => {
  return (
    <Layout title="Saved Items" hasTabBar canGoBack>
      <div className="flex flex-col space-y-5 py-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            title="iPhone 60"
            subtitle="Black"
            id={i}
            price={400}
            comments={12}
            saves={26}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
