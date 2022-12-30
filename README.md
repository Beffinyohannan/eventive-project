# Eventive (Event Managements)

Eventive is a Event managemet website where users and Companies can Register with OTP verification and login. Then they can access to feedpage where companies can posts their events and advertisement,that the user can like and comment the posts.company can view the other compaies posts . User can follow the companies theyy likes,enquiry about the event and then the company give a replay as quotation and after accepting the quotation of the comapany the user can chat with the company for more informations.Profile Settings for users and company. Admin can Manage POST,COMPANY and USER.


## API Reference



#### Get HomePage

http
  GET /eventive.tk


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |

#### Get Login

http
  GET /eventive.tk/login

  GET /eventive.tk/company-login


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |


#### Get feed

http
  GET /eventive.tk/posts


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | *Required*. Your API key |



####  Company Profile

http
  GET /eventive.tk/company-profile/${userId}


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | *Required*. Id of item to fetch |



## Run Locally

Clone the project

bash
  git clone https://github.com/Beffinyohannan/eventive-project


Go to the project directory

bash
  cd eventive-project


Install dependencies

bash
  npm install


Start the server

bash
  npm run start

## Screenshots

![landingPage](https://user-images.githubusercontent.com/107913841/210033608-7100bd01-21f4-4ff2-ad8f-b603d9872ed6.png)
![signup](https://user-images.githubusercontent.com/107913841/210033618-5c0a62b4-bfb4-4f2f-9b11-25e17b930254.png)
![login](https://user-images.githubusercontent.com/107913841/210033628-e1d6d5cc-e098-436e-9ea2-ca75113962d5.png)
![homepage](https://user-images.githubusercontent.com/107913841/210033649-a7ecc8cb-e979-4564-a675-9d3ab949cce9.png)
![eventPage](https://user-images.githubusercontent.com/107913841/210033663-77c0390d-5458-4063-897c-8fb82e896bc9.png)
![profile](https://user-images.githubusercontent.com/107913841/210033674-22876308-5660-4c08-992c-6a74b39c4d14.png)



## 🚀 About Me
I'm Beffin Yohannan, Passionate full stack developer...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://beffinyohannan.github.io/beffinyohannan/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](http://www.linkedin.com/in/beffin-yohannan)
