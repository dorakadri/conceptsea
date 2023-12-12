import { auth, currentUser } from "@clerk/nextjs";
import Feed from "@components/Feed";

export default   async function Home() {



  return (
    <div className="w-full flex-center flex-col">
      <div className="flex flex-col justify-center p-24 items-center relative">
        <p className="title mb-6 ">Discover and Share</p>
        <div className="flex items-center ">
          <h1 className="subtitle"> an idea a concept an </h1>
        
            <div className="textgradient  ">
              <p className="z-50 ">inspiration </p>
            </div>
        
        </div>
      </div>
      <Feed />
    </div>
  );
}
