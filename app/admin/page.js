'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";

function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [name, setname] = React.useState('')
    const [house, sethouse] = React.useState('')

    React.useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    const handleForm = async (event) => {
        event.preventDefault();
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
        const data = {
            name: name,
            house: house
        };
        setLoading(true);
        const { result, error } = await addData('users', 'user-id', data);
        setLoading(false);

        if (error) {
            console.error('Add Data Error:', error);
            setError(error);
        } else {
            console.log('Data added successfully:', result);
            setname("");
            sethouse("");
            fetchItems();
        }
    };

    const handleGet = async (event) => {
        event.preventDefault();
        fetchItems();
    };

    const fetchItems = async () => {
        setLoading(true);
        const { result, error } = await getData('users', 'user-id');
        setLoading(false);
    
        if (error) {
            console.error('Get Data Error:', error);
            setError(error);
        } else {
            console.log('Data retrieved successfully:', result.data());
            setItems(result.data());
            console.log(items.data);
        }
    };

    return (
        <div>
            <h1>Only logged in users can view this page</h1>
            <form onSubmit={handleForm} className="form">
                <p>Name</p>
                <input 
                    value= {name} 
                    onChange={(e) => setname(e.target.value)} 
                    placeholder="Name" 
                    style={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        color: '#333'
                    }}
                />
                <p>House</p>
                <input 
                    value={house} 
                    onChange={(e) => sethouse(e.target.value)}
                    placeholder="House"
                    style={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        color: '#333'
                    }}
                />
                <button type="submit">Add Data</button>
            </form>
            <form onSubmit={handleGet} className="form">
                <button type="submit">Get Data</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {items.data && items.data.length > 0 && (
                <ul>
                    {items.data.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.house}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Page;
