// var express = require('express');
// var router = express.Router();

// router.get('/', Auth, async (req, res) => {
//   const books = await Book.find({});
//   res.render('allbook', { title: 'CrackJack - Library', book: books, user: req.user });
// })

// router.get('/bookupload', Auth, async (req, res) => {
//   res.render("book", { title: 'CrackJack - Book Upload', user: req.user });
// })

// router.route('/upload')
//   .post(Auth, async (req, res) => {
//     var newBook = new Book({
//       name: req.body.name,
//       description: req.body.description,
//       link: req.body.link
//     });
//     await newBook.save();
//     res.redirect('/books')
//   })

// router.get('/getdata', async (req, res) => {
//   const books = await Book.find({});
//   res.status(200).json(books);
// });

// module.exports = router;