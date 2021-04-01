
# Phonebook

An app that allows registered users to manage their contacts.

## Prerequisites

- Node.js
- Mongo DB
- Git
- Vue CLI

## Getting started

### 1. Clone and Install

```bash
git clone https://github.com/lovros/phonebook.git
```
Run `npm install` in `phonebook-vue`and `phonebook-node` directories.

### 2. Start Mongo

```bash
mongod
```
### 3. Define Mongo constrictions
This app uses Mongo Indexes to enforce some constrictions. 
To set the constriction start `mongo` shell and execute
```bash
use phonebook
db.users.createIndex( { "username": 1 }, { unique: true } )
```


### 4. Run the application
Start nodemon in `phonebook-node`
```bash
npm run nodemon
```
Start webpack in `phonebook-vue`
```bash
npm run serve
```

