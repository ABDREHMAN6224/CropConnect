"use client";
import { FooterSection } from "../../../components";
import NavBar from "../../../components/NavBar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import useColorMode from "../../../hooks/useColorMode";
import { FaSpinner } from "react-icons/fa";
import { BACKEND_URL } from "../../utils/constants";
import AuthWrapper from "../../AuthWrapper";

const CreateEventPage = () => {
    const {role} = useAppSelector((state) => state.user);
    const router = useRouter();
    const [colorMode, _] = useColorMode();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const {token} = useAppSelector(store=>store.auth);
  const [guest, setGuest] = useState(0);
  const [guests, setGuests] = useState([])
  const [name, setName] = useState("");
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (description.length > 10 && file ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  },[description,file,date,time,location,guest,name]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("guest", guest);
    formData.append("name", name);
    guests.forEach((guest) => {
      formData.append("guests[]", guest);
    });
    const res = await fetch(`${BACKEND_URL}/events/create`
      , {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setFile(null);
      setDescription("");
      toast.success("Event created successfully");
      router.push(`/events`);
    }else{
      toast.error(data.message);
    }
    setSubmitting(false);
  };

    useEffect(() => {
        if(role?.toLowerCase() !== "admin" || !role){
            router.replace("/events")
        }
    }, [])
  return (
    <AuthWrapper admin={true}>
    <ToastContainer theme={colorMode} />

<NavBar />
<main className="dark:bg-gray-900">
  <div className="container mx-auto p-4 max-w-screen-xl">
    <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
      <h1 className="text-3xl mt-4 mb-5">Create Event</h1>
    </header>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form className="space-y-4 md:space-y-6" onSubmit={handleCreate}>
          <div>
            <div className={`flex items-center justify-center w-full`}>
              <label
                for="dropzone-file"
                className={`${file && "h-72"} flex flex-col relative items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                <div className="absolute inset-0"
                  style={{
                    display:file ? "flex" : "none"
                  }}
                >

                  {file && 
                      <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover "
                      />
                   
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
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Event Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        <div>
            <label
              htmlFor="guest"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              No of Guests
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="No of guests"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              max={4}
            />
          </div>

          {/* inputs for no of guest (name) */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: guest }).map((_, index) => (
              <div key={index}>
                <label
                  htmlFor={`guest-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Guest {index + 1} Name
                </label>
                <input
                  type="text"
                  name={`guests[]`}
                  id={`guest-${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder={`Guest ${index + 1} name`}
                  value={guests[index]}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index] = e.target.value;
                    setGuests(newGuests);
                  }}
                />
              </div>
            ))}
          </div>

            {/*date time and location inputs  */}
            <div className="flex flex-col gap-2">
            <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {date && new Date(date) < new Date() &&
                      <p className="text-sm text-red-500 mt-2">Date must be in the future</p>
                    }

            </div>
            <div>
                    <label
                      htmlFor="time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    </div>
                    <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      placeholder="Event location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
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
              rows={6}
              name="description"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            ></textarea>
            {description.length < 10 && description.length > 0 && 
              <p className="text-sm text-red-500 mt-2">Description must be at least 10 characters</p>
            }
            {description.length > 200 &&
              <p className="text-sm text-red-500 mt-2">Description must be at most 200 characters</p>
            }
          </div>
          <button
            type="submit"
            className="w-full sm:w-fit flex items-center  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
            disabled={!validated || submitting}
          >
            {submitting && <FaSpinner className="animate-spin" />} &nbsp;
            Create event
          </button>
        </form>
      </div>
    </div>
  </div>
</main>
<FooterSection />
</AuthWrapper>
  );
}

export default CreateEventPage;