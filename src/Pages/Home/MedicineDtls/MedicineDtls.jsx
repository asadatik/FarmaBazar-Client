import { useLoaderData, useParams } from "react-router-dom";

const MedicineDtls = () => {
    const data = useLoaderData()
 
const params = useParams()

    const Category = data.filter(item => item.category === params.name);
              
    console.log(Category)

   
    return (
        <div>
              <h1 className="text-3xl font-bold  text-center w-2/3  border-y-4  border-cyan-700  p-4    mx-auto    " >All medicine Of  :  <span className="uppercase font-extrabold text-amber-400  md:tracking-[.35em]" > {params.name}</span>. </h1>  
                 
        </div>
    );
};

export default MedicineDtls;