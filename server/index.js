const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const app = express();

const users = [{ id: 1, username: 'Danya', age: 21 }];

const createUser = (input) => {
    const id = Date.now();
    return {
        id,
        ...input,
    };
};
const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({ id }) => {
        return users.find((user) => user.id === id);
    },
    createUser: ({ input }) => {
        const user = createUser(input);
        users.push(user);
        return user;
    },
};

const port = 5000;
app.use(cors());
app.use('/graphql', graphqlHTTP({ graphiql: true, schema, rootValue: root }));

app.listen(port, () => console.log(`server started on post ${port}`));
