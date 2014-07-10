Holly Loomer
661109104

This lab took me the longest amongst all the labs. I had a hard time trying to figure out a way to convert the json to csv. I tried a lot of different modules but then after asking Plotka for more help I realized maybe hard coding would even be easier. I just thought a module at first would be the easiest. 

I decided to use the lab 5 solution to implement the building of the json file. Since this lab does not require my json file to be prefixed with labelling the entire JSON as a twitter array, I do not need to do a bunch of appending before and between tweets. (My lab 5 I had to handle putting commas between each item in the array, and closing and opening the array for tweets). There are also only 10 tweets being loaded just because 1000 took a long time for testing purposes.

I did a lot of attempts of on click actions in jquery until I realized it must not be working because of the clientside/serverside attributes of interacting with buttons and nodejs. I used socket to connect and transfer this data from the client to the server. This is how it is done to be able to interact with the nodejs server.

Also, I was confused because of the serverside/clientside differences. I could not do jquery in my javascript file because that file was not being linked to in the html. If I wanted to link to it in the html, then it had to be sent over the express server. But things got convoluted and a lot more complicated than necessary.

I found a function on stack overflow that converted json to csv format pretty close to the example, and so I tweaked this to convert it as close as possible. I added quotes to each item/header and I also added the header row at the top using another for loop. This was added into the function from stack overflow.

To get the server running, run the javascript file in the console using "node lab6-buildjson.js".
Then, go to localhost:3000 and the html page should be served up.
Click and peruse the different actions and observe the directory the files are hosted in for the new popped up json and csv file.



Amelia style: http://www.bootstrapcdn.com/#bootswatch_tab