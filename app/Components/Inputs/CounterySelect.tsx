'use client';


import useCountry from '@/app/Hooks/useCountry';
import Select from 'react-select'

export type CounterySelectValue = {
  label: string;
  latlng: number[];
  flags: string;
  region: string;
  value: string;
}

interface CounterySelectProps {
  value?: CounterySelectValue;
  onChange: (value: CounterySelectValue) => void;
}

const CounterySelect: React.FC<CounterySelectProps> = ({
  value,
  onChange
}) => {

  const { getAll } = useCountry();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CounterySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flags}</div>
            <div>
              {option.label},
              <span
                className='text-neutral-500 ml-1'
              >
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}

      />
    </div>
  )
}

export default CounterySelect