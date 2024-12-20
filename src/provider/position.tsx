"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface IPositionContext {
  position: TPosition | undefined;
  allowAccessCurrentPosition: () => void;
}

export const PositionContext = createContext<IPositionContext>({
  position: undefined,
  allowAccessCurrentPosition: () => { },
});

export const usePosition = () => {
  const context = useContext(PositionContext);
  if (!context) throw new Error("Error while using PositionContext");
  return context;
}

export const PositionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [position, setPosition] = useState<TPosition>(undefined);

  const allowAccessCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Trình duyệt không hỗ trợ truy cập vị trí của bạn");
      return;
    }

    const success = async (position: GeolocationPosition) => {
      setPosition({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })
    };

    const error = (err: GeolocationPositionError) => {
      console.error("Error while getting current position:", err.message);
    };

    const geolocationPromise = () =>
      new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await success(position);
            resolve();
          },
          (err) => {
            error(err);
            reject(err);
          }
        );
      });

    toast.promise(geolocationPromise, {
      loading: "Đang xác định vị trí của bạn...",
      success: "Đã xác định vị trí của bạn",
      error: "Không thể truy cập vị trí của bạn",
    });
  }, [setPosition]);

  useEffect(() => {
    allowAccessCurrentPosition();
  }, [allowAccessCurrentPosition]);

  return (
    <PositionContext.Provider value={{ position, allowAccessCurrentPosition }}>
      {children}
    </PositionContext.Provider>
  );
}