
# Omoide

## Polygon Prize Eligibility

-Link to my deployed smart contract(s) on Polygonscan
 <https://twitter.com/rtree/status/1657583320371175426>
-Link to my tweet
 <https://twitter.com/rtree/status/1657583320371175426>

## How to demo

### Demo on Fleek
You can see production build here but, it is not working as a whole.
<https://old-heart-7075.on.fleek.co/>

but if you deploy locally as development env, project works pretty well.

### Demo on Development env

==== ==== ==== ==== ==== 
How to setup demo env.
==== ==== ==== ==== ==== 

1)Check IP of windows and WSL
   windows: 10.32.8.220  <-----External accessble IP
   WSL    : 172.25.60.92

2)[Windows] Port forward
   netsh.exe interface portproxy add v4tov4 listenaddress=* listenport=3000 connectaddress=172.25.60.92 connectport=3000

3)[Windows] Open firewall 3000 port

4)[WSL] Make cert for npm
         using WINDOWS IP

5)[WSL] npm start
    HTTPS=true SSL_CRT_FILE=cert.pem SSL_KEY_FILE=key.pem npm start


  *)DEBUG from PC
    chrome://inspect/#devices


6) Access https://10.32.8.220:3000 from Mobile.



===========
Deployed network
===========

Goerli
Optimism
(local)
Mumbai
Scroll Alpha

  "networks": {
    "5": {
      "events": {},
      "links": {},
      "address": "0x6A3957D27a8A79C7088F7Ea52DB37FD1EBb2d6F5",
      "transactionHash": "0x5813b272c68031be487b4f36a57b3edb9c2edce9f08cef634f0c2e8a2fe0da38"
    },
    "10": {
      "events": {},
      "links": {},
      "address": "0xE454cA755219310B2728d39db8039Cbaa7abC3b8",
      "transactionHash": "0xed1d0c303dd791f478e8209a2e4983c6e8ed96e737ad914de3aa0c614b7517c2"
    },
    "1337": {
      "events": {},
      "links": {},
      "address": "0x366062FC71DD41A7f337dFa90a08a3C7bEae36aB",
      "transactionHash": "0x5ec66802163a2f143e04cac7d79b22166b09707fe793d99800c67a7065557826"
    },
    "80001": {
      "events": {},
      "links": {},
      "address": "0xcF188ec57b50cF3e85d16793C90562E453D314C5",
      "transactionHash": "0x1de1f99234d2d66d04b8fc3d95860361303a4531ce25b57973327d517fd4df56"
    },
    "534353": {
      "events": {},
      "links": {},
      "address": "0xc6C4c01CdeEc0c2f07575eA5c8C751FE4De2BCbE",
      "transactionHash": "0x6e30029e0aa80252f26eae1a9ca3658257fce930da9b1cf134cd3dac9d4ab261"
    }

