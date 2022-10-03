# koios_stellar
Simple stellar testnet interacting spring boot api and angular web

### Installation

- install docker and docker-compose
- clone this repo
- run: 
```bash
docker-compose -f docker-compose.yml up -d --build
```
- one the build finishes api doesn't start immediately
Check its status using:
```bash
docker logs -f wallet_api
```
#TODO

You need to compose up --build every time you start. Why? Maven I suppose.
It does come in handy though, in case maven packages are updated.
There surely is a better way. *You also need to compose down before every compose up.*


### Usage

- create an account https://laboratory.stellar.org/#account-creator?network=test via "generate keypair"
- api needs your "Secret Key" (well, Not-So-Secret Key in this case ;) )
- you provide it to the api by visiting swagger http://localhost:8080/ autoredirects. See pic below:
![image](https://user-images.githubusercontent.com/67732669/193683064-3c82f90b-b997-48c7-9a7f-cfa1814ca02c.png)

#TODO

Add the option of adding the keys via webapp! Also - error handling!

- send two seeds please, for these two accounts. Two - no more no less, my app can't currently handle it :'(
- visit http://localhost:4200/ , it's where the webapp is
- you should see two wallet (account) components generated
- select the account you wish to transfer **FROM** by clicking the button within the component
- put the amount into the input field and click on the giant "Transfer XLM" button
- you should see the change reflected immediately

That's all folks!


