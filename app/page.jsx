
import Feed from "@components/Feed";

export default   async function Home() {

const data = await getData() ;
console.log(data)
  return (
    <div className="w-full flex-center flex-col">
      <div className="flex flex-col justify-center px-24 items-center relative">
        <p className="title mb-6 ">Discover and Share</p>
        <div className="flex items-center ">
          <h1 className="subtitle"> an idea a concept an </h1>
        
            <div className="textgradient  ">
              <p className="z-50 ">inspiration </p>
            </div>
        
        </div>
      </div>
      <Feed  data={data} />
    </div>
  );




}

const  getData = async ()=> {
  const res = await fetch('http://localhost:3000/api/concepts',{
    method: 'GET',
    cache:"no-cache"
  }, { next: { revalidate: 3600 } })
  const response = res.json();

  return response 
}
