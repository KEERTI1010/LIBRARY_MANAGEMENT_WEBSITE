

## What is Actually Happening ???

When you use Postman to send a book:

* Postman sends a JSON package to localhost:5000/add-book.

* Express receives it and translates the JSON (thanks to app.use(express.json())).

* Mongoose checks if it has a title, author, and price.

* MongoDB Atlas (in the cloud) stores it forever.

* Your Server sends a "Receipt" (res.json) back to Postman saying "Got it!"



## MongoDB Link

* It tells the database, "I am the owner, let me in."
* What it does: Authenticates your Backend to the Database




## CORS (Cross-Origin Resource Sharing)

* Node.js is "shy." It won't talk to any website unless you explicitly give it permission
* What it does: Authenticates your Frontend to your Backend



## Major Points

* useEffect (The Starter Motor) = tells React: "As soon as the website opens, go talk to the backend and get the books." Without this, the screen would stay empty until you clicked something.




* onSubmit (The Logic Switch) = Look at how the form decides between handleAddBook and handleUpdate. Understanding that editId ? true : false logic is the key to building complex apps



* .map() (The Multiplier) = This is the magic that takes one piece of card design and repeats it for 100 books automatically

