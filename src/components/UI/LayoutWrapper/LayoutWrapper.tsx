import React, { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import Footer from "../Footer/Footer";
import m from "./LayoutWrapper.module.scss";
import { useRouter } from "next/router";
import Header from "../Header/Header";

const LayoutWrapper: FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const router = useRouter();
  
  return (
    <section
      className={m.container}
    >
        <div className={m.wrapper}>
          {router.asPath !== "/auth" && (
            <Header />
          )}
          <main className={m.main}>{children}</main>
        </div>
        {router.asPath !== "/auth" && <Footer />}
    </section>
  );
};

export default LayoutWrapper;