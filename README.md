

You can see production build here but,
 it is not working as a whole.
  (probablly restriction of walletconnect or I am failed to create proper production build. )

https://old-heart-7075.on.fleek.co/




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



