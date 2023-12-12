
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Typographylist({ settypo, typo }) {
  const [typography, setTypography] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const getTypography = async () => {
    try {
      const response = await fetch(
        `api/Typography?page=${page}&itemsPerPage=30`
      );

      if (response.ok) {
        const data = await response.json();

        setTypography((prevTypography) => [...prevTypography, ...data?.fonts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTypography();
  }, [inView]);

  const handleChange = (e, checked) => {
    if(typo.length<4){
      settypo((prev) => {
        if (checked) {
          return [...prev, e];
        } else {
          return prev.filter((font) => font !== e);
        }
      });
    }else {
      alert("4 is good nuh :3");
    }
    
  };

  return (
    <div className="overflow-auto max-h-full pl-4 pt-4">
      {typography.map((post, i) => (
        <div key={i} className=" bg-red-200 ">
          <div>
            <link
              rel="stylesheet"
              href={`https://fonts.googleapis.com/css2?family=${post.family.replace(
                /\s+/g,
                "+"
              )}`}
            />
            <p className="pb-2">{post.family}</p>
            <h1
              style={{ fontFamily: post.family, fontSize: "30px" }}
              className="pb-3"
            >
              Free Palestine
            </h1>
          </div>
          <hr className="pb-3" />
          <input
     
            type="checkbox"
            name={`type${i}`}
            value={post.family}
            onChange={(e) => handleChange(post.family, e.target.checked)}
          />
        </div>
      ))}
      <div ref={ref} className="m-auto">
        <Image
          className="mx-auto"
          src={"/spinner.svg"}
          alt="spinner"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
