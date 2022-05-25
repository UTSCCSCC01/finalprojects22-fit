# Fit App

## Motivation
FitApp is a mobile app providing nutrition & training daily plans and progress tracking based on users' goals. 

**For nutrition plan & tracking, a user can:**
* Set weight loss goals, get a food intake daily routine recommendation
* Log meals (food with nutrition facts) through a calendar interface
* Categorize logs by breakfast, lunch, dinner and user-defined categories (snacks1, snack2, etc) 
* Nutrition breakdown
* Get warning of nutrition limits
* See trends of nutrition intake (day, week, month)

**For phsical training plan & tracking, a user can:**
* Log exercie metrics (type, time, amount, additional note) in a calendar interface
* Prescribe daily routine based on goal, automatic fill calendar with it

**Highlight features:**
* Gamification
    * cutomized user profile with achievements/medals displayed for goal-accomplishment, progress sharing
* UI Customization
    * Night Mode
    * Custom Colour Themes

## Installation:
1. Make sure Node.js and npm is installed on your local machine. You can check using the following command:
```
npm -v
```
2. Clone this GitHub repo to your chosen directory in your local machine
```
git clone https://github.com/UTSCCSCC01/finalprojects22-fit.git
```
3. Open your terminal and navigate to the directory on your local machine
```
cd finalprojects22-fit
```
4. Install all required dependencies for the project
```
npm install
```
5. Build and run the app
```
# will open expo in a new page in your web browser
npm start
```
6. If you choose to run the app on a mobile device, then make sure to install the expo app on the mobile device and scan the QR code on the expo web page.

## Contribution:
**Do you use git flow?**
* Master branch(1): used for new releases
* Develop branch(1): created from the master branch, contains stable features for the next lease
* Feature branch (as many as needed): integrate back to the develop branch when the feature is stable and tested
    * Changes on the develop branch must be merged back into feature branches
* Release branch (as many as needed): created from the develop branch, used to isolate and stabilize the releases
* WIP branch (as many as needed): The work is in progress, and I am aware it will not finish soon

**What do you name your branches?**
* Branch type (as listed above)
* Issue id
* Short description to distinguish different tasks/actions for same issue (optional - separated by hyphens)

**Do you use github issues or another ticketing website?**
* Ticket Tracking in [Jira](https://cmsweb.utsc.utoronto.ca/cscc01s22/tutorials/jira/Jira%20Tutorial.html)

**Do you use pull requests?**
* Pull request with [template](https://gist.github.com/jcserv/33f19818fde83c18e755b1c138eeac49)
