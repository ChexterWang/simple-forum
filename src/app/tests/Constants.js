const postitems = [
    {
      "_id": 4,
      "rating": 0,
      "tags": [],
      "title": "post by g2",
      "content": "m",
      "author": {
        "_id": 5,
        "username": "u_g2",
        "group": "g2",
        "displayName": "u_g2"
      },
      "createdAt": "2021-05-28T16:00:08.368Z",
      "updatedAt": "2021-05-28T16:00:08.368Z",
      "__v": 0
    },
    {
      "_id": 3,
      "rating": 0,
      "tags": [],
      "title": "post by g1",
      "content": `m`,
      "author": {
        "_id": 4,
        "username": "u_g1",
        "group": "g1",
        "displayName": "u_g1"
      },
      "createdAt": "2021-05-28T16:00:08.362Z",
      "updatedAt": "2021-05-28T16:00:08.362Z",
      "__v": 0
    },
    {
      "_id": 2,
      "rating": 0,
      "tags": [],
      "title": "meowmeow2",
      "content": "meowmeow",
      "author": {
        "_id": 1,
        "username": "apcs",
        "displayName": "apcs"
      },
      "createdAt": "2021-05-28T16:00:08.355Z",
      "updatedAt": "2021-05-28T16:00:08.355Z",
      "__v": 0
    },
    {
      "_id": 1,
      "rating": 0,
      "tags": [],
      "title": "meow",
      "content": "meowmeow",
      "author": {
        "_id": 1,
        "username": "apcs",
        "displayName": "apcs"
      },
      "createdAt": "2021-05-28T16:00:08.340Z",
      "updatedAt": "2021-05-28T16:00:08.340Z",
      "__v": 0
    }
];

const testanswer = [
  {
    "_id": 4,
    "rating": -1,
    "tags": [],
    "title": "post by g2",
    "content": `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
|yo | hi |
`,
    "author": {
      "_id": 5,
      "username": "u_g2",
      "group": "g2",
      "displayName": "u_g2"
    },
    "createdAt": "2021-05-28T16:00:08.368Z",
    "updatedAt": "2021-05-28T16:00:08.368Z",
    "__v": 0
  },
  {
    "_id": 3,
    "rating": 0,
    "tags": [],
    "title": "post by g1",
    "content": `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio odit nihil sed praesentium soluta numquam amet iste earum eaque sunt.
`,
    "author": {
      "_id": 4,
      "username": "u_g1",
      "group": "g1",
      "displayName": "u_g1"
    },
    "createdAt": "2021-05-28T16:00:08.362Z",
    "updatedAt": "2021-05-28T16:00:08.362Z",
    "__v": 0
  },
  {
    "_id": 2,
    "rating": 0,
    "tags": [],
    "title": "meowmeow2",
    "content": "meowmeow",
    "author": {
      "_id": 1,
      "username": "apcs",
      "displayName": "apcs"
    },
    "createdAt": "2021-05-28T16:00:08.355Z",
    "updatedAt": "2021-05-28T16:00:08.355Z",
    "__v": 0
  },
  {
    "_id": 1,
    "rating": 0,
    "tags": [],
    "title": "meow",
    "content": "meowmeow",
    "author": {
      "_id": 1,
      "username": "apcs",
      "displayName": "apcs"
    },
    "createdAt": "2021-05-28T16:00:08.340Z",
    "updatedAt": "2021-05-28T16:00:08.340Z",
    "__v": 0
  }
];

const testpost = {
      "_id": 3,
      "rating": 300,
      "tags": [],
      "title": "How to add a link to a List in material-ui 1.0? and How to Configure Emmet for JSX in VSCode",
      "content": `The following messes with the onClick animation (the ListItem turns red):
~~~
<List>
  <a href="https://www.google.com">
    <ListItem button>
       <ListItemText primary="Google" />
     </ListItem>
   </a>
 </List>
~~~
While adding the link inside ListItem, only makes the transition work if ListItemText is clicked, which is not what I want. What is the correct way to add a link?
`,
      "comment": [
        {
          "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore rerum, nemo expedita explicabo esse fuga quae id, sit adipisci unde omnis amet provident ratione. Aspernatur distinctio ut dignissimos ipsum odit.",
          "author": {
            "_id": 1,
            "username": "apcs",
            "displayName": "apcs"
          },
        },
        {
          "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, vel!",
          "author": {
            "_id": 4,
            "username": "u_g1",
            "group": "g1",
            "displayName": "u_g1"
          },
        },
      ],
      "author": {
        "_id": 4,
        "username": "u_g1",
        "group": "g1",
        "displayName": "u_g1"
      },
      "createdAt": "2021-05-28T16:00:08.362Z",
      "updatedAt": "2021-05-28T16:00:08.362Z",
      "__v": 0
};

export { postitems, testanswer, testpost };