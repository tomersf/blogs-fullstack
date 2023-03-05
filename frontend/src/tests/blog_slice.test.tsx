import blogReducer from "../reducers/blogReducer";
import deepFreeze from "deep-freeze";

describe("blogReducer", () => {
  test("returns new state with action blogs/createBlog", () => {
    const state = [];
    const action = {
      type: "blogs/createBlog",
      payload: "the app state is in redux store",
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.content)).toContainEqual(action.payload);
  });
});
