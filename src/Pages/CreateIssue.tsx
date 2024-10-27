import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { UserAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
interface Area {
    id: string;
    name: string;
}

const CreateIssue = () => {
    const {user} = UserAuth();
    const [areas, setAreas] = useState<Area[]>([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<any>(null);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const navigate = useNavigate();

    const handleIssue = async () => {
        const postId = crypto.randomUUID();
        const imageRef = ref(storage, `${selectedArea}/${postId}`);

        if (image) {
            await uploadBytes(imageRef, image[0], { contentType: 'image/jpeg' });

        }

        const area = await getDoc(doc(db,"areas", selectedArea));

        const issueData = {
            title: title,
            description: description,
            address: address,
            areaName: area.data()?.areaName
        }


        await setDoc(doc(collection(db,"areas", selectedArea, "posts"), postId), issueData);

        if (user) {
            await setDoc(doc(collection(db,"users", user.uid, "posts"), postId), {
                selectedArea: selectedArea
            })

            alert('Issue successfully made!');
            navigate('/dash');
        }   

    }

    useEffect(() => {
        const handleAreas = async () => {
            const areaCollection = collection(db, "areas");
            const areaSnapshot = await getDocs(areaCollection);
            const areaList = areaSnapshot.docs.map((area) => ({
                id: area.id,
                name: area.data().areaName,
            }));
            setAreas(areaList);
        };
        
        handleAreas();
    }, []);

    return (
        <section className="w-10/12 mx-auto">
            <div className="grid gap-6">
                <h1 className="text-2xl">Create Issue</h1>
                
                <label htmlFor="area-select">Select Area</label>
                <select
                    id="area-select"
                    className="dark:bg-zinc-900"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                >
                    <option value="" className="bg-inherit">Select an area</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.id} className='bg-inherit'>
                            {area.name}
                        </option>
                    ))}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <Button className="w-1/4 mb-10" onClick={handleIssue}>Submit Issue</Button>
            </div>
        </section>
    );
};

export default CreateIssue;
