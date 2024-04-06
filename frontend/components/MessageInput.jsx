export default function MessageInput({ value, onChange, placeholder, fileAllowed=true,onFileChange,disabled }) {
    // create inpiut for chat where there is a clip along with text input for selecting files
    return (
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={disabled}
        />
        {fileAllowed && (
          <label htmlFor="file" className="ml-2 cursor-pointer">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={onFileChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </label>
        )}
      </div>
    );
}