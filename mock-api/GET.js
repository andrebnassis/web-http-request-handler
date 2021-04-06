const mockedData = {
    "hello-world":"Mock-API is up and Running"
}

module.exports = (req, res) => {
    return res.status(200).send(mockedData);
}