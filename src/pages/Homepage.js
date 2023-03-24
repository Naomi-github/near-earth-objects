import fetchData from "../api/api";
import { useState } from "react";

const Homepage = () => {

    const [data, setData] = useState('')

  fetchData()
    .then((data) => {
        setData(data);
      console.log(" homepage printing data" + data);
    })
    .catch((error) => console.log(error));

    console.log("!!!!!!!!!!!!!" + data);
    


  return (
    <div className="content-center">
      <div className="container">
        form
        <div className="date_form">
      <form>
        <input type="date" placeholder="start date" />
        <input type="date" placeholder="end date" />
      </form>
    </div>
      </div>
    </div>
  );
};

export default Homepage;




