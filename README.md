# Clean & Clear Contracts

## <a href='https://fast-coast-80968.herokuapp.com/' target='_blank' >Heroku Deployment</a>

<image src='https://imgur.com/a/UOdJnEU' alt='screenshot of the app'/>

## User Stories

- Vistors && Companies && Project Owners
    - You have access to visuals of the pages and will see a Login link rather than a Profile link.
    - Clicking on a Company's link will take you to their page.
        - Displaying all Projects, Tasks and Owned Projects that they have registered.
    - Clicking on a Project or Task will take you to a display for all of the data regarding a single Project or Task.
        - Tracks the Budget of the Project and the Total Cost of all Phases and Tasks.
        - Tracks the Budget of the Task and the Amount of the Contract.
    - You can create a Company Profile which will grant access to more features of the app.

- Companies && Project Owners
    - When on your own Company's Profile there will be an option for Prime Contractor.
        - Create new Phases.
            - Allows for cleaner job organization.
            - Create as many Tasks needed to complete a Phase.
        - Create new Tasks.
            - Gives descriptions of the jobs to be completed within a scheduled time.
    - Have access to additional features regarding Projects and Tasks.
        - Projects will have an option to acquire the Prime Contract.
            - This data will now be linked to your Company's Profile.
        - Tasks will have an option to acquire the Sub Contract.
            - This data will now be linked to your Company's Profile.
    - When on your own Company's Profile there will be a option for Project Owner.

- Project Owners
    - Create new Projects.
    - Update and Delete old Projects.

## <a href='https://imgur.com/gallery/qe2XNXW' target='_blank' >Wireframes && Schema Diagram</a>

## General Approach
### Technologies Approach
<div>
    <p>I enjoyed the usability of Rails while we taught ourselves how to construct the 3.5 app. Additionally, I thought it would look better in my portfolio if I used Rails to launch an app on a larger scale. Rails made it extremely easy to define many-to-many relationships and all of the subsequent things needed for PostgreSQL commands. I think that React is just such a solid option for the Front-end that really didn't go up for debate. I am also comfortable with handling Authentication in React as well as handling State and Props.
    </p>
</div>

### Concept Approach
<div>
    <p>While working in the Construction Industry for over a decade I became used to doing things in such an outdated way. All the way from turning in time-sheets for the week to the process of how companies have access to important documents regarding their projects. This app is beginning to tackle some of those issues with storing cruical data regarding scheduling and the details of contractual responsibilities. An additional feature that will be included in the next launch of this will be more ways to communicate with other companies. I would also like to entertain the idea of this app handling any pre-awarding of a contract, in the sense that a company could submit a bid for the contract and then have to be selected by the awarding party.
    </p>
</div>

## Installation Process

- Github
    - If you plan on making edits, first fork the repo and then you want the link for your github copied to your clipboard.
- CLI
    - Git
        - First check your directory for an existing git repository using `git status`.
            - If you are clean you can use `git clone *copied_link_from_github*`.
            - If your status reads a current repo, cd into a brand new directory then run the above command.
        - Now you can cd into this newly cloned repository.
            - You should run `yarn install` to pick up any dependencies that your device may not have available.
            - Additionally you will run `gem install` for the same reason.
    - Rails
        - Now you will want to create the database for your localhost using `rails db:create`.
        - Next you migrate the tables into the database with `rails db:migrate`.
        - DONE!! run `rails server`.
- Browser
    - Enter this URL `http://localhost:3000/`.
    - ENJOY!!


## Included Technologies

- package.json
```
{
  "name": "clean_and_clear_contracts",
  "private": true,
  "dependencies": {
    "@babel/preset-react": "^7.10.4",
    "@rails/actioncable": "^6.0.0",
    "@rails/activestorage": "^6.0.0",
    "@rails/ujs": "^6.0.0",
    "@rails/webpacker": "4.3.0",
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
    "dotenv": "^8.2.0",
    "prop-types": "^15.7.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-number-format": "^4.4.1",
    "react-router-dom": "^5.2.0",
    "turbolinks": "^5.2.0"
  },
  "version": "0.1.0",
  "devDependencies": {
    "webpack-dev-server": "^3.11.0"
  }
}
```
- Gemfile
```
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.3'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. 
# Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'
# Helps with the Authentication of Sessions
gem 'rack-cors', :require => 'rack/cors'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages 
  # or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your 
  # application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'dotenv-rails', groups: [:development, :test]
© 2020 GitHub, Inc.
```

#### Also used NumberFormat && I added 'rack-cors' to the Gemfile


## Unsolved Problems && Major Hurdles

<div>
    <p>One of my largest obstacles was that I actually taught myself a different way to connect Rails and React than what was shown to us in this course. This led to fewer resources to ask for help, so I spent a lot of time troubleshooting for myself.
    </p>
    <p>Another Issue that I encountered was I felt a little disconnected from the content of the app. The concept is a real need for the construction industry, however with building a 'mock-up' for a product was so different than building something that returns data to you when you ask for it. This app is capable of handling more complex features that would make for a more attractive interface for users and companies alike. One more additional side-note is that this was my previous trade and this was a lot of old memories.
    </p>
    <p>Last note would be that having further knowledge about having sub-routers would've been useful. I was unsuccessful in trying to impliment this in two projects.
    </p>
</div>

