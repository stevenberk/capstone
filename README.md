# Exact Change

Exact Change is a peer-to-peer currency exchange web app where users can create and accout, login, buy, and sell foreign banknotes with people in their area for no fees or commission. The site is designed for budget travelers in the United States to be able to sell leftover foreign banknotes after a trip to others travelers about to embark on a trip abroad. Inspiration for this web app came from the logistical challenge of traveling to Cuba in 2018, where travelers from the US should ideally bring cash in a third country's currency to exchange for local currency, as US debit and credits don't work on the island and the rate for exchanging US dollars is prohibitively expensive. 

Technical Aspects:
The front end logic was made in React.js, with each page having its own component. The UI was designed with a "mobile-first" approach, each page smoothly transitions between mobile and desktop, no features or functionalities are lost between mobile and desktop. A clean, bespoke design was achieved with a minimal amount of Bootstrap elements. As for 3d party APIs, fixer.io's exchange rate API is used to calculate the exact rate into US dollars for each submission. 

Exact Change's backend constists of a single Node server and a two-tabled PostgreSQL database. When a user signs up for an account, Bcrypt creates a hashed password for safe storage in the Users table. The other table is the Posts table, as the name implies, this table is for storing seller submissions, the seller's User Id value is used to connect the post with the seller when rendering a list of available posts from a buyer search. Authentication is fulfilled with JSON web tokens. 

This web app is currently deployed with an AWS EC2 server.


Possible improvements:
1. Upgrading hosting server to HTTPS connection
2. In-app user-to-user messaging system instead of seller's email
3. React Native reconfigure 
4. Google Map's API integration
5. Major social media site integration (connecting an Exact Change account with a user's Facebook, Twitter, Instagram accounts)


