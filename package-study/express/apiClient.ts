import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getData = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/data/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const addData = async (id: string, value: any) => {
    try {
        const response = await axios.post(`${API_URL}/data`, { id, value });
        return response.data;
    } catch (error) {
        console.error('Error adding data:', error);
        throw error;
    }
};
