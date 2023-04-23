import FloatButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar>
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
        <FloatButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Home;
