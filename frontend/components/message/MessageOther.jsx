"use client";
export default function MessageOther({ letter, message,type,avatar }) {
  const extractFilename = (url) => {
    return url.split("/").pop();
  }
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        {!avatar?
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 flex-shrink-0">
          {letter}
        </div>
        :
        <img src={avatar} alt="avatar" className="h-10 w-10 rounded-full"/>
}
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
        {type=="text"?<div>{message}</div>:
            // message is an image, or a file or a video...display it accordingly adn add download button
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="60" viewBox="0 0 50 50">
                  <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"></path>
                </svg>
                <div className="ml-2 text-primary-500 font-semibold">
                  {extractFilename(message)}
                </div>
              </div>
              <div>
                <a className="text-primary-500 hover:text-primary-600"
                  href={message} download target="_blank" rel="noreferrer" 
                >
                  <div className="flex items-center bg-primary-200 rounded-lg p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                    {/* <span className="ml-1">Download</span> */}
                  </div>
                </a>
              </div>
            </div>
          

          }        </div>
      </div>
    </div>
  );
}
