/**
 * This override adds error handling for the register page.
 */

const errors = {
    ERR_MISSING_PARAMS: "Missing parameter: username, password, and/or passwordRepeat",
    ERR_PASSWORD_NO_MATCH: "Passwords do not match!",
    ERR_USER_EXISTS: "That user already exists!",
}

export default {
    path: "/register",
    handler: (req, res) =>
        res.render(
            'pages/register.njk',
            {
                error: req.query.err || false,
                errorMessage: errors[req.query.err],
                username: req.query.un
            }
        )
}