import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme";
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import {
  createBlog as createBlogReducer,
  setError,
  setSuccess,
} from "../reducers/blogReducer";
import ActionButton from "./ActionButton";
import HText from "./HText";
import InputButton from "./InputButton";

type Props = {};

const CreateBlogForm = (props: Props) => {
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const theme = useContext(ThemeContext);
  const dispatch = useStoreDispatch();
  const error = useStoreSelector((state) => state.blogs.isCreateBlogError);
  const success = useStoreSelector((state) => state.blogs.isCreateBlogSuccess);

  const createBlog = () => {
    dispatch(createBlogReducer({ title, author, url }));
  };

  const clearInputs = () => {
    setURL("");
    setTitle("");
    setAuthor("");
  };

  useEffect(() => {
    if (success) {
      setAuthor("");
      setURL("");
      setTitle("");
      setTimeout(() => {
        dispatch(setSuccess(false));
        clearInputs();
      }, 1500);
    }

    if (error) {
      setTimeout(() => {
        dispatch(setError(false));
      }, 1500);
    }
  }, [error, success]);

  return (
    <div
      className={`mt-5 min-h-[350px] min-w-[600px] rounded-lg border-4 shadow-lg ${
        theme.isDark
          ? "border-primary-light shadow-primary-light "
          : "border-secondary-dark shadow-secondary-dark "
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 ">
        <HText extraStyles="text-2xl">Blog Form</HText>
        {error ? (
          <HText extraStyles="bg-red-500 rounded-xl">Failed!</HText>
        ) : null}
        {success ? <HText extraStyles="text-xl">Success!</HText> : null}
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Url"
          onChange={(e) => setURL(e.target.value)}
          value={url}
        />
        <div>
          <ActionButton handleOnClick={createBlog} id="create-blog-form-btn">
            Create Blog
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;
