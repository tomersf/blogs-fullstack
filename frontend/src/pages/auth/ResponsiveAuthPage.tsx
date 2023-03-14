import React from "react";
import ColorTheme from "../../components/ColorTheme";
import querySizes from "../../helpers/queriesSize";
import useMediaQuery from "../../hooks/useMediaQuery";
import AuthPage from "./AuthPage";
import AuthPageSmall from "./AuthPageSmall";

type Props = {};

const ResponsiveAuthPage = (props: Props) => {
  const isSmallScreen = useMediaQuery(querySizes.BelowSmallScreenWidth());
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
    <div className="flex h-full w-full flex-col">
      <div className="mt-3 px-3">
        <ColorTheme />
      </div>
      <div className="flex h-full w-full justify-center">
        <AuthPage />
      </div>
    </div>
  );
};

export default ResponsiveAuthPage;
