"use client";
import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { BACKEND_URL } from "../../utils/constants";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import useColorMode from "../../../hooks/useColorMode";

export default function BlogsCreate() {
  const [colorMode, _] = useColorMode();
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const {token} = useAppSelector(store=>store.auth);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const categories = ["Seeds", "Fertilizers", "Tools", "Plants"];

  useEffect(() => {
    if (description.length > 10 && files.length > 0 && files.length <= 5
      && title.length > 0 && category.length > 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  },[description,files]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("content", description);
    formData.append("category", category);
    formData.append("title", title);
    const res = await fetch(`${BACKEND_URL}/stories/`
      , {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setFiles([]);
      setDescription("");
      toast.success("Blog created successfully");
      router.push(`/blogs`);
    }else{
      toast.error(data.message);
    }
    setSubmitting(false);
  };
  return (
    <>
          <ToastContainer theme={colorMode} />

      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4 max-w-screen-xl">
          <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
            <h1 className="text-3xl mt-4 mb-5">Create Blog</h1>
          </header>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleCreate}>
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center justify-start w-full h-44 gap-4 px-8"
                        style={{
                          display:files.length > 0 ? "flex" : "none"
                        }}
                      >

                        {files.length > 0 && 
                          Array.from(files).map((file) => {
                            if(file.type.includes("video")){
                              return <video
                              key={file.name}
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-32 h-32 object-cover rounded-sm"
                              controls
                              />
                            }
                            return <img
                            key={file.name}
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-32 h-32 object-cover rounded-sm"
                            />
                          }
                        )
                      }
                      </div>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">

                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <input
                        name="file_input"
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        required
                        accept="image/*"
                        onChange={(e) => setFiles(e.target.files)}
                        multiple
                        maxLength={5}
                        max={5}
                      />
                    </label>
                  </div>
                </div>
                
                {/* title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content
                  </label>
                  <textarea
                    rows={10}
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="Blog Content"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {description.length < 10 && description.length > 0 &&
                    <p className="text-sm text-red-500 mt-2">Description must be at least 10 characters</p>
                  }
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-fit flex items-center  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
                  disabled={!validated || submitting}
                >
                  {submitting && <FaSpinner className="animate-spin" />} &nbsp;
                  Create resource
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
