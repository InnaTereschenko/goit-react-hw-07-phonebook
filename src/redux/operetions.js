import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = 'https://64ddeddb825d19d9bfb1bc04.mockapi.io/api';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, mockAPI) => {
    try {
        const response = await axios.get('/contacts');
        // console.log(response.data);
  return response.data;
    } catch (error) {
        return mockAPI.rejectWithValue(error.message);
  }
      
});

export const addContacts = createAsyncThunk(
    'contacts/addContacts',
    async (contact, mockAPI) => {
        try {
            const response = await axios.post('/contacts', contact);
            return response.data;
        } catch (error) {
            return mockAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, mockAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (error) {
            return mockAPI.rejectWithValue(error.message);
        }
    }
);

