import { HttpStatusCode } from "axios";
import React, { useContext, useState } from "react";
import ThemeContext from "../context/theme";
import blogService from "../services/blogService";
import ActionButton from "./ActionButton";
import HText from "./HText";
import InputButton from "./InputButton";

type Props = {};

const CreateBlogForm = (props: Props) => {
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const theme = useContext(ThemeContext);

  const validateInputs = () => {
    if (
      author.length >= 5 &&
      title.length >= 3 &&
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
        url
      )
    ) {
      return true;
    }
    return false;
  };

  const createBlog = async () => {
    const validInputs = validateInputs();
    if (!validInputs) {
      setIsFailed(true);
      setIsSuccess(false);
      return;
    }
    const response = await blogService.createBlog(title, author, url);
    console.log(response);
    if (response.status == HttpStatusCode.Created) {
      setAuthor("");
      setURL("");
      setTitle("");
      setIsSuccess(true);
      setIsFailed(false);
    } else {
      setIsFailed(true);
      setIsSuccess(false);
    }
  };

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
        {isFailed ? (
          <HText extraStyles="bg-red-500 rounded-xl">Failed!</HText>
        ) : null}
        {isSuccess ? <HText extraStyles="text-xl">Success!</HText> : null}
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
          <ActionButton handleOnClick={createBlog}>Create Blog</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;
