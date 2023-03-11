const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// EJS.
app.use(expressLayouts);
app.set('view engine','ejs');

// BodyParser.
app.use(express.urlencoded( {extended: false} ));



const PORT = process.env.PORT || 5000;
// Listen to the Port.
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});