import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie , setCookie} from "../../shared/cookies.js";


const initialState = {
  articles: [],
  like: [],
  unlike: [],
  article: {
    comments: [],
  },
  isLoading: false,
  error: null,
};

export const __getInstaList = createAsyncThunk(
  "getInstaList",
  async (payload, thunkAPI) => {
    console.log("__getInstaList 동작");
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/articles",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
      });
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __postContent = createAsyncThunk(
//   "POST_CONTENT",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios({
//         method: "post",
//         url: "http://localhost:3001/articles",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${getCookie("mycookie")}`,
//         },
//         data: payload,
//       });
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// )

export const __postImage = createAsyncThunk(
  "POST_IMAGE",
  async (payload, thunkAPI) => {
    for (var value of payload.values()){
      console.log('formdata value', value);
    }
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/articles",
        data: payload,
        headers: { "Content-Type": false, 
        responseType: "blob",
        Authorization: `${getCookie("mycookie")}` }
      })
      console.log(payload)
      console.log("response", response.data)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLike = createAsyncThunk(
  "postLike",
  async (payload, thunkAPI) => {
    try {
      console.log("__postLik payload", payload);

      const response = await axios({
        method: "post",
        // url: `http://localhost:3001/articles/${payload.articlesId}/like`,
        url: "http://localhost:3001/like",
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `${getCookie("mycookie")}`,
        // },
        data: payload,
      });
      console.log("response", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postInstaCard = createAsyncThunk(
  "postInstaCard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/articles`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
        data: payload,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateInstaCard = createAsyncThunk(
  "updateInstaCard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "patch",
        url: `/api/articles/${payload.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
        data: { content: payload.content },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteInstaCard = createAsyncThunk(
  "deleteInstaCard",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/articles/${payload}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetail = createAsyncThunk(
  "getDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/articles/${payload}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postComments = createAsyncThunk(
  "postComments",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/articles/${("PAYLOAD", payload.articleId)}/comments`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("mycookie")}`,
        },
        data: { comment: payload.comment },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const InstaSlice = createSlice({
  name: "InstaSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getInstaList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getInstaList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articles = payload;
    },
    [__getInstaList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [__postInstaCard.pending]: (state) => {
      state.isLoading = true;
    },
    [__postInstaCard.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [__postInstaCard.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },
    [__updateInstaCard.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateInstaCard.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articles.content = payload.content;
    },
    [__updateInstaCard.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },
    [__deleteInstaCard.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteInstaCard.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articles = state.articles.filter(
        (val) => val.articleId !== payload
      );
    },
    [__deleteInstaCard.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },
    [__getDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetail.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articles = payload;
    },
    [__getDetail.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },
    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articles.comments.unshift(payload);
    },
    [__postComments.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },
    [__postLike.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLike.fulfilled]: (state, { payload }) => {
      // console.log("state.like, payload", state.like, payload);
      // state.isLoading = false;
      // state.like.unshift(payload);
    },
    [__postLike.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    },

    // Form content post
    // [__postContent.pending]: (state, {payload}) => {
    //   state.isLoading = true;
    // },
    // [__postContent.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.articles.unshift(payload);
    // },
    // [__postContent.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.error = payload.response.data.error;
    // },
    [__postImage.pending]: (state) => {
      state.isLoading = true;
    },
    [__postImage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [__postImage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.response.data.error;
    }
  },
});

export default InstaSlice;
