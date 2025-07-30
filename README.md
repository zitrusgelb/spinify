# Frontend Systems SS25: Project "Spinify"

This project is the 5th portfolio task for the course "Frontend Systems" by Prof. Dr. Peter Braun at the THWS.

# Participants:

| GitHub Username                                | Matriculation Number |
|------------------------------------------------|----------------------|
| [@zitrusgelb](https://github.com/zitrusgelb)   | 5123031              |
| [@timknt](https://github.com/timknt)           | 5123101              |
| [@Jakob-H-DEV](https://github.com/Jakob-H-DEV) | 5123113              |
| [@CyanideLion](https://github.com/CyanideLion) | 6824016              |

# Starting the WebApp
To start the program in a Docker container, the following command is available:

```shell script
  docker build -t spinify . && docker run -d -p 3000:3000 --name spinify spinify
```

The container can then be reached through the browser via `http://localhost:3000/` or `http://127.0.0.1:3000/`.

# Authentication
On start of the app, you must authenticate to the Spotify API. This happens automatically via a redirect. After signing in to Spotify, you will then be automatically redirected to the home page of our WebApp.

Please note that a Spotify Premium account is required to unlock every feature of the app. We also recommend using an account you access regularly so it contains sufficient listening data.

To ensure the redirect works smoothly, any browser extensions and functions that may influence cookies and path attributes may need to be disabled (e.g. _Brave Shields_, _Privacy Badger_, etc.). Keeping these enabled may lead to login loops, API-dependant elements not loading and/or other errors.
