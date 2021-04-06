const mockedData = {
    "id": 0,
    "dummy":"get hello world"
}

module.exports = (req, res) => {
    mockedData.id = req.params.customId;
    return res.status(200).send(mockedData);
}

