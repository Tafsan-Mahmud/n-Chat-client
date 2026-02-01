exports.registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      active_Status,
      profile_image,
      title,
      gender,
      bio,
      country
    } = req.body;
    const token = await generateSecret() + email;
    const trimmedData = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
      country: country.trim(),
      active_Status,
      token,
      profile_image,
      title,
      gender,
      bio,
    };
    const response = await authService.register(trimmedData);

    if (response.status === 401 && response.message === 'User with this email already exists.') {
      res.status(401).json({
        message: response.message,
      });
    } else {
      if (response.status === 400 && response.message === 'You have already try to register with this email.We have already sent a OTP to your email Please VERIFY!.') {
        res.status(400).json({
          message: response.message,
          email: response.email,
          token: response.token,
          redirect: '/authOTP'
        });
        res.cookie('otp_pending', '_eyJfaWQiOiI2OTAyMjdhYzI2DEiLCJpYXQiOjE3Njg5MDc5NTE', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 15 * 60 * 1000 // 15 minutes
        });
      } else {
        res.cookie('otp_pending', '_eyJfaWQiOiI2OTAyMjdhYzI2DEiLCJpYXQiOjE3Njg5MDc5NTE', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(201).json({
          status: "SUCCESS",
          message: 'OTP sent to your email. Please verify to log in',
          email: response.email,
          token: response.token,
          redirect: '/authOTP'
        });

      }

    }
  } catch (error) {
    next(error);
  }
};