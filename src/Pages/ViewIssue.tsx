import { db, storage } from "@/config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

const ViewIssue = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [areaName, setAreaName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const { areaId, postId } = useParams();

  useEffect(() => {
    const getImageUrl = async () => {
      if (!areaId || !postId) {
        setError("Missing area ID or post ID");
        setLoading(false);
        return;
      }

      try {
        const imageRef = ref(storage, `${areaId}/${postId}`);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        const postRef = collection(db, "areas", areaId, "posts")
        const getPostDetails = await getDoc(doc(postRef, postId));

        if (getPostDetails.data()) {
          setAreaName(getPostDetails.data()?.areaName);
          setTitle(getPostDetails.data()?.title);
          setDescription(getPostDetails.data()?.description);
          setAddress(getPostDetails.data()?.address);
        }

      } catch (error) {
        console.error("Error getting image URL:", error);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    getImageUrl();
  }, [areaId, postId]); // Add dependencies

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <section className="w-10/12 mx-auto mt-[10vh]">
      <div className="relative flex justify-between">
        <div className="w-7/12">
          <h1 className="text-2xl mb-4">{title}</h1>
          <div className='flex gap-3 items-center dark:text-zinc-300'>
            <h1 className="text-lg">{areaName[0].toUpperCase() + areaName.substring(1)}</h1>
            <MapPin />
          </div>
          <div className="text-xl my-10">
            <h1 className="text-2xl">Description</h1>
            <div className="border-b-2 my-3"></div>
            {description}

            
          </div>
          <div className="text-lg">
            <h1 className="text-2xl">Address</h1>
            <div className="border-b-2 my-3"></div>
            {address}
          </div>
        </div>
        <div>
          <img src={imageUrl} alt="image describing the issue" className="max-w-[450px]" />
        </div>
      </div>
    </section>
  );
};

export default ViewIssue;