# Fit App

## Motivation
FitApp is a mobile app providing nutrition & training daily plans and progress tracking based on users' goals. 

**For nutrition plan & tracking, a user can:**
* Set weight loss goals, get a food intake daily routine recommendation
* Log meals (food with nutrition facts) in a calendar interface
* Categorize logs by breakfast, lunch, dinner and user-defined categories (snacks1, snack2, etc.) 
* Nutrition breakdown
* Get warning of nutrition limits
* See trends of nutrition intake (daily, weekly, monthly, etc.)

**For phsical training plan & tracking, a user can:**
* Log exercie metrics (type, time, amount, additional note) in a calendar interface
* Prescribe daily routine based on goal, automatic fill calendar with it

**Highlight features:**
* Gamification
    * Cutomized user profile with achievements/medals displayed for goal-accomplishment, progress sharing, etc.
* UI Customization
    * Night Mode
    * Custom Colour Themes

## Installation
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
6. If you choose to run the app on a mobile device, then make sure to install the expo app on the mobile device and scan the displayed QR code.

## Contribution
**Git Flow for Contribution**

We use git for project contribution, following the steps below:

1. Use ``git clone`` or ``git pull`` to fork the project.
2. Use ``git checkout -b <branch name>`` to create a new branch from master for the changes made; one branch per topic/feature.
3. Use ``git add`` and ``git commit`` with descriptive commit messages.
4. Push this branch to GitHub project repo.
5. When attempting to add changes to main branch, use GitHub's Pull Request option on the Project's GitHub page.
6. The project owner merges or closes the [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). ([PR template](https://gist.github.com/jcserv/33f19818fde83c18e755b1c138eeac49))
7. Sync the updated master back to your fork.

**Branch Naming Conventions**
* BranchType-IssueID-Description(optional)
* BranchType as listed above:
    * Master branch(1): used for new releases
    * Develop branch(1): created from the master branch, contains stable features for the next lease
    * Feature branch(many as needed): integrate back to the develop branch when the feature is stable and tested
    * changes on the develop branch must be merged back into feature branches
    * Release branch(many as needed): created from the develop branch, used to isolate and stabilize the releases
    * WIP branch(many as needed): The work is in progress, and I am aware it will not finish soon

**Logging Tickets**

Jira [tut](https://cmsweb.utsc.utoronto.ca/cscc01s22/tutorials/jira/Jira%20Tutorial.html) about how to log a ticket
