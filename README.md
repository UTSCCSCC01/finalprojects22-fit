# finalprojects22-fit
finalprojects22-fit created by GitHub Classroom

● Motivation: what is it, what problem(s) does it solve, and why it exists.

FitApp is an android app providing nutrition & training daily plans and progress tracking based on users' goals. 

For nutrition plan & tracking, a user can: 
Set weight loss goals, get a food intake daily routine recommendation 
Log meals (food with nutrition facts) in calendar system (*supporting scanning nutrition label on packeaged foods)
Categorize logs by breakfast, lunch, dinner and user-defined categories(snacks1, snack2, etc)
Nutrition breakdown
Get warning of nutrition limits
See trends of nutrition intake(day, week, month)

For phsical training plan & trakcing, a user can:
Log exercies metrics(type, time, amount, additional note) in calendar system
Prescribe daily routine based on goal, automatic fill calendar with it
read/(re)write previous/current/future logs
For Cardio, visualize workout on a map, live tracker, trends(from May to June ran 12% longer on average)

Highlight features:
gamification: cutomized user profile with milestones displayed for goal-accomplishment, progress sharing on social media
Night Mode for UI


● Installation: provide a list of required tools/programs to run your project, and a procedure for how to build and run your project.
clone project to android studio
go to device manager > virtual > create device
select device definition: phone, pixel XL(double click the row), next
select latest android version, next
click run icon (green arrow) to launch app on the virual device


● Contribution: describe the process for contributing to your project.
version control (what to/not to commit, content of log messages, . . . )
○ Do you use git flow?
Master branch(1): used for new releases
Develop branch(1): created from the master branch, contains stable features for the next lease
Feature branch(many as needed): integrate back to the develop branch when the feature is stable and tested
*changes on the develop branch must be merged back into feature branches
Release branch(many as needed): created from the develop branch, used to isolate and stabilize the releases
WIP branch(many as needed): The work is in progress, and I am aware it will not finish soon

○ What do you name your branches? 
Branch type(as listed above)
Issue id
Short description to distinguish different tasks/actions for same issue(optional)
*separated by hyphens

○ Do you use github issues or another ticketing website? 
Jira steps to log a ticket: https://cmsweb.utsc.utoronto.ca/cscc01s22/tutorials/jira/Jira%20Tutorial.html

○ Do you use pull requests? 
pull request with template 
https://gist.github.com/jcserv/33f19818fde83c18e755b1c138eeac49
