CSS mobile-first layout/teachings from jquery mobile website: http://demos.jquerymobile.com/1.4.1/rwd/

Responsive grid system basis utilized from http://www.responsivegridsystem.com/
Replace text with URL function: http://stackoverflow.com/questions/6707476/how-to-find-if-text-contains-url-string

The hardest part of this lab was trying to figure out the different shifts and breakpoints for the media queries. It was very tempting to just use a special framework since I know that the way I handled the queries was not as technical and to-the-point perfect as frameworks like bootstrap and foundation are. 

But, with my feed, I think it is visually appealing in the sense that once a breakpoint is hit, I have determined what is easier on the eye. For example, when the width is 1000px, some of the image sizes look funky next to the text when large, so I resized the text. The one thing I could not get to change was how to wrap the text differently as to not have it trailing after the image (and after the image not having a large white space).
(original plan: to center the image, and drop the text below the image, but I could not get the image to center after much research.. so I abandoned that plan)

With the aid of the small responsive grid system that I used to build off of, when 600px is hit, the columns disappear and they become stacked on top of each other for better text/image representation. The base of this design was built into the design of the responsive grid system I used.

The images have a max width of 100% of the div, which allows them to resize once their container is resized smaller than the image.





Further developments I would like to pursue:
On hover, dim the grid and have the link to the specific feed and the amount of likes with a thumbs up icon show up
(would have to figure out how to the mobile feature work since hover doesnt work)

Break after the 4 columns, create new row with 4 more columns, and continue on until the whole wallpost is finished. Also have to consider all types of posts and not just pictures, videos, and links.

Use bootstrap to style the columns better