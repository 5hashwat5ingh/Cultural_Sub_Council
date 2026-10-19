import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Preloader from "../components/Preloader";

export default function AppLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const [isLoading, setIsLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    if (isHomePage) {
      setIsLoading(true);
      setVideoKey((previousKey) => previousKey + 1);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, isHomePage]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isHomePage && (
        <Preloader
          isLoading={isLoading}
          videoKey={videoKey}
          onComplete={handlePreloaderComplete}
        />
      )}

      <div
        className={
          isHomePage && isLoading
            ? "invisible"
            : "visible"
        }
      >
        <Outlet />
      </div>
    </>
  );
}
