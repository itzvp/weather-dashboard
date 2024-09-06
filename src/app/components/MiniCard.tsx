"use client";
import React, { useEffect, useState } from "react";
import sun from "@/app/assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import Image from "next/image"; // Import Image from next/image
import { StaticImageData } from "next/image";
interface MiniCardProps {
  time: string;
  temp: number;
  iconString: string;
}

const MiniCard: React.FC<MiniCardProps> = ({ time, temp, iconString }) => {
  // const [icon, setIcon] = useState<string | undefined>();
  const [icon, setIcon] = useState<StaticImageData | undefined>();
  // useEffect(() => {
  //   if (iconString) {
  //     const iconLower = iconString.toLowerCase();
  //     if (iconLower.includes("cloud")) {
  //       setIcon(require("@app/assets/icons/cloud.png"));
  //     } else if (iconLower.includes("rain")) {
  //       setIcon(require("@/app/assets/icons/rain.png"));
  //     } else if (iconLower.includes("clear")) {
  //       setIcon(require("@/app/assets/icons/sun.png"));
  //     } else if (iconLower.includes("thunder")) {
  //       setIcon(require("@/app/assets/icons/storm.png"));
  //     } else if (iconLower.includes("fog")) {
  //       setIcon(require("@/app/assets/icons/fog.png"));
  //     } else if (iconLower.includes("snow")) {
  //       setIcon(require("@/app/assets/icons/snow.png"));
  //     } else if (iconLower.includes("wind")) {
  //       setIcon(require("@/app/assets/icons/windy.png"));
  //     }
  //   }
  // }, [iconString]);

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
