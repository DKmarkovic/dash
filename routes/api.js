const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const db = "";
const bcrypt = require('bcryptjs');
const fs = require('fs');
const secretKey = process.env.JWT_SECRET || '123'; // Use your own secret key



(async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
})();



router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
});

router.get('/special', (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
});



router.post('/register', (req, res) => {
  // Hash the user's password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // Create a new user instance
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        city: req.body.city,
        birthdate: req.body.birthdate,
        role: req.body.role
      });

      // Save the user to the database
      user.save()
        .then(result => {
          // Respond with a success message and user details
          res.status(201).json({
            message: 'User created successfully',
            user: result
          });
        })
        .catch(err => {
          // Handle database save errors
          res.status(500).json({
            error: 'Internal server error',
            details: err.message // You can include more details for debugging
          });
        });
    })
    .catch(hashErr => {
      // Handle bcrypt hashing errors
      res.status(500).json({
        error: 'Password hashing error',
        details: hashErr.message
      });
    });
});



// User Login
router.post('/login', async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).send('Invalid Email');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid Password');
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Ensure the 'uploads' folder exists, creating it if necessary
const uploadFolder = './uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}


// Configure multer for local file storage
const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});



const upload = multer({ storage: storage });

// Use the "upload" middleware in your route as you have already done.




// Define a route for file uploads
router.post('/upload-file', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    res.status(200).json({ message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'An error occurred during file upload.' });
  }
});

router.post('/upload-files', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const fileNames = req.files.map((file) => file.filename);

    res.status(200).json({ message: 'Files uploaded successfully.', fileNames });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'An error occurred during file upload.' });
  }
});

const directoryPath = 'C:/Users/DanielM/Documents/Angular/Dash/Dashboard/Server/uploads'; // Use forward slashes
const path = require('path');
const user = require('../models/user');

/// Serve files from the 'uploads' directory
router.use('/uploads', express.static(directoryPath));

// Define a route to get the list of file names in the 'uploads' directory
router.get('/uploaded-files', (req, res) => {
  // Read the files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).json({ message: 'An error occurred while reading the directory.' });
    } else {
      res.json({ files });
    }
  });
});
// Note: In the above code, the `directoryPath` variable points to the parent directory that contains the 'uploads' directory.






function requireAuth(req, res, next) {
  // Check if a token is present in the request headers
  const token = req.headers.authorization;

  // Verify the token using your secret key
  // If the token is valid, set the user information on the request object
  // If not valid, return a 401 Unauthorized response
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey); // Verify using your secret key
      req.user = decoded; // Attach user information to the request
      next(); // Continue to the next middleware or route handler
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

router.get('/user-roles', (req, res) => {
  const userRoles = ['admin', 'user', 'editor'];
 // An example array of roles
  res.status(200).json({ userRoles });
});



module.exports = router;
