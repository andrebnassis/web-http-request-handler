const mockedData = {
    "id": 0,
    "dummy":" post hello world"
}

module.exports = (req, res) => {
    return res.status(200).send(mockedData);
}