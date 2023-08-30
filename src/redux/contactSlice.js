import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContact } from './operetions.js';

const initialStateCont = {
  items: [],
  isLoading: false,
  error: null,
};

// за умови використання IMMER використовую push
// в майбутньому винести ці формули в окремий файл
const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
  state.error = null;
};
const handleFulfilledAdd = (state, { payload }) => {
  state.isLoading = false;
  state.items.push(payload);
  state.error = null;
};
const handleFulfilledDel = (state, { payload }) => {
  console.log("Deleted contact:", payload); 
  state.isLoading = false;
  state.items = state.items.filter(item => item.id !== payload.id);
  state.error = null;
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialStateCont,
  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.pending, handlePending)
      // .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, handleFulfilled)

      // .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, handleFulfilledAdd)
      // .addCase(addContacts.rejected, handleRejected)

      // .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilledDel)
      // .addCase(deleteContact.rejected, handleRejected)

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContacts.pending,
          deleteContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContacts.rejected,
          deleteContact.rejected
        ),
        handleRejected
      );
  },
});

const { reducer: contactsReducer } = contactsSlice;

export default contactsReducer;

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     value: {
//       items: [],
//       isLoading: false,
//       error: null,
//     },
//   },

//   reducers: {
//     addContact: (state, { payload }) => {
//       state.value.push(payload);
//     },

//     deleteContact: (state, { payload }) => {
//       state.value = state.value.filter(({ id }) => id !== payload);
//     },

//     filterContacts: (state, { payload }) => {
//       return { ...state, filter: payload };
//     },
//   },
// });

// export const { addContact, deleteContact, filterContacts } =
//   contactsSlice.actions;

// export default contactsSlice.reducer;
