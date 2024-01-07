"use client";

import { ImagePlus, Plus } from "lucide-react";
import Image from "next/image";
import React, {  useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Typographylist from "./Typographylist";
import ColorInput from "./ColorInput";

const Formidea = ({CreateIdea}) => {
  const img = useRef(null);
  const [previewimage, setPreviewimage] = useState("");
  const [open, setOpen] = useState(false);
  const [typography, setTypography] = useState([]);

  const [colors, setColors] = useState(["","","","","",""]);

  const handleimageClick = () => {
    img.current.click();
  };
 

  const handleInputChange = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPreviewimage(img);
  };
  return (
    <form  action={CreateIdea}  className="flex flex-col gap-8 xl:px-80 pb-24  ">
        <div>
          <input
          required
            type="text"
            name="title"
            placeholder="Give your idea a name"
            className="w-full flex border-0 focus:outline-0 focus:border-b-2  mt-2 pb-3 text-3xl placeholder-light-gray text-black font-bold  "
          />
        </div>
        <div>
          <label className="font-exo text-xl font-semibold ">
            Describe what you got in mind :
          </label>
          <textarea
             required
             name="desc"
            rows={2}
            placeholder="my idea is ... "
            className="w-full flex border-0  focus:outline-0  focus:border-b-2   mt-2 text-xl placeholder-light-gray text-black  "
          />
        </div>
        <div className="flex flex-col gap-5 ">
          <label className="font-exo text-xl font-semibold ">Add some tags <span className="font-exo text-xs font-light text-light-gray  ">(separated by ",")</span> </label>
          <input
                required
            type="text"
            name="tags"
            placeholder="#web design"
            className="w-full flex border-0 focus:outline-0 focus:border-b-2  mt-2 pb-3 text-xl placeholder-light-gray text-black   "
          />
        </div>

        <div className="flex flex-col gap-5 ">
          <label className="subtitle font-semibold ">let's choose some typography </label>
          <div className="flex gap-6">
            {typography?.map((t,i) => (
              <div key={i} className=" flex flex-col items-center">
                <link
                  rel="stylesheet"
                  href={`https://fonts.googleapis.com/css2?family=${t.replace(
                    /\s+/g,
                    "+"
                  )}`}
                />
                <p
                  style={{ fontFamily: t }}
                  className="text-8xl text-gray-500  cursor-pointer  "
                >
                  Aa
                </p>
                <p> {t}</p>
              </div>
            ))}
            <div
              className="relative w-[8rem]"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <p className="text-8xl text-gray-500  cursor-pointer  ">Aa</p>
              <Plus
                size={32}
                color="rgb(105,110,130)"
                strokeWidth={3}
                className="absolute top-0 right-0"
              />
            </div>
          </div>
        </div>

        <ColorInput setColors={setColors} colors={colors}/>

        <div className=" items-center h-full ">
          <input
                required
            type="file"
            ref={img}
            onChange={handleInputChange}
            name="imginput"
            className=" hidden "
          />
          <div
            onClick={handleimageClick}
            className=" flex   flex-col justify-center items-center border-2 border-dashed"
          >
            {!previewimage && (
              <>
                <ImagePlus size={150} color="#b197fc" strokeWidth={1.5} />
                <p className="font-exo text-lg font-semibold">
                  Add a sketch ,prototype or an inspiration{" "}
                </p>
              </>
            )}

            {previewimage && (
              <Image
                src={previewimage}
                width={500}
                height={1000}
                className="object-contain"
              />
            )}
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 400 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-xl fixed top-0  bottom-0 right-0 z-50  "
            >
              <div
                onClick={() => {
                  setOpen(false);
                }}
              >
                close
              </div>
              <Typographylist settypo={setTypography} typo={typography} />
            </motion.div>
          )}
        </AnimatePresence>
        <button type="submit"  className="bg-primary-blue p-3 rounded-md font-exo text-white" >Submit </button>
      </form>
  );
};

export default Formidea;
