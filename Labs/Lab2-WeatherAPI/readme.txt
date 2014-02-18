Holly Loomer
661109104


I used the forecast.io api. In this instance, it was found that this API does not provide you with the town and state the location is. So, I used Google's API to locate town and state names of the latitude/longitude given into the forecast.io API. I found some of this code from https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding and https://developers.google.com/maps/documentation/geocoding/#ReverseGeocoding.

It took a while to get the latitude/longitude to work with the forecast.io API. The problem was with the get requests and the mixture of functions.But, once solved, the ajax request could be properly loaded after the location is found (so that it does not load too early and cause errors due to not having any latitude/longitude found).


I liked this lab because it is easing me into learning about how to use APIs. I did not know how APIs would fit into coding and the structure of it all. But now I know that APIs can be populated into a webpage using AJAX. This, so far, is my preferred method. Thebest part about this lab is that I understood what I need to accomplish and how to do it faster than lab 1, and than other labs that I am used to completing. Of course, this lab was no easy, rather it helped lock in my understanding of APIs and code that helps pull in this outside data.


Design was centered around minimalistic ideas, again. I am a fan of simple designs, and neutral colors. And so this design reflects that. Weather icons credit to : http://adamwhitcroft.com/climacons/
With defining the icons, I was not sure of what would be best practice. But, I figured I had to seperate them so that the icons would not be mixed up when determining what the current/later weather was going to be.
Gradient borders: http://css-tricks.com/examples/GradientBorder/
Text that appears photoshopped (titles): http://code.tutsplus.com/tutorials/subtle-css3-typography-that-youd-swear-was-made-in-photoshop--net-13811