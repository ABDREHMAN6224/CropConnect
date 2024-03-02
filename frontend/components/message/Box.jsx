export default function Box({ letter, name, onClick = () => {} }) {
  return (
    <div className="flex flex-col space-y-1 mt-2 -mx-2 overflow-y-auto">
      <button
        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
        type="button"
        onClick={onClick}
      >
        <div className="flex items-center justify-center h-8 w-8 bg-primary-200 rounded-full">
          {letter}
        </div>
        <div className="ml-2 text-sm font-semibold">{name}</div>
      </button>
    </div>
  );
}
