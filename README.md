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
- !IMPORTANT -> Stellar testnet considers account created only when it has at least ONE XLM.
  So please fund this wallet immediately!
- api needs your "Secret Key" (well, Not-So-Secret Key in this case ;) )
- visit http://localhost:4200/ , it's where the webapp is
- when you open the app you can enter and register OR
- you provide it to the api by visiting swagger http://localhost:8080/ autoredirects. See pic below:
![image](https://user-images.githubusercontent.com/67732669/193683064-3c82f90b-b997-48c7-9a7f-cfa1814ca02c.png)
- once you register the first account you do the same for the second one
- send two seeds please, for these two accounts. Two - no more no less, my app can't currently handle it :'(
- you should see two wallet (account) components generated
- select the account you wish to transfer **FROM** by clicking the button within the component
- put the amount into the input field and click on the giant "Transfer XLM" button
- you should see the change reflected immediately

That's all folks!


