const mockedData = {
    "id": 0,
    "dummy":" post hello world"
}

module.exports = (req, res) => {
    console.log(req.body);
    return res.status(200).send(mockedData);
}