"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const useRouteBouncer = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/join") {
      router.replace("/join");
    }
  }, [pathname]);

  return pathname;
};

export default useRouteBouncer;
