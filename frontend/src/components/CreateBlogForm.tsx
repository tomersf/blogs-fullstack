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
  const theme = useContext(ThemeContext);

  const createBlog = async () => {
    const response = await blogService.createBlog(title, author, url);
  };

  return (
    <div
      className={`mt-5 min-h-[300px] min-w-[600px] rounded-lg border-4 shadow-lg ${
        theme.isDark
          ? "border-primary-light shadow-primary-light "
          : "border-secondary-dark shadow-secondary-dark "
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 ">
        <HText extraStyles="text-2xl">Blog Form</HText>
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <InputButton
          extraStyles={`${
            theme.isDark
              ? "bg-primary-light text-dark-theme"
              : "bg-secondary-dark text-primary-dark"
          }`}
          placeholder="Url"
          onChange={(e) => setURL(e.target.value)}
        />
        <div>
          <ActionButton handleOnClick={createBlog}>Create Blog</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;
