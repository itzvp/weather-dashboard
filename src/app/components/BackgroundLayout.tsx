"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Clear from "@/app/assets/images/Clear.jpg";
import Fog from "@/app/assets/images/fog.png";
import Cloudy from "@/app/assets/images/Cloudy.jpg";
import Rainy from "@/app/assets/images/Rainy.jpg";
import Snow from "@/app/assets/images/snow.jpg";
import Stormy from "@/app/assets/images/Stormy.jpg";
import { useStateContext } from "../context";

const BackgroundLayout: React.FC = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;
      if (imageString.toLowerCase().includes("clear")) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.toLowerCase().includes("thunder") ||
        imageString.toLowerCase().includes("storm")
      ) {
        setImage(Stormy);
      }
    }
  }, [weather]);

  return (
    <Image
      src={image}
      alt="weather_image"
      fill={true}
      className="h-screen w-full fixed left-0 top-0 -z-[10] object-cover"
    />
  );
};

export default BackgroundLayout;
