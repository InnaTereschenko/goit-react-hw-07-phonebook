import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  },

  reducers: {
    addContact: (state, { payload }) => {
      state.value.push(payload);
    },

    // addContact: (state, { payload }) => {
    //     state = [...state, payload];
    // },

    deleteContact: (state, { payload }) => {
      state.value = state.value.filter(({ id }) => id !== payload);
    },
   
    filterContacts: (state, { payload }) => {
      return { ...state, filter: payload };
    },

    // filterContacts: (state, {payload}) => state.filter = payload,

     },
});





export const { addContact, deleteContact, filterContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
