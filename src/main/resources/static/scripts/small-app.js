

  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  var initialWeatherForecast = {
    key: '673641',
    label: 'Mammendorf, DE',
    created: '2018-05-02T01:00:00Z',
    channel: {
      astronomy: {
        sunrise: "5:43 am",
        sunset: "8:21 pm"
      },
      item: {
        condition: {
          text: "Windy",
          date: "Thu, 21 Jul 2016 09:00 PM EDT",
          temp: 56,
          code: 24
        },
        forecast: [
          {code: 44, high: 86, low: 70},
          {code: 44, high: 94, low: 73},
          {code: 4, high: 95, low: 78},
          {code: 24, high: 75, low: 89},
          {code: 24, high: 89, low: 77},
          {code: 44, high: 92, low: 79},
          {code: 44, high: 89, low: 77}
        ]
      },
      atmosphere: {
        humidity: 56
      },
      wind: {
        speed: 25,
        direction: 195
      }
    }
  };

  var blank = {
   
  };


  //app.selectedCities = localforage.getItem('selectedCities');
  localforage.getItem('selectedCities').then(function (value) {
    // This code runs once the value has been loaded
    // from the offline store.
    app.selectedCities = value;  // initialized as empty array, but it is
                                 // null after using localforage
    app.selectedCities = JSON.parse(app.selectedCities);
    console.log('selectedCities: ' + value);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  }).catch(function (err) {
    // This code runs if there were any errors
    app.selectedCities = null;
    console.log('Error getting selectedCities: ' + err);
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  });
  //app.selectedCities = localforage.selectedCities;
  if (app.selectedCities) {  // can ESLint find this without '=== null'?
    // app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {

    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();

  }



  
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  };
;





