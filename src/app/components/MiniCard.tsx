"use client";
import React, { useEffect, useState } from "react";
import sun from "@/app/assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import Image from "next/image";
import { StaticImageData } from "next/image";
interface MiniCardProps {
  time: string;
  temp: number;
  iconString: string;
}

const MiniCard: React.FC<MiniCardProps> = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState<StaticImageData | undefined>();

  const iconMapping: Record<string, StaticImageData> = {
    cloud: cloud,
    rain: rain,
    clear: sun,
    thunder: storm,
    fog: fog,
    snow: snow,
    wind: wind,
  };

  const matchedIcon = Object.keys(iconMapping).find((key) =>
    iconString.toLowerCase().includes(key)
  );
  setIcon(iconMapping[matchedIcon || "defaultIcon"]);

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);
  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">
        {
          new Date(time)
            .toLocaleTimeString("en", { weekday: "long" })
            .split(" ")[0]
        }
      </p>
      {/* <hr /> */}
      <div className="w-full flex justify-center items-center flex-1">
        {icon && (
          <Image
            src={icon}
            alt="forecast not available"
            width={64} // Set width for Image
            height={64} // Set height for Image
            className="w-[4rem] h-[4rem]"
          />
        )}
      </div>
      <p className="text-center font-bold">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
