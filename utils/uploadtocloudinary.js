
export default async function uploadImageToCloudinary(imagecloud) {
    const data = new FormData();
    data.append("file", imagecloud);
    data.append("upload_preset", "sn2lnerq");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dkvtpo9hg/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      console.log(res)
      const urlData = await res.json();
    
      return urlData.url;
    } catch (error) {
      console.log(error);
    }
  }