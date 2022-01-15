import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
function Detail({ detail }) {
  return (
    <div>
      <Head>
        <title>listTitle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="underline text-xl">这是个详情页面 - {detail}</h1>
    </div>
  );
}

export async function getStaticPaths(ctx) {
  //  权限判断功能
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false // false or 'blocking'
  };
}
// 
export const getStaticProps: GetStaticProps = async ctx => {
  return {
    props: {
      detail: "detail"
    }
  };
};

export default Detail;