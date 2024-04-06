import { FaUserPlus, FaUserMinus } from "react-icons/fa";


export default function Box({ letter, name, onClick = () => {},highlight=false,chatBox=false,recentMessage="",notification=false, addUserBox=false, added=false, loading=false,avatar }) {

  

  return (
    <div className="flex flex-col space-y-1 mt-2  min-h-8 ">
      <button
        className="flex flex-row items-center hover:bg-gray-200 rounded-xl p-2 "
        type="button"
        onClick={onClick}
        style={{backgroundColor:highlight?"#e2e0e0":"white"}}
      >
        {!avatar?
        <div className="flex items-center justify-center h-8 w-8 bg-primary-200 rounded-full">
          {letter}
        </div>
        :
        <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full"/>
      }
        <div className="ml-2 text-sm font-semibold text-left text-pretty">
          {name}
          {chatBox && <div className="text-xs text-gray-500">{
            recentMessage.length>20?recentMessage.slice(0,20)+"...":recentMessage
          }</div>}
        </div>
        {notification && <div className="ml-auto bg-primary-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs"></div>}
        {loading ? <div className="ml-auto bg-primary-400 text-white rounded-full h-5 w-5 flex items-center justify-center p-1"></div>:
        addUserBox && <div className="ml-auto bg-primary-400 text-white rounded-full h-5 w-5 flex items-center justify-center p-1 hover:bg-primary-500">
        {added?<FaUserMinus size={15}/>:<FaUserPlus size={15}/>}
        </div>
      }  
      </button>
    </div>
  );
}
