<div id="top"></div>

<!-- HEADER -->
<div align="center">
  <a href="https://github.com/Hnaa17/Hirejob-be">
    <img src="https://user-images.githubusercontent.com/110190301/202742976-e40f3c5b-dbd0-47bd-9ec2-474a61e5f0c4.png" alt="Logo" width="200px">
  </a>
  
  <h3 align="center">Peworld App Backend</h3>

  <p align="center"> 
    Create a Node.js app for building Peworld RESTful APIs using Express.
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#project-built-with">Project Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Project Built With
This app was built with some technologies below:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
This is an example of how to list things you need to use the software and how to install them.
* [Node.js](https://nodejs.org/en/download/)

### Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](https://www.postgresql.org/)

### Installation
- Clone the Repo
```
git clone https://github.com/Hnaa17/Hirejob-be.git
```
- Install Module
```
npm install
```
- Make a new database
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example
Create .env file in your root project folder.
```env
# main environment
PORT = 8001

# postgres database environment
DB_HOST= localhost
DB_USER= username
DB_PASS= password
DB_NAME= database
DB_PORT= 5432 

# jwt environment
SECRETE_KEY_JWT = 

```
<p align="right">(<a href="#top">back to top</a>)</p>

## License
Distributed under the [MIT](/LICENSE) License.
<p align="right">(<a href="#top">back to top</a>)</p>