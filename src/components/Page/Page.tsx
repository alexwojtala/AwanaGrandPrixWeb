import React from "react";
import Navigation from "../../components/Navigation/Navigation";

interface Props {
  children: JSX.Element;
}

const Page = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Page;
