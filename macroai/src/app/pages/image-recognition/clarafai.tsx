import React, { useState } from 'react';

const ClarifaiComponent: React.FC = () => {
    // State to store the image URL input by the user and the result from the API
    const [imageUrl, setImageUrl] = useState<string>('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Personal Access Token and API details
    const PAT = 'df0b5d9613de4ecdb481ba9b8c305c3f';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'general-image-recognition';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

    // Function to analyze the image using Clarifai API
    const analyzeImage = async (imageUrl: string) => {
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imageUrl
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        try {
            const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
            const data = await response.json();
            setResult(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to analyze the image. Please try again.');
        }
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        analyzeImage(imageUrl);  // Send the image URL to be analyzed
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-4">Clarifai Image Recognition</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="Enter Image URL" 
                    className="border p-2 w-full mb-4"
                    required 
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4">
                    Analyze Image
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {result && (
                <div className="mt-6">
                    <h2 className="text-2xl">Recognition Results:</h2>
                    <pre className="bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ClarifaiComponent;
