export const createAsyncCases = (builder, asyncThunk, cases) => {
  builder
    .addCase(asyncThunk.pending, state => {
      state.status = 'pending';
      state.error = '';
      state.success = '';
      state.loading = true;
      if (cases.pending) cases.pending(state);
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.status = 'success';

      if (cases.fulfilled) cases.fulfilled(state, action);
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.payload;
      if (cases.rejected) cases.rejected(state, action);
    });
};

export const createAsyncCases1 = (builder, asyncThunk, cases) => {
  builder
    .addCase(asyncThunk.pending, state => {
      state.status = 'pending';
      state.error = '';
      state.success = '';
      if (cases.pending) cases.pending(state);
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.status = 'success';

      if (cases.fulfilled) cases.fulfilled(state, action);
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.status = 'error';
      state.loading = false;
      state.error = action.payload;
      if (cases.rejected) cases.rejected(state, action);
    });
};
