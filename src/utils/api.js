import axios from "axios";

const loginid = "67dbd2bb85ece786b30652c2";

export const handleApiCall = async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log("API Response:", response.data);
              return response.data;

    } catch (error) {
      console.error("API call failed:", error);
      alert("Failed to fetch data from the API.");
    }
  };

// Upload image & recognize face
export const recognizeFace = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/recognize`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                loginid: loginid
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error recognizing face:", error.response?.data || error.message);
        return { error: error.response?.data || "Face recognition failed" };
    }
};

// Get all photos
export const getAllPhotos = async () => {
    try {
        const response = await fetch(`${BASE_URL}/get_photos`, {
            method: "GET",
            headers: {
                "loginid": loginid,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error("Error fetching photos:", error.message);
        return { error: "Failed to fetch photos" };
    }
};


// Get all recognized persons
export const getAllPersons = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get_persons`,{
            headers: { 
                "loginid": loginid 
            }
        });

        return response.data.persons;
    } catch (error) {
        console.error("Error fetching persons:", error.response?.data || error.message);
        return { error: "Failed to fetch persons" };
    }
};

// Get specific person's gallery
export const getPersonGallery = async (personId) => {
    try {
        const response = await axios.get(`${BASE_URL}/get_person_gallery`, {
            params: { person_id: personId },
            headers: { 
                "loginid": loginid 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching person gallery:", error.response?.data || error.message);
        return { error: "Failed to fetch person's gallery" };
    }
};

// Remove duplicate images 
export const removeDuplicates = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/remove_duplicates`,{},{
            headers: { 
                "loginid": loginid 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing duplicates:", error.response?.data || error.message);
        return { error: "Failed to remove duplicates" };
    }
};

export const deletePhoto = async (imageId) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/delete_photos`,
            { image_ids: [imageId] }, 
            { headers: { "loginid": loginid } } 
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
    }
};

export const updatePersonName = async (personId, newName) => {
    try {
        const formData = new FormData();
        formData.append("person_id", personId);
        formData.append("new_name", newName);

        const response = await axios.post(`${BASE_URL}/update_person_name`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "loginid": loginid
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error updating person name:", error.response?.data || error.message);
        return { error: "Failed to update person name" };
    }
};

