import {
  Create_Post,
  update_Post,
  delete_Post,
  find_Post,
  get_Posts,
} from "./constants";

function postReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case Create_Post:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case get_Posts:
      return {
        ...state,
        posts: payload,
        isPostLoading: false,
      };

    case update_Post: {
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPosts,
      };
    }
    case find_Post:
      return {
        ...state,
        post: payload,
      };
    case delete_Post:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != payload),
      };
    default:
      return state;
  }
}

export default postReducer;
