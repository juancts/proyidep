import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Card from "../components/Card/Card";



configure({ adapter: new Adapter() });

describe(" Componente Card", () => {
  const wrapperCard = shallow(<Card />);
  const divCard = wrapperCard.find("div");

  it("componente Card renderiza el componente", () => {
    expect(wrapperCard).toBeTruthy();
  });
});
