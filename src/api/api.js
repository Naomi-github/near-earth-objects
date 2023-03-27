
// var url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${api_key}`

    async function fetchData() {
      let api_key = 'zMYbT3RBTqfKdaagLaxqhQNZLpkK5XSZhhkv1fcg';
      let start_date = `2015-09-07`;
      let end_date = `2020-01-01`;
      let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${api_key}`

      let response = await fetch(url);

      console.log('fetch has been called');

      console.log(response.status); // 200

      if (response.status === 200) {
          let data = await response.text();
          // handle data
          // console.log(data);
          return data

      }

  }


    // fetchData();

  export default fetchData;


  


