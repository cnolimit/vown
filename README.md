<div align="center">
<h1>Veriown Project</h1>

<a href="https://user-images.githubusercontent.com/6928300/65358655-0b51f580-dbf2-11e9-9ee0-bb0950d24baa.png">
  <img
    height="150"
    width="150"
    alt="veriown logo"
    src="https://user-images.githubusercontent.com/6928300/65358655-0b51f580-dbf2-11e9-9ee0-bb0950d24baa.png"
  />
</a>

<br />

<p>This is a monorepo for the Veriown project running at https://veriown.io/.</p>

<br />

[**API Documentation**](https://veriownreviews.docs.apiary.io/)

<br />
</div>

<hr />

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project uses yarn workspaces so you will need yarn installed globally.

```
npm install -g yarn
```

### Installing

In order to get up an running locally follow the steps below:


clone the repository
```
git clone git@github.com:Veriown/vown.git
cd vown
```

install the dependancies
```
yarn install
```

#### Run Web App
cd into the web app package

```
cd packages/vown-web-app
```

run the web app 

```
yarn dev
```

Server should be running on http://localhost:3000

## Running the tests

In order to run the unit tests you can follow the steps below: 

cd into any package and run the command

```
yarn test
```

### E2E Tests

TBA -


### Coding Styles

We have a linter which we use to manage our preferred code styles.
We also use danger js in order to ensure we don't merge code that violates our coding styles into our master branch

To run the linter you can run this command from the root:
```
yarn lint
```

## Deployment

TBA

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Veriown/vown/releases). 

## Authors

* **Phillip A-Boateng** - *Initial work* - [Veriown](https://github.com/Veriown/vown)

See also the list of [contributors](https://github.com/Veriown/vown/graphs/contributors) who participated in this project.


