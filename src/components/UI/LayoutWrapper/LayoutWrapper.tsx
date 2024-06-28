import React, { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import Footer from "../Footer/Footer";
import m from "./LayoutWrapper.module.scss";
import { useRouter } from "next/router";
import Header from "../Header/Header";
import { useAppDispatch, useAppSelector } from "@/redux/hook/redux.hook";
import { fetchUserProfile } from "@/redux/slices/user.slice";

const LayoutWrapper: FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state) => state.userSlice.userData);

  useEffect(() => {
    if (userData === null) {
      dispatch(fetchUserProfile())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

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