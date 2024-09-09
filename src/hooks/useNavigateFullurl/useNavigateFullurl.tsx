import { useEffect, useState } from "react";

const useNavigateFullurl = (lessonID: string, currentPoint: string | null) => {
  const [fullUrl, setFullUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentPoint === null) {
        setFullUrl(`${window.location.protocol}//${window.location.host}${lessonID}`);
      } else {
        setFullUrl(`${window.location.protocol}//${window.location.host}${currentPoint}/${lessonID}`);
      }
    }
  }, [currentPoint, lessonID]);
  
  return { fullUrl };
}

export { useNavigateFullurl };