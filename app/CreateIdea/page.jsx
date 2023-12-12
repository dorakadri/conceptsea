import { auth } from "@clerk/nextjs";
import Formidea from "@components/Form";
import Concept from "@models/concepts";
import { connect } from "@utils/database";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savedata(dataa) {
  try {
    console.log(dataa);
    await connect();
    const data = new Concept(dataa);
    await data.save();
    return new Response("done", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("error", { status: 500 });
  }
}
const CreateIdea = () => {
  const { userId } = auth();
  async function CreateIdea(data) {
    "use server";
    const regex = /^type/;

    const title = data.get("title");
    const desc = data.get("desc");
    const colors = [
      data.get("inputColor0"),
      data.get("inputColor1"),
      data.get("inputColor2"),
      data.get("inputColor3"),
      data.get("inputColor4"),
      data.get("inputColor5"),
    ];
    const tags = data.get("tags");
    const typography = [];

    for (const [key, value] of data.entries()) {
      if (regex.test(key)) {
        typography.push(value);
      }
    }
    const file = data.get("imginput");
    const fileBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(fileBuffer);

    const url = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
          console.log(result.url);
        })
        .end(buffer);
    });
    console.log(userId);
    const dataa = {
      userclerk: userId,
      title: title,
      desc: desc,
      colors: colors,
      typography: typography,
      tags: tags,
      image: url.url,
    };
    const returneddata = await savedata(dataa);

    if (returneddata.status === 200) {
      redirect("/");
    }
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col items-center">
        <p className="title mb-6">Lets Craft your idea </p>
      </div>

      <Formidea CreateIdea={CreateIdea} />
    </div>
  );
};

export default CreateIdea;
