"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";

const Conceptdetails = () => {
  const searchParams = useSearchParams();
  const conceptId = searchParams.get("id");
  const [concept, setConcept] = useState([]);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await fetch(`/api/concepts/${conceptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch concept details");
        }

        const data = await response.json();
        setConcept(...data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching concept details:", error);
      }
    };

    if (conceptId) getDetail();
  }, [conceptId]);

function copyToclickboard(e) {
    navigator.clipboard.writeText(e) ;
    setCopied(true);
    setTimeout(() => {
        setCopied(false);  
    }, 3000);
 
}

  return (
    <div className="grid grid-cols-5 mb-14 gap-4 ">
      <div className="col-span-2">
        <Image
          src={concept.image}
          className=" max-h-[calc(100%_-_3rem)] object-fill"
          width={405}
          height={304}
          alt=" "
        />
      </div>
      <div className="col-span-3 col-start-3 ">
        <div className="flex flex-col gap-5">
          <div className="flex  items-center gap-4 ">
            <Image
              src={concept?.user?.image}
              alt="user_image"
              width={30}
              height={30}
              className="rounded-full object-contain"
            />
            <h3 className="font-exo text-lg light-gray">
              {concept?.user?.firstName} {concept?.user?.lastName}
            </h3>
          </div>
          <p className="font-exo text-3xl">{concept.title}</p>
          <p className="font-exo  text-sm">{concept.desc}</p>
          <div className="flex gap-2 ">
            {concept.tags &&
              concept.tags.split(",").map((e, i) => (
                <div key={i} className="p-2 rounded-full ship_gradient">
                  <p className="font-exo text-xs text-white">#{e}</p>
                </div>
              ))}
          </div>
          <p className="font-exo font-semibold text-3xl">Colors :</p>
          <div className="flex gap-2">
          {concept.colors?.filter((e)=>e !== "#000000" ).map((e, i) => (
            <div key={i}
            onClick={()=>{copyToclickboard(e)}}
            style={{ backgroundColor: e }}
              className={`w-24 h-24  cursor-pointer rounded-2xl flex items-center justify-center`}
            >
           {e}
        </div>
          ))}
          </div>
          <p className="font-exo font-semibold text-3xl">Typography :</p>
          <div className="flex gap-2">
          { concept.typography ? concept.typography?.map((e, i) => (
            <div key={i} className=" flex flex-col items-center">
            <link
              rel="stylesheet"
              href={`https://fonts.googleapis.com/css2?family=${e.replace(
                /\s+/g,
                "+"
              )}`}
            />
            <a href={`https://fonts.google.com/specimen/${e}`} 
            target="_blank"
              style={{ fontFamily: e }}
              className="text-8xl text-gray-500  cursor-pointer  "
            >
              Aa
            </a>
            <p> {e}</p>
          </div>
          )) :  <p className="font-exo  text-sm">No typography  :</p>}
          </div>
        </div>
      </div>
     {copied &&  <Alert text={"copied to click board"}/> }
    </div>
  );
};

export default Conceptdetails;
