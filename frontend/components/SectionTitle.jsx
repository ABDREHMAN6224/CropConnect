const SectionTitle = ({title}) => {
    return (
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-primary-900 underline underline-offset-4">
          {title}
        </h1>
      </div>
    )
}

export default SectionTitle