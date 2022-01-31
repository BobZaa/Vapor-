/**
 * This override adds error handling for the login page.
 */

const errors = {
    ERR_MISSING_PARAMS: "Missing parameter: username, and/or password",
    ERR_PASSWORD_INCORRECT: "Password is incorrect!",
    ERR_USER_NO_EXISTS: "That user doesn't exists!",
}

export default {
    path: "/login",
    handler: (req, res) =>
        res.render(
            'pages/login.njk',
            {
                error: req.query.err || false,
                errorMessage: errors[req.query.err],
                username: req.query.un
            }
        )
}