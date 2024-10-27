import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateIssue = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const navigate = useNavigate();

  const { areaId, postId } = useParams();

  const handleIssue = async () => {

    if (areaId && postId) {
      const imageRef = ref(storage, `${areaId}/${postId}`);

      if (image) {
        await uploadBytes(imageRef, image[0], { contentType: 'image/jpeg' });

      }

      const issueData = {
        title: title,
        description: description,
        address: address,
        areaName: selectedArea
      }


      await setDoc(doc(collection(db, "areas", areaId, "posts"), postId), issueData);

      alert('Issue successfully edited!');
      navigate(`/view/${areaId}/${postId}`);
    }

  }

  useEffect(() => {
    const populateForm = async () => {
      if (!areaId && !postId) {
        return;
      }

      try {
        if (areaId && postId) {
          const getPostRef = collection(db, "areas", areaId, "posts");
          const getPost = await getDoc(doc(getPostRef, postId));

          setTitle(getPost.data()?.title);
          setDescription(getPost.data()?.description);
          setAddress(getPost.data()?.address);
          setSelectedArea(getPost.data()?.areaName);
        }
      } catch (err) {
        console.log(err);
      }

    };

    populateForm();
  }, [areaId, postId]);

  return (
    <section className="w-10/12 mx-auto">
      <div className="grid gap-6">
        <h1 className="text-2xl">Modify Issue</h1>

        <label htmlFor="area-select">Select Area</label>
        <select
          id="area-select"
          className="dark:bg-zinc-900"
          disabled
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="" className="bg-inherit">{selectedArea[0].toUpperCase() + selectedArea.substring(1)}</option>
        </select>

        <label htmlFor="title">Issue Title</label>
        <input
          type="text"
          id="title"
          className="bg-inherit"
          placeholder="Try to be concise here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="image-upload">Upload Photos</label>
        <input
          type="file"
          id="image-upload"
          onChange={(event) => setImage(event.target.files)}
        />

        <label htmlFor="description">Issue Description</label>
        <textarea
          id="description"
          placeholder="Tell us what happened?"
          className="bg-inherit"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          placeholder="Where did this happen?"
          className="bg-inherit"
          disabled
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button className="w-1/4 mb-10" onClick={handleIssue}>Submit Issue</Button>
      </div>
    </section>
  );
};

export default UpdateIssue;
