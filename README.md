# one45-js-sdk
Javascript library for interfacing with one45 API for browser and NodeJS use. 

# Initializing One45Client
let One45 = new One45();
One45.initialize('https://<institution_base_url>', <client_key for the application>')
This will validate that if you have the correct institution URL and the client_key is valid 

# Authentication and Generating Access token
The JS SDK supports both username pasword auth with your one45 account, refresh token auth (if you already have a refresh token) or client credential auth (generating access token based on api client key and secret)

See auth.js for the methods to be used

To set the client_secret you can use the function

One45.Core.set('CLIENT_SECRET', <api client secret>)
or you can pass it in as part of the initialization option
One45.initialize('https://<institution_base_url>', <client_key for the application>', {'CLIENT_SECRET': <client_secret>})
  
After that the SDK will handle all token life cycle for you.


# Calling an API 
We have pre-built services to acccess some of our API
ie. One45Forms.js, Ond45User.js etc to have pre-built functions for accessing some commonn APIS

You can also make any request by using the rest.js service ie.
One45.rest.get('/api/v1/forms', params); //filters are passed in as a json key, value pair ie. {'name': 'test form', 'active': 1}
One45.rest.post('/api/v1/answers', params);
