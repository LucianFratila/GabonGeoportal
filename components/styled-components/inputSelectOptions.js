const InputSelectOptions = ({ selected, data }) => {
  return (
    <select className=' bg-gray-600 text-maintext w-full p-3 rounded-md'>
      <option defaultValue={selected}>{selected}</option>
      {data ? (
        <>
          {data.map((i) => (
            <option key={i.id} value={`${i.name}`}>{i.name}</option>
          ))}
        </>
      ) : (
        <></>
      )}
    </select>
  );
};

export default InputSelectOptions;
