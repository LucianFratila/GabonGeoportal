import Statistics from "../../components/(shared-components)/statistics";
import ToggleCheckBox from "../../components/styled-components/toggleCheckbox";
import InputSelectOptions from "../../components/styled-components/inputSelectOptions";

const Concessions = () => {
  const layercontrols = {
    layers: [
      { name: "View Concessions", id: 1 },
      { name: "View UFA's", id: 2 },
      { name: "View UFG's", id: 3 },
      { name: "View AAC's", id: 4 },
    ],
  };
  const chartDataSample = {
    chart1: [
      { title: "xx1", value: 10, color: "#E38627" },
      { title: "xx2", value: 10, color: "#C13C37" },
      { title: "xx3", value: 35, color: "#6A2135" },
      { title: "xx4", value: 15, color: "#009278" },
      { title: "xx5", value: 10, color: "#7b83dd" },
      { title: "xx6", value: 20, color: "#b3c1bf" },
    ],
  };

  const dataSelecteInput = {
    company: [
      { name: "company 1", id: 1 },
      { name: "company 2", id: 2 },
      { name: "company 3", id: 3 },
      { name: "company 4", id: 4 },
      { name: "company 5", id: 5 },
      { name: "company 6", id: 6 },
    ],
    concessions: [
      { name: "concessions 1", id: 1 },
      { name: "concessions 2", id: 2 },
      { name: "concessions 3", id: 3 },
      { name: "concessions 4", id: 4 },
      { name: "concessions 5", id: 5 },
      { name: "concessions 6", id: 6 },
    ],
  };

  return (
    <main className='p-2'>
      {/* layer name & visibility */}
      <div className=' py-5 gap-3 flex flex-row  px-4'>
        <h1 className=' text-white'>Concessions</h1>
        <ToggleCheckBox />
      </div>
      {/* filters */}
      <section className=' rounded-md p-4  bg-neutral-700'>
        <div>
          <h1 className=' text-white py-4'>Filters</h1>
        </div>
        <div className='flex flex-row gap-2'>
          {/* Company */}
          <InputSelectOptions selected={"Company Name"} data={dataSelecteInput.company} />
          {/* Concessions */}
          <InputSelectOptions selected={"Concessions"} data={dataSelecteInput.concessions} />
        </div>
        <div>
          <form>
            <div className='relative py-3'>
              <div className='flex absolute text-maintext  inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block bg-gray-600 placeholder text-maintext p-4 pl-10 rounded-md w-full text-sm'
                placeholder='Search for AAC ID, tree ID...'
                required
              />
            </div>
          </form>
        </div>
        <div className=' py-5 gap-3 flex flex-col'>
          {layercontrols.layers.map((i) => (
            <div key={i.id} className='flex py-3 gap-3'>
              <h1 className=' text-white'>{i.name}</h1>
              <ToggleCheckBox />
            </div>
          ))}
        </div>
      </section>
      {/* statistics */}
            <Statistics data={chartDataSample.chart1}/>
     
    </main>
  );
};

export default Concessions;
