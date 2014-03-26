HollyLoomer - 661109104

In my lab1, I make the file as an array with the name of "tweet" so I could use the variable in AJAX to loop through the tweets and pull according information. So, in this lab, I modified the output json twitter file so that it could work with my specific lab 1. This means I had to use synchronous functions at some points to get the right file output.

I am able to upload 1000 tweets, but it is incredibly slow, and slows down my load of the twitter feed from lab 1 as well. Instead I loaded 20 tweets, and it uploads to the file just the same as if it were 1000. 
NOTE: When testing on lab 1, please alott for around 20 seconds load for the animations to begin taking proper effect after the tweet load.


 It takes a minute or two to load, but it is the only way I was guarenteed all the tweets with the right JSON formatting.
I wrote the name of the array of json objects beginning with ...
{
	"tweet":[

and I write to the file the 20 tweets, then I append...

]}

to end the file.


I used express to create an "app" under an http server. This server listens on port 3000 and it closes when my file is done rendering in the console. I was just using the express function for app.get() to start my server and listen using that, but I could not figure out how to close / end the server session at the end of my file. I like ending the server after my file is done loading because I do not want to unneccessarily have a server running and forget to close it. The console is also easier to handle when I don't have to cancel / restart the console every time I run the file. So, I used the http server in conjunction with express to achieve my server.close() at the end of the file.