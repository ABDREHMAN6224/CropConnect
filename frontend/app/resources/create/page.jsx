"use client";
import NavBar from "/components/NavBar";
import { useAppDispatch } from "../../store/hooks";
import { createResource } from "/app/store/resources/resourcesThunk.js";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ResourcesCreate() {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.file_input.files[0]);

    const formData = new FormData();
    formData.append("file", form.file_input.files[0]);

    setSubmitting(true);
    const response = await fetch("http://localhost:5000/auth/upload", {
      method: "POST",
      body: formData,
    });
    const imagePath = await response.json();

    const resp = await dispatch(
      createResource({
        resourceUrl: imagePath.url,
        description: form.description.value,
      })
    );
    console.log(resp);

    setSubmitting(false);
  };
  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4 max-w-screen-xl">
          <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
            <h1 className="text-3xl mt-4 mb-5">Create Resources</h1>
          </header>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleCreate}>
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
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
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    rows={10}
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="Resource description"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-fit flex items-center  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={submitting}
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
