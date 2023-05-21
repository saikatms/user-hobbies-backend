# TypeScript Node USER HOBBIES Backend Starter

The main purpose of this repository is to show a working Node.js API workflow for writing Node code in TypeScript.

# Table of contents:

-   [Pre-reqs](#pre-reqs)
-   [Getting started](#getting-started)

# Pre-reqs

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [MongoDB](https://docs.mongodb.com/manual/installation/)
-   Install [VS Code](https://code.visualstudio.com/)

# Getting started

-   Clone the repository

```
git clone https://github.com/saikatms/user-hobbies-backend.git
```

-   Install dependencies

```
cd user-hobbies-backend
npm install
```

-   Configure your mongoDB server

```bash
I am using MongoDB Atlas. You use my creadential or please create a DB and add the username and password in .env file
```

### Create a managed MongoDB with Atlas

1. Navigate to [MongoDB's website](https://www.mongodb.com/cloud/atlas), sign up for a free account, and then log in.
2. After creating the account, enter the organization name, project name, and select your preferred language (JavaScript).
3. Select the **Shared Cluster** to get a free version with up to 512 MB storage which is great for development purposes.
4. On the "Create a Starter Cluster" page you can select cloud provider, region, region, cluster tier, and MongoDB settings, like version and backup frequency (Note: there is no option to create
   backups in the free tier).
5. If you already know to which cloud provider and region you want to deploy later, you should select the same here for best performance. Otherwise select a region close to the location where you plan
   to deploy the application later.
6. Select **M0 Sandbox** as the Cluster Tier, give your cluster a name, and then click the "Create Cluster" button.
7. It will now take a couple of minutes to create the cluster and you will be redirected to the MongoDB Atlas Admin interface.
8. Now you must configure access and security before you can use the database.
9. To whitelist an IP address, go to the **Network Access** section and click the "Add IP Address" button. For local development you can select your current IP address.
10. Create a user by selecting the **Add New Database User** in Database Access, adding a username and password (Password Authentication method) and give him read and write access to any database
    within the cluster. A user account is required to connect to the database, so remember these values because you will need them as part of your connection string.
11. Within the Clusters section, click the **Connect** button in your cluster to connect to the database.
12. You could now connect to the cluster using [MongoDB Compass](https://www.mongodb.com/products/compass), which is a graphical interface (GUI) to interact with the database.
13. But we need to select **Connect your application** to get the connection string, it should look like this:
    `mongodb+srv://<username>:<password>@your-cluster.12abc.mongodb.net/your-database?retryWrites=true&w=majority` and replace `<username>` and `<password>` with the credentials you just created. Back
    in your project, open your `.env` file and update `MONGODB_URI` with your new connection string. > NOTE! - If you don't have an `.env` file yet, rename `.env.example` to `.env` and follow the
    comments to update the values in that file.
14. **Success!** You can test that it works locally by updating `MONGODB_URI_LOCAL` to the same connection string you just updated in `MONGO_URI`. After rebuilding/serving, the app should work, but
    users that were previously created in local testing will not exist in the new database! Don't forget to return the `MONGO_URI_LOCAL` to your local test database (if you so desire).

You can find **more information** about how to get started with Atlas [here](https://docs.atlas.mongodb.com/getting-started/).

-   Run nd Build the project

```
npm start
npm run build
```

Finally, navigate to `http://localhost:8080`
