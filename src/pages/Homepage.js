// import fetchData from "../api/api";
import { useState } from "react";

const Homepage = () => {

    const start_date = '2023-03-20';
    const end_date = '2023-03-25';
    const api_key = 'zMYbT3RBTqfKdaagLaxqhQNZLpkK5XSZhhkv1fcg';

fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${api_key}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.near_earth_objects);
    // console.log('name' + data.near_earth_objects[0].name);
    // console.log('estimated diameter' + data.near_earth_objects[0].estimated_diameter.kilometers);
    // console.log('hazardous?' + data.near_earth_objects[0].is_hazardous);
    // console.log('sentry object?' + data.near_earth_objects[0].is_sentry_object);
    // You can now access the data returned by the API from here
  })
  .catch(error => console.error(error));

    const [data, setData] = useState()
    // // Accessing the "element_count" property


    // // Accessing the "next" link
    // console.log(data.links.next);

    // // Accessing the first item in the "2015-09-08" array
    // console.log(data.near_earth_objects["2015-09-08"][0].name);



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




