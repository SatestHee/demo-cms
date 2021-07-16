import React, { useState, useRef } from "react";
import inRange from "lodash/inRange";
import { Select, Table, Input, Button, Slider } from "antd";
import { tableSecCol } from "../constants/tableSecCol";
import { stateList } from "../constants/stateList";
import { houseTypeList } from "../constants/houseTypeList";
import { PropertyGroupProps, Property, Report } from "../data/interface";
import { generateAvgReport } from "../data/generateAvgReport";
const { Option } = Select;

export const FilterTab: React.FC<PropertyGroupProps> = ({
  data,
}): JSX.Element => {
  const [state, setState] = useState<string>("");
  const inputRef = useRef<Input>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<string>(houseTypeList[0]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [dataSource, setDataSource] = useState<Array<Property>>([]);

  const handleSearchClick = () => {
    const cityValue = inputRef?.current?.state.value;
    let filtered = data[state];
    const avgPrice: Report[] = generateAvgReport(data[state]);
    if (type !== "All")
      filtered = filtered.filter((ele: Property) => ele.type === type);
    if (cityValue)
      filtered = filtered.filter((ele: Property) => ele.city === cityValue);

    filtered = filtered.filter((ele: Property) =>
      inRange(ele.price, priceRange[0], priceRange[1])
    );
    filtered.forEach((item: Property) => {
      const avgPriceOfCity: any = avgPrice.filter(
        (ele) => ele.city === item.city
      );
      item.avg = avgPriceOfCity[0].avg;
    });
    setDataSource(filtered);
  };

  const handleSateChange = (value: string) => {
    setState(value);
  };
  const handleTypeChange = (value: string) => {
    setType(value);
  };
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  return (
    <>
      <div className="flex flex-row items-end mb-4">
        <div className="flex flex-col mx-2">
          <label className="font-semibold" htmlFor="state-select">
            State
          </label>
          <Select
            id="state-select"
            showSearch
            style={{ width: 200 }}
            placeholder="State"
            optionFilterProp="children"
            onChange={handleSateChange}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {stateList.map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col mx-2">
          <label className="font-semibold">City</label>
          <Input
            placeholder="City"
            ref={inputRef}
            style={{ width: 200 }}
          ></Input>
        </div>

        <div className="flex flex-col mx-2">
          <label className="font-semibold">Type</label>
          <Select
            defaultValue={houseTypeList[0]}
            style={{ width: 200 }}
            onChange={handleTypeChange}
          >
            {houseTypeList.map((houseType) => (
              <Option key={houseType} value={houseType}>
                {houseType}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col mx-2">
          <label className="font-semibold">
            Price Range {priceRange[0]} - {priceRange[1]}
          </label>
          <div className="w-1/2">
            <Slider
              range={{ draggableTrack: true }}
              ref={sliderRef}
              max={1000}
              style={{ width: 400 }}
              defaultValue={[0, 1000]}
              onAfterChange={handlePriceRangeChange}
            />
          </div>
        </div>
        <Button
          disabled={!state}
          className="mx-4"
          type="primary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
      <Table loading={!data} dataSource={dataSource} columns={tableSecCol} />
    </>
  );
};

export default FilterTab;
