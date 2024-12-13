# Cricket-Scoring-Assignment

Cricket Scoring Application Assignment.

# Login Credentials

- Email: admin@gmail.com
- Password: admin123

# Roadmap

![pic1](https://github.com/AshutoshDM1/Cricket-Scoring-Assignment/blob/main/Frontend/public/cricket_roadmap.png)

## corrections -

- No Docker is used as there was no need.
- Zustand is used instead of Recoil as there was heavy statemanagement to do.
- Backend url is - https://cricket-scoring-assignment.onrender.com/
- NextAuth is used for authentication.

### Total Time Took to Complete the Assignment

[![wakatime](https://wakatime.com/badge/user/c34e365f-01c3-4480-a437-d477dc0aa67b/project/ecad1a38-6862-40e9-a696-4dfc1cd881b0.svg)](https://wakatime.com/badge/user/c34e365f-01c3-4480-a437-d477dc0aa67b/project/ecad1a38-6862-40e9-a696-4dfc1cd881b0)

# Project Images

![pic2](https://github.com/AshutoshDM1/Cricket-Scoring-Assignment/blob/main/Frontend/public/image1.png)

# Dark Mode

![pic3](https://github.com/AshutoshDM1/Cricket-Scoring-Assignment/blob/main/Frontend/public/image2.png)

## Update 13 Dec on 8:30 PM

- Middleware is used to redirect users to login page if they are not authenticated.
- Made some changes to the frontend to make it more responsive.

## Found some issues - 8:45 PM

- The NextAuth was not working as expected.
- But Working Fine in the local/dev server.

## Update 14 Dec on 10:30 AM

- Found the issue in the NextAuth.
- The issue was with the database. MongoDM Atlas was giving access to my IP address Only.
- Found the solution by changing the database to postgresql.
- Now working fine in the production server.
