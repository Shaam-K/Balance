import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { db } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Post {
  id: string;
  areaCode: string;
  // Add other post properties you need
  [key: string]: any;
}

const Dash = () => {
  const { user } = UserAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        if (user) {
          const userPostsRef = collection(db, "users", user.uid, "posts");
          const userPostsSnapshot = await getDocs(userPostsRef);

          // Use Promise.all to handle multiple async operations
          const postsPromises = userPostsSnapshot.docs.map(async (postDoc) => {
            const postData = postDoc.data();
            const areaCode = postData.selectedArea;

            // Get the full post data from the areas collection
            const areaPostRef = collection(db, "areas", areaCode, "posts");
            const fullPostSnapshot = await getDoc(doc(areaPostRef, postDoc.id));

            if (fullPostSnapshot.exists()) {
              return {
                id: postDoc.id,
                areaCode,
                ...fullPostSnapshot.data()
              };
            }
            return null;
          });

          // Wait for all promises to resolve and filter out any null values
          const resolvedPosts = (await Promise.all(postsPromises)).filter(
            (post): post is Post => post !== null
          );

          setPosts(resolvedPosts);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    getUserPosts();
  }, [user]);

  if (loading) {
    return (
      <section className="w-10/12 mx-auto">
        <div className="mt-[5vh] mx-4">
          <p>Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-10/12 mx-auto mt-[10vh]">
      <div className="flex justify-between mx-4">
        <h1 className="text-2xl">My Issues</h1>
        <div className="flex items-center gap-1 hover:border-b-2 transition-all">
          <Link to={`create/`}>
            Create Issue
          </Link>
          <PlusCircle/>
        </div>
      </div>
      <div className="mt-4">
        {posts.length === 0 ? (
          <p>No issues found</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <Link to={`/view/${post.areaCode}/${post.id}`}>
                  {/* Add your post display logic here */}
                  <div className="flex justify-between">
                    <h1 className="text-xl mb-3">{post.title}</h1>
                    <span className="flex gap-3">
                      <Link to={`/edit/${post.areaCode}/${post.id}`} className="border-b-2 border-zinc-500 hover:bg-green-500 px-3 hover:border-zinc-100 transition-all hover:translate-y-[-3px]"><div className="translate-y-[2px]">Edit</div></Link>
                      <Link to={`/delete/${post.areaCode}/${post.id}`} className="border-b-2 border-zinc-500 hover:bg-red-500 px-3 hover:border-zinc-100 transition-all hover:translate-y-[-3px]"><div className="translate-y-[2px]">Delete</div></Link>
                    </span>
                  </div>
                  <div className="flex">
                    <p className="text-md dark:text-zinc-400">{post.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Dash;