import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const AddAdminModal = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      toast.error(
        "Username, Email, password and confirm password are required"
      );
      return;
    }
    const server_route = "http://localhost:5000/auth/register";
    const form = e.target;
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", email);
    formData.append("role", 'admin');
    formData.append("password", password);
    formData.append("file", form.file_input.files[0]);
    setSubmitting(true);
    const response = await fetch(server_route, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      setSubmitting(false);
      toast.success("Account created successfully");
    } else {
      setSubmitting(false);
      toast.error(data.message);
    }
  };
  return (
    <div>
      <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:shadow-md   dark:bg-slate-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Add an Admin
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="e.g. John Doe"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Avatar
              </label>
              <input
                className="block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200"
                name="file_input"
                id="file_input"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              disabled={submitting}
            >
              {submitting && <FaSpinner className="animate-spin" />}&nbsp; Add
              Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
