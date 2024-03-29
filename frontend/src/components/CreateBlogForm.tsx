import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/theme";
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import {
  createBlog as createBlogReducer,
  setError,
  setSuccess,
} from "../reducers/blogReducer";
import ActionButton from "./buttons/ActionButton";
import HText from "./HText";
import InputButton from "./buttons/InputButton";
import FormButton from "./buttons/FormButton";

type Props = {};

const CreateBlogForm = (props: Props) => {
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const theme = useContext(ThemeContext);
  const dispatch = useStoreDispatch();
  const error = useStoreSelector((state) => state.blogs.isCreateBlogError);
  const success = useStoreSelector((state) => state.blogs.isCreateBlogSuccess);
  const username = useStoreSelector((state) => state.user.username)!;

  const createBlog = () => {
    dispatch(createBlogReducer({ title, author, url, username }));
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
      className={`mt-5 rounded-lg border-4 shadow-lg sm:min-h-[350px] sm:min-w-[600px] ${
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
          extraStyles={`w-2/3 md:w-[350px] ${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <InputButton
          extraStyles={`w-2/3 md:w-[350px] ${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <InputButton
          extraStyles={`w-2/3 md:w-[350px] ${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Url"
          onChange={(e) => setURL(e.target.value)}
          value={url}
        />

        <ActionButton
          extraStyles="w-1/2"
          handleOnClick={createBlog}
          id="create-blog-form-btn"
        >
          Create Blog
        </ActionButton>
      </div>
    </div>
  );
};

export default CreateBlogForm;
