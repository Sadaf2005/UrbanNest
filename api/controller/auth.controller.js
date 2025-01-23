import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


// export const signup =async(req,res,next)=>{
//         const {username,email,password} = req.body;
//         const hashedPassword = bcryptjs.hashSync(password,10);
//         const newUser = new User({username,email,password :hashedPassword});
//         try{
//             await newUser.save();
//             res.status(201).json('User created Successfully');
//         }
//         catch(error){
//            next(error);
//         }     
// };
// export const signin =async(req,res,next)=>{
//     const {email,password}=req.body;
//     try{
//         const validUser = await User.findOne({email});
//         if(!validUser) return next(errorHandler(404,'User not found!'));
//         const validPassword = bcryptjs.compareSync(password,validUser.password);
//         if(!validPassword)return next(errorHandler(401,'wrong Credential !!'));
//         const token= jwt.sign({ id: validUser._id},process.env.JWT_SECRET);
//         const {password:pass , ...rest}=validUser._doc;
//         res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        
//     }catch(error){
//         next(error);
//     }
// }
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log('Request Body:', req.body); // Log request body

  // Validate required fields
  if (!username || !email || !password) {
    return next(errorHandler(400, 'All fields are required!'));
  }

  // Validate password type
  if (typeof password !== 'string') {
    return next(errorHandler(400, 'Password must be a string!'));
  }

  // Check for existing user
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return next(errorHandler(409, 'Username already exists!'));
      }
      if (existingUser.email === email) {
        return next(errorHandler(409, 'Email already exists!'));
      }
    }
  } catch (findError) {
    console.error('Error finding user:', findError); // Log error
    return next(errorHandler(500, 'Error checking for existing user'));
  }

  // Hash the password
  let hashedPassword;
  try {
    hashedPassword = bcryptjs.hashSync(password, 10);
    console.log('Password hashed successfully:', hashedPassword); // Log hashed password
  } catch (hashError) {
    console.error('Error hashing password:', hashError); // Log hashing error
    return next(errorHandler(500, 'Error hashing password'));
  }

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    console.log('User saved successfully:', newUser); // Log success

    // Exclude the password from the response
    const { password: pass, ...rest } = newUser._doc;

    // Send success response with user data
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      if (error.keyPattern.username) {
        return next(errorHandler(409, 'Username already exists!'));
      }
      if (error.keyPattern.email) {
        return next(errorHandler(409, 'Email already exists!'));
      }
    }
    console.error('Error saving user:', error); // Log error
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Request Body:', req.body); // Log request body

  // Validate required fields
  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required!'));
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    console.log('User Found:', validUser); // Log user found

    if (!validUser) {
      return next(errorHandler(404, 'User not found!'));
    }

    // Compare the provided password with the hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log('Password Match:', validPassword); // Log password match

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials!'));
    }

    // Generate a JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Exclude the password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Set the token as an HTTP-only cookie
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error('Error during sign-in:', error); // Log error
    next(error);
  }
};
    
    export const google = async (req, res, next) => {
      try {
          // Check if the user already exists
          const user = await User.findOne({ email: req.body.email });
          if (user) {
              // If the user exists, generate a token and send the response
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
              const { password: pass, ...rest } = user._doc;
              res
                  .cookie('access_token', token, { httpOnly: true })
                  .status(200)
                  .json(rest);
          } else {
              // If the user doesn't exist, create a new user
              const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
              const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
              const newUser = new User({
                  username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                  email: req.body.email,
                  password: hashedPassword,
                  avatar: req.body.photo
              });
              await newUser.save();
  
              // Generate a token for the new user and send the response
              const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
              const { password: pass, ...rest } = newUser._doc;
              res
                  .cookie('access_token', token, { httpOnly: true })
                  .status(200)
                  .json(rest);
          }
      } catch (error) {
          next(error);
      }
  };
    

  export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};
   
    