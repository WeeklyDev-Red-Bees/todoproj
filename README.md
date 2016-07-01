![Red Bees Logo](http://weeklydev.io/wp-content/uploads/2016/06/red-bee.png) 

## Todo List

http://weeklydev.io/ ([/r/webdev](https://www.reddit.com/r/webdev)) Project 1 Submission by Team Red Bees

**Requirements**

**Manage Tasks (required)**

* As a user, I can add new tasks to my list so that I know what I have to get done.
* As a user, I can mark tasks on my to do list as completed so that I know what I have accomplished.
* As a user, I can set tasks as highly important, moderately important, or of low importance (default) so that I can know what is the most important.
* As a user, I can delete tasks so that my task list is not filled with irrelevant tasks.
* As a user, I can edit tasks that are created so that I can accurately reflect changes.

**User Registration (optional)**

* If you develop a user registration model, you may need to update how the Manage Tasks user stories work depending on whether or not you implement tiered user levels (like admin, member, anonymous user).

* As a new member, I can register using a email and password to create my own tasks that are only viewable, editable, and able to be deleted by me so that I can maintain privacy.

**User Login (optional)**

* As a registered member, I can login using the email and password that I registered with to view my tasks.
* As a registered member, I can request a password change if I forgot my password so that I can log in.

**User Management (stretch optional)**

* As an administrator, I can view who has registered so that I can see how popular my application is.
* As an administrator, I can see how many tasks each user has created and how many of them are done so that I can measure user adoption for my application.

## Setup guide

### Install package.json, run server and gulp

1. Install [nodejs](https://nodejs.org/)

1. Go to project folder in console

1. Add required global libraries

	```
	npm install -g typings webpack-dev-server rimraf webpack
	```

1. Install modules from package.json

	```
	npm install
	```

1. Install typings

	```
	npm run typings-install
	```

1. Install mongodb from [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

1. Make sure mongodb is started

1. Start watch process in client folder

	```
	webpack --progress --color --watch
	```

1. Start server process in server folder

	```
	npm start
	```

1. Access [http://localhost:4000](http://localhost:4000)
