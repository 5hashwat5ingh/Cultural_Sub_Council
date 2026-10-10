
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Preloader from "../components/Preloader";

export default function AppLayout() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(0);

  const routeKey = `${location.pathname}${location.search}`;

  useEffect(() => {
    setIsLoading(true);
    setVideoKey((previousKey) => previousKey + 1);
  }, [routeKey]);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
        }}
        aria-hidden={isLoading}
      >
        <Outlet />
      </div>

      <Preloader
        isLoading={isLoading}
        videoKey={videoKey}
        onComplete={finishLoading}
      />
    </>
  );
}
