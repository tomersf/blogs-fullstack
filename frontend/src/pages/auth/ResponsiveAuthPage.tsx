import React from "react";
import ColorTheme from "../../components/ColorTheme";
import { MediaQuery } from "../../helpers/queriesSize";
import useMediaQuery from "../../hooks/useMediaQuery";
import AuthPage from "./AuthPage";
import AuthPageSmall from "./AuthPageSmall";

type Props = {};

const ResponsiveAuthPage = (props: Props) => {
  const isSmallScreen = useMediaQuery(MediaQuery.BelowSmallScreen);
  if (isSmallScreen) {
    return (
      <div className="flex h-full w-full flex-col">
        <div className="mx-3 mt-5">
          <ColorTheme extraStyles="w-[90px]" />
        </div>
        <div className="flex h-full w-full justify-center">
          <AuthPageSmall />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mt-3 flex w-full px-3">
        <ColorTheme />
      </div>
      <AuthPage />
    </div>
  );
};

export default ResponsiveAuthPage;
