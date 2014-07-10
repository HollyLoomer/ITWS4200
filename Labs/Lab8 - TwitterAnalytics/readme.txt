Holly Loomer
loomeh - 661109104

I used chartJS to do all my chart visualizations. At first I used google visualizations but chartJS was even simpler in comparison, and so I moved to using that to further my lab along.


I used the command prompt to start up the database connection, the nodejs connection, and the mongoshell to debug small things.
For the database connection, I called the database twitter and lead to that path in my command prompt  to start the connection. (c:/mongo/bin --dbpath C:/mongo/data/twitter). This was created on my own by just adding the folder and then starting the first connection. The collection is called "tweet", which I named in my lab8server.js code.

When I had to drop all the items in my collection to restart clean, I used db.tweet.drop() on the mongo shell in another command prompt.
For the node.js server, I run node lab8server.js on my directory path.

I am streaming in 100 tweets.

I was unable to update the analyses each time.
I had attempted multiple wrapped get requests, but had a feeling it would not work.
Would like to know how to implement this later on.