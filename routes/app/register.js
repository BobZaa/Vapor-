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
                error: true,
                errorMessage: errors[req.query.err]
            }
        )
}